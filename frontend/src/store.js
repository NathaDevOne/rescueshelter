import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { rescuesReducer, rescueDetailReducer, rescueDetailsReducer, rescueReducer, newCommentReducer, newRescueReducer, adoptRescueReducer, requestsReducer, adoptedReducer, rescuedChartReducer, adoptedChartReducer } from './reducers/rescueReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, allAdoptersReducer, newUserReducer, userDetailsReducer } from './reducers/userReducers'
import { diseasesReducer, newDiseaseReducer, diseaseDetailsReducer, diseaseReducer } from './reducers/diseaseReducers'
import { injuriesReducer, newInjuryReducer, injuryDetailsReducer, injuryReducer } from './reducers/injuryReducers'

const reducer = combineReducers({
 rescues: rescuesReducer,
 rescueDetail: rescueDetailReducer,
 rescueDetails: rescueDetailsReducer,
 rescue: rescueReducer,
 auth: authReducer,
 user: userReducer,
 forgotPassword: forgotPasswordReducer,
 newComment: newCommentReducer,

 allUsers: allUsersReducer,
 allAdopters: allAdoptersReducer,
 newUser: newUserReducer,

 userDetails: userDetailsReducer,

 diseases: diseasesReducer,
 newDisease: newDiseaseReducer,
 diseaseDetails: diseaseDetailsReducer,
 disease: diseaseReducer,

 injuries: injuriesReducer,
 newInjury: newInjuryReducer,
 injuryDetails: injuryDetailsReducer,
 injury: injuryReducer,

 newRescue: newRescueReducer,
 adoptRescue: adoptRescueReducer,
 requests: requestsReducer,
 adopted: adoptedReducer,

 rescuedChart: rescuedChartReducer,
 adoptedChart: adoptedChartReducer,
})

let initialState = {
}

const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;