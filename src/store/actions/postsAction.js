import { setAllPosts, setUserPosts, setUpdatePostUser, setCreateUserPosts, setDeleteUserPosts } from "../action";
import { getPosts, getPostsForUser, updatePostUser, deletePostUser, createPostUser } from '../../api/postsApi'

export const getPostsApi = () => (dispatch) => {
    return getPosts().then((response) => {
        if(response.status === 200){
            dispatch(setAllPosts(response.data.data))
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const getPostsForUserApi = () => (dispatch) => {
    return getPostsForUser().then((response) => {
        if(response.status === 200){
            dispatch(setUserPosts(response.data.data))
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const updatePost = (id, data) => (dispatch) => {
    return updatePostUser(id, data).then((response) => {
        if(response.status === 200){
            dispatch(setUpdatePostUser(response.data.data))
        }
    }).catch((error) => {
        console.log(error)
    })
}
export const deletePost = (id) => (dispatch) => {
    return deletePostUser(id).then((response) => {
        if(response.status === 200){
            dispatch(setDeleteUserPosts(id))
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const createPostAction = (data) => (dispatch) => {
    return createPostUser(data).then((response) => {
        if(response.status === 200){
            dispatch(setCreateUserPosts(response.data.data))
        }
    })
}