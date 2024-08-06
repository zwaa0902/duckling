import { Typography, Row, List, Avatar, Button, Empty } from 'antd';

import { useEffect, useState } from 'react';
import groupService from '@/services/group.service';

import '@styles/groups/gr.scss';
import { useAppSelector } from '@/hooks/common';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes';

const { Text } = Typography;

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
        <Button type='default' onClick={() => navigate(routes.createGroup)}>
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
            <List.Item
              onClick={() => {
                navigate(routes.detailGroup, { state: { group: item } });
              }}
            >
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
