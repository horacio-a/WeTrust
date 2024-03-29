import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import '../index.css'
import Header from '../componets/general/header';
import Footer from "../componets/general/footer";
import CardProduct from "../componets/cardProduct";
import ProductsTitle from "../componets/ProductsTitle";



const ProductBrandPage = ({ setSearchState, SearchState }) => {
    const { marca } = useParams()

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])
    const [numImg, setNumImg] = useState()

    useEffect(() => {
        setNumImg(Math.floor(Math.random() * 4)) 
    }, [setNumImg])


    useEffect(() => {

        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/productos/marca/${marca}/token/${process.env.REACT_APP_API_KEY}`);
            setProductos(response.data)
            console.log(response.data)
            setLoading(false)
        }

        cargarMineria();


    }, [marca]);
    return (
        <>
            <Header setSearchState={setSearchState} SearchState={SearchState} />

            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>
                <ProductsTitle titulo={marca} numImg={numImg}/>

                <main className="mainProducto">
                    <div className="carrusel-products">

                        {
                            loading ? (
                                <div className="item">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div>
                            ) : (
                                productos.map(item => <CardProduct
                                    key={item.produto.id}
                                    id={item.produto.id}
                                    num={item}
                                    name={item.produto.name}
                                    price={item.produto.price}
                                    img={item.img}
                                    category={item.produto.category}
                                    talles={item.talles}
                                />)
                            )
                        }
                    </div>

                </main>
                <Footer />
            </div>
        </>

    );
}
export default ProductBrandPage;