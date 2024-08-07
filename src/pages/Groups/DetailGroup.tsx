import { useLocation } from 'react-router-dom';
import { Typography, Divider, Card } from 'antd';
import { DollarCircleTwoTone, EllipsisOutlined } from '@ant-design/icons';

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
          style={{ width: 70, height: 100, backgroundColor: '#f0f2f5' }}
          cover={
            <div className='card'>
              <DollarCircleTwoTone className='icon' twoToneColor='#F16800' />
            </div>
          }
        >
          <Text>Transfer</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 70, height: 100, backgroundColor: '#D9F1FF' }}
          cover={
            <div className='card'>
              <img src={'../../icons/hand.svg'} alt='Image' width={32} />
            </div>
          }
        >
          <Text>Request</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 70, height: 100, backgroundColor: '#E9E5FF' }}
          cover={
            <div className='card'>
              <img src={'../../icons/bill.svg'} alt='Image' width={30} />
            </div>
          }
        >
          <Text>Activity</Text>
        </Card>
        <Card
          hoverable
          style={{ width: 70, height: 100, backgroundColor: '#FFE9F0' }}
          cover={
            <div className='card'>
              <EllipsisOutlined className='icon' style={{ color: '#FF0659' }} />
            </div>
          }
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
