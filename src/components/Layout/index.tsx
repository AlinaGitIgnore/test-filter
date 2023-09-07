import { PropsWithChildren, type FC } from 'react';

import styled from './index.module.scss';

interface LayoutProps extends PropsWithChildren {}

interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={styled.layoutContainer}>{children}</div>;
};

export default Layout;
