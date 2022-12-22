import React, { useEffect,  useState } from "react";
import Header from '../componets/header';
import Footer from '../componets/footer';
import '../index.css'
import LoginComponent from "../componets/Login";
import axios from "axios";


const UserPage = ({ ShoppingCart, setShoppingCart }) => {

    window.scrollTo(0, 0);
    const [user, setUser] = useState(null)
    const [userRegister, SetUserRegister] = useState('')

    console.log(userRegister)

    useEffect(() => {
        const LoggedUserJSON = window.localStorage.getItem('LoggedAppUser')

        if (LoggedUserJSON) {
            const user = JSON.parse(LoggedUserJSON)
            SetUserRegister(true)
            setUser(user)
        }
    }, [])

    const cleanLocalStorage = () => {
        SetUserRegister(false)
        setUser('')
        setShoppingCart([])

        window.localStorage.removeItem('LoggedAppUser')
    }
    const envioLogin = (e) => {
        setUser(true)

    }


    const setCart = async () => {
        const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser')) 
        const cart = await (await axios.get(`http://localhost:3000/cart/getInfo/user/${LoggedUserJSON.user}`)).data
        console.log(cart)
        setShoppingCart(cart)
    }

    return (
        <>
            <Header />


            <main className='mainUser'>
                {
                    user
                        ? <>
                        register
                        <button onClick={cleanLocalStorage}></button>

                        </>
                        : <LoginComponent
                            envioLogin={envioLogin}
                            setCart= {setCart}
                        />
                }



            </main>

            <Footer />
        </>


    );
}
export default UserPage;