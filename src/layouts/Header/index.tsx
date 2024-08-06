import { useState } from 'react';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import IconButton from '../../components/common/IconButton';
import { Drawer, Typography, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import '@styles/App.scss';
import '@styles/common.scss';
import { menuItems } from '@/constants/app';

const { Header } = Layout;
const { Text } = Typography;

function AppHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('1');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onMenuItemClick = (e) => {
    setCurrent(e.key);
    const selectedItem = findMenuItemByKey(menuItems, e.key);
    if (selectedItem && selectedItem.path) {
      onClose();
      navigate(selectedItem.path);
    }
  };

  const findMenuItemByKey = (items, key) => {
    for (let item of items) {
      if (item.key.toString() === key) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <Header className='App-header'>
      <IconButton onClick={showDrawer}>
        <MenuOutlined />
      </IconButton>
      <Drawer title='Splito' onClose={onClose} open={open} placement={'left'} width={240}>
        {/* <Link style={{ color: 'orange' }} to='/home' onClick={() => onClose()}>
          Home
        </Link>
        <Link style={{ color: 'orange' }} to='/groups' onClick={() => onClose()}>
          Groups
        </Link>
         */}
        <Menu
          onClick={onMenuItemClick}
          // style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode='inline'
          items={menuItems}
        />
      </Drawer>
      <Text className='body-1 white-1'>Splito</Text>
      <IconButton onClick={showDrawer}>
        <MoreOutlined />
      </IconButton>
    </Header>
  );
}
export default AppHeader;
