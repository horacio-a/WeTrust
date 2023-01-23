import axios from "axios";
import React, { useRef, useState } from "react";


const LoginComponent = ({ envioLogin, setCart }) => {

    const formLogin = useRef();
    const formRegister = useRef();

    const [TypeForm, setTypeForm] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState('')


    const SubmitLoginRequest = async (e) => {
        e.preventDefault();

        const user = formLogin.current.name.value
        const password = formLogin.current.password.value
        const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/login/user/${user}/password/${password}/token/${process.env.REACT_APP_API_KEY}`)
        console.log()
        if (response.data[0].authenticated === true) {
            window.localStorage.setItem(
                'LoggedAppUser', JSON.stringify(response.data[1])
            )
            setCart()
            envioLogin()
        }else{
            setErrorMsg('Usuario no encontrado')
        }
    }

    const SubmitRegisterRequest = async (e) => {
        e.preventDefault();

        const user = formRegister.current.name.value
        const password = formRegister.current.password.value
        const Confirmarpassword = formRegister.current.Confirmarpassword.value
        const email = formRegister.current.email.value
        const Confirmaremail = formRegister.current.Confirmaremail.value

        if(password !== Confirmarpassword && email !== Confirmaremail ){
            setErrorMsg('contraseña y email no coincide ')
        }else if(password !== Confirmarpassword){
            setErrorMsg('contraseña no coincide ')
        }else if(email !== Confirmaremail){
            setErrorMsg('email no coincide ')
        }else{
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/create/user/${user}/password/${password}/email/${email}/token/${process.env.REACT_APP_API_KEY}`)
            if(response.data === 'Cuenta creada'){
                window.location.href = '/'
            }else{
                setErrorMsg(response.data)
            }
            
        }

    }


    const ChangeformLogin = async () => {

            setTypeForm(true)
    }
    const ChangeformRegister = async () => {

        setTypeForm(false)
}

    return (

        <>
            <div className="blockButtonOptions">
                <div className="blockUnitButtonOptions ">
                <div className={`buttonOptions ${TypeForm === true ? 'Active' : 'notActive'} `} onClick={ChangeformLogin}>login</div>
                </div>
                <div className="blockUnitButtonOptions " >
                <div className={`buttonOptions ${TypeForm === false ? 'Active' : 'notActive'} `} onClick={ChangeformRegister}>register</div>
                </div>
            </div>
            {
                TypeForm
                    ? <>
                        <form onSubmit={SubmitLoginRequest} className='formLogin' ref={formLogin}>
                            <input type={'text'} placeholder={'nombre'} name={'name'}></input>
                            <input type={'password'} placeholder={'contraseña'} name={'password'}></input>
                            <input type={'submit'} className='button' ></input>
                        </form>
                    </>
                    : <>
                        <form onSubmit={SubmitRegisterRequest} className='formLogin' ref={formRegister}>
                            <input type={'text'} placeholder={'nombre'} name={'name'}></input>
                            <input type={'email'} placeholder={'email'} name={'email'}></input>
                            <input type={'email'} placeholder={'Confirmar email'} name={'Confirmaremail'}></input>
                            <input type={'password'} placeholder={'contraseña'} name={'password'}autoComplete='off'/>
                            <input type={'password'} placeholder={'Confirmar contrseña'} name={'Confirmarpassword'} autoComplete='off'/> 

                            <input type={'submit'} className='button' ></input>
                        </form>
                    </>
            }
            <div>{ErrorMsg}</div>

        </>


    )

}

export default LoginComponent;