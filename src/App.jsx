
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
