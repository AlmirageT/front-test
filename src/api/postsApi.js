import axios from '../config/axios-config'

export async function getPosts(){
    try {
        const response = await axios.get(`api/get-posts`)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}
export async function getPostsForUser(){
    try {
        const response = await axios.get(`api/get-user-posts`)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}
export async function updatePostUser(id, data){
    try {
        const response = await axios.patch(`api/posts/${id}`, data)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}
export async function deletePostUser(id){
    try {
        const response = await axios.delete(`api/posts/${id}`)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}


export async function createPostUser(data){
    try {
        const response = await axios.post(`api/posts`, data)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}
