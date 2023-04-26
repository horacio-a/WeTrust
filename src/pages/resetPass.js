import axios from "axios";
import React, { useEffect, useState } from "react";
import emailjs from 'emailjs-com'
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = ({ setSearchState, SearchState }) => {
    useEffect(()=>{
        const LoggedAppUser = window.localStorage.getItem('LoggedAppUser')
        if(LoggedAppUser){
            window.location.replace('/user')
        }
    },[])
    const [value, setvalue] = useState({
        email: ''
    })

    const [send, setSend] = useState(false)
    const [msgError, setmsgError] = useState('')


    const sendResetPassword = async () => {

        if ((Math.round(new Date().getTime() / 1000) - Number(localStorage.getItem("forgetpasswordTime"))) > 0) {
            if (value.email !== '') {
                toast.dismiss();
                //Encaso de que el email no este vacio
                const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/checkemail/${value.email}/token/${process.env.REACT_APP_API_KEY}`)
                if (response.data.response === 'Email no registrado') {
                    // Encaso de que el mail no exista
                    setmsgError(response.data.response)
                    setTimeout(() => {
                        setmsgError('')
                    }, 2000);
                }
                if (response.data.response === 'Email Existente') {
                    // Encaso de que el mail si exista
                    window.localStorage.setItem('forgetpasswordTime', Math.round(new Date().getTime() / 1000))

                    let templateParams = {
                        Subject: 'Cambiar tu contraseña',
                        to_name: response.data.user,
                        to_email: value.email,
                        authCod: response.data.authCod,
                        confirm_url: process.env.REACT_APP_FRONTPAGE + '/user/password/reset/' + response.data.authCod + '/' + response.data.user,
                        Email_data: '¡Recupera tu cuenta Con el email ' + value.email + ' haciendo clic en el botón de abajo!'
                    }
                    // templateParams tiene los datos a enviar con la libreria emailjs
                    emailjs.send(
                        process.env.REACT_APP_SERVICE,
                        process.env.REACT_APP_TEMPLATE_CONFIRM,
                        templateParams,
                        process.env.REACT_APP_APIPUBLIC
                    ).then((result) => {
                        console.log(result.text);
                    });
                    setSend(true)
                }

            } else {
                //Encaso de que el email este vacio

                setmsgError('Ingrese un email para recuperar su cuenta')
                setTimeout(() => {
                    setmsgError('')
                }, 2000);
            }
        } else {
            function segundosAMinutos(segundos) {
                var minutos = Math.floor(segundos / 60);
                var segundosRestantes = segundos % 60;
                var resultado = minutos + ":" + (segundosRestantes < 10 ? "0" : "") + segundosRestantes;
                return resultado;
            }

            toast.error('Para volver a enviar espera ' + segundosAMinutos(-(-(Number(localStorage.getItem("forgetpasswordTime")) - (Math.round(new Date().getTime() / 1000))) - 300)))
        }

    }

    const handleInputChange = (event) => {
        // Recibe el valor del input (event)
        // Define el valor de setvalue depediendo del nombre
        setvalue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>

            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>

                <div className="mainResetPass">
                    <div className="continerImgResetpass">
                        <img src="/img/logowhite.png" onClick={() => {
                            window.location.replace('/')
                        }} />
                    </div>
                    {send
                        ? <>
                            <div className="continerResetpassMsg">
                                <div className="titleResetPass">Ya te enviamos un email</div>
                                <div >En el email que te enviamos vas a poder cambiar tu contraseña</div>
                                <div className="buttonResetpass" onClick={() => {
                                    sendResetPassword()
                                }}>Reenviar</div>
                            </div>
                        </>
                        : <div className="continerResetpass">
                            <div className="titleResetPass">Recupere su contraseña</div>
                            <input type="text" placeholder="Ingrese su email" name="email" className="inputResetPass" onChange={handleInputChange} />
                            <div className="buttonResetpass" onClick={() => {
                                sendResetPassword()
                            }}>Enviar</div>
                            <>{msgError}</>
                        </div>
                    }

                </div>

            </div>
            <Toaster />
        </>
    )

}

export default ResetPassword;