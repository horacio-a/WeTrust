import React from "react";
import { Link } from "react-router-dom";


const Footer = (props) => {



    return (
        <>
            <footer>
                <div className="conteinerFooter1">
                    <div className="conteiner">
                        <div className="tituloFooter">
                            CONTACTO
                        </div>
                        <ul>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                    wetrust@gmail.com
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                @wetrust
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                +54 011 5787185
                            </li>

                        </ul>
                    </div>
                    <div className="conteiner">
                        <div className="tituloFooter">
                            MENU
                        </div>
                        <ul>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Sneakers
                                </Link>
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Plichas
                                </Link>
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Accesorios
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="conteinerImg">
                    <img src="/img/logoswhite.png" alt="logo We Trust"></img>

                </div>
                <div className="conteinerFooter2">
                    <div className="conteiner">
                        <div className="tituloFooter">
                            MEDIOS DE PAGO
                        </div>
                        <img src="/img/mediosdepagos.png" alt="medios de pagos"></img>
                    </div>
                    <div className="conteiner">
                        <div className="tituloFooter">
                            SOPORTE
                        </div>
                        <ul>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Políticas de devoluciones
                                </Link>
                            </li>
                            <li>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Preguntas frecuentes
                                </Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </footer>


        </>



    )

}

export default Footer;