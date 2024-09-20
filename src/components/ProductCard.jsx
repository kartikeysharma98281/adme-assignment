import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {

  const category = typeof product.compared_to_category === 'string' 
    ? product.compared_to_category.split(':').slice(-1)[0] 
    : 'Unknown';

  
  const ingredientsList = typeof product.ingredients_ids_debug === 'string' 
    ? product.ingredients_ids_debug.split(',') 
    : [];

  return (
    <div className="border rounded p-4 shadow-md bg-white ">
      {product.image_url ? (
        <img src={product.image_url} alt={product.product_name_en} className="h-48 object-cover" />
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span>No image available</span>
        </div>
      )}
      
      <div>
        <h2 className="text-2xl font-bold mt-4">{product.product_name_en || 'Unnamed Product'}</h2>
        <p className='text-lg font-medium'>Category: {category}</p>
        <div className='text-medium font-medium'>
          Nutrition Grade: {product.nutrition_grades || 'Not Available'}
        </div>
        {ingredientsList.length > 0 && (
          <div>
            Ingredients: {ingredientsList.join(', ')}
          </div>
        )}
      </div>
      
      <Link target='_blank' to={`/product/${product.id}`} className="text-blue-600 hover:underline mt-4 inline-block">
        View Details
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.string,
    product_name_en: PropTypes.string,
    compared_to_category: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ingredients_ids_debug: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    nutrition_grades: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
