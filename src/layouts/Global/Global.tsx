import { Layout as AntLayout } from 'antd';
import React from 'react';
import './styles.css';

interface IProps {
  children: JSX.Element;
}

const GlobalLayout: React.FC<IProps> = ({ children }): JSX.Element => {
  return <AntLayout className='global-container'>{children}</AntLayout>;
};

export default GlobalLayout;
