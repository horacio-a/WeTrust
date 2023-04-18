import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import emailjs from 'emailjs-com'


const LoginComponent = ({ envioLogin, setCart }) => {

    const formLogin = useRef();
    const formRegister = useRef();
    const [Sending, setSendig] = useState(false)
    const [SndStep, setSndStep] = useState(false)
    const [ThdStep, setThdStep] = useState(false)

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


    useEffect(() => {
        let istrue = window.localStorage.getItem('AlreadyRegistered')
        if (istrue === 'true') {
            setTypeForm(true)
        }
        if (istrue === null) {
            setTypeForm(false)
        }
    }, [])


    const SubmitLoginRequest = async () => {

        const obj = JSON.stringify({
            user: formLogin.current.name.value,
            password: formLogin.current.password.value
        })

        const response = await axios.post(`${process.env.REACT_APP_PAGE}/usuarios/login/token/${process.env.REACT_APP_API_KEY}`, {obj})
        console.log(response)

        if (response.data[0].authenticated === true) {
            window.localStorage.setItem(
                'LoggedAppUser', JSON.stringify(response.data[1])
            )
            window.localStorage.setItem('TimeSession', Math.round(new Date().getTime() / 1000))
            window.localStorage.setItem('AlreadyRegistered', true)
            setCart()
            envioLogin()
        } else {
            setErrorMsg(response.data[0].data)
        }
        setTimeout(() => {
            setErrorMsg('')
        }, 6500);

    }


    const SubtimFirstRegister = async () => {
        const user = ValueRegister.user
        const email = ValueRegister.email
        const obj = JSON.stringify({
            user: user,
            email: email
        })
        const response = await axios.post(`${process.env.REACT_APP_PAGE}/usuarios/IsUserRepeted/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (ValueRegister.password !== ValueRegister.confirmPassword && ValueRegister.email !== ValueRegister.confirmEmail) {
            setErrorMsg('contraseña y email no coincide ')
        } else if (ValueRegister.password !== ValueRegister.confirmPassword) {
            setErrorMsg('contraseña no coincide ')
        } else if (ValueRegister.email !== ValueRegister.confirmEmail) {
            setErrorMsg('email no coincide ')
        }
        if (response.data.state === false) {
            setSndStep(true)
        } else {
            setErrorMsg(response.data.data)

        }
    }


    const SubmitRegisterRequest = async (e) => {

        CheckRegisterData()
        if (CheckRegisterData() === true) {

            var obj = JSON.stringify(ValueRegister)
            const response = await axios.post(`${process.env.REACT_APP_PAGE}/usuarios/create/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.data === 'Cuenta creada') {
                let templateParams = {
                    to_name: ValueRegister.name,
                    to_email: ValueRegister.email,
                    authCod: response.data.authCod,
                }
                emailjs.send(
                    process.env.REACT_APP_SERVICE,
                    process.env.REACT_APP_TEMPLATE_CONFIRM,
                    templateParams,
                    process.env.REACT_APP_APIPUBLIC
                ).then((result) => {
                    console.log(result.text);

                });
                window.localStorage.setItem('TemporalEmail', ValueRegister.email)
                window.location.replace('/user/confirm/add')
            }

        }

    }

    const CheckRegisterData = () => {
        var Checkgood = true

        if (ValueRegister.address === '') {
            setErrorMsg('Ingrese una direccion')
            Checkgood = false
        }
        if (ValueRegister.birth_date === '') {
            setErrorMsg('Ingrese una fecha de cumpleaños')
            Checkgood = false
        }
        if (ValueRegister.DNI === '') {
            setErrorMsg('Ingrese un DNI')
            Checkgood = false
        }

        if (ValueRegister.phone_number === '') {
            setErrorMsg('Ingrese un numero de telefono')
            Checkgood = false
        }
        if (ValueRegister.lastname === '') {
            setErrorMsg('Ingrese un Apellido')
            Checkgood = false
        }
        if (ValueRegister.lastname === '') {
            setErrorMsg('Ingrese un Apellido')
            Checkgood = false
        }
        if (ValueRegister.name === '') {
            setErrorMsg('Ingrese un nombre')
            Checkgood = false
        }



        if (Checkgood === true) {
            setThdStep(true)
            return true
        }

        setTimeout(() => {
            setErrorMsg('')
        }, 2500);

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
                        <form className='formLogin' ref={formLogin}>
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
                            <div onClick={() => { SubmitLoginRequest() }} className='button' >Enviar</div>
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


                                        <div onClick={() => {
                                            SubtimFirstRegister()
                                        }} className='button' >Siguiente paso</div>
                                        <div className="conteinerErrorLogin">
                                            {ErrorMsg}
                                        </div>
                                    </form>
                                </>
                                : <> {
                                    !ThdStep
                                        ? <>

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
                                                        <div className='TitleInfo'>Telefono</div>
                                                        <input type={'text'} placeholder={'011-570-7123'} name={'phone_number'} onChange={handleInputChange} />
                                                    </div>
                                                    <div className='columnInfo'>
                                                        <div className='TitleInfo '>DNI</div>
                                                        <input type={'text'} placeholder={'99.999.999 - sin puntos'} name={'DNI'} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className='rowFormInfo'>

                                                    <div className='columnInfo'>
                                                        <div className='TitleInfo'>Fecha de nacimiento</div>
                                                        <input type={'text'} placeholder={'01/01/2001'} name={'birth_date'} onChange={handleInputChange} />
                                                    </div>
                                                    <div className='columnInfo'>
                                                        <div className='TitleInfo'>Direccion</div>
                                                        <input type={'text'} placeholder={'Calle y numero'} name={'address'} onChange={handleInputChange} />
                                                    </div>
                                                </div>

                                                {Sending
                                                    ? <div className="btnSendPass">
                                                        <div class="wrap">
                                                            <div class="spinner"></div>
                                                        </div>
                                                    </div>
                                                    : <div className="btnSendPass" onClick={() => {
                                                        SubmitRegisterRequest()
                                                    }} > Crear la cuenta </div>
                                                }
                                                <div className="conteinerErrorLogin">
                                                    {ErrorMsg}
                                                </div>
                                            </form>
                                        </>
                                        : <>
                                            <div className="conteinerErrorLogin">
                                                {ErrorMsg}
                                            </div>
                                        </>
                                }
                                </>
                        }
                    </>
            }

        </>


    )

}

export default LoginComponent;