import React, { useEffect, useState } from 'react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import cart from '../static/shopping-cart.png'


const Navbar = (props) => {
    const navigate = useNavigate()

    return (
        <div className="nav">
            <span onClick={() => navigate('/')} className="nav-title">shop</span>
            <span onClick={() => navigate('/cart')} className="nav-cart">
                <img className="nav-cart-img" src={cart}/>
                <span className="nav-cart-number-wrapper">
                    {props.cartSize}
                </span>
            </span>
        </div>
    )
}

export default Navbar