const SearchBar = ({ handleSearch }) => {
  return (
    <input
      className="placeholder:text-green-500 pl-[12px] w-full rounded-lg border border-green-500 focus:outline-none h-[40px]"
      type="text"
      placeholder="Search by name or barcode..."
      onChange={(e) => handleSearch(e.target.value)} 
    />
  );
};

export default SearchBar;
