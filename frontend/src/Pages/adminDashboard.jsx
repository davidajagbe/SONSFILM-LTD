
import { useState } from 'react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [ads, setAds] = useState([
        { id: 1, title: 'Ad 1', startDate: '', endDate: '', frequency: 'always', preview: 'Preview of Ad 1' },
        { id: 2, title: 'Ad 2', startDate: '', endDate: '', frequency: 'randomly', preview: 'Preview of Ad 2' },
        // Add more ads as needed
    ]);
    const [selectedAd, setSelectedAd] = useState(null);

    const handleAdSelection = (event) => {
        const adId = parseInt(event.target.value);
        const ad = ads.find(ad => ad.id === adId);
        setSelectedAd(ad);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedAd({ ...selectedAd, [name]: value });
    };

    const handleSaveChanges = () => {
        try {
            setAds(ads.map(ad => (ad.id === selectedAd.id ? selectedAd : ad)));
            toast.success('Changes saved successfully!');
        } catch (error) {
            toast.error(error || 'Please try again')
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <label>Select Ad:</label>
                <select onChange={handleAdSelection}>
                    <option value="">Select an ad</option>
                    {ads.map(ad => (
                        <option key={ad.id} value={ad.id}>{ad.title}</option>
                    ))}
                </select>
            </div>
            {selectedAd && (
                <div>
                    <h2>Ad Settings</h2>
                    <div>
                        <label>Start Date:</label>
                        <input type="date" name="startDate" value={selectedAd.startDate} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input type="date" name="endDate" value={selectedAd.endDate} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Display Frequency:</label>
                        <select name="frequency" value={selectedAd.frequency} onChange={handleInputChange}>
                            <option value="always">Always</option>
                            <option value="randomly">Randomly</option>
                        </select>
                    </div>
                    <div>
                        <h3>Preview</h3>
                        <p>{selectedAd.preview}</p>
                    </div>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;