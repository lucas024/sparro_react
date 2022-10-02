import React, {useState} from 'react'
import '../styles/checkout.css'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import {CSSTransition}  from 'react-transition-group';

const Checkout = props => {

    const navigate = useNavigate()


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [accepted, setAccepted] = useState(false)

    const [popup, setPopup] = useState(false)

    const processPay = () => {
        console.log(accepted);
        if(accepted && validator.isEmail(email) && name.length>4)
        {
            //send file to API/server
            localStorage.setItem('cart', JSON.stringify([]))
            props.updateCart()
            navigate('/')
        }
        else
        {
            setPopup(true)
            setTimeout(() => setPopup(false), 4000)
        }
    }


    return (
        <div className="list">
            <span className="list-title">Checkout</span>
            <div className="input-wrapper">
                <span className="input-wrapper-label">Your name</span>
                <input value={name} onChange={e => setName(e.target.value)} className="input-wrapper-value" placeholder="e.g Jane Doe"/>
            </div>
            <div className="input-wrapper">
                <span className="input-wrapper-label">Your email</span>
                <input value={email} onChange={e => setEmail(e.target.value)} className="input-wrapper-value" placeholder="e.g jane@company.co"/>
            </div>

            <div className="terms">
                <div className="terms-button">
                    <input value={accepted} onChange={() => setAccepted(!accepted)}  type="checkbox" id="box" /><label for="box">Toggle</label>
                </div>
                <span className="terms-text">I agree to the terms and conditions</span>
                
            </div>

            <span className="final-pay" onClick={() => processPay()}>
                Pay ${props.total}
            </span>
            
            {
                popup?
                <CSSTransition 
                    in={popup}
                    timeout={1000}
                    classNames="transition"
                    unmountOnExit
                    >
                    <div className='flash-cart'>
                        <span>Please fill in all the <span class="flash-cart-strong">fields</span> and accept the <span class="flash-cart-strong">terms and conditions</span></span>
                    </div>
                </CSSTransition>
                :
                null
            }
        </div>
    )
}

export default Checkout