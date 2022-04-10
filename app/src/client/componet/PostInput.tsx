import { useState } from "react";
import Modal from "react-modal";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Router from "next/router";

import { createPost } from "../const/const";
import { useUser } from "../context/user";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Modal.setAppElement("#modal-root");

export default function PostInput() {
  const { userid } = useUser();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const afterOpenModal = () => {
    setTitle("");
    setContent("");
  };
  const postSubmit = () => {
    createPost(userid, title, content)
	  .then((res) => {
		Router.push("/posts");
	  });

  };

  return (
    <div className="container">
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Create Post
      </button>
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Create Post"
      >
        <div>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <Input
              id="content"
              type="textarea"
              placeholder="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </FormGroup>
          <button className="btn btn-primary" onClick={() => postSubmit()}>submit</button>
          <button className="btn btn-outline-primary" onClick={() => setModalOpen(false)}>cancel</button>
        </div>
      </Modal>
    </div>
  );
}
