import React from "react";


const PedidoPorProducto = ({ product }) => {
    let subtotal = product.subtotal.toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})
    return (

        <div className="unitpedidoXid">


            <div className="backImgProduct">
                <img src={product.img} className='imgProduct' alt={`producto ${product.name}`} height={50}></img>

            </div>
            <div className="blockInfo name"> {product.name}</div>
            <div className="blockInfo">
                <div>
                    Qty: {product.quantity}

                </div>
                <div>
                    Size: {product.size}

                </div>
            </div>
            <div className="blockInfo">
                <div>
                Subtotal:                
                </div>

                <div>
                    {subtotal}
                </div>

            </div>
            <div>

            </div>
        </div>


    )

}

export default PedidoPorProducto;