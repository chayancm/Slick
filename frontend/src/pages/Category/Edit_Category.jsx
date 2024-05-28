/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const [values, setValues] = useState({
    categoryName: '',
    categoryUrl: '',
    imageUrl: '',
    metaTitle: '',
    metaKeyword: '',
    metaCanonical: '',
    metaSchema: '',
    metaDescription: '',
    displayOnHome: '',
    displayOnHomeCoupons: '',
    displayOnFooter: '',
    status: ''
  });

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const id = location?.state?.data?.categoryId || [];
    const getData = async () => {
      try {
        setLoading(true); 
        axios.defaults.withCredentials = true;
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_URL}/AdminPanel/manageCategory/${id}`,
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await axios.request(config);
        setValues({
          categoryName: response.data.category.categoryName || '',
          categoryUrl: response.data.category.categoryUrl || '',
          imageUrl: response.data.category.imageUrl || '',
          metaTitle: response.data.category.metaTitle || '',
          metaKeyword: response.data.category.metaKeyword || '',
          metaCanonical: response.data.category.metaCanonical || '',
          metaSchema: response.data.category.metaSchema || '',
          metaDescription: response.data.category.metaDescription || '',
          displayOnHome: response.data.category.displayOnHome || '',
          displayOnHomeCoupons: response.data.category.displayOnHomeCoupons || '',
          displayOnFooter: response.data.category.displayOnFooter || '',
          status: response.data.category.status || ''
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);  
      }
    };
    getData();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData();
    Object.keys(values).forEach((key)=>{
      if(Array.isArray(values[key])){
          values[key].forEach((item) => formData.append(key, item));
      }
      else {
          formData.append(key, values[key]);
      }
    })
    const data =values;
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/AdminPanel/manageCategory`,
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
        data: formData
      };
      const response = await axios.request(config);
      if (response.status!=200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      setOk(true);
      setValues(
        {...values,
          categoryName : '',
          categoryUrl  : '',
          imageUrl:'',
          metaTitle:'',
          metaKeyword:'',
          metaCanonical:'',
          metaSchema:'',
          metaDescription:'',
          displayOnHome:"INACTIVE",
          displayOnHomeCoupons:"INACTIVE",
          displayOnFooter:"INACTIVE",
          status:"INACTIVE",
        }
      )
      navigate('/DashBoard/Categories')
  }catch (error) {
    console.error('Error fetching data:', error);
    
  } finally {
    setLoading(false);
   
  }
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? (checked ? 'ACTIVE' : 'INACTIVE') : value
    });
  };

  return (
    <div className="relative mt-24 w-84">
      <form onSubmit={handleSubmit}>
        <fieldset style={{ width: '100%' }}>
          <legend className='text-3xl mt-4 mb-4'>Add Category</legend>
          <div className="grid grid-cols-3 gap-4">
            <section className="form-group mb-3 mr-5">
              <label className="block mb-1" htmlFor="categoryName">Category Name:</label>
              <input 
                type="text" 
                id="categoryName" 
                name="categoryName" 
                value={values.categoryName}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>

            <section className="form-group mb-3">
              <label htmlFor="categoryUrl">Category URL:</label>
              <input 
                type="text" 
                id="categoryUrl" 
                name="categoryUrl" 
                value={values.categoryUrl}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>
          </div>

          <hr className="border-2 my-6" />

          <div className="grid grid-cols-3 gap-4">
            <section className="form-group mb-3">
              <label htmlFor="metaTitle">Meta Title:</label>
              <input 
                type="text" 
                id="metaTitle" 
                name="metaTitle" 
                value={values.metaTitle}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>

            <section className="form-group mb-3">
              <label htmlFor="metaKeyword">Meta Keyword:</label>
              <input 
                type="text" 
                id="metaKeyword" 
                name="metaKeyword" 
                value={values.metaKeyword}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>

            <section className="form-group mb-3">
              <label htmlFor="metaCanonical">Meta Canonical:</label>
              <input 
                type="text" 
                id="metaCanonical" 
                name="metaCanonical" 
                value={values.metaCanonical}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>

            <section className="form-group mb-3">
              <label htmlFor="metaSchema">Meta Schema:</label>
              <input 
                type="text" 
                id="metaSchema" 
                name="metaSchema" 
                value={values.metaSchema}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required 
              />
            </section>

            <section className="form-group mb-3">
              <label htmlFor="metaDescription">Meta Description:</label>
              <textarea 
                id="metaDescription" 
                name="metaDescription" 
                value={values.metaDescription}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
                required
              ></textarea>
            </section>
          </div>

          <hr className="border-2 my-6" />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mt-4 mb-2">Display On Home (Active/Inactive)</label>
              <input 
                type="checkbox" 
                className="w-5 h-5 mt-4 mb-2 ml-4"
                name="displayOnHome"
                checked={values.displayOnHome === "ACTIVE"}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mt-4 mb-2">Display On Home Coupons (Active/Inactive)</label>
              <input 
                type="checkbox" 
                className="w-5 h-5 mt-4 mb-2 ml-4"
                name="displayOnHomeCoupons"
                checked={values.displayOnHomeCoupons === "ACTIVE"}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mt-4 mb-2">Display On Footer (Active/Inactive)</label>
              <input 
                type="checkbox" 
                className="w-5 h-5 mt-4 mb-2 ml-4"
                name="displayOnFooter"
                checked={values.displayOnFooter === "ACTIVE"}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mt-4 mb-2">Status (Active/Inactive)</label>
              <input 
                type="checkbox" 
                className="w-5 h-5 mt-4 mb-2 ml-4"
                name="status"
                checked={values.status === "ACTIVE"}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="border-2 my-6" />
          <button 
            type="submit" 
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mb-8 grow-0"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CategoryForm;
