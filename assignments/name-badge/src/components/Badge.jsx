import React from 'react';

function Badge({ badge, index }) {
    // Determine the header class based on whether the index is even or odd
    const headerClass = index % 2 === 0 ? 'header-blue' : 'header-red';

    return (
        <div className="badge-card">
            <div className={`badge-header ${headerClass}`}>
                Badge #{index + 1}
            </div>
            <div className="badge-body">
                <p>
                    <strong>Name:</strong> {badge.name}
                </p>
                <p>
                    <strong>Type:</strong> {badge.badgeType}
                </p>
                <p>
                    <strong>Description:</strong> {badge.description}
                </p>
                <p>
                    <strong>Phone:</strong> {badge.phone}
                </p>
            </div>
        </div>
    );
}

export default Badge;
