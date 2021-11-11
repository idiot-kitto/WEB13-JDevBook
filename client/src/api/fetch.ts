import { PostData, PostAddData, PostUpdateData } from 'utils/types';

const fetchApi = {
  getLoginlink: async (): Promise<string> => {
    const loginLinkRes: Response = await fetch('/oauth/login');
    return await loginLinkRes.json();
  },
  getuserData: async () => {
    // { data, error }
    const userDataRes: Response = await fetch('/api/data');
    return await userDataRes.json();
  },
  logout: async () => {
    const logoutRes: Response = await fetch('/oauth/logout');
    const { message } = await logoutRes.json();
    alert(message);
  },
  searchUsers: async (keyword: string) => {
    const usersRes: Response = await fetch(`/api/users?keyword=${keyword}`);
    return await usersRes.json();
  },

  getAllUsers: async () => {
    const allusersRes: Response = await fetch('/api/allUsers');
    return await allusersRes.json();
  },

  getPosts: async (lastIdx: number, count: number): Promise<PostData[]> => {
    const response = await fetch(
      `/api/posts?lastIdx=${lastIdx}&count=${count}`
    );
    return await response.json();
  },

  addPosts: async (postData: PostAddData) => {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    return await response.json();
  },

  updatePosts: async (postIdx: number, postUpdateData: PostUpdateData) => {
    const response = await fetch(`/api/posts/${postIdx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postUpdateData)
    });
    return await response.json();
  },

  deletePosts: async (postIdx: number) => {
    const response = await fetch(`/api/posts/${postIdx}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};

export default fetchApi;
