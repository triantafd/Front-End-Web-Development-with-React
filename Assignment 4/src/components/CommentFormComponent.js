import React, { Component } from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isCommentFormModalOpen: false
    };

    this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
    this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
  }

  handleCommentFormSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleCommentFormModal() {
    this.setState({
      isCommentFormModalOpen: !this.state.isCommentFormModalOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleCommentFormModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        {/* commentform  Modal */}
        <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
          <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>
              {/* rating */}
              <Row className="form-group">
                <Label htmlFor="rating" xs={12}>Rating</Label>
                <Col xs={12}>
                  <Control.select model=".rating"
                    className="form-control"
                    name="rating"
                    id="rating"
                    validators={{
                      required
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: 'Required.',
                    }}
                  />
                </Col>
              </Row>
              {/* author */}
              <Row className="form-group">
                <Label htmlFor="author" xs={12}> Your Name </Label>
                <Col xs={12}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required.',
                      minLength: 'Must be greater than 2 characters.',
                      maxLength: 'Must be 15 characters or less.'
                    }}
                  />
                </Col>
              </Row>
              {/* comment */}
              <Row className="form-group">
                <Label htmlFor="comment" xs={12}>Comment</Label>
                <Col xs={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: 'Required.',
                    }}
                  />
                </Col>
              </Row>
              {/* submit button */}
              <Row className="form-group">
                <Col xs={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;