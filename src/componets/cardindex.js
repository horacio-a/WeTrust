import React from "react";
import { Link } from "react-router-dom";


const CardIndex = (props) => {
    const { name, price, img, talles, category, id} = props;
    const TallesTableShoe = {
        three_half: '3.5',
        four: '4.0',
        four_half: '4.5',
        five: '5.0',
        five_half: '5.5',
        six: '6.0',
        six_half: '6.5',
        seven: '7.0',
        seven_half: '7.5',
        eight: '8.0',
        eight_half: '8.5',
        nine: '9.0',
        nine_half: '9.5',
        ten: '10',
        ten_half: '10.5',
        eleven: '11.0',
        eleven_half: '11.5',
        twelve: '12.0',
        twelve_half: '12.5',
        thirteen: '13.0',
        thirteen_half: '13.5',
        fourteen: '14.0',
        fourteen_half: '14.5',
        fifteen: '15.0'
    }
    for(var property in talles){
        if(talles[property] > 0 && property !== 'id'){
            var sizeTxt = property
            break
        }
    }
    if(category === 'shoe'){
        var size = TallesTableShoe[sizeTxt]        
    }
    if(category === 'clothing'){
        var size = sizeTxt
    }



    return (
        <Link to={`/product/${id}`} className={`card`} >
            <div className="content" >
                <div className={`imgCardBack  `}  >
                    <div className="conteinerImgCard">
                    <img src={img} className='imgCard' alt={name}></img>
                    </div>
                    <div className="conteinerIconCard">
                        <div className="icon-card">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="icon-card">
                            <i style={{textTransform: "uppercase"}}>{size}</i>
                        </div>
                    </div>

                </div>
                <div className="description">
                    <div>{name}</div>
                    <div className="price">{price} $</div>
                </div>
            </div>


        </Link>



    )

}

export default CardIndex;