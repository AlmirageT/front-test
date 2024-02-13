const intialState = {
    isLoggedIn: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('isLoggedIn')): false,
    user: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('user')): null,
    token: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('token')): null
}

const loginReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_ISLOGGEDIN':
            return {
                ...state,
                isLoggedIn: action.payload
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'LOG_OUT':
            localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token:  null
            }
        default:
            return state;
    }
}

export default loginReducer;