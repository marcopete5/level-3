import React from 'react';
import Badge from './Badge';

function BadgeList({ badges }) {
    return (
        <div className="badge-list">
            {badges.map((badge, index) => (
                <Badge key={index} badge={badge} index={index} />
            ))}
        </div>
    );
}

export default BadgeList;
