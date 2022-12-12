import IndexPage from './pages';
import ProductPage from './pages/product';
import ProductCategoryPage from './pages/productCategory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/product/id/:id' element={<ProductPage />} />
        <Route path='/categorias/:category' element={<ProductCategoryPage />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
