import React, { useRef, useState } from 'react';
import axios from "axios";

const EditPassword = ({ setTitulo }) => {
    const form = useRef()
    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
    const [ErrorMsg, setErrorMsg] = useState('')
    const [Edit, setEdit] = useState(false)
    const [ChangePassword, setChangePassword] = useState(false)
    const [ChangeInfo, setChangeInfo] = useState(false)
    const [Sending, setSendig] = useState(false)
    const [Password, setPassword] = useState({
        oldPass: '',
        newPass1: '',
        newPass2: ''
    })
    const [VisiblePassword, setVisiblePassword] = useState({
        pass1: true,
        pass2: true,
        pass3: true
    })
    const [datos, setDatos] = useState({
        name: LoggedUserJSON.name,
        lastname: LoggedUserJSON.lastname,
        email: LoggedUserJSON.email,
        DNI: LoggedUserJSON.DNI,
        birth_date: LoggedUserJSON.birth_date,
        phone_number: LoggedUserJSON.phone_number
    })

    const setValueForm = () => {
        form.current.name.value = LoggedUserJSON.name
        form.current.lastname.value = LoggedUserJSON.lastname
        form.current.email.value = LoggedUserJSON.email
        form.current.DNI.value = LoggedUserJSON.DNI
        form.current.birth_date.value = LoggedUserJSON.birth_date
        form.current.phone_number.value = LoggedUserJSON.phone_number

    }

    const handleInputInfoChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const sendFormInfo = () => {
        var obj = JSON.stringify(
            {
                data: {
                    name: datos.name,
                    lastname: datos.lastname,
                    email: datos.email,
                    DNI: datos.DNI,
                    birth_date: datos.birth_date,
                    phone_number: datos.phone_number,
                },
                info: {
                    user: LoggedUserJSON.user
                }
            }
        )
        axios.post(`${process.env.REACT_APP_PAGE}/usuarios/edit/infopersonal/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    const sendFormPassword = async () => {
        var obj = JSON.stringify(
            {
                data: {
                    oldPass: Password.oldPass,
                    newPass1: Password.newPass1,
                    newPass2: Password.newPass2
                },
                info: {
                    user: LoggedUserJSON.user
                }
            }
        )

        var response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/edit/password/token/${process.env.REACT_APP_API_KEY}`, {
            headers: {
                obj
            }
        })
        console.log(response.data.alteration)
        if (response.data.alteration === true) {
            window.localStorage.removeItem('LoggedAppUser')
            window.location.replace('');
        } else if (response.data.status === '400') {
            setErrorMsg(response.data.msj)
        }


        setTimeout(() => {
            setSendig(false)
        }, 1000);

        setTimeout(() => {
            setErrorMsg('')
        }, 6500);
    }

    const handleInputPassChange = (event) => {
        setPassword({
            ...Password,
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


    const updateUser = async () => {
        const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/login/user/${LoggedUserJSON.user}/password/admin/token/${process.env.REACT_APP_API_KEY}`)
        console.log(response.data[0])
        if (response.data[0].authenticated === true) {
            window.localStorage.setItem(
                'LoggedAppUser', JSON.stringify(response.data[1])
            )
        }
        window.location.replace('');
    }

    return (

        <>
            <div className={`conteinerInfo ${Edit ? 'deactive' : 'active'}`}>
                <div className='conteinerTitle'>
                    <div className='tituloChangePassword'> Informacion personal</div>

                    <div className='btnChangePassword' onClick={() => {
                        setEdit(true)
                        setChangeInfo(true)
                        setValueForm()

                        setTitulo('Editar tu informacion')
                    }}>Editar </div>
                </div>
                <div className='MainInfo'>
                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>Nombre</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.name}</div>
                    </div>
                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>Apellido</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.lastname}</div>
                    </div>
                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>E-mail</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.email}</div>
                    </div>

                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>DNI</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.DNI}</div>
                    </div>
                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>Numero de telefono</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.phone_number}</div>
                    </div>
                    <div className='unitMainInfo'>
                        <div className='TituloMainInfo'>Fecha de nacimiento</div>
                        <div className='txtMainInfo'>{LoggedUserJSON.birth_date}</div>
                    </div>

                </div>
            </div>

            <div className={`conteinerPassword ${Edit ? 'deactive' : 'active'}`}>
                <div className='tituloChangePassword'> Cambiar tu contraseña</div>
                <div className='btnChangePassword' onClick={() => {
                    setEdit(true)
                    setChangePassword(true)
                    setTitulo('Cambiar tu contraseña')
                }}>Editar </div>
            </div>



            <div className={`ChangeInfoConteiner ${ChangeInfo ? 'active' : 'deactive'}`}>
                <div className='topPassword'>
                    <i className="fa-solid fa-xmark" onClick={() => {
                        setEdit(false)
                        setChangeInfo(false)
                        setTitulo('Tu Cuenta')

                    }}></i>

                </div>

                <form className='formInfo' ref={form}>
                    <div className='rowFormInfo'>
                        <div className='columnInfo'>
                            <div className='TitleInfo'>Nombre</div>
                            <input type={'text'} placeholder={'Nombre'} name={'name'} onChange={handleInputInfoChange} />
                        </div>
                        <div className='columnInfo'>
                            <div className='TitleInfo'>Apellido</div>
                            <input type={'text'} placeholder={'Apellido'} name={'lastname'} onChange={handleInputInfoChange} />
                        </div>
                    </div>
                    <div className='rowFormInfo'>
                        <div className='columnInfo'>
                            <div className='TitleInfo'>E-mail</div>
                            <input type={'text'} placeholder={'Email@gmail.com'} name={'email'} onChange={handleInputInfoChange} />
                        </div>
                        <div className='columnInfo'>
                            <div className='TitleInfo '>DNI</div>
                            <input type={'text'} placeholder={'99.999.999 - sin puntos'} name={'DNI'} onChange={handleInputInfoChange} />
                        </div>
                    </div>
                    <div className='rowFormInfo'>
                        <div className='columnInfo'>
                            <div className='TitleInfo'>Telefono</div>
                            <input type={'text'} placeholder={'011-570-7123'} name={'phone_number'} onChange={handleInputInfoChange} />
                        </div>
                        <div className='columnInfo'>
                            <div className='TitleInfo'>Fecha de nacimiento</div>
                            <input type={'text'} placeholder={'01/01/2001'} name={'birth_date'} onChange={handleInputInfoChange} />
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
                            sendFormInfo()
                            setTimeout(() => {
                                updateUser()
                                setSendig(false)
                            }, 1000);

                        }} > Enviar </div>
                    }

                </form>
            </div>


            <div className={`ChangePasswordConteiner ${ChangePassword ? 'active' : 'deactive'}`}>
                <div className='topPassword'>
                    <i className="fa-solid fa-xmark" onClick={() => {
                        setEdit(false)
                        setChangePassword(false)
                        setTitulo('Tu Cuenta')

                    }}></i>
                </div>
                <form className='formPassword'  >
                    <div className='rowPassword'>
                        <div className='titleFormPass'>Contraseña actual</div>

                        <div className='conteinerInput'>
                            <input name='oldPass' type={`${VisiblePassword.pass1 ? 'password' : 'text'}`} onChange={handleInputPassChange} />
                            <i className={`fa-solid ${VisiblePassword.pass1 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                ChangeStateVisiblePassword('pass1')
                            }}></i>
                        </div>
                    </div>

                    <div className='rowPassword'>
                        <div className='titleFormPass'>Nueva contraseña</div>

                        <div className='conteinerInput'>
                            <input name='newPass1' type={`${VisiblePassword.pass2 ? 'password' : 'text'}`} onChange={handleInputPassChange} />
                            <i className={`fa-solid ${VisiblePassword.pass2 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                ChangeStateVisiblePassword('pass2')
                            }}></i>
                        </div>
                    </div>
                    <div className='rowPassword'>
                        <div className='titleFormPass'>Confirmar la contraseña</div>
                        <div className='conteinerInput'>
                            <input name='newPass2' type={`${VisiblePassword.pass3 ? 'password' : 'text'}`} onChange={handleInputPassChange} />
                            <i className={`fa-solid ${VisiblePassword.pass3 ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => {
                                ChangeStateVisiblePassword('pass3')
                            }}></i>
                        </div>
                    </div>
                    <div className='conteinerErrorPass'>
                        {ErrorMsg}
                    </div>
                    {Sending
                        ? <div className="btnSendPass">
                            <div class="wrap">
                                <div class="spinner"></div>
                            </div>
                        </div>
                        : <div className="btnSendPass" onClick={() => {
                            setSendig(true)
                            sendFormPassword()

                        }} > Enviar </div>
                    }
                </form>
            </div>
        </>

    )

}

export default EditPassword;