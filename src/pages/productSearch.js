import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import '../index.css'
import Header from '../componets/header';
import Footer from '../componets/footer';
import ProductsTitle from "../componets/ProductsTitle";
import CardIndex from "../componets/cardindex";


const ProductSearch = ({ setSearchState, SearchState }) => {

    const { category } = useParams()
    const { product } = useParams()

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])
    const [numImg, setNumImg] = useState()
    const [titulo, setTitulo] = useState('')


    useEffect(() => {
        setNumImg(Math.floor(Math.random() * 4))
    }, [setNumImg])

    useEffect(() => {
        window.scrollTo(0, 0);
        if (category === 'accessories') {
            setTitulo('Accesorios')
        } else if (category === 'clothing') {
            setTitulo('Ropa')
        } else if (category === 'shoe') {
            setTitulo('Sneakers')
        } else {
            setTitulo(category)
        }
        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/productos/category/${category}/product/${product}/token/${process.env.REACT_APP_API_KEY}`);
            setProductos(response.data)
            console.log(response.data)
            setLoading(false)

        }

        cargarMineria();


    }, [category, product]);

    return (
        <>
            <Header setSearchState={setSearchState} SearchState={SearchState} />
            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>
                <ProductsTitle titulo={titulo} numImg={numImg} />

                <main className="mainProducto">

                    {
                        loading ? (
                            <div className="item">
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        ) : (
                            <div className="Carrusel-index">

                                {productos.map(item => <CardIndex
                                    key={item.produto.id}
                                    id={item.produto.id}
                                    num={item}
                                    name={item.produto.name}
                                    price={item.produto.price}
                                    img={item.img}
                                    category={item.produto.category}
                                    talles={item.talles}
                                />)}
                            </div>

                        )
                    }

                </main>

                <Footer />
            </div>

        </>
    );
}
export default ProductSearch;