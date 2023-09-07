/// <reference types="vite-plugin-svgr/client" />
//utils
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
//components
import { ReactComponent as DashboardSvg } from '../../assets/svg/dashboard.svg';
import { ReactComponent as CreateSvg } from '../../assets/svg/create.svg';
//styles
import styled from './index.module.scss';

const Header = () => {
  const location = useLocation();

  return (
    <div className={styled.header}>
      <div className={styled.logo}>{/* <LogoSvg />{' '} */}</div>
      <nav>
        <ul className={styled.navigationList}>
          <li>
            <Link
              to={'./products'}
              className={
                location.pathname.includes('products')
                  ? styled.activeLink
                  : styled.link
              }
            >
              <DashboardSvg />
              <p>Products List</p>
            </Link>
          </li>
          <li>
            <Link
              to={'./newProduct'}
              className={
                location.pathname.includes('newProduct')
                  ? styled.activeLink
                  : styled.link
              }
            >
              <CreateSvg />
              <p>New Product </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
