import React, { useEffect, useState } from 'react';
import '../index.css'
import Header from '../componets/general/header';
import Footer from '../componets/general/footer';
import Maps from '../componets/Maps';

const NosotrosPages = () => {

    return (
        <>
            <Header />
            <main className='mainNosotros'>
                <img src='/img/NosotrosWe.png' />

                <div className='txtNosotros'>
                    Somos la mejor tienda HYPE en la Argentina. Con mas de 10 años de experiencia
                    en la industria de los sneakers y el hype, traemos la experiencia y la cultura
                    del streetwear y las marcas highend al país mediante nuestro sistema de consignación.
                    En WeTrust vas a encontrar productos únicos y 100% originales.
                </div>
                <div className='conteinerImgDireccion'>
                    <img className='imgDireccion' src='/img/TylerOneStart.avif' />
                    <div className='txtImgDireccion'>
                        <div>ENCONTRANOS EN</div>
                        <i className="fa-solid fa-location-dot"></i>
                        <div>545 Juana Manso, Puerto Madero</div>
                    </div>
                </div>

                <Maps />

            </main>
            <Footer />
        </>

    );
}
export default NosotrosPages;