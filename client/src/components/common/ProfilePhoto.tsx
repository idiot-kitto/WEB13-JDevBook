import React from 'react';
import styled from 'styled-components';
import defaultProfile from 'images/default-profile.jpg';

const StyledProfilePhoto = styled.img<ProfilePhotoProps>`
  width: ${(props) => props.size || '65px'};
  height: ${(props) => props.size || '65px'};
  border-radius: 50%;
  border: 1px solid #bbbbbb;
`;

type ProfilePhotoProps = {
  src?: string;
  size?: string;
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, size, children }) => {
  return (
    <StyledProfilePhoto
      src={src || defaultProfile}
      size={size}
      alt="프로필 사진"
    ></StyledProfilePhoto>
  );
};

export default ProfilePhoto;