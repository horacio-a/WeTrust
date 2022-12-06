import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import '../index.css'
import Header from '../componets/header';
import Footer from '../componets/footer';

const ProductPage = (props) => {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])
    const [img, setImg] = useState('')
    const [talles, setTalles] = useState([])

    console.log(talles)


    useEffect(() => {

        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/productos/rgg8jmt1fdf87krhjqratzyqy9jp6f/${id}`);
            console.log(response.data)
    
            setProductos(response.data[0].producto)
            setImg(response.data[0].img)
            setTalles(response.data[0].talles)
            setLoading(false)
        }
        cargarMineria();

    }, [id]);
    console.log(productos)

    return (
        <>
            <Header />
            <main className="mainProducto">
                {
                    loading ? (
                        <div className="item">
                            cargando...
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
                                    <div className="BtnProducto">Comprar</div>
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
        </>


    );
}
export default ProductPage;