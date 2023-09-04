import React from 'react';

import styled from './index.module.scss';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return <div className={styled.layoutContainer}>{children}</div>;
};

export default Layout;
