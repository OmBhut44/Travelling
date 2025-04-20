import React, { useState, useContext, useEffect } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  })

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const serviceFee = 10
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

  const handleClick = async e => {
    e.preventDefault()

    if (!user || user === undefined || user === null) {
      return alert('Please sign in')
    }

    const amountToPay = totalAmount * 100 // Razorpay uses smallest currency unit

    const options = {
      key: 'rzp_test_zHhNFsppG7bIjH', // replace with your Razorpay test key
      amount: amountToPay,
      currency: 'INR',
      name: 'Tours & Travels',
      description: `Booking for ${title}`,
      handler: function (response) {
        console.log('Payment successful', response)

        // Optional: Save booking to backend after payment success
        // For now, just navigate to thank you
        navigate('/thank-you')
      },
      prefill: {
        name: booking.fullName,
        email: booking.userEmail,
        contact: booking.phone,
      },
      theme: {
        color: '#0b5ed7',
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className='booking'>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className='ri-star-fill' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder='Full Name'
              id='fullName'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder='Phone'
              id='phone'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input
              type="date"
              id='bookAt'
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder='Guest'
              id='guestSize'
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Booking Summary */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>
              ${price} <i className='ri-close-line'></i> {booking.guestSize} person
            </h5>
            <span>${price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button
          className='btn primary__btn w-100 mt-4'
          onClick={handleClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}

export default Booking
