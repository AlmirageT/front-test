import {setLang} from '../action'

export const setLangAction = (value) => (dispatch) => {
    const lang = value.toString();
    dispatch(setLang(value))
    localStorage.setItem('lang', lang)
}