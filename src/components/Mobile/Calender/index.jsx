
import React, { useState } from "react";
import { DatePicker } from 'react-rainbow-components';

function Calender() {

    const [date, setDate] = useState()
    const containerStyles = {
        maxWidth: '100%', 
    };

    const initialState = { date: new Date() };

    return (
        <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
        >
            <DatePicker
                required
                value={date}
                label="DatePicker Label"
                onChange={value => setDate(value)}
            />
        </div>
    )
}

export default Calender