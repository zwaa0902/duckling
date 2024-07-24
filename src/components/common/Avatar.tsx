import React from 'react';
import '@styles/home/home-styles.scss';

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const firstChar = name[0].toUpperCase();

  return <div className='avatar-circle'>{firstChar}</div>;
};

export default Avatar;
