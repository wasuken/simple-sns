import { useState, useEffect } from "react";
import Router from "next/router";
import axios, { AxiosResponse } from "axios";
import {
  InputGroup,
  InputGroupText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { usePostPage } from "../context/post";
import PostList from "../componet/PostList";
import PostInput from "../componet/PostInput";
import { listPost } from "../const/const";
import { PostItem } from "../types/type";

axios.defaults.withCredentials = true;

export default function PostPage() {
  const [items, setItems] = useState<PostItem[]>([]);

  useEffect(() => {
    listPost().then((data) => {
      setItems(data);
    });
  }, []);

  if (items === undefined) return <p>Fetching...</p>;

  return (
    <div className="container shadow-lg p-3 mb-5 mt-3 bg-body rounded">
	  <div id="modal-root"></div>
	  <PostInput />
      <PostList data={items} />
    </div>
  );
}
