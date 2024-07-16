import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { useEffect, useState } from "react";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

function App() {
  const { network } = useTonConnect();
  const [user, setUser] = useState<TelegramWebAppUser | null>(null);
  useEffect(() => {
    const initTelegramWebApp = () => {
      const tg = window.Telegram.WebApp;
      tg.ready();

      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const userInfo = tg.initDataUnsafe.user;
        setUser(userInfo);
      } else {
        console.error("Telegram WebApp user data is not available.");
      }
    };

    initTelegramWebApp();
  }, []);

  return (
    <StyledApp>
      <AppContainer>
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
                {user.language_code && (
                  <p>Language Code: {user.language_code}</p>
                )}
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
