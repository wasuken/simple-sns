import { useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import Router from "next/router";

import { createComment } from "../const/const";
import { useUser } from "../context/user";
import { CommentProps } from "../types/type";

const CommentInput = (props: CommentProps) => {
  const [content, setContent] = useState<string>("");
  const [reply, setReply] = useState<number>(-1);
  const { userid } = useUser();
  const { data, postid } = props;
  const handleCommentSubmit = () => {
    createComment(userid, postid, reply >= 0 ? reply : null, content);
    Router.push("/posts");
  };
  console.log(userid)
  return (
    <div>
      <InputGroup>
        <InputGroupText>リプライ先</InputGroupText>
        <Input
          type="select"
          placeholder="リプライ先"
          onChange={(e) => setReply(e.currentTarget.value)}
        >
          <option key={0} value={-1}>
            未選択
          </option>
          {data
            .filter((c) => c.user_id !== userid)
            .map((c, i) => (
              <option key={i + 1} value={c.id}>
                {c.username}
              </option>
            ))}
        </Input>
      </InputGroup>
      <InputGroup>
        <Input
          type="textarea"
          placeholder="コメントコンテンツ"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </InputGroup>
      <div>
        <Button onClick={() => handleCommentSubmit()}>投稿</Button>
      </div>
    </div>
  );
};

export default CommentInput;
