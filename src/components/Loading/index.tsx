import { Circles } from 'react-loader-spinner';
import styled from './index.module.scss';

export const Loading = () => {
  return (
    <div className={styled.container}>
      <Circles color="rgba(0,0,0,0.3)" height={80} width={80} />
    </div>
  );
};
