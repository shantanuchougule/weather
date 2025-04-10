import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const rawHours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const day = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
    const month = currentTime.toLocaleDateString('en-US', { month: 'long' });
    const date = currentTime.getDate();

    const hours = rawHours % 12 || 12; // 12-hour format
    const noon = rawHours >= 12 ? 'PM' : 'AM';

    let greet = '';
    if (rawHours >= 5 && rawHours < 12) {
        greet = 'Good Morning!';
    } else if (rawHours >= 12 && rawHours < 17) {
        greet = 'Good Afternoon!';
    } else if (rawHours >= 17 && rawHours < 20) {
        greet = 'Good Evening!';
    } else {
        greet = 'Good Night!';
    }

    return (
        <div className="clock-container">
            <div className="time">
                {month} {date}, {day}, {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes} {noon}
            </div>
            <div className="greet">{greet}</div>
        </div>
    );
};

export default Clock;
