import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Categorypage: React.FC = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]); // Adjust the type based on your data structure
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(`${import.meta.env.BASE_URL}`); // Use template literals to construct the URL
        // Assuming response.data is an array of categories (strings)
        setCategoryList(response.data.sort()); // Sort alphabetically
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/coupons/?category=${category}`); // Navigate to the specified URL with category parameter
  };

  return (
    <div>
      {categoryList.map((category, index) => (
        <div key={index}>
          <button onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        </div>
      ))}
    </div>
  );
};
