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
} from "reactstrap";
import { CommentProps } from "../types/type";
import CommentInput from "./CommentInput";

const CommentList = (props: CommentProps) => {
  return (
	<div>
	  <Card style={{padding: "10px"}}>
		<h4>Create Comment</h4>
		<CommentInput postid={props.postid} data={props.data} />
		<hr/>
		<h4>Comments</h4>
		{props.data.map((c, i) => (
          <Card key={i} style={{margin: "10px"}}>
			<CardHeader>
              {c.username}
			</CardHeader>
			<CardBody>
			  <CardText>
				<pre>
				  {c.content}
				</pre>
			  </CardText>
			</CardBody>
          </Card>
		))}
	  </Card>
	</div>
  );
};

export default CommentList;
