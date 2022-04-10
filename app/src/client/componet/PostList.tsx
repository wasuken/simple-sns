import { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Button,
  Collapse,
} from "reactstrap";
import { PostListProps } from "../types/type";
import CommentList from "./CommentList";

const PostList = (props: PostListProps) => {
  const [opens, setOpens] = useState<number[]>([]);
  const toggleOpen = (i: number) => {
    if (opens.includes(i) === true) {
      setOpens(opens.filter((x) => x !== i));
    } else {
      setOpens([...opens, i]);
    }
  };
  return (
    <div className="container">
      <h2>Posts</h2>
      {props.data.map((p, i) => (
        <Card key={i}>
          <CardHeader onClick={() => toggleOpen(i)}>
            {p.title} (posted by: {p.username})
          </CardHeader>
          <Collapse isOpen={opens.includes(i) === true}>
            <CardBody>
              <CardText>
				<pre>
				  {p.content}
				</pre>
			  </CardText>
              <CardText>
                <CommentList data={p.comments} postid={p.id} />
              </CardText>
            </CardBody>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
