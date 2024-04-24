/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CategoryForm = () => {
  // State variables for each form input
  const [categoryName, setCategoryName] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaCanonical, setMetaCanonical] = useState('');
  const [metaSchema, setMetaSchema] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [displayOnHome, setDisplayOnHome] = useState('');
  const [displayOnHomeCoupons, setDisplayOnHomeCoupons] = useState('');
  const [displayOnFooter, setDisplayOnFooter] = useState('');
  const [status, setStatus] = useState('');

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 
  const navigate=useNavigate()

  useEffect(() => {
    const id = location?.state?.data?.categoryId || [];
    console.log(id);
    const getData = async () => {
      try {
        
          setLoading(true); 
          axios.defaults.withCredentials = true;
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3600/AdminPanel/manageCategory/${id}`,
            headers: { 'Content-Type': 'application/json' },
          };
          const response = await axios.request(config);
          setCategoryName(response.data.category.categoryName || '');
          setCategoryUrl(response.data.category.categoryUrl || '');
          setImageUrl(response.data.category.imageUrl || '');
          setMetaTitle(response.data.category.metaTitle || '');
          setMetaKeyword(response.data.category.metaKeyword || '');
          setMetaCanonical(response.data.category.metaCanonical || '');
          setMetaSchema(response.data.category.metaSchema || '');
          setMetaDescription(response.data.category.metaDescription || '');
          setDisplayOnHome(response.data.category.displayOnHome || '');
          setDisplayOnHomeCoupons(response.data.category.displayOnHomecoupons
            || '');
          setDisplayOnFooter(response.data.category.displayOnFooter || '');
          setStatus(response.data.category.status || ''); 
          console.log(response.data.category);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);  
      }
    };


    getData();
  }, []);

  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const id = location?.state?.data?.categoryId || [];
    const data = {
      categoryName: categoryName,
      categoryUrl: categoryUrl,
      imageUrl: imageUrl,
      metaTitle: metaTitle,
      metaKeyword: metaKeyword,
      metaCanonical: metaCanonical,
      metaSchema: metaSchema,
      metaDescription: metaDescription,
      displayOnHome: displayOnHome,
      displayOnHomecoupons: displayOnHomeCoupons,
      displayOnFooter: displayOnFooter,
      status: status 
  };
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3600/AdminPanel/manageCategory/${id}`,
        headers: { 'Content-Type': 'application/json' },
        // Create the payload 
        data: data
      };

      const response = await axios.request(config);
      if (!response.status===200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setOk(true);  
      setCategoryName('');
          setCategoryUrl('');
          setImageUrl('');
          setMetaTitle('');
          setMetaKeyword('');
          setMetaCanonical('');
          setMetaSchema('');
          setMetaDescription('');
          setDisplayOnHome('');
          setDisplayOnHomeCoupons('');
          setDisplayOnFooter('');
          setStatus(''); 
          navigate('/DashBoard/Categories')
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="relative mt-24 w-84 ">
      <form onSubmit={handleSubmit} >
    <fieldset className='' style={{width:'100%'}}>
      <legend className='text-3xl mt-4 mb-4'>Edit Category</legend>
  
      <section className="form-group mb-3 mr-5">
        <label className="block mb-1" htmlFor="categoryName">Category Name:</label>
        <input type="text" 
        id="categoryName" 
        name="categoryName" 
        value={categoryName}
        onChange={(e)=>setCategoryName(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="categoryUrl">Category URL:</label>
        <input type="text" id="categoryUrl" name="categoryUrl" 
        value={categoryUrl}
        onChange={(e)=>setCategoryUrl(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" name="imageUrl" 
        value={imageUrl}
        onChange={(e)=>setImageUrl(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaTitle">Meta Title:</label>
        <input type="text" id="metaTitle" name="metaTitle" 
        value={metaTitle}
        onChange={(e)=>setMetaTitle(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaKeyword">Meta Keyword:</label>
        <input type="text" id="metaKeyword" name="metaKeyword" 
        value={metaKeyword}
        onChange={(e)=>setMetaKeyword(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaCanonical">Meta Canonical:</label>
        <input type="text" id="metaCanonical" name="metaCanonical" 
        value={metaCanonical}
        onChange={(e)=>setMetaCanonical(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaSchema">Meta Schema:</label>
        <input type="text" id="metaSchema" name="metaSchema" 
        value={metaSchema}
        onChange={(e)=>setMetaSchema(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaDescription">Meta Description:</label>
        <textarea id="metaDescription" name="metaDescription" 
        value={metaDescription}
        onChange={(e)=>setMetaDescription(e.target.value)}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required></textarea>
      </section>
  
      <section className="form-group mb-3">
        <label  className="block mb-1" htmlFor="displayOnHome">Display On Home :</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="displayOnHomeActive" name="displayOnHome" value="ACTIVE" 
          onChange={(e)=>setDisplayOnHome(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnHome === 'ACTIVE'}
          required/>
          <label htmlFor="displayOnHomeActive">Active</label>
          <input type="radio" id="displayOnHomeInactive" name="displayOnHome" value="INACTIVE" 
          onChange={(e)=> setDisplayOnHome(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnHome=== 'INACTIVE'}
          required/>
          <label htmlFor="displayOnHomeInactive">Inactive</label>
        </section>
  
  
  
        <label htmlFor="displayOnHomeCoupons">Display On Home Coupons:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="displayOnHomeCouponActive" name="displayOnHomeCoupons" value="ACTIVE" 
          onChange={(e)=>setDisplayOnHomeCoupons(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnHomeCoupons === 'ACTIVE'}
          required/>
          <label htmlFor="displayOnHomeCouponsActive">Active</label>
          <input type="radio" id="displayOnHomeCouponInactive" name="displayOnHomeCoupons" value="INACTIVE" 
          onChange={(e)=>setDisplayOnHomeCoupons(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnHomeCoupons === 'INACTIVE'}
          required/>
          <label htmlFor="displayOnHomeCouponsInactive">Inactive</label>
        </section>
  
  
  
        <label htmlFor="displayFooter">Display On Footer:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="displayFooterActive" name="displayOnFooter" value="ACTIVE" 
          onChange={(e)=>setDisplayOnFooter(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnFooter === 'ACTIVE'}
          required/>
          <label htmlFor="displayOnFooterActive">Active</label>
          <input type="radio" id="displayOnFooterInactive" name="displayOnFooter" value="INACTIVE" 
          onChange={(e)=>setDisplayOnFooter(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={displayOnFooter === 'INACTIVE'}
          required/>
          <label htmlFor="displayOnFooterInactive">Inactive</label>
        </section>
  
  
        <label htmlFor="status">Status:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="statusActive" name="status" value="ACTIVE" 
          onChange={(e)=>setStatus(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={status=== 'ACTIVE'}
          required/>
          <label htmlFor="statusActive">Active</label>
          <input type="radio" id="statusInactive" name="status" value="INACTIVE" 
          onChange={(e)=>setStatus(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          checked={status === 'INACTIVE'}
          required/>
          <label htmlFor="statusInactive">Inactive</label>
        </section>
      </section>
  
      <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mb-8 grow-0">Submit</button>
    </fieldset>
   </form>
  </div>
    )
  }
  export default CategoryForm;