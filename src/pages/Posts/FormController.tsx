import { memo } from 'react';
import { Button, Form, Input } from 'antd';

const FormController = ({
  btnText,
  ...rest
}: {
  btnText?: string;
  [rest: string]: any;
}): JSX.Element => {
  return (
    <>
      <Form {...rest}>
        <Form.Item name='title' label='Title'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='body' label='Content'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            {btnText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default memo(FormController);
