import axios from "axios";
import React, { useRef, useState } from "react";

const Direcciones = ({ Billingaddress, Shippingaddress, setTitulo }) => {
    const [typeForm, setTypeForm] = useState('')
    const [editar, setEditar] = useState(false)
    const form = useRef();
    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))


    const [datos, setDatos] = useState({
        name: '',
        lastname: '',
        country: '',
        region: '',
        city: '',
        cod_postal: '',
        email: '',
        phone_num: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }



    const cleanForm = () => {
        form.current.name.value = ''
        form.current.lastname.value = ''
        form.current.country.value = ''
        form.current.region.value = ''
        form.current.city.value = ''
        form.current.cod_postal.value = ''
        form.current.email.value = ''
        form.current.phone_num.value = ''
    }

    const setValueForm = (type) => {
        if (type === 'Billing') {
            form.current.name.value = LoggedUserJSON.billingaddress.name
            form.current.lastname.value = LoggedUserJSON.billingaddress.lastname
            form.current.country.value = LoggedUserJSON.billingaddress.country
            form.current.region.value = LoggedUserJSON.billingaddress.region
            form.current.city.value = LoggedUserJSON.billingaddress.city
            form.current.cod_postal.value = LoggedUserJSON.billingaddress.cod_postal
            form.current.email.value = LoggedUserJSON.billingaddress.email
            form.current.phone_num.value = LoggedUserJSON.billingaddress.phone_num
            setDatos({
                name: LoggedUserJSON.billingaddress.name,
                lastname: LoggedUserJSON.billingaddress.lastname,
                country: LoggedUserJSON.billingaddress.country,
                region: LoggedUserJSON.billingaddress.region,
                city: LoggedUserJSON.billingaddress.city,
                cod_postal: LoggedUserJSON.billingaddress.cod_postal,
                email: LoggedUserJSON.billingaddress.email,
                phone_num: LoggedUserJSON.billingaddress.phone_num
            })
        } else if (type === 'Shipping') {
            form.current.name.value = LoggedUserJSON.shippingaddress.name
            form.current.lastname.value = LoggedUserJSON.shippingaddress.lastname
            form.current.country.value = LoggedUserJSON.shippingaddress.country
            form.current.region.value = LoggedUserJSON.shippingaddress.region
            form.current.city.value = LoggedUserJSON.shippingaddress.city
            form.current.cod_postal.value = LoggedUserJSON.shippingaddress.cod_postal
            form.current.email.value = LoggedUserJSON.shippingaddress.email
            form.current.phone_num.value = LoggedUserJSON.shippingaddress.phone_num
            setDatos({
                name: LoggedUserJSON.shippingaddress.name,
                lastname: LoggedUserJSON.shippingaddress.lastname,
                country: LoggedUserJSON.shippingaddress.country,
                region: LoggedUserJSON.shippingaddress.region,
                city: LoggedUserJSON.shippingaddress.city,
                cod_postal: LoggedUserJSON.shippingaddress.cod_postal,
                email: LoggedUserJSON.shippingaddress.email,
                phone_num: LoggedUserJSON.shippingaddress.phone_num
            })
        }
    }

    const sendForm = () => {
        cleanForm()
        setEditar(false)
        var obj = JSON.stringify({
            data: {
                name: datos.name,
                lastname: datos.lastname,
                country: datos.country,
                region: datos.region,
                city: datos.city,
                cod_postal: datos.cod_postal,
                email: datos.email,
                phone_num: datos.phone_num,
            },
            info: {
                type: typeForm,
                user: LoggedUserJSON.user
            }
        })

        axios.post(`${process.env.REACT_APP_PAGE}/usuarios/edit/direccion/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }

    const updateUser = async () => {


        const response = await axios.get(`${process.env.REACT_APP_PAGE}/usuarios/login/user/${LoggedUserJSON.user}/password/admin/token/${process.env.REACT_APP_API_KEY}`)
        if (response.data[0].authenticated === true) {
            window.localStorage.setItem(
                'LoggedAppUser', JSON.stringify(response.data[1])
            )
        }
        window.location.replace('');


    }


    return (

        <>
            <div className={`mainDirecciones ${editar ? 'deactive' : 'active'}`} >
                <div className="conteinerDireccion">
                    <div className="blockEditDireccion">
                        <div>
                            Dirección de facturación
                        </div>
                        <div className="editarBtn" onClick={() => {
                            setEditar(true)
                            setValueForm('Billing')
                            setTypeForm('Billing')
                            setTitulo('Dirección de facturación ')
                        }}>Editar</div>                    </div>
                    {
                        Billingaddress
                            ? <div className="blockInfoDireccion">
                                <div>
                                    {Billingaddress.name} {Billingaddress.lastname}
                                </div>
                                <div>
                                    {Billingaddress.address}
                                </div>
                                <div>
                                    {Billingaddress.city}
                                </div>
                                <div>
                                    {Billingaddress.region}
                                </div>
                                <div>
                                    {Billingaddress.cod_postal}
                                </div>
                            </div>
                            : <div></div>
                    }
                </div>
                <div className="conteinerDireccion">
                    <div className="blockEditDireccion">
                        <div>
                            Dirección de envió
                        </div>
                        <div className="editarBtn" onClick={() => {

                            setEditar(true)
                            setValueForm('Shipping')

                            setTypeForm('Shipping')
                            setTitulo('Dirección de envio ')


                        }}>Editar</div>
                    </div>
                    {
                        Shippingaddress
                            ? <div className="blockInfoDireccion">
                                <div>
                                    {Shippingaddress.name} {Shippingaddress.lastname}
                                </div>
                                <div>
                                    {Shippingaddress.address}
                                </div>
                                <div>
                                    {Shippingaddress.city}
                                </div>
                                <div>
                                    {Shippingaddress.region}
                                </div>
                                <div>
                                    {Shippingaddress.cod_postal}
                                </div>
                            </div>
                            : <div></div>
                    }

                </div>
            </div>
            <div className={`mainDirecciones ${editar ? 'active' : 'deactive'}`} >

                <div onClick={() => {
                    cleanForm()
                    setEditar(false)
                    setTitulo('Tu Cuenta')

                }}>volver</div>

                <form className="adrress" ref={form}>
                    <div className="row">
                        <div className="unitrow">
                            <div className="labelForm" >Nombre</div>
                            <input type={'text'} name={'name'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                        <div className="unitrow">
                            <div className="labelForm" >Apellido</div>
                            <input type={'text'} name={'lastname'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="unitrow">
                            <div className="labelForm" >Pais</div>
                            <input type={''} name={'country'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                        <div className="unitrow">
                            <div className="labelForm" >Provincia</div>
                            <input type={'text'} name={'region'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="unitrow">
                            <div className="labelForm" >Ciudad</div>
                            <input type={'text'} name={'city'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                        <div className="unitrow">
                            <div className="labelForm" >Código postal</div>
                            <input type={'text'} name={'cod_postal'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="unitrowFull">
                            <div className="labelForm" >Dirección de correo electrónico</div>
                            <input type={'text'} name={'email'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="unitrow">
                            <div className="labelForm" >Teléfono</div>
                            <input type={'text'} name={'phone_num'} autoComplete='off' onChange={handleInputChange} />
                        </div>

                    </div>
                    <div className="editarDireccion" onClick={() => {
                        updateUser()
                        sendForm()

                    }}>Guardar</div>
                </form>

            </div>
        </>


    )

}

export default Direcciones;