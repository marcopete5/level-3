import React, { useState } from 'react';
import BadgeForm from './components/BadgeForm';
import BadgeList from './components/BadgeList';
import './App.css';

function App() {
    // State for the form inputs
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone: '',
        badgeType: '',
        terms: false
    });

    // State for the list of submitted badges
    const [badges, setBadges] = useState([]);

    // A single handler to update form data
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        // Add the current form data to the badges array
        setBadges((prevBadges) => [...prevBadges, formData]);
        // Clear the form for the next entry
        setFormData({
            name: '',
            description: '',
            phone: '',
            badgeType: '',
            terms: false
        });
    };

    return (
        <div className="app-container">
            <h1>Name Badge</h1>
            <BadgeForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <BadgeList badges={badges} />
        </div>
    );
}

export default App;
