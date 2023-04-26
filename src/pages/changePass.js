import axios from "axios";
import React, { useState, useEffect } from "react";
import emailjs from 'emailjs-com'
import { useParams } from "react-router-dom";

const ChangePass = ({ setSearchState, SearchState }) => {
    useEffect(()=>{
        const LoggedAppUser = window.localStorage.getItem('LoggedAppUser')
        if(LoggedAppUser){
            window.location.replace('/user')
        }
    },[])
    const [value, setvalue] = useState({
        newPass: '',
        newPass2: ''
    })
    const {token} = useParams()
    const {user} = useParams()

    const [Sending, setSendig] = useState(false)
    const [msgError, setmsgError] = useState('')

    const [VisiblePassword, setVisiblePassword] = useState({
        pass1: true,
        pass2: true,
        pass3: true
    })
    const handleInputChange = (event) => {
        // Recibe el valor del input (event)
        // Define el valor de setvalue depediendo del nombre
        setvalue({
            ...value,
            [event.target.name]: event.target.value
        })
    }
    
    const sendNewPassword = async() =>{
        setSendig(true)
        if(value.newPass === value.newPass2){
            const obj = JSON.stringify({
                newPass: value.newPass,
                newPass2: value.newPass2,
                authCod: token,
                user: user
            })
            const response =  await axios.post(`${process.env.REACT_APP_PAGE}/usuarios/forgetpassword/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.data.status === 'contraseña cambiada'){
                window.location.replace('/user')
            }else{
                setmsgError(response.data.status)
            }
        }else{
            setmsgError('No coniciden las contraseñas')
        }
        setSendig(false)

        setTimeout(() => {
            setmsgError('')
        }, 6000);
    }

    const ChangeStateVisiblePassword = (name) => {
        console.log(VisiblePassword[name])
        if (VisiblePassword[name] === true) {
            setVisiblePassword({
                ...VisiblePassword,
                [name]: false
            })
        } else {
            setVisiblePassword({
                ...VisiblePassword,
                [name]: true
            })
        }
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
                    <div className="continerFormPass">
                        <form className='formPassword'  >
                            <div className='rowPassword'>
                                <div className='titleFormPass'>Nueva contraseña</div>
                                <div className='conteinerInput'>
                                    <input name='newPass' type={`${VisiblePassword.pass2 ? 'password' : 'text'}`} onChange={handleInputChange} />
                                    <i className={`fa-solid ${VisiblePassword.pass2 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                        ChangeStateVisiblePassword('pass2')
                                    }}></i>
                                </div>
                            </div>

                            <div className='rowPassword'>
                                <div className='titleFormPass'>Confirmar la contraseña</div>
                                <div className='conteinerInput'>
                                    <input name='newPass2' type={`${VisiblePassword.pass3 ? 'password' : 'text'}`} onChange={handleInputChange} />
                                    <i className={`fa-solid ${VisiblePassword.pass3 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                        ChangeStateVisiblePassword('pass3')
                                    }}></i>
                                </div>
                            </div>
                            <div className="conteinerErrorLogin">{msgError}</div>

                            {Sending
                                ? <div className="btnSendPass">
                                    <div class="wrap">
                                        <div class="spinner"></div>
                                    </div>
                                </div>
                                : <div className="btnSendPass" onClick={() => {
                                    sendNewPassword()


                                }} > Enviar </div>
                            }
                        </form>

                    </div>


                </div>

            </div>
        </>
    )

}

export default ChangePass;