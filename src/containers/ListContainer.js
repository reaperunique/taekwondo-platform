import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List} from '../components';
import {
  listPostRequest,
  editPostRequest,
  deletePostRequest
} from '../actions/post';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.listPostRequest();
  }

  handleEdit(id, title, contents, index) {
    return this.props.editPostRequest(id, title, contents, index).then(() => {
      if(this.props.edit.status === 'SUCCESS') {
        this.props.listPostRequest();
        alert('Your post is updated successfully.');
        return true;
      } else {
        alert('An error occured while your post is updated.');
        return false;
      }
    });
  }

  handleDelete(id) {
    return this.props.deletePostRequest(id).then(() => {
      if(this.props.delete.status === 'SUCCESS') {
        this.props.listPostRequest();
        alert('Your post is deleted successfully.');
        return true;
      } else {
        alert('An error occured while your post is deleted.');
        return false;
      }
    });
  }

  render() {
    return(
      <List
        posts={this.props.list.data}
        currentUser={this.props.currentUser}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    );
  }
}

const mapStateToProps = (state) => {
  // currentUser is appropriate to download from the top-level component
  // once it is down to the List Component
  return {
    list: state.post.list,
    edit: state.post.edit,
    delete: state.post.delete,
    currentUser: state.navigation.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listPostRequest: () => {
      return dispatch(listPostRequest());
    },
    editPostRequest: (id, title, contents, index) => {
      return dispatch(editPostRequest(id, title, contents, index));
    },
    deletePostRequest: (id) => {
      return dispatch(deletePostRequest(id));
    }
  };
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ListContainer);
