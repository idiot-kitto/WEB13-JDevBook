import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import palette from 'theme/palette';
import {
  modalStateStore,
  postListStore,
  postModalDataStates
} from 'recoil/store';
import fetchApi from 'api/fetch';
import { PostAddData, PostUpdateData, PostData } from 'types/post';

import ModalTitle from 'components/HomePage/PostWriterModal/ModalTitle';
import PostInfo from 'components/HomePage/PostWriterModal/PostInfo';
import ModalContents from 'components/HomePage/PostWriterModal/ModalContents';
import AddContentsBar from 'components/HomePage/PostWriterModal/AddContentsBar';
import ImgUploadModal from './ImgUploadModal';
import useClosePostModal from 'hooks/useClosePostModal';

const PostWriterModalOverlay = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
`;

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PostWriterModalInner = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 160px;
  width: 600px;
  box-sizing: border-box;
  padding: 20px;
  z-index: 6;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
  background-color: ${palette.white};
  animation: ${ModalAnimation} 0.5s 1;

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Line = styled.div`
  width: 100%;
  border-color: ${palette.gray};
  border-width: 1px;
  border-style: solid;
  margin: 12px 0;
`;

const PostBtn = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 16px;

  border-radius: 8px;
  background-color: ${palette.green};
  color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${palette.darkgreen};
    transition: all 0.1s;
  }
`;

const PostWriterModal = () => {
  const modalState = useRecoilValue(modalStateStore);
  const postData = useRecoilValue(postModalDataStates);
  const [postList, setPostList] = useRecoilState(postListStore);
  const closePostModal = useClosePostModal();

  /**
   * 등록 모달인지 수정 모달인지 알려주는 함수
   * @returns true이면 등록, false이면 수정
   */
  const isEnrollMode = () => modalState.post.isEnroll;
  const alertSuccess = () => {
    alert(`게시글이 성공적으로 ${isEnrollMode() ? '게시' : '수정'}되었습니다!`);
  };
  const alertFail = () => {
    alert(
      `게시글이 알수없는 이유로 ${
        isEnrollMode() ? '게시' : '수정'
      }되지 않았습니다.`
    );
  };

  const postDataToAPI = async () => {
    if (postData.contents === '') {
      return alert('내용이 없습니다. 내용을 입력하세요.');
    }

    const { useridx, contents, secret, picture1, picture2, picture3, likenum } =
      { ...postData };

    const requestData = isEnrollMode()
      ? { useridx, contents, secret, picture1, picture2, picture3, likenum }
      : { secret, contents, picture1, picture2, picture3 };

    const { result, check } = isEnrollMode()
      ? await fetchApi.addPosts(requestData as PostAddData)
      : await fetchApi.updatePosts(postData.idx, requestData as PostUpdateData);

    // 통신 결과 후처리 (분리하면 좋을듯?)
    if (check) {
      const newPostIfExists: PostData = isEnrollMode() && {
        ...result,
        BTUseruseridx: { ...postData.BTUseruseridx }
      };

      const newPostList = isEnrollMode()
        ? [newPostIfExists, ...postList]
        : postList.map((post) => (post.idx === postData.idx ? postData : post));

      alertSuccess();
      setPostList(newPostList);
      closePostModal();
    } else {
      alertFail();
    }
  };

  return (
    <>
      <PostWriterModalOverlay modalState={modalState.post.writer} />
      <PostWriterModalInner modalState={modalState.post.writer}>
        <ModalTitle />
        <Line />
        <PostInfo />
        <ModalContents />
        <AddContentsBar />
        <PostBtn onClick={postDataToAPI}>
          <div>{isEnrollMode() ? '게시' : '수정'}</div>
        </PostBtn>
        <ImgUploadModal />
      </PostWriterModalInner>
    </>
  );
};

export default PostWriterModal;