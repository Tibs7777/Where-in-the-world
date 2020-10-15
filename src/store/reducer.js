import * as actionTypes from './actions'

const initialState = {
    falseCountries: null
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case(actionTypes.SET_FALSE_COUNTRIES):
        return {
            ...state,
            falseCountries: action.falseCountries
        }
        default: return state
    }
}

export default reducer
