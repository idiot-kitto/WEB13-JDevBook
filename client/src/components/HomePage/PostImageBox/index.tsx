import React, { useCallback } from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import { PostImageBoxProps, PostImageInfo } from 'types/post';
import { errorImage } from 'images';

import OneImage from './OneImage';
import TwoImages from './TwoImages';
import { ThreeImagesHorizontal, ThreeImagesVertical } from './ThreeImages';

const SkeletonBox = styled.div`
  width: 680px;
  height: 680px;
  background: ${palette.lightgray};
`;

const PostImageBox = ({ imageCount, images }: PostImageBoxProps) => {
  const isLoading = useCallback(() => {
    return imageCount >= 1 && images === null;
  }, [imageCount, images]);

  if (isLoading()) {
    return <SkeletonBox />;
  }

  const postImages = images as PostImageInfo[];
  const { url, originalWidth, originalHeight } = postImages[0];
  const { url: url2 } = imageCount >= 2 ? postImages[1] : { url: errorImage };
  const { url: url3 } = imageCount >= 3 ? postImages[2] : { url: errorImage };

  return imageCount === 1 ? (
    <OneImage postImages={postImages} />
  ) : imageCount === 2 ? (
    <TwoImages postImages={postImages} />
  ) : imageCount === 3 && originalWidth >= originalHeight ? (
    <ThreeImagesHorizontal postImages={postImages} />
  ) : imageCount === 3 && originalWidth < originalHeight ? (
    <ThreeImagesVertical postImages={postImages} />
  ) : (
    <div></div>
  );
};

export default PostImageBox;
