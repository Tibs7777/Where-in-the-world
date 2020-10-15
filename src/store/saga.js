import {put} from 'redux-saga/effects'
import * as actionTypes from './actions'


export function* initCountries(action) {

    let fetchedCountries = yield action.falseCountries.map(country => {
        return {
            ...country,
            full: false
        }
    })
    yield put({type: actionTypes.SET_FALSE_COUNTRIES, falseCountries: fetchedCountries})
}