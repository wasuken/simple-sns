import axios, { AxiosResponse } from "axios";

export interface HeaderProps {
  login: boolean;
}
export interface UserInfo {
  login: boolean;
  setLogin: (v: boolean) => void;
  token: string;
  setToken: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  profile: string | null;
  setProfile: (v: string) => void;
}
export interface User {
  id: number | undefined;
  login: boolean;
  name: string;
  email: string;
}
export const initUserState: User = {
  id: undefined,
  login: false,
  name: "",
  email: "",
};
export const initUserInfoState: UserInfo = {
  login: false,
  setLogin: (v: boolean) => {
    v;
  },
  name: "",
  setName: (v: string) => {
    v;
  },
  token: "",
  setToken: (v: string) => {
    v;
  },
  profile: "",
  setProfile: (v: string) => {
    v;
  },
  userid: "",
  setUserid: (v: string) => {
    v;
  },
};

export interface CommentItem {
  id: number;
  user_id: number;
  username: string;
  content: string;
}

export interface PostItem {
  title: string;
  username: string;
  user_id: number;
  content: string;
  comments: Comment[];
}

export interface PostListProps {
  data: PostItem[];
}

export interface CommentProps {
  data: CommentItem[];
  postid: number;
}

export interface PostPageState {
  createPost: (userid: number, content: string) => Promise<PostItem>;
  deletePost: (postid: number) => Promise<PostItem>;
  listPost: () => Promise<PostItem[]>;
  createComment: (
    userid: number,
    postid: number,
    parent_postid: number | undefined,
    content: string
  ) => Promise<CommentItem>;
  listComment: (postid: number) => Promise<CommentItem[]>;
}

export const initPostPageState: PostPageState = {
  createPost: (userid: number, content: string) => {
    axios
      .get("http://wasu-arch:8888/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .post("http://wasu-arch:8888/api/post")
          .then((resp: AxiosResponse<PostItem>) => {
            if (resp.data.error) {
            }
          });
      });
  },
  deletePost: (postid: number) => new Promise<PostItem>(),
  listPost: () => {
    return axios
      .get("http://wasu-arch:8888/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .get("http://wasu-arch:8888/api/posts")
          .then((res: AxiosResponse<PostItem[]>) => res.data);
      });
  },
  createComment: (
    userid: number,
    postid: number,
    parent_postid: number | undefined,
    content: string
  ) => new Promise<CommentItem>(),
  listComment: (postid: number) => new Promise<CommentItem[]>(),
};
