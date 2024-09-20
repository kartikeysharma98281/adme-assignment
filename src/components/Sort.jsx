

const Sort = ({ setSortOrder }) => {
  return (
    <div className="my-4">
      <label className="mr-2">Sort By:</label>
      <select className="p-2 border rounded" onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">None</option>
        <option value="name-asc">Product Name (A-Z)</option>
        <option value="name-desc">Product Name (Z-A)</option>
        <option value="nutrition-asc">Nutrition Grade (Ascending)</option>
        <option value="nutrition-desc">Nutrition Grade (Descending)</option>
      </select>
    </div>
  );
};

export default Sort;
