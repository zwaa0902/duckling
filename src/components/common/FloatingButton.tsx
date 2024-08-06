import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '@styles/common/floatingbutton.scss';

const FloatingButton = () => {
  return <Button type='primary' shape='circle' icon={<PlusOutlined />} className='floating-button' />;
};

export default FloatingButton;
