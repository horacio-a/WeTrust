import React, { useState, useEffect } from "react";
import axios from "axios";
import CardIndex from "./cardindex";


const CarruselIndex = (props) => {

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState([])
    useEffect(() => {
        const cargarMineria = async () => {
            setLoading(true);
            const response = await axios.get('https://copordrop-api.herokuapp.com/api/productos/rgg8jmt1fdf87krhjqratzyqy9jp6f');
            for (let index = 0; index < response.data.length; index++) {
                // console.log(response.data[index].talles)

            }
            setProductos(response.data)
            setLoading(false)
        }
        cargarMineria();

    }, []);
    console.log(productos)

    return (
        <>
            <div className="conteiner-main">
                <div className="titulo-main">
                    PRODUCTOS DESTACADOS
                </div>
                <div className="Carrusel-index">
                    {
                        loading ? (
                            <div className="item">
                                <i className="loader --1"></i>
                            </div>
                        ) : (

                            productos.map(item => <CardIndex
                                key={item.produto.id}
                                id ={item.produto.id}
                                num={item}
                                name={item.produto.name}
                                price={item.produto.price}
                                img={item.img}
                                category= {item.produto.category}
                                talles={item.talles}
                            />)
                        )
                    }
                </div>


            </div>

        </>



    )

}

export default CarruselIndex;