import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import '../index.css'
import Header from '../componets/header';
import Footer from '../componets/footer';

const ProductPage = ({ ShoppingCart, setShoppingCart, setSearchState, SearchState }) => {
    const { id } = useParams()
    const conteinerBtn = useRef('')

    const [loading, setLoading] = useState(false)
    const [ButtonLoding, setButtonLoding] = useState(false)
    const [productos, setProductos] = useState([])
    const [img, setImg] = useState('')
    const [talles, setTalles] = useState([])
    const [SelectTalle, SetSelectTalle] = useState()
    const [allJson, SetSallJson] = useState([])
    const [msg, setMsg] = useState()
    const setValor = (event) => {
        var hijos = conteinerBtn.current.children
        for (let i = 0; i < hijos.length; i++) {
            const element = hijos[i];
            element.style.color = '#3E3733'
            element.style.background = '#EEEBDD'

        }
        event.target.style.color = '#EEEBDD'
        event.target.style.background = '#23232C'

        SetSelectTalle(event.target.innerHTML)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
        const getcart = async () => {
            const cart = await (await axios.get(`${process.env.REACT_APP_PAGE}/cart/getInfo/user/${LoggedUserJSON.user}/token/${process.env.REACT_APP_API_KEY}`)).data
            console.log(cart)
            setShoppingCart(cart)
        }
        getcart()
    }, [setShoppingCart])





    useEffect(() => {

        const cargarMineria = async () => {
            setLoading(true);

            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/productos/id/${id}/token/${process.env.REACT_APP_API_KEY}`);
            SetSallJson(response.data[0])
            setProductos(response.data[0].producto)
            setImg(response.data[0].img)
            var size = []
            for (var property in response.data[0].talles) {
                if (!(property === 'name' || property === 'id')) {
                    if (response.data[0].talles[property] > 0) {
                        const TallesTableShoe = {
                            three_half: 3.5,
                            four: 4.0,
                            four_half: 4.5,
                            five: 5.0,
                            five_half: 5.5,
                            six: 6.0,
                            six_half: 6.5,
                            seven: 7.0,
                            seven_half: 7.5,
                            eight: 8.0,
                            eight_half: 8.5,
                            nine: 9.0,
                            nine_half: 9.5,
                            ten: 10,
                            ten_half: 10.5,
                            eleven: 11.0,
                            eleven_half: 11.5,
                            twelve: 12.0,
                            twelve_half: 12.5,
                            thirteen: 13.0,
                            thirteen_half: 13.5,
                            fourteen: 14.0,
                            fourteen_half: 14.5,
                            fifteen: 15.0
                        }
                        if (response.data[0].producto.category === 'shoe') {
                            size.push(TallesTableShoe[property])
                        } else {
                            size.push(property)
                        }
                    }

                }
            }
            setTalles(size)

            setLoading(false)
        }

        cargarMineria();


    }, [id]);
    return (
        <>
            <Header setSearchState={setSearchState}  SearchState={SearchState} />

            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>
                <main className="mainProducto">
                    {
                        loading ? (
                            <div className="item">
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        ) : (
                            <>
                                <div className="conteinerMainProduct">
                                    <div className="conteinerimgProduct">
                                        <img src={img} alt={`producto ${productos.name}`}></img>
                                    </div>
                                    <div className="conteinerInfo">
                                        <div className="tituloProducto">{productos.name}</div>
                                        <div className="tituloPrice">$ {productos.price}</div>
                                        <div className="conteinerTalle" ref={conteinerBtn}>
                                            {
                                                talles.map(item => {
                                                    return (
                                                        <div className="btnTalle" onClick={setValor}>
                                                            {item}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        {
                                            ButtonLoding
                                                ? <div className="buttonLoding">
                                                    <div class="wrap">
                                                        <div class="spinner"></div>
                                                    </div>
                                                </div>
                                                : <div className="BtnProducto" onClick={() => {
                                                    let data = ShoppingCart
                                                    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
                                                    if (LoggedUserJSON) {
                                                        function getStockPorTalle(cantidad) {
                                                            if (productos.category === 'shoe') {
                                                                const TallesTableShoe = {
                                                                    three_half: 3.5,
                                                                    four: 4.0,
                                                                    four_half: 4.5,
                                                                    five: 5.0,
                                                                    five_half: 5.5,
                                                                    six: 6.0,
                                                                    six_half: 6.5,
                                                                    seven: 7.0,
                                                                    seven_half: 7.5,
                                                                    eight: 8.0,
                                                                    eight_half: 8.5,
                                                                    nine: 9.0,
                                                                    nine_half: 9.5,
                                                                    ten: 10,
                                                                    ten_half: 10.5,
                                                                    eleven: 11.0,
                                                                    eleven_half: 11.5,
                                                                    twelve: 12.0,
                                                                    twelve_half: 12.5,
                                                                    thirteen: 13.0,
                                                                    thirteen_half: 13.5,
                                                                    fourteen: 14.0,
                                                                    fourteen_half: 14.5,
                                                                    fifteen: 15.0
                                                                }
                                                                for (var property in TallesTableShoe) {
                                                                    if (TallesTableShoe[property] === parseFloat(SelectTalle)) {
                                                                        if (allJson.talles[property] <= cantidad) {
                                                                            return true
                                                                        } else {
                                                                            return false
                                                                        }
                                                                    }
                                                                }
                                                            } else if (productos.category === 'clothing') {
                                                                if (allJson.talles[SelectTalle] <= cantidad) {
                                                                    return true
                                                                } else {
                                                                    return false
                                                                }
                                                            } else if (productos.category === 'accessories') {
                                                                if (productos.stock <= cantidad) {
                                                                    return true

                                                                } else {
                                                                    return false
                                                                }
                                                            }


                                                        }

                                                        function dataRepeated() {
                                                            const respuesta = data.find(element => element.name === productos.name && element.talle === SelectTalle
                                                            )
                                                            return respuesta
                                                        }
                                                        function getMaxStock() {
                                                            if (productos.category === 'shoe') {
                                                                const TallesTableShoe = {
                                                                    three_half: 3.5,
                                                                    four: 4.0,
                                                                    four_half: 4.5,
                                                                    five: 5.0,
                                                                    five_half: 5.5,
                                                                    six: 6.0,
                                                                    six_half: 6.5,
                                                                    seven: 7.0,
                                                                    seven_half: 7.5,
                                                                    eight: 8.0,
                                                                    eight_half: 8.5,
                                                                    nine: 9.0,
                                                                    nine_half: 9.5,
                                                                    ten: 10,
                                                                    ten_half: 10.5,
                                                                    eleven: 11.0,
                                                                    eleven_half: 11.5,
                                                                    twelve: 12.0,
                                                                    twelve_half: 12.5,
                                                                    thirteen: 13.0,
                                                                    thirteen_half: 13.5,
                                                                    fourteen: 14.0,
                                                                    fourteen_half: 14.5,
                                                                    fifteen: 15.0
                                                                }
                                                                for (var property in TallesTableShoe) {
                                                                    if (TallesTableShoe[property] === parseFloat(SelectTalle)) {
                                                                        return (allJson.talles[property])

                                                                    }
                                                                }
                                                            } else if (productos.category === 'clothing') {
                                                                return (allJson.talles[SelectTalle])
                                                            } else if (productos.category === 'accessories') {
                                                                return (productos.stock)
                                                            }
                                                        }
                                                        if (SelectTalle || productos.category === 'accessories') {
                                                            console.log(allJson.talles)
                                                            console.log(SelectTalle)

                                                            if (data.length > 0) {
                                                                if (dataRepeated() === undefined) {
                                                                    setButtonLoding(true)
                                                                    let max_stock = getMaxStock()
                                                                    let obj = JSON.stringify({ id_product: productos.id, user: LoggedUserJSON.user, name: productos.name, price: productos.price, quantity: 1, talle: SelectTalle, category: productos.category, img: img, max_stock: max_stock })
                                                                    axios.post(`${process.env.REACT_APP_PAGE}/cart/add/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        }
                                                                    })
                                                                    data.push({ id_product: productos.id, user: LoggedUserJSON.user, name: productos.name, price: productos.price, quantity: 1, talle: SelectTalle, category: productos.category, img: img, max_stock: max_stock })

                                                                    setShoppingCart(data)
                                                                    setTimeout(() => {
                                                                        setButtonLoding(false)
                                                                        setMsg('se agregado ' + productos.name + 'al carrito')

                                                                    }, 2000);

                                                                } else {
                                                                    let dataRepeat = dataRepeated()
                                                                    if (getStockPorTalle(dataRepeat.quantity) === false) {
                                                                        setButtonLoding(true)
                                                                        let max_stock = getMaxStock()

                                                                        let dataFilter = data.filter(product => product !== dataRepeat)
                                                                        let cantidad = dataRepeat.quantity + 1
                                                                        let obj = JSON.stringify({ id: productos.id, name: productos.name, talle: SelectTalle, quantity: cantidad })
                                                                        axios.post(`${process.env.REACT_APP_PAGE}/cart/update/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                                                            headers: {
                                                                                'Content-Type': 'application/json'
                                                                            }
                                                                        })
                                                                        dataFilter.push({ id_product: productos.id, user: LoggedUserJSON.user, name: productos.name, price: productos.price, quantity: dataRepeat.quantity + 1, talle: SelectTalle, category: productos.category, img: img, max_stock: max_stock })

                                                                        setShoppingCart(dataFilter)
                                                                        setTimeout(() => {
                                                                            setButtonLoding(false)
                                                                            setMsg(`se agregado ${productos.name} al carrito x${cantidad}`)

                                                                        }, 2000);


                                                                    } else {
                                                                        setMsg('no hay stock mas stock en ' + SelectTalle)
                                                                    }


                                                                }

                                                            } else {
                                                                setButtonLoding(true)
                                                                let max_stock = getMaxStock()

                                                                let obj = JSON.stringify({ id_product: productos.id, user: LoggedUserJSON.user, name: productos.name, price: productos.price, quantity: 1, talle: SelectTalle, category: productos.category, img: img, max_stock: max_stock })
                                                                axios.post(`${process.env.REACT_APP_PAGE}/cart/add/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                                                                    headers: {
                                                                        'Content-Type': 'application/json'
                                                                    }
                                                                })
                                                                data.push({ id_product: productos.id, user: LoggedUserJSON.user, name: productos.name, price: productos.price, quantity: 1, talle: SelectTalle, category: productos.category, img: img, max_stock: max_stock })
                                                                setShoppingCart(data)
                                                                setTimeout(() => {

                                                                    setMsg('se agregado ' + productos.name + 'al carrito')

                                                                    setButtonLoding(false)
                                                                }, 2000);

                                                            }

                                                        } else {
                                                            setMsg('seleccione un talle')
                                                        }

                                                    } else {
                                                        setMsg('Para comprar registrate')
                                                    }

                                                }}>Comprar</div>
                                        }

                                        <div className="BlockMsg">{msg} </div>
                                    </div>

                                </div>
                                <div className="conteinerDescription">
                                    <div className="tituloDescription">
                                        Descripción
                                    </div>
                                    <div className="txtDescription">
                                        {productos.description}
                                    </div>
                                </div>
                            </>
                        )
                    }
                </main>
                <Footer />

            </div>

        </>
    );
}
export default ProductPage;