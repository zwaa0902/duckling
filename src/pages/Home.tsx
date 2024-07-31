import { useEffect, useState } from 'react';

import { onFailureNotification, onSuccessNotification } from '@/components/common/Notification';
import userService from '@/services/user.service';
import '@styles/home/home-styles.scss';
import { Divider, List, Row, Tabs, Typography, Avatar as AntAva } from 'antd';
import Avatar from '../components/common/Avatar';
import groupService from '@/services/group.service';
import GroupModel from '@/model/GroupModel';

const { Text } = Typography;

interface ListItem {
  title: string;
}
interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

const listFrs: ListItem[] = [
  {
    title: 'Friend 1',
  },
  {
    title: 'Friend 2',
  },
  {
    title: 'Friend 3',
  },
  {
    title: 'Friend 4',
  },
];

const listActivities: ListItem[] = [
  {
    title: 'Activities 1',
  },
  {
    title: 'Activities 2',
  },
  {
    title: 'Activities 3',
  },
  {
    title: 'Activities 4',
  },
];

const header = [
  {
    title: 'Friends',
  },
  {
    title: 'Groups',
  },
  {
    title: 'Activities',
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState('1');
  const [tabData, setTabData] = useState([[], [], []]);

  // const { network } = useTonConnect();
  const [user, setUser] = useState<TelegramWebAppUser | null>(null);
  useEffect(() => {
    const initTelegramWebApp = () => {
      const tg = window.Telegram.WebApp;

      const handleCloseEvent = () => {
        console.log('WebApp closed');
        // Handle the close event here
        // For example, you can perform cleanup or save user data
      };

      // Register the event listener
      tg.onEvent('popupClosed', handleCloseEvent);
      tg.ready();

      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const userInfo = tg.initDataUnsafe.user as TelegramWebAppUser;
        setUser(userInfo);
        userService
          .getUserInfo(userInfo.id.toString())
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);

            userService
              .register(userInfo)
              .then((res) => {
                onSuccessNotification('User registered successfully');
                console.log(res);
              })
              .catch((err) => {
                onFailureNotification('User registration failed');
                console.log('err1', err);
              });
          });
      } else {
        onFailureNotification('Telegram WebApp user data is not available.');

        console.error('Telegram WebApp user data is not available.');
      }

      // Cleanup function to remove the event listener
      return () => {
        tg.offEvent('popupClosed', handleCloseEvent);
      };
    };

    // Call the init function and store the cleanup function
    const cleanup = initTelegramWebApp();

    // Return the cleanup function to be called on component unmount
    return cleanup;
  }, []);

  useEffect(() => {
    const fetchData = async (tabIndex) => {
      try {
        // https://splitwise.silicales.com/94006370-53ac-4eae-a0aa-72c0885c5e62/groups
        // const response = await fetch(`https://api.example.com/data?tab=${tabIndex}`);
        var data: any = listFrs;

        if (tabIndex === '1') {
          data = listFrs;
        } else if (tabIndex === '2') {
          groupService
            .getGroupById(user?.id.toString() ?? '')
            .then((res) => {
              console.log('res', res);
              data = res;
            })
            .catch((err) => {
              data = [];
              console.log('err', err);
            });
        } else {
          data = listActivities;
        }
        setTabData((prevData) => {
          const newData: any = [...prevData];
          newData[parseInt(tabIndex) - 1] = data;
          return newData;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(activeTab);
  }, [activeTab, user]);

  const renderItemForGroups = (item: GroupModel, index: number) => (
    <List.Item>
      <List.Item.Meta
        avatar={<AntAva src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
        title={item.group_name}
        description={item.group_description ?? ''}
      />
    </List.Item>
  );
  return (
    <div className='wrapper'>
      <Row>
        <Avatar name={user?.first_name ?? 'John Doe'} />
      </Row>
      <Row>
        <Text className='white-1'>{user?.first_name ?? 'John Doe'}</Text>
      </Row>
      <div className='wallet' style={{ margin: '1rem' }}>
        <div className='wallet-column'>
          <Text className='black-1'>You own</Text>
          <Text className='black-1'>170.000.000</Text>
        </div>
        <Divider type='vertical' style={{ borderColor: 'gray', height: 'auto', verticalAlign: 'middle' }} />
        <div className='wallet-column'>
          <Text className='black-1'>You owe</Text>
          <Text className='black-1'>100.000.000</Text>
        </div>
        <Divider type='vertical' style={{ borderColor: 'gray', height: 'auto', verticalAlign: 'middle' }} />
        <div className='wallet-column'>
          <Text className='black-1'>Total balance</Text>
          <Text className='black-1'>70.000.000</Text>
        </div>
      </div>
      <div className='container'>
        <div className='wallet-column'>
          <Tabs
            className='tab'
            defaultActiveKey='1'
            centered
            onChange={(key) => {
              setActiveTab(key);
            }}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: header[i].title,
                key: id,
                children: (
                  <List
                    itemLayout='horizontal'
                    dataSource={tabData[i]}
                    renderItem={(item: any, index) => {
                      switch (id) {
                        case '1': // Friends
                          return (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<AntAva src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={item.title ?? ''}
                                description='Friends, Groups, Activities'
                              />
                            </List.Item>
                          );
                        case '2': // Groups
                          return renderItemForGroups(item, index);
                        case '3': // Activities
                          return (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<AntAva src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={item.title ?? ''}
                                description='Friends, Groups, Activities'
                              />
                            </List.Item>
                          );
                        default:
                          return null;
                      }
                    }}
                  />
                ),
              };
            })}
          />
        </div>
      </div>
      {/* <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Counter />
          <TransferTon /> */}
      {/* <div>
          <h2>Telegram Web App</h2>
          {user ? (
            <div>
              <p>ID: {user.id}</p>
              <p>First Name: {user.first_name}</p>
              {user.last_name && <p>Last Name: {user.last_name}</p>}
              {user.username && <p>Username: {user.username}</p>}
              {user.language_code && <p>Language Code: {user.language_code}</p>}
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div> */}
    </div>
  );
}

export default Home;
