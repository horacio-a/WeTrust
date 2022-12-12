import React, { useState } from "react";
import { Link } from "react-router-dom";

import EnviosGratis from '../componets/EnviosGratis';

const Header = (props) => {

    const [MarcaHeader, setMarcaHeader] = useState(false)
    const [CategoriaHeader, setCategoriaHeader] = useState(false)

    const HeaderMarcaFuntion = () => {
        if (MarcaHeader === true) {
            setMarcaHeader(false)
        } else {
            setMarcaHeader(true)
            setCategoriaHeader(false)

        }
    }


    const CategoriaHeaderFuntion = () => {
        if (CategoriaHeader === true) {
            setCategoriaHeader(false)
        } else {
            setCategoriaHeader(true)
            setMarcaHeader(false)

        }
    }



    return (
        <>
            <div className="conteinerMainHeader">
            <EnviosGratis />

                <header>
                    <div className="conteiner-links">
                        <div className="links" onClick={HeaderMarcaFuntion}>
                            MARCAS
                            <i className={` ${MarcaHeader ? " fa-solid fa-caret-up" : 'fa-solid fa-caret-down'}`}></i>

                        </div>
                        <div className="links" onClick={CategoriaHeaderFuntion}>
                            CATEGORIAS
                            <i className={` ${CategoriaHeader ? " fa-solid fa-caret-up" : 'fa-solid fa-caret-down'}`} ></i>

                        </div>

                        <Link to={'/nosotros'} className="links">
                            NOSOTROS
                        </Link>
                        <Link to={'/contacto'} className="links">
                            CONTACTO
                        </Link>
                    </div>
                    <div className="conteinerimgIncio">
                        <Link to={'/'} className="linkInicio">
                            <img src="/img/logowhite.png" alt="wetrust Logo"></img>
                        </Link>
                    </div>
                    <div className="icons">
                        <Link to={'/serch'}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        <Link to={'/buy'}>
                            <i className="fa-solid fa-cart-shopping"></i>

                        </Link>
                        <Link to={'/user'}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </div>
                </header>
                <div className={` MarcaHeader ${MarcaHeader ? " active" : ''}`} >


                </div>
                <div className={` CategoriaHeader ${CategoriaHeader ? " active" : ''}`} >
                    <div className="conteinerInfoHeader">
                        <div className="unidadConteiner">
                            <Link to={'/categorias/accessories'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                Accesorios
                            </Link>
                            <Link to={'/categorias/accessories/anteojos'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Anteojos</div>
                            </Link>
                            <Link to={'/categorias/accessories/bolsos'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Bolsos</div>
                            </Link>
                            <Link to={'/categorias/accessories/ceniceros'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Ceniceros</div>
                            </Link>
                            <Link to={'/categorias/accessories/encendedores'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Encendedores</div>
                            </Link>
                            <Link to={'/categorias/accessories/gorros'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Gorros/Gorras</div>
                            </Link>
                            <Link to={'/categorias/accessories/juguetes'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Juguetes</div>
                            </Link>
                        </div>
                        <div className="unidadConteiner">
                            <Link to={'/categorias/clothing'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                Indumentaria
                            </Link>
                            <Link to={'/categorias/clothing/Camperas'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Camperas</div>
                            </Link>
                            <Link to={'/categorias/clothing/Hoodies'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Hoodies</div>
                            </Link>
                            <Link to={'/categorias/clothing/Pantalones'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Pantalones</div>
                            </Link>
                            <Link to={'/categorias/clothing/Remeras'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Remeras</div>
                            </Link>
                            <Link to={'/categorias/clothing/Shorts'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Shorts</div>
                            </Link>
                            <Link to={'/categorias/clothing/Underwear'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Underwear</div>
                            </Link>
                        </div>
                        <div className="unidadConteiner">
                            <Link to={'/categorias/shoe'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                Sneakers
                            </Link>
                            <Link to={'/categorias/clothing/sneakers'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Sneakers</div>
                            </Link>
                            <Link to={'/categorias/clothing/Slides'} className="categorioHeader">
                                <i className="fa-solid fa-caret-right"></i>
                                <div>Slides</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backconteiner"></div>

        </>




    )

}

export default Header;