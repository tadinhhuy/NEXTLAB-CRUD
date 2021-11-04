import { memo } from 'react';
import { Spin as AntSpin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader: React.FC = (): JSX.Element => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <AntSpin indicator={antIcon} />
    </>
  );
};

export default memo(Loader);
