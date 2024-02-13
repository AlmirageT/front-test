import { setTokens, setIsLoggedIn, setUser, setLogOut } from "../action";
import { handleLogin, handleLogOut } from '../../api/loginApi'

export const login = (email, password) => (dispatch) => {
    return handleLogin(email, password).then((response) => {
        if(response.status === 200){
            dispatch(setTokens(`Bearer ${response.data.token}`))
            dispatch(setIsLoggedIn(true))
            dispatch(setUser(response.data.user))
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const logOut = () => (dispatch) => {
    return handleLogOut().then((response) => {
        if(response.status === 200){
            dispatch(setLogOut())
            dispatch(setIsLoggedIn(false))
        }
    }).catch((error) => {
        console.log(error)
    })
}