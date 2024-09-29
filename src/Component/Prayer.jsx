import React from 'react'

const Prayer = ({name,time,day}) => {
    return (
        <div className='prayer'>
            <p className="name-prayer">{name}</p>
            <p className='day'>{day}</p>
            <p className="time-prayer">{time}</p>
        </div>
    )
}

export default Prayer
