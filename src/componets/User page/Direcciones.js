import axios from "axios";
import React, { useRef, useState } from "react";

const Direcciones = ({ Billingaddress, Shippingaddress, setTitulo }) => {
    const [FormType, setFormType] = useState()
    const [editar, setEditar] = useState(false)
    const form = useRef();
    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
    console.log(LoggedUserJSON)

    const [datos, setDatos] = useState({
        name: '',
        lastname: '',
        country: '',
        region: '',
        city: '',
        cod_postal: '',
        email: '',
        phone_num: '',
        address: ''
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
        form.current.address.value = ''
    }

    const setValueForm = (type) => {
        if (type === 'Billing') {
            form.current.name.value = LoggedUserJSON.Billingaddress.name
            form.current.lastname.value = LoggedUserJSON.Billingaddress.lastname
            form.current.country.value = LoggedUserJSON.Billingaddress.country
            form.current.region.value = LoggedUserJSON.Billingaddress.region
            form.current.city.value = LoggedUserJSON.Billingaddress.city
            form.current.cod_postal.value = LoggedUserJSON.Billingaddress.cod_postal
            form.current.email.value = LoggedUserJSON.Billingaddress.email
            form.current.phone_num.value = LoggedUserJSON.Billingaddress.phone_num
            form.current.address.value = LoggedUserJSON.Billingaddress.address

            setDatos({
                name: LoggedUserJSON.Billingaddress.name,
                lastname: LoggedUserJSON.Billingaddress.lastname,
                country: LoggedUserJSON.Billingaddress.country,
                region: LoggedUserJSON.Billingaddress.region,
                city: LoggedUserJSON.Billingaddress.city,
                cod_postal: LoggedUserJSON.Billingaddress.cod_postal,
                email: LoggedUserJSON.Billingaddress.email,
                phone_num: LoggedUserJSON.Billingaddress.phone_num,
                address: LoggedUserJSON.Billingaddress.address
            })
        } else if (type === 'Shipping') {
            form.current.name.value = LoggedUserJSON.Shippingaddress.name
            form.current.lastname.value = LoggedUserJSON.Shippingaddress.lastname
            form.current.country.value = LoggedUserJSON.Shippingaddress.country
            form.current.region.value = LoggedUserJSON.Shippingaddress.region
            form.current.city.value = LoggedUserJSON.Shippingaddress.city
            form.current.cod_postal.value = LoggedUserJSON.Shippingaddress.cod_postal
            form.current.email.value = LoggedUserJSON.Shippingaddress.email
            form.current.phone_num.value = LoggedUserJSON.Shippingaddress.phone_num
            form.current.address.value = LoggedUserJSON.Shippingaddress.address

            setDatos({
                name: LoggedUserJSON.Shippingaddress.name,
                lastname: LoggedUserJSON.Shippingaddress.lastname,
                country: LoggedUserJSON.Shippingaddress.country,
                region: LoggedUserJSON.Shippingaddress.region,
                city: LoggedUserJSON.Shippingaddress.city,
                cod_postal: LoggedUserJSON.Shippingaddress.cod_postal,
                email: LoggedUserJSON.Shippingaddress.email,
                phone_num: LoggedUserJSON.Shippingaddress.phone_num,
                address: LoggedUserJSON.Shippingaddress.address
            })
        }
    }


    const sendForm = async () => {
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
                address: datos.address
            },
            info: {
                type: FormType,
                user: LoggedUserJSON.GeneralInfo.user,
            }
        })

        const response = await axios.post(`${process.env.REACT_APP_PAGE}/usuarios/edit/direccion/token/${process.env.REACT_APP_API_KEY}`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        window.localStorage.setItem(
            'LoggedAppUser', JSON.stringify(response.data)
        );
        window.location.reload()


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
                            setFormType('Billing')
                            setEditar(true)
                            setValueForm('Billing')
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
                            setFormType('Shipping')
                            setEditar(true)
                            setValueForm('Shipping')
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
                <div className="titleMainDireccciones">
                    <i className="fa-solid fa-xmark" onClick={() => {
                        cleanForm()
                        setEditar(false)
                        setTitulo('Tu Cuenta')

                    }}></i>
                </div>


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
                        <div className="unitrow">
                            <div className="labelForm" >Dirrecion</div>
                            <input type={'text'} name={'address'} autoComplete='off' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="editarDireccion" onClick={() => {
                        sendForm()
                    }}>Guardar</div>
                </form>

            </div>
        </>


    )

}

export default Direcciones;