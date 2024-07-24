import React, { useEffect, useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';
import { FlexBoxCol } from '../components/styled/styled';

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
      } else {
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
    <>
      <FlexBoxCol>
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
        <div>
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
        </div>
      </FlexBoxCol>
    </>
  );
}

export default Home;
