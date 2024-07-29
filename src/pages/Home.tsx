import { useEffect, useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';

import { Col, Divider, Row, Tabs, Typography } from 'antd';
import Avatar from '../components/common/Avatar';
import '@styles/home/home-styles.scss';
import userService from '@/services/user.service';
import { onFailureNotification, onSuccessNotification } from '@/components/common/Notification';

const { Text } = Typography;
interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

function Home() {
  const { network } = useTonConnect();
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
            userService
              .register(userInfo)
              .then((res) => {
                onSuccessNotification('User registered successfully');
                console.log(res);
              })
              .catch((err) => {
                onFailureNotification('User registration failed');
                console.log('err', err);
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

  return (
    <div className='wrapper'>
      <Row>
        <Avatar name='John Doe' />
      </Row>
      <Row>
        <Text className='white-1'>John Doe</Text>
      </Row>
      <div className='wallet' style={{ margin: '1rem' }}>
        <div className='wallet-column'>
          <Text className='black-1'>You own</Text>
          <Text className='black-1'>Value</Text>
        </div>
        <Divider type='vertical' style={{ borderColor: 'gray', height: 'auto', verticalAlign: 'middle' }} />
        <div className='wallet-column'>
          <Text className='black-1'>You owe</Text>
          <Text className='black-1'>Value</Text>
        </div>
        <Divider type='vertical' style={{ borderColor: 'gray', height: 'auto', verticalAlign: 'middle' }} />
        <div className='wallet-column'>
          <Text className='black-1'>Total balance</Text>
          <Text className='black-1'>Value</Text>
        </div>
      </div>
      <div className='container'>
        <div className='wallet-column'>
          <Tabs
            className='tab'
            defaultActiveKey='1'
            centered
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Tab ${id}`,
                key: id,
                children: `Content of Tab Pane ${id}`,
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
