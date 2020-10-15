import {takeEvery} from 'redux-saga/effects'
import * as actionTypes from './actions'
import {initCountries} from './saga'

export function* watchCountries() {
    yield takeEvery(actionTypes.INIT_COUNTRIES, initCountries)
}