import { PropsWithChildren, type FC } from 'react';

import styled from './index.module.scss';
import { useTypedSelector } from '../../redux/hooks/reduxHooks';

interface LayoutProps extends PropsWithChildren {}

interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  const error = useTypedSelector(state => state.error);

  return (
    <div className={styled.layoutContainer}>
      {error ? (
        <p className={styled.error}>{error}. Refresh the page and try again.</p>
      ) : null}
      {children}
    </div>
  );
};

export default Layout;
