import type { FormProps } from 'antd';
import { Typography, Button, Checkbox, Form, Input } from 'antd';
type FieldType = {
  groupname?: string;
  password?: string;
};

const { Text } = Typography;
function CreateGroup() {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='gr-wrapper'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType> label='Group name' name='groupname' rules={[{ required: true, message: 'Field required' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label='Description' name='password' rules={[{}]}>
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
export default CreateGroup;
