import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount(){
		//id comes from URL and pass it to fetchPost and it makes a backend request
		//and reducer picks up the data. 
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick(){
		this.props.deletePost(this.props.params.id)
			.then(() => {
				this.context.router.push('/');
			 });
	}

	render(){
		const { post } = this.props; 
		//const post = this.props.post; -- same

		if(!this.props.post){
			return <div>Loading...</div>
		}

		return (
			<div>
				<Link to="/">Back To Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categoris: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

//create mapStateToProps to pull data out from props and re-render to this PostsShow Component/
function mapStateToProps(state){
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);