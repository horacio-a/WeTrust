
import React from "react";
import axios from "axios";

const CartItem = ({ data}) => {
    let { id, name, price, quantity, talle, img, category, max_stock } = data
    const subtotal = price * quantity
    return (

        <>
            <div className="conteinerProducto">
                <div className="backImgProduct">
                    <img src={img} className='imgProduct' alt={`producto ${name}`} height={50}></img>

                </div>
                <div className="conteinerName">
                    <div> {name}</div>
                </div>
                <div className="conteinerQty">
                    <div> Qty: {quantity} </div>
                    {
                        category === 'shoe'
                            ? <div > Size: {talle}us </div>
                            : (category === 'clothing'
                                ? <div > Size: {talle} </div>
                                : <></>
                            )

                    }

                </div>
                <div className="conteinerPrice">
                    <div> C/u $ {price}.00 </div>
                    <div> subtotal $ {subtotal}.00 </div>

                </div>
                <div className="conteinerButtonADD">
                    {
                        quantity === max_stock 
                        ? <div className="buttoncartInactives"> + </div>
                        :<div className="buttoncart" onClick={async () => {

                            let cantidad = parseInt(quantity) + 1
                            let obj = JSON.stringify({ id: id, name: name, talle: talle, quantity: cantidad })
                            axios.post(`${process.env.REACT_APP_PAGE}/cart/update/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            window.location.replace('');
    
                        }}>+</div>
                    }
                    
                    <div className="buttoncart" onClick={async () => {
                        if (quantity === 1) {
                            let obj = JSON.stringify({ id: id, name: name, talle: talle })
                            axios.post(`${process.env.REACT_APP_PAGE}/cart/delete/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                        } else {
                            let cantidad = parseInt(quantity) - 1
                            let obj = JSON.stringify({ id: id, name: name, talle: talle, quantity: cantidad })
                            axios.post(`${process.env.REACT_APP_PAGE}/cart/update/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                        }

                        window.location.replace('');
                    }}>-</div>

                </div>
                <div className="conteinerDelete">
                    <div className="buttonDelete" onClick={async () => {
                        let obj = JSON.stringify({ id: id, name: name, talle: talle })
                        axios.post(`${process.env.REACT_APP_PAGE}/cart/delete/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        window.location.replace('');
                    }}>X</div>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>

        </>


    )

}

export default CartItem;