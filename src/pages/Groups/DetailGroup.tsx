import { useLocation } from 'react-router-dom';
import { Typography, Divider, Card, Avatar, Button } from 'antd';
import { DollarCircleTwoTone, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import '@styles/groups/detail.scss';
import { dateFormatWithSlash } from '@/constants/dateTimeFormat';
import dayjs from 'dayjs';
import { commify } from '@/utils/price';
import FriendModel from '@/model/FriendModel';
const { Text } = Typography;

const listFriends: FriendModel[] = [
  { name: 'User 1', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=1' },
  { name: 'User 2', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=2' },
  { name: 'User 3', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=3' },
  { name: 'User 4', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=4' },
  { name: 'User 5', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=5' },
  { name: 'User 6', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=6' },
  { name: 'User 7', phone: '(217) 555-0113', image: 'https://i.pravatar.cc/100?img=7' },
];

const listActivities = [
  {
    activity_id: 1,
    activity_name: 'Activities 1',
    totalMoney: 1000000,
    created_at: '2021-09-01',
    address: 'Hanoi',
    paid: '80%',
    friends: [
      {
        name: 'Friend 1',
        money: 100000,
        image: 'https://i.pravatar.cc/100?img=12',
      },
      {
        name: 'Friend 2',
        money: 200000,
        image: 'https://i.pravatar.cc/100?img=14',
      },
      {
        name: 'Friend 3',
        money: 300000,
        image: 'https://i.pravatar.cc/100?img=9',
      },
    ],
  },
  {
    activity_id: 2,
    activity_name: 'Activities 2',
    totalMoney: 1000000,
    created_at: '2021-09-02',
    address: 'Hanoi',
    paid: '80%',
    friends: [
      {
        name: 'Friend 1',
        money: 100000,
        image: 'https://i.pravatar.cc/100?img=10',
      },
      {
        name: 'Friend 2',
        money: 200000,
        image: 'https://i.pravatar.cc/100?img=11',
      },
      {
        name: 'Friend 3',
        money: 300000,
        image: 'https://i.pravatar.cc/100?img=12',
      },
    ],
  },
  {
    activity_id: 3,
    activity_name: 'Activities 3',
    totalMoney: 1000000,
    created_at: '2021-09-03',
    address: 'Hanoi',
    paid: '80%',
    friends: [
      {
        name: 'Friend 1',
        money: 100000,
        image: 'https://i.pravatar.cc/100?img=1',
      },
      {
        name: 'Friend 2',
        money: 200000,
        image: 'https://i.pravatar.cc/100?img=4',
      },
      {
        name: 'Friend 3',
        money: 300000,
        image: 'https://i.pravatar.cc/100?img=5',
      },
    ],
  },
  {
    activity_id: 4,
    activity_name: 'Activities 4',
    totalMoney: 1000000,
    created_at: '2021-09-04',
    address: 'Hanoi',
    paid: '80%',
    friends: [
      {
        name: 'Friend 1',
        image: 'https://i.pravatar.cc/100?img=1',
        money: 100000,
      },
      {
        name: 'Friend 2',
        image: 'https://i.pravatar.cc/100?img=2',

        money: 200000,
      },
      {
        name: 'Friend 3',
        image: 'https://i.pravatar.cc/100?img=3',
        money: 300000,
      },
    ],
  },
];
function DetailGroup() {
  const location = useLocation();
  const { group } = location.state || {};

  if (!group) {
    return <div>No group data found</div>;
  }

  return (
    <div className='detail-screen-wrapper'>
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
          style={{ width: 70, height: 100, backgroundColor: '#FEE6D0' }}
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
      <div style={{ height: '12px' }} />
      <div className='title'>
        <Text className='body-3 bold'>Activities</Text>
        <Text className='body-3 green'>See more</Text>
      </div>
      <div className='activities-wrapper'>
        {listActivities.map((activity, index) => (
          <div className='activity-container' key={activity.activity_id}>
            <div className='row-detail'>
              <div className='row-detail'>
                <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                <Text className='body-3'>{activity.activity_name}</Text>
              </div>
              <Text className='body-3 bold'>{commify(activity.totalMoney)} VND</Text>
            </div>
            <Divider className='divider' />
            <div className='row-detail'>
              {activity.friends.length > 0 && (
                <div className='row-avatars'>
                  {activity.friends.map((user, index) => (
                    <Avatar key={index} src={user.image} alt={user.name} className='horizontal-avatar-detail' />
                  ))}
                </div>
              )}
              <div className='column'>
                <Text className='body-3 green'>{activity.paid}</Text>
                <Text className='body-3'>Paid</Text>
              </div>
            </div>
            <Divider className='divider' />
            <div style={{ height: '8px' }} />
            <div className='row-detail'>
              <Text>{dayjs(activity.created_at).format(dateFormatWithSlash)}</Text>
              <div className='detail-button'>View detail</div>
            </div>
          </div>
        ))}
      </div>
      <div className='title' style={{ backgroundColor: 'white' }}>
        <Text className='body-3 bold'>Friends share</Text>
        <Text className='body-3 green'>See more</Text>
      </div>
      {listFriends.length > 0 && (
        <div className='friends-wrapper'>
          <Button
            type='dashed'
            style={{ borderColor: '#5BA019', height: '48px', padding: '0 22px', marginTop: '8px' }}
            icon={<PlusOutlined style={{ color: '#5BA019' }} />}
          />

          {listFriends.map((user, index) => (
            <div className='column' style={{}}>
              <Avatar
                key={index}
                src={user.image}
                alt={user.name}
                className='horizontal-avatar-detail'
                size={50}
                style={{ borderRadius: '8px', margin: '8px 4px' }}
              />
              <Text className='body-3 center'>{user.name}</Text>
            </div>
          ))}
        </div>
      )}
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
