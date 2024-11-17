import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/CampingForm.css';

const CampingForm = () => {
    const [formData, setFormData] = useState({
        artistId: null,
        welfarePayment: null,
        premierePayment: null,
        aerobicPayment: null,
        labTest: null,
        nationalId: null,
        utilityBill: null,
        taxClearance: null,
        campingKit: '',
        agreeTerms: false,
    });
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        alert("Form submitted successfully!");
    };

    return (
        <div className="camping-form-page">
            <div className="camping-form-container">
                <h3>Camping Requirement Form</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="artistId">Artist Company ID Card</label>
                    <input
                        type="file"
                        id="artistId"
                        name="artistId"
                        className="form-control"
                        required
                        onChange={handleFileChange}
                    />

                    <label htmlFor="welfarePayment">2 copies of Welfare Payment Slip</label>
                    <input
                        type="file"
                        id="welfarePayment"
                        name="welfarePayment"
                        className="form-control"
                        required
                        multiple
                        onChange={handleFileChange}
                    />

                    <label htmlFor="campingKit">Camping Kit Confirmation</label>
                    <input
                        type="text"
                        id="campingKit"
                        name="campingKit"
                        placeholder="Specify contents of your camping kit"
                        required
                        value={formData.campingKit}
                        onChange={handleChange}
                    />

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            required
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        />
                        <label htmlFor="agreeTerms">
                            I agree to the{' '}
                            <span
                                className="terms"
                                onClick={() => setShowModal(true)}
                            >
                                terms and conditions
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>

            {/* Terms and Conditions Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Artist Camping Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Terms and conditions content */}
                    <p>ARTIST CAMPING TERMS AND CONDITIONS</p>
                    <p>Artist dating any crew member or co-artist while camping, if caught you will be expelled without any benefit.</p>
                    <p>No sexual act with any crew member or co-artist while camping, if caught you will be expelled without any benefit.</p><br />
                    <p>No lesbianism practicing with crew member or co-artist while camping, if caught, you will face the law and will be expelled without any benefit.</p><br />
                    <p>No gay practicing with crew member or co-artist while camping, if caught, you will face the law and will be expelled without any benefit.</p><br />
                    <p>Stealing an item or property from crew member or co-artist while camping, if caught you will face 2 years suspension and you will face the law.</p><br />
                    <p>Fighting or gossiping any crew member or co-artist while camping, if caught you will face 2 years suspension and you will face the law.</p><br />
                    <p>Artists are to come to camp with their artist identification card; failure to do so will result in denied entry to the camp.</p><br />
                    <p>No artist should leave the camping venue for any reason; if caught, the artist will not be permitted to come on set or face the camera.</p><br />
                    <p>Tests to undergo by artists before the camping date: pneumonia, tuberculosis, asthma, ulcer, AIDS/HIV, wart, monkey/chicken pox, BP.</p><br />
                    <p>Test results must come from a general hospital.</p><br />
                    <p>Test results from private hospitals are not accepted.</p><br />
                    <p>Any artist who does not present his/her test results will not be permitted entry to the camp.</p><br />
                    <p>Any artist who did not disclose health challenges before entering camp is at his/her own risk.</p><br />
                    <p>Artists are to wear the company identification card and vest while in camp.</p><br />
                    <p>Artists who did not pay the location welfare fee are not permitted entry to camp.</p><br />
                    <p>Artists are to come to camp with the following items: artist membership payment slip, welfare payment slip, test results, artist identification card, movie premiere ticket payment slip, location kits, and script.</p><br />
                    <p>Artists are to arrive at camp according to their assigned groups.</p><br />
                    <p>Artists should direct all calls to our customer care representative number for security reasons while in camp.</p><br />
                    <p>Artists are not permitted to welcome any visitors while in camp.</p><br />
                    <p>Artists are to come to camp with their location kits.</p><br />
                    <p>Shooting commences from 5am to 5am.</p><br />
                    <p>Artists are to have their breakfast at 8am, lunch at 2pm, and dinner at 6pm while camping.</p><br />
                    <p>Artists are not permitted to capture the ongoing movie with their phones and post on their private social media accounts. If caught, the artist will face the law for piracy and will pay a penalty.</p><br />
                    <p>Artists who fail to go with the location bus to shooting locations are at their own risk.</p><br />
                    <p>Artists are to undergo a month of gym training before the location date.</p><br />
                    <p>Artists are to frequently rehearse their scripts with co-casted artists while in camp.</p><br />
                    <p>An artist who does not interpret the script well will instantly be replaced by another artist.</p>

                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CampingForm;
