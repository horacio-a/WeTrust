import React, { useEffect, useState } from 'react';
import '../index.css'
import Header from '../componets/general/header';
import CarruselIndex from '../componets/carruselIndex';
import Footer from "../componets/general/footer";
import ImgDeco from '../componets/imgDeco';
import { scroller } from 'react-scroll';

const IndexPage = ({ ShoppingCart, setSearchState, SearchState }) => {
    const [Height, setHeight] = useState(window.innerWidth / 100);
    const handleResize = () => {
        setHeight(window.innerHeight / 100);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", handleResize);
    }, [Height]);


    const ScrollDestacado = () => {
        console.log('tendria que funcionae')
        scroller.scrollTo('myScrollToElement', {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: -(17.5 * Height)
        })
    }
    return (
        <>
            <Header setSearchState={setSearchState} SearchState={SearchState} />
            <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>
                <div className='conteinerimg' >
                    <img src='/img/imgindex.png' className='imgIndex' alt='imagen presentacion wetrust'></img>
                </div>
                <CarruselIndex />

                <ImgDeco ScrollDestacado={ScrollDestacado} />


                <Footer />

            </div>
        </>

    );
}
export default IndexPage;