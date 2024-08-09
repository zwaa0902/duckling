import { useEffect, useState } from 'react';

import { onFailureNotification, onSuccessNotification } from '@/components/common/Notification';
import { Divider, List, Row, Tabs, Typography, Avatar as AntAva, Empty, Button } from 'antd';
import { useAppDispatch } from '@/hooks/common';
import { setUserInfo } from '@/redux/slices/user';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants/routes';
import TelegramWebAppUserModel from '@/model/TelegramWebAppUserModel';
import userService from '@/services/user.service';
import groupService from '@/services/group.service';
import GroupModel from '@/model/GroupModel';
import Avatar from '@components/common/Avatar';
import FloatingButton from '@/components/common/FloatingButton';

import '@styles/home/home-styles.scss';

const { Text } = Typography;

interface ExtendedTelegramWebAppUser extends TelegramWebAppUserModel {
  channel: string;
}
interface ListItem {
  title: string;
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

// const userTest: ExtendedTelegramWebAppUser = {
//   id: 5206533931,
//   first_name: 'Nga',
//   last_name: 'Trinh',
//   username: 'ngatrinjh',
//   language_code: 'en',
//   channel: 'telegram',
// };

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [tabData, setTabData] = useState([[], [], []]);
  // const { network } = useTonConnect();
  const [user, setUser] = useState<TelegramWebAppUserModel | null>(null);
  useEffect(() => {
    // dispatch(setUserInfo(userTest));
    // setUser(userTest);

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
        const userInfo: ExtendedTelegramWebAppUser = {
          ...tg.initDataUnsafe.user,
          channel: 'telegram',
        };
        setUser(userInfo);
        dispatch(setUserInfo(userInfo));
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
        let data: any = [];

        if (tabIndex === '1') {
          data = listFrs;
        } else if (tabIndex === '2') {
          try {
            const res = await groupService.getGroupById(user?.id.toString() ?? '');
            data = res;
            console.log('res', res);
          } catch (err) {
            data = [];
            console.log('err', err);
          }
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
    <List.Item onClick={() => navigate(routes.detailGroup, { state: { group: item } })}>
      <List.Item.Meta
        avatar={<AntAva src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
        title={item.group_name}
        description={item.group_description ?? ''}
      />
    </List.Item>
  );

  const renderEmptybyTabId = (tabId: string) => {
    let emptyMessage = '';
    if (tabId === '1') {
      emptyMessage = 'No Friends Available';
    } else if (tabId === '2') {
      emptyMessage = 'No Groups Available';
    } else {
      emptyMessage = 'No Activities Available';
    }
    const handleNavigate = () => {
      if (tabId === '1') {
        console.log('navigate to add friend');
      } else if (tabId === '2') {
        navigate(routes.createGroup);
      } else {
        console.log('navigate to detail activity');
      }
    };
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 60 }}
        description={<Typography.Text>{emptyMessage}</Typography.Text>}
      >
        <Button type='primary' onClick={handleNavigate}>
          Create Now
        </Button>
      </Empty>
    );
  };

  return (
    <div className='wrapper'>
      <Row>
        <Avatar name={user?.first_name ?? 'John Doe'} />
      </Row>
      <Row>
        <Text className='white-1'>{user?.first_name ?? 'John Doe'}</Text>
      </Row>
      <div className='wallet' style={{ margin: '1rem', backgroundColor: 'white' }}>
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
                    locale={{
                      emptyText: renderEmptybyTabId(id),
                    }}
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
      <FloatingButton />
    </div>
  );
}

export default Home;
