import { combineReducers } from 'redux';

import {setConfig} from './AppInit'
import Login from './Login.reducer';
import Operations from './Operation.reducer'
import Assets from './Assets.reducer';
import Documents from './Documents.reducer';

let rootReducer = combineReducers({
    config: setConfig,
    login: Login,
    operations: Operations,
    assets: Assets,
    documents: Documents
});

export default rootReducer;