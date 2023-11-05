import { ReactNode, RefObject } from 'react';

type Props = {
  innerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
};

const Wrapper: React.FC<Props> = ({ innerRef, children }) => {
  return (
    <div ref={innerRef}>
      <span className="tutorial__target-bg" />
      {children}
    </div>
  );
};

export default Wrapper;
