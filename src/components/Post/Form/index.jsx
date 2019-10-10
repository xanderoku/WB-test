import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      author: "",
      createdAt: "",
      id: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.postToEdit &&
      this.props.postToEdit !== prevProps.postToEdit
    ) {
      this.setState({
        title: this.props.postToEdit.title,
        body: this.props.postToEdit.body,
        author: this.props.postToEdit.author
      });
    } else return null;
  }

  handleSubmit() {
    const { onSubmit, postToEdit, onEdit } = this.props;
    const { title, body, author } = this.state;

    if (!postToEdit) {
      const createdAt = new Date();
      const id = uuid();
      const data = {
        title,
        body,
        author,
        createdAt,
        id
      };
      onSubmit(data);
      this.formReset();
    } else {
      const { id, createdAt } = this.props.postToEdit;
      const data = {
        title,
        body,
        author,
        id,
        createdAt
      };
      onEdit(data);
      this.formReset();
    }
  }

  formReset() {
    this.setState({
      title: "",
      body: "",
      author: ""
    });
  }

  handleChangeField(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
    const { title, body, author } = this.state;
    const submitEnabled =
      title.length > 0 && body.length > 0 && author.length > 0;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={e => this.handleChangeField("title", e)}
          value={title}
          className="form-control my-3 btn-outline-info"
          placeholder="Title"
        />
        <textarea
          onChange={e => this.handleChangeField("body", e)}
          className="form-control my-3 btn-outline-info"
          placeholder="Text"
          value={body}
        ></textarea>
        <input
          onChange={e => this.handleChangeField("author", e)}
          value={author}
          className="form-control my-3 btn-outline-info"
          placeholder="Author"
        />
        <button
          disabled={!submitEnabled}
          onClick={this.handleSubmit}
          className="btn btn-info float-right"
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: "SUBMIT_POST", data }),
  onEdit: data => dispatch({ type: "EDIT_POST", data })
});

const mapStateToProps = state => ({
  postToEdit: state.home.postToEdit
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
