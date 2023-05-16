import IndexPage from './pages';
import ProductPage from './pages/product';
import ProductCategoryPage from './pages/productCategory';
import ProductSubcategoryPage from './pages/productSubcategory';
import ContactoPage from './pages/contactoPage';
import UserPage from './pages/User';
import ConfirmEmail from './pages/confirmEmail';
import CarritoPage from './pages/carrito';
import ProductSearch from './pages/productSearch';
import ResetPassword from './pages/resetPass';
import ChangePass from './pages/changePass';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductBrandPage from './pages/productBrand';
import NosotrosPages from './pages/Nostros';

function App() {
  const [ShoppingCart, setShoppingCart] = useState([])
  const [SearchState, setSearchState] = useState(false)
  useEffect(() => {

    setSearchState(false)
    var LoggedUserJSON = null
    if (localStorage.getItem("TimeSession") !== null) {
      if ((Math.round(new Date().getTime() / 1000) - Number(localStorage.getItem("TimeSession"))) > 604800) {
        window.localStorage.removeItem('LoggedAppUser')
        window.localStorage.removeItem('TimeSession')
      } else {
        LoggedUserJSON = JSON.parse(window.localStorage.getItem('LoggedAppUser'))
      }
    } else {
      window.localStorage.removeItem('LoggedAppUser')
    }

    if (LoggedUserJSON) {
      //get carrito del usuario
      const getcart = async () => {
        const cart = await (await axios.get(`${process.env.REACT_APP_PAGE}/cart/getInfo/user/${LoggedUserJSON.GeneralInfo.user}/token/${process.env.REACT_APP_API_KEY}`)).data
        setShoppingCart(cart)
      }
      getcart()
    }
  }, [])



  return (
    <div className={`App`}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<IndexPage
            ShoppingCart={ShoppingCart}
            SearchState={SearchState}
            setSearchState={setSearchState} />} />

          <Route path='/nosotros' element={<NosotrosPages
            ShoppingCart={ShoppingCart}
            SearchState={SearchState}
            setSearchState={setSearchState} />} />

          <Route path='/search/category/:category/product/:product' element={<ProductSearch
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/product/id/:id' element={<ProductPage
            ShoppingCart={ShoppingCart}
            setShoppingCart={setShoppingCart}
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/categorias/:category' element={<ProductCategoryPage
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/marca/:marca' element={<ProductBrandPage
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/subcategorias/:subcategory' element={<ProductSubcategoryPage
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/contacto' element={<ContactoPage
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/user' element={<UserPage
            ShoppingCart={ShoppingCart}
            setShoppingCart={setShoppingCart}
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/user/confirm/:token' element={<ConfirmEmail
            ShoppingCart={ShoppingCart}
            setShoppingCart={setShoppingCart}
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/user/password/reset' element={<ResetPassword
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/user/password/reset/:token/:user' element={<ChangePass
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

          <Route path='/cart' element={<CarritoPage
            ShoppingCart={ShoppingCart}
            setShoppingCart={setShoppingCart}
            setSearchState={setSearchState}
            SearchState={SearchState} />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
