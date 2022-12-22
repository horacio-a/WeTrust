import React from "react";
import { Link } from "react-router-dom";


const ImgDeco = (props) => {



    return (
        <>

            <div className="conteinerMain">
                <div className="imgContent">
                    <Link className="img1">
                        <img src="img/img1.jpg" alt="Productos destacados"></img>
                        <div className="tituloImg">PRODUCTOS DESTACADOS</div>
                    </Link>
                    <Link to={'/categorias/shoe'} className="img2">
                        <img src="img/img2.webp" alt="sneakers"></img>
                        <div className="tituloImg2">sneakers</div>

                    </Link>
                    <Link to={'/categorias/clothing'} className="img3">
                        <img src="img/img3.webp" alt="indumentaria"></img>
                        <div className="tituloImg2">indumentaria</div>

                    </Link>
                    <Link to={'/categorias/accessories'} className="img4">
                        <img src="img/img4.jpeg" alt="accesorios"></img>
                        <div className="tituloImg">accesorios</div>


                    </Link>
                </div>
            </div>

        </>



    )

}

export default ImgDeco;