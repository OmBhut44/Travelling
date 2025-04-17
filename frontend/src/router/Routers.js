import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import Dashboard from "../admin/Dasgboard"
import UsersPage from '../admin/Users'
import BookingPage from '../admin/Booking'
import ReviewsPage from '../admin/Review'
import Tour from '../admin/Tours'
import TourDetailsPage from '../admin/TourDetail'
import CreateTourPage from '../admin/CreateTour'
import UpdateTourPage from '../admin/UpdateTour'

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/admin/' element={<Dashboard/>}/>
         <Route path='/admin/users' element={<UsersPage/>}/>
         <Route path='/admin/bookings' element={<BookingPage/>}/>
         <Route path='/admin/tours' element={<Tour/>}/>
         <Route path='/admin/reviews' element={<ReviewsPage/>}/>
      <Route path="/admin/tour/:tourId" component={TourDetailsPage} />
      <Route path="/create-tour" component={CreateTourPage} />
      <Route path="/edit-tour/:tourId" component={UpdateTourPage} />
      </Routes>
   )
}

export default Routers