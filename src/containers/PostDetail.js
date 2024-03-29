import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useFetch, history } from "../helpers";

const DeleteModal = ({ title, postSlug, thumbnail }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    axios
      .delete(api.posts.delete(postSlug), {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "686b3d89c3de1336cd587e67e05c355d78d048e2",
        },
      })
      .then((res) => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err);
      });
  }

  const [open, toggle] = useState(false);
  return (
    <Modal
      trigger={
        <Button secondary floated="right" onClick={() => toggle(true)}>
          Delete post
        </Button>
      }
      open={open}
      onClose={() => toggle(false)}
      size="small"
    >
      <Modal.Header>Delete post</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={thumbnail} />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error} />}
          <p>Are you sure you want to delete this post?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggle(false)}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Confirm delete"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

const Blockquote = (props) => {
  return <blockquote>{props.value ? props.value : props.children}</blockquote>;
};

const Renderers = {
  blockquote: Blockquote,
};

const PostDetail = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));
  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as="h1">{data.title}</Header>
          <Header as="h4">
            Last updated:{" "}
            {`${new Date(data.last_update).toLocaleDateString()}`}
          </Header>
          <ReactMarkdown children={data.content} renderers={Renderers} />
          <Divider />
          <DeleteModal
            postSlug={postSlug}
            title={data.title}
            thumbnail={data.thumbnail}
          />
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
