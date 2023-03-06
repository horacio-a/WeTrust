import axios from "axios";
import React, { useRef, useState } from "react";
import emailjs from 'emailjs-com'


const LoginComponent = ({ envioLogin, setCart }) => {

    const formLogin = useRef();
    const formRegister = useRef();
    const [Sending, setSendig] = useState(false)
    const [SndStep, setSndStep] = useState(false)
    const [ValueRegister, setValueRegister] = useState({
        user: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone_number: '',
        name: '',
        lastname: '',
        DNI: '',
        birth_date: ''
    })
    const [TypeForm, setTypeForm] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState('')
    const [VisiblePassword, setVisiblePassword] = useState({
        pass1: true,
        pass2: true,
        pass3: true
    })





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
        } else {
            setErrorMsg('El nombre de usuario ' + formLogin.current.name.value + ' no está registrado en este sitio')
        }
        setTimeout(() => {
            setErrorMsg('')
        }, 6500);
    }


    const SubtimFirstRegister = () => {
        if (ValueRegister.password !== ValueRegister.confirmPassword && ValueRegister.email !== ValueRegister.confirmEmail) {
            setErrorMsg('contraseña y email no coincide ')
        } else if (ValueRegister.password !== ValueRegister.confirmPassword) {
            setErrorMsg('contraseña no coincide ')
        } else if (ValueRegister.email !== ValueRegister.confirmEmail) {
            setErrorMsg('email no coincide ')
        } else {
            setSndStep(true)
            console.log(ValueRegister.user, ValueRegister.email, ValueRegister.password)
        }
    }


    const SubmitRegisterRequest = async (e) => {

        const user = ValueRegister.user
        const password = ValueRegister.password
        const email = ValueRegister.email
        const address = ValueRegister.address
        const phone_number = ValueRegister.phone_number
        const name = ValueRegister.name
        const lastname = ValueRegister.lastname
        const DNI = ValueRegister.DNI
        const birth_date = ValueRegister.birth_date

        const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/create/user/${user}/password/${password}/email/${email}/token/${process.env.REACT_APP_API_KEY}`)
        if (response.data === 'Cuenta creada') {
            let templateParams = {
                to_name: user,
                to_email: email,
                url: 'url'
            }
            console.log(process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE_CONFIRM,
                templateParams,
                process.env.REACT_APP_APIPUBLIC)
            emailjs.send(
                process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE_CONFIRM,
                templateParams,
                process.env.REACT_APP_APIPUBLIC
            ).then((result) => {
                console.log(result.text);
            });

        } else {
            console.log(response.data)
            setErrorMsg(response.data)
        }



    }


    const handleInputChange = (event) => {
        setValueRegister({
            ...ValueRegister,
            [event.target.name]: event.target.value
        })
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
                            <div className="conteinerInputPassword">
                                <input type={`${VisiblePassword.pass1 ? 'password' : 'text'}`} placeholder={'contraseña'} name={'password'}></input>
                                <i className={`fa-solid ${VisiblePassword.pass1 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                    ChangeStateVisiblePassword('pass1')
                                }}></i>
                            </div>
                            <div className="conteinerErrorLogin">
                                {ErrorMsg}
                            </div>
                            <input type={'submit'} className='button' ></input>
                        </form>
                    </>
                    : <>
                        {
                            !SndStep
                                ? <>
                                    <form className='formLogin' ref={formRegister}>
                                        <input type={'text'} placeholder={'nombre'} name={'user'} onChange={handleInputChange}></input>
                                        <input type={'email'} placeholder={'email'} name={'email'} onChange={handleInputChange}></input>
                                        <input type={'email'} placeholder={'Confirmar email'} name={'confirmEmail'} onChange={handleInputChange} />

                                        <div className="conteinerInputPassword">
                                            <input type={`${VisiblePassword.pass2 ? 'password' : 'text'}`} placeholder={'contraseña'}
                                            name={'password'} onChange={handleInputChange} autoComplete='off' />
                                            <i className={`fa-solid ${VisiblePassword.pass2 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                                ChangeStateVisiblePassword('pass2')
                                            }}></i>
                                        </div>

                                        <div className="conteinerInputPassword">
                                            <input type={`${VisiblePassword.pass3 ? 'password' : 'text'}`} placeholder={'Confirmar contrseña'}
                                            name={'confirmPassword'} onChange={handleInputChange} autoComplete='off' />
                                            <i className={`fa-solid ${VisiblePassword.pass3 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                                ChangeStateVisiblePassword('pass3')
                                            }}></i>
                                        </div>


                                        <div onClick={SubtimFirstRegister} className='button' >Siguiente paso</div>
                                        <div>{ErrorMsg}</div>
                                    </form>
                                </>
                                : <>

                                    <form className='formStep2'>
                                        <div className='rowFormInfo'>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo'>Nombre</div>
                                                <input type={'text'} placeholder={'Nombre'} name={'name'} onChange={handleInputChange} />
                                            </div>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo'>Apellido</div>
                                                <input type={'text'} placeholder={'Apellido'} name={'lastname'} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className='rowFormInfo'>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo'>E-mail</div>
                                                <input type={'text'} placeholder={'Email@gmail.com'} name={'email'} onChange={handleInputChange} />
                                            </div>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo '>DNI</div>
                                                <input type={'text'} placeholder={'99.999.999 - sin puntos'} name={'DNI'} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className='rowFormInfo'>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo'>Telefono</div>
                                                <input type={'text'} placeholder={'011-570-7123'} name={'phone_number'} onChange={handleInputChange} />
                                            </div>
                                            <div className='columnInfo'>
                                                <div className='TitleInfo'>Fecha de nacimiento</div>
                                                <input type={'text'} placeholder={'01/01/2001'} name={'birth_date'} onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        {Sending
                                            ? <div className="btnSendPass">
                                                <div class="wrap">
                                                    <div class="spinner"></div>
                                                </div>
                                            </div>
                                            : <div className="btnSendPass" onClick={() => {
                                                setSendig(true)
                                                // SubmitRegisterRequest()
                                                setTimeout(() => {
                                                    setSendig(false)
                                                }, 1000);

                                            }} > Enviar </div>
                                        }

                                    </form>
                                </>
                        }
                    </>
            }

        </>


    )

}

export default LoginComponent;