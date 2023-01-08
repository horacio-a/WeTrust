import IndexPage from './pages';
import ProductPage from './pages/product';
import ProductCategoryPage from './pages/productCategory';
import ProductSubcategoryPage from './pages/productSubcategory';
import ContactoPage from './pages/contactoPage';
import UserPage from './pages/User';
import CarritoPage from './pages/carrito';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [ShoppingCart, setShoppingCart] = useState([])
  
  useEffect(() => {
    const LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser')) 

    if(LoggedUserJSON){
      //get carrito del usuario
      const getcart = async () => {
        const cart = await (await axios.get(`${process.env.REACT_APP_PAGE}/cart/getInfo/user/${LoggedUserJSON.user}/token/${process.env.REACT_APP_API_KEY}`)).data
        console.log(cart)
        setShoppingCart(cart)
      }
      getcart()
    }
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IndexPage ShoppingCart={ShoppingCart} />} />
          <Route path='/product/id/:id' element={<ProductPage ShoppingCart={ShoppingCart} setShoppingCart={setShoppingCart} />} />
          <Route path='/categorias/:category' element={<ProductCategoryPage />} />
          <Route path='/subcategorias/:subcategory' element={<ProductSubcategoryPage />} />
          <Route path='/contacto' element={<ContactoPage />} />
          <Route path='/user' element={<UserPage  ShoppingCart={ShoppingCart} setShoppingCart={setShoppingCart}/>}  />
          <Route path='/cart' element={<CarritoPage ShoppingCart={ShoppingCart} setShoppingCart={setShoppingCart} />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
