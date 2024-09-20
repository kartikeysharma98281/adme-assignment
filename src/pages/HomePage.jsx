import { useContext, useEffect, useState, useCallback } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryUrl = category
          ? `https://world.openfoodfacts.org/category/${category}.json`
          : `https://world.openfoodfacts.org/products.json`; 

        const response = await axios.get(categoryUrl, {
          params: { page }, 
        });

    
        setProducts((prevProducts) =>
          page === 1 ? response.data.products : [...prevProducts, ...response.data.products]
        );

        
        if (response.data.products.length === 0) setHasMore(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category, page, setProducts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500 
    ) {
      if (!loading && hasMore) setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const sortedProducts = () => {
    let sorted = [...products];
    if (sortOrder === 'name-asc') {
      sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortOrder === 'name-desc') {
      sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortOrder === 'nutrition-asc') {
      sorted.sort((a, b) => a.nutrition_grade - b.nutrition_grade);
    } else if (sortOrder === 'nutrition-desc') {
      sorted.sort((a, b) => b.nutrition_grade - a.nutrition_grade);
    }
    return sorted;
  };


  const filteredProducts = () => {
    return sortedProducts().filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.code && product.code.includes(searchQuery))
    );
  };

  
  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className='container mx-auto px-4 py-8'>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4 md:mb-0">Grocery Shopping App</h1>
          <div className="flex items-start w-full w-auto gap-[68px]">
            <Filter setCategory={setCategory} /> 
            <Sort setSortOrder={setSortOrder} /> 
          </div>
        </div>
        <SearchBar handleSearch={handleSearch} /> 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-[15px]">
        {filteredProducts().map((product) => (
          <ProductCard className="h-full" key={product.id} product={product} />
        ))}
      </div>
      {loading && <div>Loading more products...</div>}
      {!hasMore && <div>No more products to load</div>}
    </div>
  );
};

export default HomePage;
