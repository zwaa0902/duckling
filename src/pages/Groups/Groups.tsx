import { Typography, Row, Col, List, Avatar, Button, Empty } from 'antd';

import { useEffect, useState } from 'react';
import groupService from '@/services/group.service';

import '@styles/groups/gr.scss';
import { useAppSelector } from '@/hooks/common';
import GroupModel from '@/model/GroupModel';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const groupListTest: GroupModel[] = [
  {
    group_description: 'test',
    created_at: '2024-08-01T23:38:46.425993',
    group_name: 'test',
    group_bank_account: null,
    updated_at: '2024-08-01T23:38:46.426000',
    id: 'e460ee1e-b9a2-4bf5-9846-35294c3f27f1',
    group_owner: '9002190',
    group_avatar: null,
    group_bank_code: null,
  },
  {
    group_description: 'test',
    created_at: '2024-08-01T17:04:46.813913',
    group_name: 'test',
    group_bank_account: 'test',
    updated_at: '2024-08-01T17:04:46.813939',
    id: 'fc3b8824-3d81-4f64-9bc3-ede246828bb4',
    group_owner: '0',
    group_avatar: 'string',
    group_bank_code: 'test',
  },
  {
    group_description: 'test',
    created_at: '2024-08-02T00:22:42.776819',
    group_name: 'test',
    group_bank_account: null,
    updated_at: '2024-08-02T00:22:42.776830',
    id: '725b80c1-eed4-4dd2-853b-6bbafe27d943',
    group_owner: '9002190',
    group_avatar: null,
    group_bank_code: null,
  },
  {
    group_description: 'test',
    created_at: '2024-08-02T00:22:42.776819',
    group_name: 'test',
    group_bank_account: null,
    updated_at: '2024-08-02T00:22:42.776830',
    id: '725b80c1-eed4-4dd2-853b-6bbafe27d943',
    group_owner: '9002190',
    group_avatar: null,
    group_bank_code: null,
  },
  {
    group_description: 'test',
    created_at: '2024-08-02T00:22:42.776819',
    group_name: 'test',
    group_bank_account: null,
    updated_at: '2024-08-02T00:22:42.776830',
    id: '725b80c1-eed4-4dd2-853b-6bbafe27d943',
    group_owner: '9002190',
    group_avatar: null,
    group_bank_code: null,
  },
  {
    group_description: 'test',
    created_at: '2024-08-02T00:22:42.776819',
    group_name: 'test',
    group_bank_account: null,
    updated_at: '2024-08-02T00:22:42.776830',
    id: '725b80c1-eed4-4dd2-853b-6bbafe27d943',
    group_owner: '9002190',
    group_avatar: null,
    group_bank_code: null,
  },
];
function Groups() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [groups, setGroups] = useState<any>([]);

  useEffect(() => {
    groupService
      .getGroupById(user.user.id ?? '')
      .then((res) => {
        setGroups(res);
      })
      .catch((err) => {
        setGroups([]);
        console.log('err', err);
      });
  }, []);
  return (
    <div className='gr-wrapper'>
      <Row gutter={16} style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Total groups: {groups.length}</Text>
        <Button type='default' onClick={() => navigate('/create-group')}>
          Create
        </Button>
      </Row>
      <List
        itemLayout='horizontal'
        dataSource={groups}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Groups Available' />,
        }}
        renderItem={(item: any, index) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={item.group_name}
                description={item.group_description ?? ''}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
export default Groups;
