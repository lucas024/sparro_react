import React, {useState, useEffect} from 'react';
import './app.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from './components/main';
import Navbar from './components/navbar'
import Cart from './components/cart';
import Checkout from './components/checkout';
import {CSSTransition}  from 'react-transition-group';


const App = () => {

  const [success, setSuccess] = useState(false)
  const [total, setTotal] = useState(0)
  const [cartSize, setCartSize] = useState(() => {
    if(localStorage.getItem('cart') != null)
        {
            return eval(localStorage.getItem('cart')).length
        }
        return 0
  })

  const [cart, setCart] = useState(() => {
    if(localStorage.getItem('cart') != null)
        {
            return eval(localStorage.getItem('cart'))
        }
        return []
  })

  useEffect(() => {
    setCartSize(cart.length)
    let total = 0
    for(let el of cart)
    {
      total+=parseInt(el.price)
    }
    setTotal(total)
  }, [cart])

  
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar cartSize={cartSize}/>
        {
          success?
          <CSSTransition 
                in={success}
                timeout={1000}
                classNames="transition"
                unmountOnExit
                >
                <span className='success'>Success!</span>
            </CSSTransition>
            :null
        }
        
        <Routes>
          <Route path='/' element={
              <Main 
                updateCart={cart => {
                  setCart(cart)
                  }}
            />}/>

          <Route path='/cart' element={
              <Cart 
                updateCart={cart => {
                  setCart(cart)
                  }}
                cart={cart}
                total={total}
            />}/>

          <Route path='/checkout' element={
              <Checkout 
                updateCart={() => {
                  setCart([])
                  setSuccess(true)
                  setTimeout(() => setSuccess(false), 4000)
                  }}
                cart={cart}
                total={total}
            />}/>

          
        </Routes>
      </BrowserRouter>
    

    </div>
  );
}

export default App;
