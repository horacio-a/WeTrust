import axios from "axios";
import React, { useRef, useState } from "react";
import PedidoPorProducto from "./pedidosxProducto";

const Pedidos = ({ data }) => {
    let { PedidoData, productos } = data
    const total = PedidoData.total.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})
    return (

        <>
            <div className="conteinerPedidos">
                <div className="tituloPedidos">
                    <div className="unitTituloPedidos left">
                        <div>
                            Fecha del pedido</div>
                        <div className="import">{PedidoData.date}</div>
                    </div>
                    <div className="unitTituloPedidos">
                        <div>Total de la compra</div>
                        <div className="import">{total}</div>
                    </div>
                    <div className="unitTituloPedidos right">
                        <div className="import"># {PedidoData.num_order}</div>
                        {PedidoData.state}
                    </div>
                </div>
                {
                    productos.map( item => <PedidoPorProducto product={item}/> )
                }
                
            </div>
        </>


    )

}

export default Pedidos;