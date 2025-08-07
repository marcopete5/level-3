import React from 'react';

function BadgeForm({ formData, handleChange, handleSubmit }) {
    // Validation logic: check if any field is invalid
    const isFormInvalid =
        formData.name.length < 3 ||
        formData.description.length < 3 ||
        formData.phone.length < 3 ||
        !formData.badgeType || // Ensure a radio button is selected
        !formData.terms; // Ensure the checkbox is checked

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description (e.g., 'Software Engineer')"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <fieldset className="radio-group">
                <legend>Badge Type</legend>
                <label>
                    <input
                        type="radio"
                        name="badgeType"
                        value="Employee"
                        checked={formData.badgeType === 'Employee'}
                        onChange={handleChange}
                    />
                    Employee
                </label>
                <label>
                    <input
                        type="radio"
                        name="badgeType"
                        value="Guest"
                        checked={formData.badgeType === 'Guest'}
                        onChange={handleChange}
                    />
                    Guest
                </label>
            </fieldset>
            <label className="checkbox-group">
                <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                />
                I agree to the terms and conditions.
            </label>
            <button type="submit" disabled={isFormInvalid}>
                Create Badge
            </button>
        </form>
    );
}

export default BadgeForm;
