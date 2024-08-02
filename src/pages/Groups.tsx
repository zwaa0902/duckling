import { Typography, Row, Col } from 'antd';

import { useEffect, useState } from 'react';
import groupService from '@/services/group.service';

import '@styles/groups/gr.scss';
import { useAppSelector } from '@/hooks/common';

const { Title, Text } = Typography;
function Groups() {
  const user = useAppSelector((state) => state.user);

  const [groups, setGroups] = useState<any>([]);

  useEffect(() => {
    groupService
      .getGroupById('123')
      .then((res) => {
        console.log('user', res);

        setGroups(res);
      })
      .catch((err) => {
        setGroups([]);
        console.log('err', err);
      });
  }, [user]);
  return (
    <div className='gr-wrapper'>
      <Text>Total groups:</Text>
      <Text>{user.user.id}</Text>
    </div>
  );
}
export default Groups;
