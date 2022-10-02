import React, {useState} from 'react'
import '../styles/cart.css'
import { useNavigate } from 'react-router-dom';


const Cart = props => {

    const navigate = useNavigate()

    const [cart, setCart] = useState(props.cart)
    

    const removeItem = index => {
        let cart_aux = [...cart]
        cart_aux.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cart_aux))
        props.updateCart(cart_aux)
        setCart(cart_aux)
    }

    const renderCart = () => {
        return cart.map((p, i) => {
            return (
                <div key={i} className="cart-element" style={{backgroundColor:`${p.bgColor}`}}>
                    <div className="cart-element-info">
                        <span className="element-top-title">{p.name}</span>
                        <span className="element-bottom-price" style={{marginTop:"15px"}}>${p.price}</span>
                    </div>
                    <span onClick={() => removeItem(i)} className="delete-flash">X</span>             
                </div>
            )
        })
    }
    return (
        <div className="main">
            <div className="list">
            <span className="list-title">Cart</span>
            <div className="list-table">
                {renderCart()}
            </div>
            <div>
                {
                    cart.length>0?
                    <div className="buy">
                        <span className="buy-total">${props.total}</span>
                        <span onClick={() => navigate('/checkout')} className="buy-button">Buy Now  ></span>
                    </div>
                    :
                    <div className="buy-no-items">
                        <span className="no-items">Your cart is empty</span>
                        <span onClick={() => navigate('/')} className="no-items-shop">SHOP</span>
                    </div>
                    
                }
            </div>
            </div>
        </div>
    )
}

export default Cart