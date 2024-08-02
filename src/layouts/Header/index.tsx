import { useState } from 'react';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import IconButton from '../../components/common/IconButton';
import { Drawer, Typography, Layout } from 'antd';
import { Link } from 'react-router-dom';

import '@styles/App.scss';
import '@styles/common.scss';

const { Header } = Layout;
const { Text } = Typography;

function AppHeader() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Header className='App-header'>
      <IconButton onClick={showDrawer}>
        <MenuOutlined />
      </IconButton>
      <Drawer title='Splito' onClose={onClose} open={open} placement={'left'} width={240}>
        <Link style={{ color: 'orange' }} to='/home' onClick={() => onClose()}>
          Home
        </Link>
        <Link style={{ color: 'orange' }} to='/groups' onClick={() => onClose()}>
          Groups
        </Link>
      </Drawer>
      <Text className='body-1 white-1'>Splito</Text>
      <IconButton onClick={showDrawer}>
        <MoreOutlined />
      </IconButton>
    </Header>
  );
}
export default AppHeader;
