import axios from "axios";
import Header from "../componets/header";
import Footer from '../componets/footer';

import React, { useEffect, useState } from "react";
import NotRealPage from "../componets/NotRealPage";
import CartItem from "../componets/CartItem";


const CarritoPage = ({ ShoppingCart, setShoppingCart }) => {
    window.scrollTo(0, 0);

    const [total, setTotal] = useState(0)
    const [qtyProduct, setqtyProduct] = useState(0)

    useEffect(() => {

        var SumatoriaTotal = 0
        for (let i = 0; i < ShoppingCart.length; i++) {
            const element = ShoppingCart[i];
            let numForUnit = element.price * element.quantity
            SumatoriaTotal = SumatoriaTotal + numForUnit
        }
        setTotal(SumatoriaTotal)
        let qqty = 0
        for (let i = 0; i < ShoppingCart.length; i++) {
            const element = ShoppingCart[i];
            let numForUnit = element.quantity
            qqty = qqty + numForUnit
        }
        setqtyProduct(qqty)
    }, [ShoppingCart])
    return (
        <>
            <Header />
            <main className="mainCart">
                <div className="ConteinerTituloCartShop">
                    <div className="TituloCartShop">
                        Carrito
                    </div>
                    <div className="conteinerBtnDeleteAll">
                        <div className="bntDeleteAll" onClick={async () => {
                            const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
                            await axios.post(`${process.env.REACT_APP_PAGE}/cart/deleteall/user/${LoggedUserJSON.user}/token/${process.env.REACT_APP_API_KEY}`)
                            window.location.replace('');
                        }}>Eliminar Todo</div></div>
                </div>


                {
                    ShoppingCart.length === 0
                        ? <div className="emptyCartShop">Carrito vacio</div>
                        : ShoppingCart.map((product) => <CartItem key={product.id} data={product} />)

                }

                <div className="conteinertotal">
                    <div className="txtTotal">
                        Total del carrito

                    </div>
                    <div className="txtTotal">
                        $ {total}.00
                    </div>

                </div>
                <div className="conteinerBtnSell">
                    <div className="BtnSell" onClick={() => {
                        const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))

                        var today = new Date()
                        var options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
                        var dia = today.toLocaleDateString('es-mx', options).split(', ')[1]
                        let obj = JSON.stringify({
                            PedidoData: { user: LoggedUserJSON.user, date: dia, total: total, state: 'Por Enviar', qtyProduct: qtyProduct },
                            product: ShoppingCart
                        })

                        axios.post(`${process.env.REACT_APP_PAGE}/pedidos/add/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    }}>
                        Finalizar Compra
                    </div>
                </div>
                <NotRealPage />

            </main>
            <Footer />
        </>
    )

}

export default CarritoPage;