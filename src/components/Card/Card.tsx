import { Card as AntCard } from 'antd';
import React, { memo } from 'react';

interface IProps {
  children: React.ReactNode;
  styles?: object;
  [rest: string]: any;
}

const Card: React.FC<IProps> = ({
  children,
  styles,
  bodyStyles,
  onHover,
  ...rest
}): JSX.Element => {
  return (
    <>
      <AntCard style={{ width: 200, ...styles }} {...rest}>
        {children}
      </AntCard>
    </>
  );
};

export default memo(Card);
