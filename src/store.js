import { createStore } from 'redux';


export default createStore(function (state, action) {
    if (state === undefined) {
        return {
            tuser: {
                // username: "",
                // password: "",
                // age: ""
            }
        }
    }
    if (action.type === 'TEMPO') {
        return { ...state, tuser : action.tuser }
    }

}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())