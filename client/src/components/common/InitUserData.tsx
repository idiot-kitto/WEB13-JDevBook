import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import fetchApi from 'api/fetch';

import {
  userDataStates,
  usersocketStates,
  postModalDataStates,
  solvedProblemState
} from 'recoil/store';
import { RouteComponentProps, useHistory } from 'react-router-dom';

const InitUserData = (/*{ history }: RouteComponentProps*/) => {
  const [userdata, setUserdata] = useRecoilState(userDataStates);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [solvedProblems, setSolvedProblems] =
    useRecoilState(solvedProblemState);
  //const socket = useRecoilValue(usersocketStates);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi.getuserData();
      if (error) {
        alert('비정상 접근');
        history.push('/');
      } else {
        setUserdata({
          name: data.nickname,
          idx: data.idx,
          profile: data.profile,
          cover: data.cover,
          bio: data.bio,
          login: true
        });
        setPostData({
          ...postData,
          useridx: data.idx,
          BTUseruseridx: { ...data }
        });
        setSolvedProblems(data.BTMUserProblemuseridx);
        //socket?.emit('name', data.nickname);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;
