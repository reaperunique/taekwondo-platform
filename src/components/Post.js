import React from 'react';
import {Button} from 'semantic-ui-react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    // Parent can pass object, efficient question
    this.props.onShow(this.props.data, this.props.index);
  }

  render() {
    return(
      <div className="Post">
        <Button color='green' onClick={this.handleShow}>
          {this.props.data.title}
        </Button>
      </div>
    );
  }
}

Post.propTypes = {
  data: React.PropTypes.object,
  onShow: React.PropTypes.func
};

Post.defaultProps = {
  data: {
    _id: 'id012345',
    title: 'title',
    contents: 'contents',
    author: {
      _id: 'id012345',
      name: 'name',
      email: 'email'
    }
  },
  index: 0,
  onShow: () => {
    console.log('onShow not defined');
  }
};

export default Post;
