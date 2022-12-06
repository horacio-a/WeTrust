import IndexPage from './pages';
import ProductPage from './pages/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/product/:id' element={<ProductPage />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
