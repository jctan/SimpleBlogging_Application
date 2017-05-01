import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index'; //action creator we want to call inside of componentWillMount
import { Link } from 'react-router'; //Link is an actual Component. 

class PostsIndex extends Component {

	//a lifecycle method. when it's about to be re-rendered to the DOM for the first time once, it fetch its data.
	componentWillMount(){
		this.props.fetchPosts();
	}

	renderPosts(){
		return this.props.posts.map((post) => { //for each post, reach an li
			return( 
				<li className="list-group-item" key={post.id}>
					<Link to={"posts/" + post.id}>
						<span className="pull-xs-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</Link>
				</li>
			);
		});
	}

	render(){
		return(
			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { posts: state.posts.all };
}

// map dispatch to props /
// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ fetchPosts }, dispatch);
// } 
//same as { fetchPosts: fetchPosts } - ES5
// { fetchPosts } - ES6

// null because you dont have a state you want to map over to props.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

