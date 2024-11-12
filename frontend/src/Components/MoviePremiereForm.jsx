import '../styles/MoviePremiereForm.css'
const MoviePremiereForm = () => {
//   const movieTitle = [{}];


  return (
    <div className="form-page">
        <div className="premiere-form-container">
            <h2>Movie Premiere Registration</h2>
            
            <form action="#" method="post">
            {/* Attendee Information */}
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="contact">Contact Number</label>
            <input type="tel" id="contact" name="contact" required />

            {/* Premiere Details */}
            <label htmlFor="movie">Select Movie</label>
            <select id="movie" name="movie" required>
                <option value="">Choose a movie</option>
                <option value="movie1">Movie Title 1</option>
                <option value="movie2">Movie Title 2</option>
                <option value="movie3">Movie Title 3</option>
            </select>

            <label htmlFor="showtime">Preferred Showtime</label>
            <select id="showtime" name="showtime" required>
                <option value="">Select showtime</option>
                <option value="5pm">5:00 PM</option>
                <option value="7pm">7:00 PM</option>
                <option value="9pm">9:00 PM</option>
            </select>

            {/* Additional Information */}
            <label htmlFor="requests">Special Requests</label>
            <textarea
                id="requests"
                name="requests"
                rows="4"
                placeholder="Any special requests or accessibility needs..."
            ></textarea>

            {/* Submit Button */}
            <button type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}

export default MoviePremiereForm