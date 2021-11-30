import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IconSearch } from 'images/icons';
import { MdArrowBack } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { modalStateStore } from 'recoil/store';

import { SearchedUser } from 'types/GNB';
import fetchApi from 'api/fetch';
import { mainLogo } from 'images';

import { UserCard } from 'components/common';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const ModalHeader = styled(FlexBox)`
  display: flex;
  justify-content: space-between;

  svg {
    color: ${(props) => props.theme.darkgray};
  }
  margin-right: 8px;
`;

const MainLogo = styled.img`
  width: 40px;
  display: flex;
`;

const UserSearchBarContainer = styled.div`
  width: 240px;
  height: 40px;
  background: ${(props) => props.theme.lightgray};
  border-radius: 24px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  position: relative;

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${(props) => props.theme.black};
    }
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;
    height: 100%;
    padding: 0px;
  }
`;

const ExtendSearchBarAnimation = keyframes`
  0% {
    width: 240px;
  }

  100% {
    width: 100%;
  }
`;

const SearchBarContainerModal = styled(UserSearchBarContainer)`
  margin-left: 8px;
  width: 100%;
  animation: ${ExtendSearchBarAnimation} 0.5s ease-in-out;
`;

const UserSearchModalContainer = styled.div`
  width: 320px;
  max-height: 600px;
  box-shadow: ${(props) => props.theme.shadow.searchUser};
  background: ${(props) => props.theme.white};
  border-radius: 12px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px 8px 0px 8px;
  box-sizing: border-box;

  svg {
    font-size: 22px;
  }
`;

const HoverRound = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightgray};
    border-radius: 100%;
  }
`;

const SearchModalBody = styled.div`
  width: 100%;
  margin-top: 8px;
  padding-bottom: 8px;
  max-height: calc(600px - 56px);
  box-sizing: border-box;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > p {
    text-align: center;
    color: ${(props) => props.theme.darkgray};
  }
`;

const StyledInput = styled.input`
  color: ${(props) => props.theme.black};
`;

const UserSearchBar = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  return (
    <>
      <Link to="/home">
        <MainLogo src={mainLogo} alt="mainLogo" />
      </Link>
      <UserSearchBarContainer
        onClick={() => setModalState({ ...modalState, searchUser: true })}
      >
        <IconSearch />
        <input type="text" placeholder="사용자 검색" readOnly />
      </UserSearchBarContainer>
    </>
  );
};

const UserSearchModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{
    isProgress: boolean;
    users: SearchedUser[];
  }>({ isProgress: false, users: [] });

  const modal = React.useRef<HTMLDivElement>(null);
  const inputBox = React.useRef<HTMLInputElement>(null);

  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalState({ ...modalState, searchUser: false });
  };

  const onChangeInput = (e: any) => {
    setInput(e.target.value);
    setResults({ isProgress: true, users: [] });
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);
    inputBox.current?.focus();

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await fetchApi.searchUsers(input);
      setResults({ isProgress: false, users });
    }, 750);

    return () => clearTimeout(fetchJob);
  }, [input]);

  return (
    <UserSearchModalContainer className="no-drag" ref={modal}>
      <ModalHeader>
        <HoverRound
          onClick={(e) => {
            e.stopPropagation();
            closeModal(e, true);
          }}
        >
          <MdArrowBack />
        </HoverRound>
        <SearchBarContainerModal>
          <StyledInput
            type="text"
            placeholder="사용자 검색"
            value={input}
            onChange={onChangeInput}
            ref={inputBox}
          />
        </SearchBarContainerModal>
      </ModalHeader>
      <SearchModalBody>
        {results.isProgress ? (
          <p>검색 중...</p>
        ) : results.users.length === 0 ? (
          <p>결과 없음</p>
        ) : (
          results.users.map((result) => (
            <UserCard key={result.idx} user={result} />
          ))
        )}
      </SearchModalBody>
    </UserSearchModalContainer>
  );
};

export { UserSearchBar, UserSearchModal };
