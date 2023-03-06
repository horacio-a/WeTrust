import React, { useState, useEffect } from "react";
import axios from "axios";
import CardProduct from "../componets/cardProduct";
import { Element } from "react-scroll";


const CarruselIndex = (props) => {

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])
    useEffect(() => {
        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/productos/destacados/token/${process.env.REACT_APP_API_KEY}`);

            setProductos(response.data)
            setLoading(false)
        }
        cargarMineria();

    }, []);

    return (
        <>
            <div name="myScrollToElement" id='ContainerElementID' className="conteiner-main">
                <div className="titulo-main" id="destacado">
                    PRODUCTOS DESTACADOS
                </div>
                {
                    loading ?
                        (
                            <div className="item">
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        ) :
                        (
                            <div className="carrusel-products">

                                {productos.map(item => <CardProduct
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


            </div>

        </>



    )

}

export default CarruselIndex;