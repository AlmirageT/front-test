import axios from '../config/axios-config'

export async function handleLogin(email, password){
    try {
        const userData = {
            email: email,
            password: password
        }
        const response = await axios.post(`api/login`, userData)
        if(response.status === 200){
            localStorage.setItem('token', JSON.stringify(`Bearer ${response.data.token}`))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('isLoggedIn', true)
            return response
        }else{
            return response
        }
        
    } catch (error) {
        console.log(error)
    }
}

export async function handleLogOut(){
    try {
        const response = await axios.post(`api/logout`)
        if(response.status === 200){
            return response
        }else{
            return response
        }
    } catch (error) {
        console.log(error)
    }
}