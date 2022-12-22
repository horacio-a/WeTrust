
import React from "react";
import axios from "axios";

const CartItem = ({ data, addToCard, delFromCart, clearCart }) => {
    let {id, name, price, quantity, talle, img } = data
    return (

        <>
            <img src={img} alt={`producto ${name}`} height={50}></img>
            <h3> {name}</h3>
            <h5> {price} </h5>
            <p> {quantity}      {talle} </p>
            <p> {quantity}      {talle} </p>
            <button onClick={ async() => {
                if(quantity === 1){ 
                    let obj = JSON.stringify({ id: id, name: name, talle: talle})
                    axios.post(`http://localhost:3000/cart/delete`, { obj }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }else{
                    let cantidad = parseInt(quantity)  - 1
                    let obj = JSON.stringify({ id: id, name: name, talle: talle,quantity: cantidad })
                    axios.post(`http://localhost:3000/cart/update`, { obj }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

                window.location.replace('');
            }}> delete one</button>
            <br></br>
            <br></br>
            <br></br>

        </>


    )

}

export default CartItem;