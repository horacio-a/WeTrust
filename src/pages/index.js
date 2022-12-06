import React from 'react';
import '../index.css'
import Header from '../componets/header';
import CarruselIndex from '../componets/carruselIndex';
import Footer from '../componets/footer';
import ImgDeco from '../componets/imgDeco';

const IndexPage = (props) => {



    return (
        <>
            <Header />

            <CarruselIndex/>
            <ImgDeco/>


            <Footer/>
        </>


    );
}
export default IndexPage;