import { useState } from 'react';
import '../styles/MoviePremiereForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MoviePremiereForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const movies = [
        "DAUGHTER OF A FOREST PRINCESS", "LOVE EARTHQUAKE", "LOVE JACKET", "MORE THAN A WITCH",
        "THE HIDDEN SPEAR", "TEMPLE PROSTITUTE", "BEYOND RUNS", "MAID IN THE PALACE",
        "MY MILLIONAIRE SUGAR DADDY", "LOVE SIGNATURE", "LOST OPPORTUNITY", "HOUR OF EXECUTION",
        "LOVE FORMULA", "MASK TO MASK", "LOVE EQUATION", "LAST WEAPON", "DANGEROUS WEAPON",
        "LOVE EQUATOR", "PRINCESS OF THE FOREST", "BEHIND THE MASK", "RATTLE RACKET",
        "ECLIPSE OF LOVE", "THE LIONS", "LOVE SECRET", "STRINGY MILLIONAIRE", "LOVE ON FIRE",
        "HOLD ON HOSTAGE", "BLEEDING HEART", "FLESH ON FIRE", "BEYOND MILES", "NEVER MY FAULT",
        "MY MOTHER'S TEARS", "LOVE WITHOUT ARREST", "2 PRINCE AT WAR", "SILENT SCREAMING",
        "MY MANAGER", "STRESS OF LOVE", "A SECRET BEHIND MY SMILE", "SUDDEN HIT", "24 HOURS TO HIT",
        "CAMPUS TERRORIST", "DEBT OF LOVE", "AFRICA SERPENT", "LOVE MOVEMENT", "FINAL DECISION",
        "BEHIND MY PAINS", "CRUSH TO SURRENDER", "LOVE GRAVITY", "GAME ROUND UP", "SAVE MY TEARS",
        "FAMILY WAR", "DOLLAR GIRLS", "MIDNIGHT ANGELES", "TEARS OF THE ORPHAN", "CULT MISSION",
        "LOST GOLD", "SWORN TO DIE", "DARK GOOGLE GIRLS", "LADIES FACTORY", "TOYOTA",
        "A MINUTE RUNS", "GIRLS ON SUIT", "A REDOLENT PRINCE", "MY DAD, MY FAVORITE",
        "LOVE EARTHQUAKE", "LOVE RATIO", "LIFE OF TEARS", "LOVE OBSTRUCTOR", "LOVE MAGNET",
        "THE FLAME", "THE LAST FAME", "ZUKUNA TEMPLE", "CAMPUS GENERALS", "FIRE ME, FIRE LOVE",
        "WORLD APART", "NIGHT OF JUDGEMENT", "LOVE WAS THE CRIME", "MY REGRET", "THE SCORPIONS"
    ];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        movie: '',
        showtime: '',
        requests: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/moviePremiereForm', formData);
          toast.success(data.message ||'Form submitted successfully!');
          navigate('/profile');
        } catch (error) {
          toast.error(error.response?.data?.message ||'Error submitting form');
        }
        finally{
            setIsSubmitting(true)
        }
    };
    

    return (
        <div className="form-page">
            <div className="premiere-form-container">
                <h2>Movie Premiere Registration</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Attendee Information */}
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="contact">Contact Number</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />

                    {/* Premiere Details */}
                    <label htmlFor="movie">Select Movie</label>
                    <select
                        id="movie"
                        name="movie"
                        value={formData.movie}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose a movie</option>
                        {movies.map((movie, index) => (
                            <option key={index} value={movie}>
                                {movie}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="showtime">Preferred Showtime</label>
                    <select
                        id="showtime"
                        name="showtime"
                        value={formData.showtime}
                        onChange={handleChange}
                        required
                    >
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
                        value={formData.requests}
                        onChange={handleChange}
                        placeholder="Any special requests or accessibility needs..."
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'} 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MoviePremiereForm;
