import { createStore } from 'redux';
import { Reducer, initialState } from './reducer'


export const ConfigureStore = createStore(
    Reducer, // reducer
    initialState, // our initialState
);



