import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useSelector } from 'react-redux'
import store from './store'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import RescueDetails from './components/rescue/RescueDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

import Dashboard from './components/admin/Dashboard'
import RescuedCharts from './components/admin/RescuedCharts'
import AdoptedCharts from './components/admin/AdoptedCharts'

import RescuesList from './components/admin/RescuesList'

import NewRescue from './components/admin/NewRescue'
import UpdateRescue from './components/admin/UpdateRescue'
import RequestsList from './components/admin/RequestsList'

import AdoptedRescues from './components/adopter/AdoptedRescues'

import NewUser from './components/admin/NewUser'
import UsersList from './components/admin/UsersList'
import AdoptersList from './components/admin/AdoptersList'
import UpdateUser from './components/admin/UpdateUser'
import UpdateAdopter from './components/admin/UpdateAdopter'

import NewDisease from './components/admin/NewDisease'
import DiseasesList from './components/admin/DiseasesList'
import UpdateDisease from './components/admin/UpdateDisease'


import NewInjury from './components/admin/NewInjury'
import InjuriesList from './components/admin/InjuriesList'
import UpdateInjury from './components/admin/UpdateInjury'

import { loadUser } from './actions/userActions'

import ProtectedRoute from './components/route/ProtectedRoute'

function App() {
	useEffect(() => {
	    store.dispatch(loadUser())
	}, [])
	const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  	return (
	  	<Router>
		    <div className="App">
		    	<Header />
		    	<Routes>
		    		<Route path="/" element={<Home />} exact="true" />
		    		<Route path="/search/:keyword" element={<Home />} exact="true" />
		    		<Route path="/rescue/:id" element={<RescueDetails />} exact="true" />
		    		<Route path="/login" element={<Login />} exact="true" />
		    		<Route path="/register" element={<Register />} exact="true" />
		    		<Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
		    		<Route path="/password/reset/:token" element={<NewPassword />} exact="true" />

		    		{/*<Route path="/dashboard" element={<Dashboard />} exact="true" />*/}

		    		<Route path="/me" element={
			            <ProtectedRoute>
			              <Profile />
			            </ProtectedRoute> } exact="true" />

		    		<Route path="/me/update" element={
			            <ProtectedRoute>
			              <UpdateProfile />
			            </ProtectedRoute> } exact="true" />

			        <Route path="/password/update" element={
	                    <ProtectedRoute >
	                        <UpdatePassword />
	                    </ProtectedRoute> } exact="true" />

	                <Route path="/adopteds" element={
	                    <ProtectedRoute >
	                        <AdoptedRescues />
	                    </ProtectedRoute> } exact="true" />    

	                <Route
			          path="/dashboard"
			          element={
			            <ProtectedRoute >
			              <Dashboard />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/rescuedcharts"
			          element={
			            <ProtectedRoute >
			              <RescuedCharts />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/adoptedcharts"
			          element={
			            <ProtectedRoute >
			              <AdoptedCharts />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/rescues"
			          element={
			            <ProtectedRoute >
			              <RescuesList />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/rescue"
			          element={
			            <ProtectedRoute >
			              <NewRescue />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/rescue/:id"
			          element={
			            <ProtectedRoute >
			              <UpdateRescue />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/diseases"
			          element={
			            <ProtectedRoute >
			              <DiseasesList />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/disease"
			          element={
			            <ProtectedRoute >
			              <NewDisease />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/disease/:id"
			          element={
			            <ProtectedRoute >
			              <UpdateDisease />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/injuries"
			          element={
			            <ProtectedRoute >
			              <InjuriesList />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/injury"
			          element={
			            <ProtectedRoute >
			              <NewInjury />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/injury/:id"
			          element={
			            <ProtectedRoute >
			              <UpdateInjury />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/users"
			          element={
			            <ProtectedRoute >
			              <UsersList />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/user"
			          element={
			            <ProtectedRoute >
			              <NewUser />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/user/:id"
			          element={
			            <ProtectedRoute >
			              <UpdateUser />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/adopters"
			          element={
			            <ProtectedRoute >
			              <AdoptersList />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/adopter/:id"
			          element={
			            <ProtectedRoute >
			              <UpdateAdopter />
			            </ProtectedRoute>
			          }
			        />

			        <Route
			          path="/admin/requests"
			          element={
			            <ProtectedRoute >
			              <RequestsList />
			            </ProtectedRoute>
			          }
			        />

		    	</Routes>
		    	{!loading && (!isAuthenticated || user.role === 'Adopter' ) && (
          			<Footer />
          		)}
		    </div>
		</Router>
  	);
}

export default App;