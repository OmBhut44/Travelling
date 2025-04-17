import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const summary = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const tourCount = await Tour.countDocuments();
    const reviewCount = await Review.countDocuments();

    res.status(200).json({
      users: userCount,
      bookings: bookingCount,
      tours: tourCount,
      reviews: reviewCount,
    });
  } catch (error) {
    console.error("Error fetching summary data:", error);
    res.status(500).json({ message: "Error fetching dashboard summary" });
  }
};


export const getUserData = async (req, res) => {
    try {
      const users = await User.find(); 

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Error fetching user data" });
    }
  };

  export const getBookingData = async (req, res) => {
    try {
      // Fetch all bookings from the Booking model
      const bookings = await Booking.find(); // You can modify the query to filter or limit the results
  
      // Send booking data to the frontend
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings data:", error);
      res.status(500).json({ message: "Error fetching bookings data" });
    }
  };


 // Controller function to get all reviews
 export const getReviewData = async (req, res) => {
   try {
     // Fetch all reviews without filtering by productId
     const reviews = await Review.find().populate('productId', 'tourName'); // Populate tourName from the Tour model
     
     if (reviews.length === 0) {
       return res.status(404).json({ message: "No reviews found" });
     }
 
     // Send the review data back to the frontend
     res.status(200).json(reviews);
   } catch (error) {
     console.error("Error fetching reviews data:", error);
     res.status(500).json({ message: "Error fetching reviews data" });
   }
 };
 

 export const getAllTours = async (req, res) => {
    try {
      const tours = await Tour.find(); // Fetch all tours
      res.status(200).json(tours);
    } catch (error) {
      console.error("Error fetching tours:", error);
      res.status(500).json({ message: "Error fetching tours" });
    }
  };

  


// Controller to get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const { tourId } = req.params; // Extract the tourId from URL parameters
    const tour = await Tour.findById(tourId).populate("reviews"); // Populate the reviews for the tour
    
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    
    res.status(200).json(tour); // Send the tour data to the frontend
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    res.status(500).json({ message: "Error fetching tour data" });
  }
};

// Controller to create a new tour
export const createTour = async (req, res) => {
  try {
    const { title, city, address, distance, photo, desc, price, maxGroupSize, featured } = req.body;

    // Create a new tour instance with the provided data
    const newTour = new Tour({
      title,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
      featured,
    });

    // Save the new tour to the database
    const savedTour = await newTour.save();

    res.status(201).json(savedTour); // Respond with the saved tour
  } catch (error) {
    console.error("Error creating tour:", error);
    res.status(500).json({ message: "Error creating tour" });
  }
};

// Controller to update an existing tour
export const updateTour = async (req, res) => {
  try {
    const { tourId } = req.params; // Get the tour ID from URL params
    const { title, city, address, distance, photo, desc, price, maxGroupSize, featured } = req.body;

    // Find the tour and update it
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      { title, city, address, distance, photo, desc, price, maxGroupSize, featured },
      { new: true } // Return the updated tour
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(updatedTour); // Respond with the updated tour
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ message: "Error updating tour" });
  }
};

// Controller to delete a tour
export const deleteTour = async (req, res) => {
  try {
    const { tourId } = req.params; // Get the tour ID from URL params

    // Delete the tour by ID
    const deletedTour = await Tour.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    console.error("Error deleting tour:", error);
    res.status(500).json({ message: "Error deleting tour" });
  }
};
