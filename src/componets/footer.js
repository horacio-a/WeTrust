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
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                    wetrust@gmail.com
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                @wetrust
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                +54 011 5787185
                            </div>

                        </ul>
                    </div>
                    <div className="conteiner">
                        <div className="tituloFooter">
                            MENU
                        </div>
                        <ul>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Inicio
                                </Link>
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Sneakers
                                </Link>
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Pilchas
                                </Link>
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Accesorios
                                </Link>
                            </div>
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
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Políticas de devoluciones
                                </Link>
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                                <Link>
                                    Preguntas frecuentes
                                </Link>
                            </div>


                        </ul>
                    </div>
                </div>
            </footer>


        </>



    )

}

export default Footer;