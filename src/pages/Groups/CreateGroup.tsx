import type { FormProps } from 'antd';
import { Typography, Button, Checkbox, Form, Input, Avatar, List, Row, Col } from 'antd';
import Emoji from 'react-ios-emojis';
import '@styles/groups/gr.scss';
import { useRef, useState } from 'react';
import FriendModel from '@/model/FriendModel';
import { CameraOutlined } from '@ant-design/icons';
import GroupModel from '@/model/GroupModel';
import dayjs from 'dayjs';
import groupService from '@/services/group.service';
import { onFailureNotification, onSuccessNotification } from '@/components/common/Notification';
import { useNavigate } from 'react-router-dom';

const users: FriendModel[] = [
  { name: 'User 1', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=1' },
  { name: 'User 2', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=2' },
  { name: 'User 3', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=3' },
  { name: 'User 4', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=4' },
  { name: 'User 5', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=5' },
  { name: 'User 6', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=6' },
  { name: 'User 7', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=7' },
];
const categories = [
  { key: '1', icon: <Emoji name={'curryRice'} height={'1em'} />, text: 'Food' },
  { key: '2', icon: <Emoji name={'coffin'} height={'1em'} />, text: 'Cafe' },
  { key: '3', icon: <Emoji name={'airplane'} height={'1em'} />, text: 'Trip' },
  { key: '4', icon: <Emoji name={'videoGame'} height={'1em'} />, text: 'Gaming' },
  { key: '5', icon: <Emoji name={'movieCamera'} height={'1em'} />, text: 'Movie' },
  { key: '6', icon: <Emoji name={'grinningFace'} height={'1em'} />, text: 'Other' },
];
const { Text } = Typography;

function CreateGroup() {
  const navigate = useNavigate();
  const [friendsSelected, setFriendsSelected] = useState<FriendModel[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Correct typing

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };
  const handleCheckboxChange = (checked: boolean, user: FriendModel) => {
    if (checked) {
      setFriendsSelected((prev) => [...prev, user]);
    } else {
      setFriendsSelected((prev) => prev.filter((u) => u.name !== user.name));
    }
  };

  const onFinish: FormProps<GroupModel>['onFinish'] = (values) => {
    const newGroup: GroupModel = {
      created_at: dayjs().toISOString(),
      group_name: values.group_name,
      group_description: values.group_description,
      group_bank_account: null,
      group_bank_code: null,
      group_owner: '5206533931',
      group_avatar: null,
      updated_at: dayjs().toISOString(),
    };
    groupService
      .create(newGroup)
      .then((res) => {
        console.log('res', res);
        onSuccessNotification('Group created successfully');
        navigate('/groups');
      })
      .catch((err) => {
        console.log('err', err);
        onFailureNotification('Failed to create group');
      });
    console.log(newGroup);
  };

  const onFinishFailed: FormProps<GroupModel>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the image data as base64 string
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  return (
    <div className='create-gr-wrapper'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        style={{ maxWidth: '600px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div className='content'>
          <Row style={{ alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <Col>
              <Button
                onClick={handleCameraClick}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  background: image
                    ? `url(${image}) no-repeat center center / cover` // Use shorthand background property
                    : 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!image && <CameraOutlined />}
              </Button>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Col>
            <Col flex='1'>
              <Form.Item<GroupModel>
                label='Group name'
                name='group_name'
                rules={[{ required: true, message: 'Field required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<GroupModel> label='Description' name='group_description' rules={[{}]}>
            <Input />
          </Form.Item>
          <Text>Categories</Text>
          <div className='horizontal-categories'>
            {categories.map((category) => (
              <div
                key={category.key}
                className={`category-item ${selectedCategory === category.key ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category.key)}
              >
                <div className='icon'>{category.icon}</div>
                <span>{category.text}</span>
              </div>
            ))}
          </div>
          {friendsSelected.length > 0 && (
            <div className='horizontal-container'>
              <div className='horizontal-dashed'>
                {friendsSelected.map((user, index) => (
                  <Avatar key={index} src={user.image} alt={user.name} className='horizontal-avatar' />
                ))}
              </div>
            </div>
          )}
          <Text>Friends</Text>
          <div className='scrollable-container' style={{ height: '400px', overflowY: 'auto' }}>
            <List
              itemLayout='horizontal'
              dataSource={users}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar key={index} src={item.image} alt={item.name} className='horizontal-avatar' />}
                    title={item.name}
                    description={item.phone ?? ''}
                  />
                  <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, item)} />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className='footer'>
          <Button
            type='primary'
            htmlType='submit'
            block
            style={{
              margin: '12px 0 32px',
              width: '100%',
            }}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default CreateGroup;
