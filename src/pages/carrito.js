import axios from "axios";
import Header from "../componets/header";
import Footer from '../componets/footer';

import React, { useEffect, useState } from "react";

import CartItem from "../componets/CartItem";


const CarritoPage = ({ ShoppingCart, setShoppingCart }) => {
    window.scrollTo(0, 0);

    const [total, setTotal] = useState(0)


    useEffect(() => {
        var SumatoriaTotal = 0
        for (let i = 0; i < ShoppingCart.length; i++) {
            const element = ShoppingCart[i];
            let numForUnit = element.price * element.quantity
            SumatoriaTotal = SumatoriaTotal + numForUnit
        }
        setTotal(SumatoriaTotal)

    }, [ShoppingCart])
    return (
        <>
            <Header />
            <main className="mainCart">
                {
                    ShoppingCart.length === 0
                        ? <div >Carrito vacio</div>
                        : ShoppingCart.map((product) => <CartItem key={product.id} data={product} />)
                }
                <button onClick={async () => {
                    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
                    await axios.post(`http://localhost:3000/cart/deleteall/user/${LoggedUserJSON.user}`)
                    window.location.replace('');
                }}>Eliminar Todo</button>
                <div> {total}</div>
            </main>
            <Footer />
        </>
    )

}

export default CarritoPage;