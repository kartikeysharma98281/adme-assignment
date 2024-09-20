import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get(`https://world.openfoodfacts.org/categories.json`)
      .then(res => {
        
        setCategories(res.data.tags.slice(0, 10));
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className='pt-[16px]'>
      <select
        className="p-2 border rounded"
        onChange={(e) => setCategory(e.target.value)}  
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
