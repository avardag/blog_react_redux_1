import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';


import {fetchPost, deletePost} from '../actions'

class PostsShow extends Component{
  
  componentDidMount(){
    const id = this.props.match.params.id; // match.params is from React Router
    this.props.fetchPost(id);
    
  }
  
  onDeleteClick(){
    const id = this.props.match.params.id; // match.params is from React Router
    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
  }
  
  //RENDER METHOD
  render(){
    const {post} = this.props;
    
    
    
    if (!post){
      return <div>LOADING .....</div>
    }
    
    //RETURN
    return(
      <div>
        <Link to="/" className="btn btn-primary">Back to Posts List</Link>
        <button
          className="btn btn-danger pull-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return { post: state.posts[ownProps.match.params.id] }
}


export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);