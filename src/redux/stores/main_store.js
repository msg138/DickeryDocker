import { createStore } from 'redux'
import * as Reducer from '../reducers/main_reducer'

/**
 * Auth Store
 */
const AuthStore = createStore(Reducer.AuthReducer);

/**
 * Container Store
 */
const ContainerStore = createStore(Reducer.ContainerReducer);

/**
 * Image Store
 */
const ImageStore = createStore(Reducer.ImageReducer);

export default {
    AuthStore,
    
    ContainerStore,
    
    ImageStore
}
