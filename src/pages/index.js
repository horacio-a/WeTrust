import React from 'react';
import '../index.css'
import Header from '../componets/header';
import CarruselIndex from '../componets/carruselIndex';
import Footer from '../componets/footer';
import ImgDeco from '../componets/imgDeco';

const IndexPage = ({ShoppingCart}) => {

    window.scrollTo(0, 0);
    return (
        <>
            <Header />
            <div className='conteinerimg'>
                <img src='/img/imgindex.png' className='imgIndex' alt='imagen presentacion wetrust'></img>
            </div>
            <CarruselIndex />
            <ImgDeco />


            <Footer />
        </>


    );
}
export default IndexPage;