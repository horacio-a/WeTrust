import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import '../index.css'
import Header from '../componets/header';
import Footer from '../componets/footer';
import CardIndex from "../componets/cardindex";
const ProductCategoryPage = (props) => {
    const { category } = useParams()

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])


    useEffect(() => {
        window.scrollTo(0, 0);

        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/productos/category/${category}/token/${process.env.REACT_APP_API_KEY}`);
            setProductos(response.data)
            console.log(response.data)
            setLoading(false)

        }

        cargarMineria();


    }, [category]);
    return (
        <>
            <Header />
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
        </>
    );
}
export default ProductCategoryPage;