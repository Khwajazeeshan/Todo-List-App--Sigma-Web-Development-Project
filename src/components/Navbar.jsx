import React from 'react'
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='h1'><h1>i-Task</h1></div>
            <div className="list">
                <ul className='ul'>
                    <li>Home</li>
                    <li>About us</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
