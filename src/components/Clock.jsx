import React, { useState, useEffect } from 'react';
import './Clock.css';  // Link to external CSS

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const day = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
    const month = currentTime.toLocaleDateString('en-US', { month: 'long' });
    const date = currentTime.getDate();

    let noon = '';
    if (hours >= 5 && hours < 12) {
        noon = 'AM';
    } else if (hours >= 12 && hours < 18) {
        noon = 'PM';
    } else {
        noon = 'PM';
    }

    return (
        <div className="clock-container">
            <div className="time">{month} {date}, {day}, {hours > 12 ? hours-12 : hours}:{minutes < 10 ? `0${minutes}` : minutes} {noon} </div>
        </div>
    );
};

export default Clock;
