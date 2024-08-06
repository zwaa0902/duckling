import { useLocation } from 'react-router-dom';
import { Typography, Button, Divider, Card } from 'antd';
import { DollarCircleTwoTone } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

const { Text } = Typography;

function DetailGroup() {
  const location = useLocation();
  const { group } = location.state || {};

  if (!group) {
    return <div>No group data found</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div className='wallet m-16'>
        <div className='wallet-column'>
          <Text className='white-1'>You own</Text>
          <Text className='white-1'>170.000.000</Text>
        </div>
        <Divider type='vertical' style={{ borderColor: 'gray', height: 'auto', verticalAlign: 'middle' }} />
        <div className='wallet-column'>
          <Text className='white-1'>You owe</Text>
          <Text className='white-1'>100.000.000</Text>
        </div>
      </div>
      <div className='card-row'>
        <Card
          hoverable
          style={{ width: 60, backgroundColor: '#f0f2f5' }}
          cover={
            <div className='card'>
              <DollarCircleTwoTone className='icon' twoToneColor='#52c41a' />
            </div>
          }
        >
          <Text>Transfer</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 60 }}
          cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
        >
          <Text>Request</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 60 }}
          cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
        >
          <Text>Activity</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 60 }}
          cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
        >
          <Text>More</Text>
        </Card>
      </div>
      {/*
      <Text>Group Detail</Text>
      <Text>{group.group_name}</Text>
      <Text>{group.group_description}</Text> */}
      {/* <Button
        type='primary'
        onClick={() => {}}>
        Take Action
      </Button> */}
    </div>
  );
}

export default DetailGroup;
