import axios from "axios";
import Header from "../componets/general/header";
import Footer from "../componets/general/footer";


import React, { useEffect, useState } from "react";
import NotRealPage from "../componets/general/NotRealPage";
import CartItem from "../componets/CartItem";
import MercadoPago from "../componets/MercadoPago";

const CarritoPage = ({ ShoppingCart, setShoppingCart, setSearchState, SearchState }) => {
    window.scrollTo(0, 0);

    const [total, setTotal] = useState(0)
    const [qtyProduct, setqtyProduct] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null);

    const AddPedido = () => {

        const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
        // window.location.replace('');
        axios.post(`${process.env.REACT_APP_PAGE}/cart/deleteall/user/${LoggedUserJSON.user}/token/${process.env.REACT_APP_API_KEY}`)
        var today = new Date()
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
        var dia = today.toLocaleDateString('es-mx', options).split(', ')[1]
        let obj = JSON.stringify({
            PedidoData: { user: LoggedUserJSON.user, date: dia, total: total, state: 'Por Enviar', qtyProduct: qtyProduct, num_guia: 0 },
            product: ShoppingCart
        })


        axios.post(`${process.env.REACT_APP_PAGE}/pedidos/add/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    const pay = async () => {
        const user = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
        let datos = JSON.stringify({
            name: user.GeneralInfo.name,
            surname: user.GeneralInfo.lastname,
            email: user.GeneralInfo.email,
            area_code: '0',
            number: parseInt(user.GeneralInfo.phone_number),
            street_name: user.Billingaddress.address,
            street_number: 135,
            zip_code: user.Billingaddress.cod_postal
        })

        let items = []
        for (let i = 0; i < ShoppingCart.length; i++) {
            const element = ShoppingCart[i];
            let obj = JSON.stringify({
                title: element.name,
                picture_url: element.img,
                category_id: element.category,
                quantity: element.quantity,
                unit_price: element.price
            })
            items.push(obj)

        }
        let products = items.join('$/$')
        console.log(products)

        const response = await axios.post(`${process.env.REACT_APP_PAGE}/pay`, { datos, products }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setPreferenceId(response.data.global)

    }


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
            <Header setSearchState={setSearchState} SearchState={SearchState} />

            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>
                <main className="mainCart">
                    <div className="ConteinerTituloCartShop">
                        <div className="TituloCartShop">
                            Carrito
                        </div>
                        <div className="conteinerBtnDeleteAll">
                            <div className="bntDeleteAll" onClick={async () => {
                                window.location.replace('');
                                const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
                                axios.post(`${process.env.REACT_APP_PAGE}/cart/deleteall/user/${LoggedUserJSON.GeneralInfo.user}/token/${process.env.REACT_APP_API_KEY}`)
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
                            pay()
                            // AddPedido()
                        }}>
                            Finalizar Compra
                        </div>
                        {preferenceId === null
                            ? null
                            : <MercadoPago preferenceId={preferenceId} />
                        }

                    </div>
                    <NotRealPage />

                </main>
                <Footer />
            </div>
        </>
    )

}



export default CarritoPage;