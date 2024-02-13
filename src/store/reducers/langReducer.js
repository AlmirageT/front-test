const intialState = {
    lang: typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : 'es',
}

const langReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return {
                ...state,
                lang: action.value
            }
        default:
            return state;
    }
}

export default langReducer;