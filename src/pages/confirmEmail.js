import React, { useEffect, useState } from "react";
import Header from '../componets/general/header';
import Footer from "../componets/general/footer";
import '../index.css'
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import emailjs from 'emailjs-com'


const ConfirmEmail = ({ ShoppingCart, setShoppingCart, setSearchState, SearchState }) => {
    const { token } = useParams()
    const [msg, setmsg] = useState('')
    const email = window.localStorage.getItem('TemporalEmail')


    const reeenviarEmail = async () => {
        toast.dismiss();
        if ((Math.round(new Date().getTime() / 1000) - Number(localStorage.getItem("EmailTimeSend"))) > 300) {
            const dataToSend = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/resendauthcod/email/${email}/token/${process.env.REACT_APP_API_KEY}`)
            toast.success('El email fue enviado')
            window.localStorage.setItem('EmailTimeSend', Math.round(new Date().getTime() / 1000))
            console.log(dataToSend.data)
            let templateParams = {
                Subject: 'Confirmar Email WeTrust',
                to_name: dataToSend.data.user,
                to_email: email,
                authCod: dataToSend.data.authCod,
                confirm_url: process.env.REACT_APP_FRONTPAGE+'/user/confirm/' + dataToSend.data.authCod
            }
            emailjs.send(
                process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE_CONFIRM,
                templateParams,
                process.env.REACT_APP_APIPUBLIC
            ).then((result) => {
                console.log(result.text);

            });

        } else {
            function segundosAMinutos(segundos) {
                var minutos = Math.floor(segundos / 60);
                var segundosRestantes = segundos % 60;
                var resultado = minutos + ":" + (segundosRestantes < 10 ? "0" : "") + segundosRestantes;
                return resultado;
            }

            toast.error('Para volver a enviar espera ' + segundosAMinutos(-(-(Number(localStorage.getItem("EmailTimeSend")) - (Math.round(new Date().getTime() / 1000))) - 300)))
        }
    }

    const confimarEmail = async () => {
        const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/checkcod/email/${email}/cod/${token}/token/${process.env.REACT_APP_API_KEY}`)
        if (response.data.confimation === true) {
            window.location.replace('/user')
        }else{
            window.location.replace('/user/confirm/error')

        }
    }


    return (
        <>
            <Header setSearchState={setSearchState} SearchState={SearchState} />

            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>

                <div className="mainConfirm">



                    {token === 'error'
                        ? <></>
                        : (token === 'add'
                            ?
                            <div className="containerConfirm">
                                <div className="TxtConfirmacion">
                                    <h1> Solo queda un paso </h1>
                                    <div className="txt">solo queda confirmar tu cuenta</div>
                                    <div className="txt">Ve a tu email {email}, nosotros ya te enviamos un mail </div>
                                    <div className="btnReenviar" onClick={() => {
                                        reeenviarEmail()
                                    }}>Reenviar el email</div>
                                    <div className="txt">{msg}</div>
                                </div>
                            </div>

                            : <>
                                <div className="TxtConfirmacion2">
                                    <h1> ¡Bienvenido a weTrust! </h1>
                                    <div className="txt"> Confirma en un click </div>
                                    <div className="btnReenviar" onClick={() => {
                                        confimarEmail()
                                    }}> Confirmar </div>
                                </div>
                            </>)
                    }
                </div>

                <Footer />
            </div>
            <Toaster />

        </>


    );
}
export default ConfirmEmail;