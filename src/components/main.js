import React from 'react'
import data from '../static/data/products.json'
import '../styles/main.css'

const Main = (props) => {

    const addToCart = obj => {
        if(localStorage.getItem('cart') == null)
        {
            let cart = []
            cart.push(obj)
            localStorage.setItem('cart', JSON.stringify(cart))
            props.updateCart(cart)
            
        }
        else
        {
            let cart = eval(localStorage.getItem('cart')) 
            cart.push(obj)
            localStorage.setItem('cart', JSON.stringify(cart))
            props.updateCart(cart)
        }
        
    }
    
    const renderProducts = () => {
        return data.products.map((p, key) => {
            return (
                <div key={key} className="table-element">
                    <div className="element-img-wrapper" style={{backgroundColor:`${p.bgColor}`}}>
                        <img className="element-img" src={require(`../static/design/images/${p.id}.png`)}/>
                    </div>
                    <div className="element-info">
                        <div className="element-top">
                            <span className="element-top-type">{p.category}</span>
                            <span className="element-top-title">{p.name}</span>
                        </div>
                        <div className="element-bottom">
                            <span className="element-bottom-price">${p.price}</span>
                            <span className="element-bottom-button" onClick={() => addToCart(p)}>
                                <span className="element-bottom-button-add">Add</span>
                                <span className="element-bottom-button-plus">+</span>
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className=''>
            <div className="list">
                <span className="list-title">Products</span>
                <div className="list-table">
                    {renderProducts()}
                </div>
            </div>
            
        </div>
    )
}

export default Main