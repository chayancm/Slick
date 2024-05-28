/* eslint-disable react/prop-types */
import  {  useState } from 'react';

function CategorySearch({categories,setDisplayCategories,displayCategories}) {
  const [searchValue, setSearchValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSuggestionClick = (suggestion) => {

    setSearchValue(""); 
    setSuggestions([]);
    setDisplayCategories([...displayCategories,suggestion])
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);
    
    if (inputValue.length > 0) {
      const newFilteredCategory = categories.filter(category => 
          category.categoryName.toLowerCase().includes(inputValue)
      );
      setSuggestions(newFilteredCategory.map((cat) => cat.categoryName)); 
      
      setIsDropdownOpen(true);
    }
  };

  // eslint-disable-next-line no-unused-vars
  
  return (
    <div className="search-wrapper flex flex-col gap-1">
      <label htmlFor="search" className="text-base font-medium">Search Categories</label>
      <input type="search" id="search" value={searchValue} onChange={handleSearchChange} className="px-3 py-2 border border-gray-300 rounded-md w-64"/>

      {isDropdownOpen && suggestions.length > 0 && (
    <ul className="dropdown-list border border-gray-300 bg-white rounded-md absolute{/* ...add styling ... */}"> 
        {suggestions.map((suggestion, index) => (
            <li
                key={index} 
                className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
            >
                {suggestion}
            </li>
        ))}
    </ul>
  )}
    </div>
  );
}

export default CategorySearch;