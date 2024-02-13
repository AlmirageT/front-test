const intialState = {
    dataPosts: [],
    dataUserPosts: [] 
}

const loginReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                dataPosts: action.posts
            }
        case 'SET_USER_POSTS':
            return {
                ...state,
                dataUserPosts: action.posts
            }
        case 'SET_USER_POSTS_EDIT':
            return {
                ...state,
                dataPosts: state.dataPosts.map(post => post.id === action.posts.id ? post = action.posts : post),
                dataUserPosts: state.dataUserPosts.map(post => post.id === action.posts.id ? post = action.posts : post)
            }
        case 'SET_USER_POSTS_DELETE':
            return {
                ...state
            }
        case 'SET_NEW_USER_POSTS':
            return {
                ...state,
                dataPosts: [... state.dataPosts, action.posts],
                dataUserPosts: [...state.dataUserPosts, action.posts]
            }
        case 'SET_DELETE_USER_POSTS':
            return {
                ...state,
                dataPosts: state.dataPosts.filter(post => post.id !== action.postId),
                dataUserPosts: state.dataUserPosts.filter(post => post.id !== action.postId)
            }
        default:
            return state;
    }
}

export default loginReducer;