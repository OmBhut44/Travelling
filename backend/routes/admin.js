import express from "express";
import { summary,getUserData,getBookingData,getReviewData } from "../controllers/adminController.js";
import { getAllTours, getTourById, createTour, updateTour, deleteTour } from '../controllers/adminController.js'; 
const router = express.Router();

router.get("/summary", summary);
router.get('/users-data', getUserData);
router.get('/bookings-data', getBookingData);
router.get('/reviews-data', getReviewData);

router.get('/tours', getAllTours);

// Route to get a single tour by ID
router.get('/tours/:tourId', getTourById);

// Route to create a new tour
router.post('/tours', createTour);

// Route to update an existing tour
router.put('/tours/:tourId', updateTour);

// Route to delete a tour
router.delete('/tours/:tourId', deleteTour);
export default router;
