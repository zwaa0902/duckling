import { useLocation } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Text } = Typography;

function DetailGroup() {
  const location = useLocation();
  const { group } = location.state || {};

  if (!group) {
    return <div>No group data found</div>;
  }

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
      {/* <Avatar src={group.image} size={64} /> */}

      <Text>Group Detail</Text>
      <Text>{group.group_name}</Text>
      <Text>{group.group_description}</Text>
      <Button
        type='primary'
        onClick={() => {
          /* Handle action */
        }}
      >
        Take Action
      </Button>
    </div>
  );
}

export default DetailGroup;
