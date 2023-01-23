import React, { useEffect,  useState } from "react";
import Header from '../componets/header';
import Footer from '../componets/footer';
import '../index.css'
import LoginComponent from "../componets/Login";
import axios from "axios";
import UserPanel from "../componets/UserPanel";


const UserPage = ({ ShoppingCart, setShoppingCart, setSearchState, SearchState }) => {

    window.scrollTo(0, 0);
    const [user, setUser] = useState(null)



    useEffect(() => {
        const LoggedUserJSON = window.localStorage.getItem('LoggedAppUser')

        if (LoggedUserJSON) {
            const user = JSON.parse(LoggedUserJSON)
            setUser(user)
        }
    }, [])

    const cleanLocalStorage = () => {
        setUser('')
        setShoppingCart([])

        window.localStorage.removeItem('LoggedAppUser')
    }
    const envioLogin = (e) => {
        setUser(true)

    }


    const setCart = async () => {
        const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser')) 
        const cart = await (await axios.get(`${process.env.REACT_APP_PAGE}/cart/getInfo/user/${LoggedUserJSON.user}/token/${process.env.REACT_APP_API_KEY}`)).data
        setShoppingCart(cart)
    }

    return (
        <>
                    <Header setSearchState={setSearchState}  SearchState={SearchState} />

        <div className={`MainPages  ${SearchState ? 'Deactivated' : 'Active'}`}>


            <main className='mainUser'>
                {
                    user
                        ? <>
                        <UserPanel
                        cleanLocalStorage= {cleanLocalStorage}/>


                        </>
                        : <LoginComponent
                            envioLogin={envioLogin}
                            setCart= {setCart}
                        />
                }



            </main>

            <Footer />
        </div>
        </>


    );
}
export default UserPage;