import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	//define context type properties
	static contextTypes = {
		router: PropTypes.object //want access to this property from parent component and pull onSubmit action from seperate helper function
	};

	//has a callback function createPost that has a reference to this.
	onSubmit(props){
		this.props.createPost(props)
			.then(() => {
				//blog post has been created, navigate the user to the index
				//we navigate by calling this.context.router.push with the 
				//new path to navigate to.
				this.context.router.push('/');
			 });
	}

	render(){
		const { fields: {title, categories, content}, handleSubmit } = this.props;
		//const handleSubmit = this.props.handleSubmit; - same thing
		// const title = this.props.fields.title; - same thing

		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				<div className={`form-group ${ title.touched && title.invalid ? 'has-danger' : '' }`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${ categories.touched && categories.invalid ? 'has-danger' : '' }`} >
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${ content.touched && content.invalid ? 'has-danger' : '' }`}>
					<label>Content</label>
					<textarea className="form-control" {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values){
	const errors = {};

	if(!values.title){
		errors.title = 'Enter a username';
	}
	if(!values.categories){
		errors.categories = 'Enter categories';
	}
	if(!values.content){
		errors.content = 'Enter some content';
	}
	return errors;
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// pull that level of state from the component level back up to the application level/
//basically setting in new values to application state. 
export default reduxForm({
	form: 'PostsNewForm', //just needs to be some unique token
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew);
