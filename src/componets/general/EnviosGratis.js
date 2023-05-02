import React, { useState } from "react";
import { Link } from "react-router-dom";


const EnviosGratis = ({ state, animation, closeHead }) => {



    return (

        <>
            <div className={`BlockEnvio ${animation ? 'animation' : 'noanimation '} ${state ? 'active' : 'desactive'}`}>
                <div className="textBlockEnvio">
                    <i className="fa-sharp fa-solid fa-truck-fast"></i>
                    Envios a todo el pais. Pagá con el método de pago que prefieras.
                </div>

                <div className="CloseHead" onClick={() => { closeHead() }}><i className="fa-sharp fa-solid fa-x"></i> </div>
            </div>
        </>


    )

}

export default EnviosGratis;