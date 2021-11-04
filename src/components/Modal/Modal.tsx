import { Modal as AntModal } from 'antd';
import { memo } from 'react';

interface IProps {
  [rest: string]: any;
}

const Modal: React.FC<IProps> = ({ children, ...rest }): JSX.Element => {
  return (
    <>
      <AntModal {...rest}>{children}</AntModal>
    </>
  );
};

export default memo(Modal);
