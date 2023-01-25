import React, { useEffect, useState } from 'react';

const EditPassword = () => {

    const [Edit, setEdit] = useState(false)
    const [ChangePassword, setChangePassword] = useState(false)
    const [ChangeInfo, setChangeInfo] = useState(false)

    const [LoggedUserJSON, setLoggedUserJSON] = useState(false)

    useEffect(() => {
        setLoggedUserJSON(JSON.parse(window.localStorage.getItem('LoggedAppUser')))
    }, [])

    return (

        <>
            <div className={`conteinerInfo ${Edit ? 'deactive' : 'active'}`}>
                <div className='conteinerTitle'>
                    <div className='tituloChangePassword'> Informacion personal</div>

                    <div className='btnChangePassword' onClick={() => {
                        setEdit(true)
                        setChangeInfo(true)
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
                }}>Editar </div>
            </div>



            <div className={`ChangeInfoConteiner ${ChangeInfo ? 'active' : 'deactive'}`}>
                <i className="fa-solid fa-xmark" onClick={() => {
                    setEdit(false)
                    setChangeInfo(false)
                }}></i>

                info
            </div>


            <div className={`ChangePasswordConteiner ${ChangePassword ? 'active' : 'deactive'}`}>
                <i className="fa-solid fa-xmark" onClick={() => {
                    setEdit(false)
                    setChangePassword(false)
                }}></i>
                password
            </div>
        </>

    )

}

export default EditPassword;