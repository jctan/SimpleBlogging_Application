import { FETCH_POSTS, FETCH_POST } from '../actions/index';

//all - list of post
//post - single post
const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action){ //only care about action.payload.data for axios 
	switch(action.type){
		case FETCH_POST:
			return{ ...state, post: action.payload.data }
		case FETCH_POSTS:
			return { ...state, all: action.payload.data } //take whatever is on our current state (...state) and add on all action.payload.data
		default:
			return state;
	}
}