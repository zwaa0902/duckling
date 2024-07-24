import { Row, Col, Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

import '@styles/onboarding/obd.scss';

function Onboarding() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Col className='layout'>
      <Col>
        <Row className='row pt-50'>
          <img src={'./batcom.svg'} alt='Image' />
        </Row>
        <Row className='row'>
          <Title level={3}>Bát cơm</Title>
        </Row>
      </Col>
      <Col>
        <Row className='row pb-16'>
          <Text>Split cơm the easy way</Text>
        </Row>
        <Row>
          <Button className='custom-button mb-40' onClick={() => navigate('/home')}>
            Home
          </Button>
        </Row>
      </Col>
    </Col>
  );
}
export default Onboarding;
