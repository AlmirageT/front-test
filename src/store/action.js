export const setTokens = (token) => ({
    type: 'SET_TOKEN',
    token
})

export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_ISLOGGEDIN',
    payload: isLoggedIn
})

export const setUser = (user) => ({
    type: 'SET_USER',
    user
})

export const setLogOut = () => ({
    type: 'LOG_OUT'
})

export const setAllPosts = (posts) => ({
    type: 'SET_POSTS',
    posts
})

export const setUserPosts = (posts) => ({
    type: 'SET_USER_POSTS',
    posts
})

export const setUpdatePostUser = (posts) => ({
    type: 'SET_USER_POSTS_EDIT',
    posts
})

export const setCreateUserPosts = (posts) => ({
    type: 'SET_NEW_USER_POSTS',
    posts
}) 

export const setDeleteUserPosts = (postId) => ({
    type: 'SET_DELETE_USER_POSTS',
    postId
})

export const setLang = (value) => ({
    type: 'SET_LANG',
    value
})