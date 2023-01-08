import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pedidos from "./Pedidos";


const UserPanel = ({ cleanLocalStorage }) => {
    const [loadingPedios, setLoadingPedidos] = useState(true)
    const [dataPedidos, setDataPedidos] = useState('')
    const [pedidosState, SetPedidoState] = useState(true)
    const [DireccionState, SetDireccionState] = useState(false)
    const [DetallesState, SetDetallesState] = useState(false)
    const [CerrarState, SetCerrarState] = useState(false)

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


    useEffect(()=> {
     const getPedidos = async() =>{
        setLoadingPedidos(true)
        const response = await axios.get(`${process.env.REACT_APP_PAGE}/pedidos/user/admin/token/${process.env.REACT_APP_API_KEY}`)
        setDataPedidos(response.data)
        setLoadingPedidos(false)

     }
     getPedidos()
    }, [])
    return (

        <>
            <div className="ConteinerTituloUserPanel">
                <div className="TituloUserPanel">
                    Tu Cuenta
                </div>
            </div>

            <div className="userPanelMain">

                <div className="UserPanelMenu">
                    <div className={`Btn ${pedidosState ? 'active' : ''}`} onClick={OpenPedidos}>
                        Pedidos
                    </div>
                    <div className={`Btn ${DireccionState ? 'active' : ''}`} onClick={OpenDireccion}>
                        Dirección</div>
                    <div className={`Btn ${DetallesState ? 'active' : ''}`} onClick={OpenDetalles}>Detalles de cuenta</div>
                    <div className={`Btn ${CerrarState ? 'active' : ''}`} onClick={OpenCerrar}>Cerra cuenta</div>
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
                                : (dataPedidos.map(item => <Pedidos data={item} />)))
                        }
                    </div>
                    <div className={`content ${DireccionState ? 'active' : ''}`} >
                        Dirección
                    </div>
                    <div className={`content ${DetallesState ? 'active' : ''}`} >
                        Detalles de cuenta
                    </div>
                    <div className={`content ${CerrarState ? 'active' : ''}`}>
                        Cerra cuenta
                    </div>
                </div>

            </div>
        </>


    )

}

export default UserPanel;