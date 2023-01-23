import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductsTitle = ({ titulo, numImg }) => {


    return (


        <div className="mainProductsTitle">
            <img src={`${numImg === 0 ? "/img/Drew.jpg" : ( numImg === 1 ? "/img/Gallery Dept.jpg": (numImg === 2 ? "/img/Gallery Dept2.jpg": '/img/StussyNike.webp'))}`}></img>
            <div className="txtProductsTitle">{titulo}</div>
        </div>


    )

}

export default ProductsTitle;