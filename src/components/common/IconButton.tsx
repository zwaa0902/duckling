import { Button, ButtonProps } from 'antd';
import '@styles/common.scss';
import { ReactNode, MouseEventHandler } from 'react';

interface IconButtonProps extends ButtonProps {
  onClick: MouseEventHandler<HTMLElement>;
  children: ReactNode;
}

export default function IconButton({ onClick, children, ...props }: IconButtonProps) {
  return (
    <Button className='iconButton' onClick={onClick} {...props}>
      {children}
    </Button>
  );
}
