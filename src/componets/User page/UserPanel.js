import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pedidos from "./Pedidos";
import Direcciones from "./Direcciones";
import EditPassword from "./EditPassword";


const UserPanel = () => {
    const [loadingPedios, setLoadingPedidos] = useState(true)
    const [dataPedidos, setDataPedidos] = useState('')
    const [pedidosState, SetPedidoState] = useState(false)
    const [DireccionState, SetDireccionState] = useState(false)
    const [DetallesState, SetDetallesState] = useState(true)
    const [CerrarState, SetCerrarState] = useState(false)
    const [Shippingaddress, setShippingaddress] = useState([])
    const [Billingaddress, setBillingaddress] = useState([])
    const [titulo, setTitulo] = useState('')


    const OpenPedidos = () => {
        SetPedidoState(true)
        SetDireccionState(false)
        SetDetallesState(false)
        SetCerrarState(false)

    }
    const OpenDireccion = () => {
        SetPedidoState(false)
        SetDireccionState(true)
        SetDetallesState(false)
        SetCerrarState(false)
    }

    const OpenDetalles = () => {
        SetPedidoState(false)
        SetDireccionState(false)
        SetDetallesState(true)
        SetCerrarState(false)
    }
    const OpenCerrar = () => {
        SetPedidoState(false)
        SetDireccionState(false)
        SetDetallesState(false)
        SetCerrarState(true)
    }


    useEffect(() => {
        const tituloCuenta = () => {
            setTitulo('Tu Cuenta')
        }
        const getAdrres = async () => {
            const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
            if (LoggedUserJSON.Billingaddress) {
                setBillingaddress(LoggedUserJSON.Billingaddress)
            } else {
                console.log('none')
            }
            if (LoggedUserJSON.Shippingaddress) {
                setShippingaddress(LoggedUserJSON.Shippingaddress)
            } else {
                console.log('none')
            }
        }
        const getPedidos = async () => {
            const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))

            setLoadingPedidos(true)
            const response = await axios.get(`${process.env.REACT_APP_PAGE}/pedidos/user/${LoggedUserJSON.GeneralInfo.user}/token/${process.env.REACT_APP_API_KEY}`)
            console.log(response.data)
            setDataPedidos(response.data)
            setLoadingPedidos(false)

        }
        tituloCuenta()
        getAdrres()
        getPedidos()
    }, [])
    return (

        <>
            <div className="ConteinerTituloUserPanel">
                <div className="TituloUserPanel">
                    {titulo}
                </div>
            </div>

            <div className="userPanelMain">

                <div className="UserPanelMenu">
                    <div className={`Btn ${DetallesState ? 'active' : ''}`} onClick={OpenDetalles}>
                        Detalles de cuenta
                    </div>

                    <div className={`Btn ${pedidosState ? 'active' : ''}`} onClick={OpenPedidos}>
                        Pedidos
                    </div>

                    <div className={`Btn ${DireccionState ? 'active' : ''}`} onClick={OpenDireccion}>
                        Dirección</div>
                    <div className={`Btn ${CerrarState ? 'active' : ''}`} onClick={OpenCerrar}>Cerrar cuenta</div>
                </div>



                <div className="UserPanelContent">
                    <div className={`content ${pedidosState ? 'active' : ''}`} >
                        {
                            loadingPedios ? <>loading</>
                                :
                                (dataPedidos.length === 0
                                    ? <div className="noPedidos">
                                        <div> No hay ningún pedido </div>
                                        <Link className="Btnvolver" to={'/'} >Ir a comprar</Link>
                                    </div>
                                    : (dataPedidos.map(item => <Pedidos key={item.PedidoData.num_order} data={item} />)))
                        }
                    </div>


                    <div className={`content ${DireccionState ? 'active' : ''}`} >
                        <Direcciones Billingaddress={Billingaddress} Shippingaddress={Shippingaddress} setTitulo={setTitulo} />

                    </div>
                    <div className={`content ${DetallesState ? 'active' : ''}`} >


                        <EditPassword setTitulo={setTitulo} />

                    </div>

                    <div className={`content ${CerrarState ? 'active' : ''}`}>
                        <div className="blockCloseSession">
                            <div className="tituloSession">Cerrar sesión</div>
                            <div className="editarBtn" onClick={() => {
                                window.localStorage.removeItem('LoggedAppUser')
                                window.localStorage.removeItem('TimeSession')
                                window.location.replace('');
                            }
                            }>Cerrar</div>

                        </div>
                        <div className="blockCloseSession">
                            <div className="tituloSession">Eliminar cuenta</div>
                            <div className="subtituloSession">La cuenta una vez eliminada no se podrá volver a recuperar</div>

                            <div className="deleteBtn" onClick={() => {

                            }
                            }>Eliminar</div>

                        </div>
                    </div>
                </div>

            </div>
        </>


    )

}


export default UserPanel;

