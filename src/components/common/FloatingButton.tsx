import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '@styles/common/floatingbutton.scss';

const FloatingButton = (props) => {
  const { onClick } = props;
  return <Button type='primary' shape='circle' icon={<PlusOutlined />} className='floating-button' onClick={onClick} />;
};

export default FloatingButton;
