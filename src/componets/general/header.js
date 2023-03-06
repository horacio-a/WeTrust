import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import EnviosGratis from './EnviosGratis';
import Search from "../Search";

const Header = ({ setSearchState, SearchState }) => {

    const [MarcaHeader, setMarcaHeader] = useState(false)
    const [CategoriaHeader, setCategoriaHeader] = useState(false)
    const [marcas, setMarcas] = useState([])


    useEffect(() => {
        const cargarMarcar = async () => {
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/api/marcas/token/${process.env.REACT_APP_API_KEY}`);
            console.log(response)
            setMarcas(response.data)
        }
        cargarMarcar()
    }, [setMarcas])


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
            <div className={`Header  ${SearchState ? 'Deactivated' : 'Active'}`}>
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
                            <div className="search" onClick={() => {
                                setSearchState(true)

                            }}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>

                            <Link to={'/cart'}>
                                <i className="fa-solid fa-cart-shopping"></i>

                            </Link>
                            <Link to={'/user'}>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        </div>
                    </header>
                    <div className={` MarcaHeader ${MarcaHeader ? " active" : ''}`} >
                        <div className="conteinerInfoHeader">
                            <div className="unidadConteiner">
                                <div className="tituloHeader" >
                                    Marcas
                                </div>
                                {
                                    marcas.map(item => {
                                        return (
                                        <Link to={`/marca/${item}`} className="categorioHeader" onClick={HeaderMarcaFuntion}>
                                            <i className="fa-solid fa-caret-right"></i>
                                            <div>{item}</div>
                                        </Link>)
                                    })      
                                }
                            </div>

                        </div>

                    </div>
                    <div className={` CategoriaHeader ${CategoriaHeader ? " active" : ''}`} >
                        <div className="conteinerInfoHeader">
                            <div className="unidadConteiner">
                                <Link to={'/categorias/accessories'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                    Accesorios
                                </Link>
                                <Link to={'/subcategorias/anteojos'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Anteojos</div>
                                </Link>
                                <Link to={'/subcategorias/bolsos'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Bolsos</div>
                                </Link>
                                <Link to={'/subcategorias/ceniceros'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Ceniceros</div>
                                </Link>
                                <Link to={'/subcategorias/encendedores'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Encendedores</div>
                                </Link>
                                <Link to={'/subcategorias/gorros'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Gorros/Gorras</div>
                                </Link>
                                <Link to={'/subcategorias/juguetes'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Juguetes</div>
                                </Link>
                            </div>
                            <div className="unidadConteiner">
                                <Link to={'/categorias/clothing'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                    Indumentaria
                                </Link>
                                <Link to={'/subcategorias/Camperas'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Camperas</div>
                                </Link>
                                <Link to={'/subcategorias/Hoodies'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Hoodies</div>
                                </Link>
                                <Link to={'/subcategorias/Pantalones'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Pantalones</div>
                                </Link>
                                <Link to={'/subcategorias/Remeras'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Remeras</div>
                                </Link>
                                <Link to={'/subcategorias/Shorts'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Shorts</div>
                                </Link>
                                <Link to={'/subcategorias/Underwear'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Underwear</div>
                                </Link>
                            </div>
                            <div className="unidadConteiner">
                                <Link to={'/categorias/shoe'} className="tituloHeader" onClick={CategoriaHeaderFuntion}>
                                    Sneakers
                                </Link>
                                <Link to={'/subcategorias/sneakers'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Sneakers</div>
                                </Link>
                                <Link to={'/subcategorias/Slides'} className="categorioHeader" onClick={CategoriaHeaderFuntion}>
                                    <i className="fa-solid fa-caret-right"></i>
                                    <div>Slides</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="backconteiner"></div>


            </div >

            <div className={`Search  ${SearchState ? 'Active' : 'Deactivated'}`}>
                <Search setSearchState={setSearchState} SearchState={SearchState} />
            </div>
        </>

    )

}

export default Header;