import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
      .then(res => {
        setProduct(res.data.product);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;
  const ingredientsList = product.ingredients_ids_debug;
  const Nutrition = product.nutriments;
  console.log(product.labels);
  return (
    
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image_url}
              alt={product.product_name_en}
              width={400}
              height={400}
              className="rounded-lg shadow-lg shadow-green-200"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-green-800">{product.product_name_en}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-green-600 hover:bg-green-700 h-[34px] w-auto text-lg rounded-[10px] pl-[4px] pr-[4px]  text-white">{product.labels}</div>
              {/* <div className="bg-green-600 hover:bg-green-700">Gluten-Free</div>
              <div className="bg-green-600 hover:bg-green-700">Non-GMO</div> */}
            </div>
            {/* <h2 className="text-xl font-semibold mb-2 text-green-700">Ingredients:</h2> */}
            {
        ingredientsList && ingredientsList.length > 0 && (
          <div className="text-xl font-semibold mb-2 text-green-700">
            Ingredients: {ingredientsList.join(', ')}
          </div>
        )
      }

            <h2 className="text-xl font-semibold mb-2 text-green-700">Nutritional Values:</h2>
            <div className='space-y-[14px]'>
              <ul className='flex justif-between gap-[345px] text-green-600 w-[500px] text-xl'>
                <li>Nutrients</li>
                <li>Unit gm</li>
              </ul>
              <ul className='space-y-[12px]'>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Carbohydrates <div>{Nutrition.carbohydrates}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Energy <div>{Nutrition.energy}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Fat <div>{Nutrition.Fat}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Proteins <div>{Nutrition.proteins}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Salt <div>{Nutrition.salt}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Saturated Fat <div>{Nutrition["saturated-fat"]}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Sodium <div>{Nutrition.sodium}</div></li>
                <li className='flex justify-between rounded bg-green-300 w-[475px] h-[33px] p-[5px] text-green-800'>Sugars <div>{Nutrition.sugars}</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
