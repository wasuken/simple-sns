import axios, { AxiosResponse } from "axios";

export const createPost = (userid: number, title: string, content: string) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    )
    .then(() => {
      const postData = {
        userid,
        content,
		title,
      };
      return axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/post`,
          postData
        )
        .then((resp: AxiosResponse<PostItem>) => {
          return resp.data;
        });
    });
};

export const deletePost = (postid: number) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    )
    .then(() => {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/post?id=${postid}`
        )
        .then((resp: AxiosResponse<PostItem>) => {
          return resp.data;
        });
    });
};

export const listPost = () => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    )
    .then(() => {
      return axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/posts`,
          { withCredentials: true }
        )
        .then((res: AxiosResponse<PostItem[]>) => {
          console.log(res.data);
          return res.data;
        });
    });
};
export const createComment = (
  user_id: number,
  post_id: number,
  parent_comment_id: number | null,
  content: string
) => {
  const postData = {
    user_id,
    post_id,
    parent_comment_id,
    content,
  };
  axios
  .get(
    `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
  {
        withCredentials: true,
      }
    )
    .then(() => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/comment`,
          postData
        )
        .then((resp: AxiosResponse<CommentItem>) => {
          return resp.data;
        });
    });
};
export const listComment = (postid: number) => {
  axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
      }
    )
    .then(() => {
      axios
        .post(`http://wasu-arch:8888/api/comments?id=${postid}`)
        .then((resp: AxiosResponse<CommentItem>) => {
          return resp.data;
        });
    });
};

export const noLoginPathList = ["/login", "/register"];
