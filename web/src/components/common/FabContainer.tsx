import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function FabContainer(props: Props) {
  return <div className="fixed right-6 bottom-6 z-10">{props.children}</div>;
}

export default FabContainer;
