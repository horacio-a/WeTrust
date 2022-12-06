import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {



    return (
        <>
            <header>
                <div className="conteiner-links">
                    <Link to={'/marcas'} className="links">
                        MARCAS
                        <i className="fa-solid fa-caret-down"></i>
                    </Link >
                    <Link to={'/categorias'} className="links">
                        CATEGORIAS
                        <i className="fa-solid fa-caret-down"></i>
                    </Link>
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


        </>



    )

}

export default Header;