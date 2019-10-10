import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { Form } from "../../components/Post";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEdit(post) {
    const { setEdit } = this.props;
    setEdit(post);
  }

  handleDelete(id) {
    const { onDelete } = this.props;
    onDelete(id);
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">WB-blog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {posts.map((post) => {
              return (
                <div key={post.id} className="card my-3">
                  <div className="card-header">{post.title}</div>
                  <div className="card-body">
                    {post.body}
                    <p className="mt-5 text-muted">
                      <b>{post.author}</b>{" "}
                      {moment(new Date(post.createdAt)).fromNow()}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button onClick={() => this.handleEdit(post)} className="btn btn-primary mx-3 btn-sm">
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(post.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.home.posts
});

const mapDispatchToProps = dispatch => ({
    onDelete: id => dispatch({ type: 'DELETE_POST', id }),
    setEdit: post => dispatch({ type: 'SET_EDIT', post })
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

