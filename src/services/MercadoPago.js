import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';



const MercadoPago = ({ preferenceId }) => {

    const mercadopago = useMercadopago.v2('TEST-4fb189ec-d016-4ed3-b8ff-1daa4a742744', {
        locale: 'en-US'
    });

    useEffect(() => {
        if (mercadopago) {
            mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar',
                },
                autoOpen: true,
            })
        }
    }, [mercadopago])

    return (
        <div class="cho-container" />
    );

}

export default MercadoPago;