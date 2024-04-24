/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
const CategoryForm = () => {
  const navigate=useNavigate()

  const [categoryName, setCategoryName] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaCanonical, setMetaCanonical] = useState('');
  const [metaSchema, setMetaSchema] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [displayOnHome, setDisplayOnHome] = useState('');
  const [displayOnHomecoupons, setDisplayOnHomeCoupons] = useState('');
  const [displayOnFooter, setDisplayOnFooter] = useState('');
  const [status, setStatus] = useState('');

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } ,reset} = useForm();

  const onSubmit = async () => {
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
      displayOnHomecoupons: displayOnHomecoupons,
      displayOnFooter: displayOnFooter,
      status: status 
  };
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3600/AdminPanel/manageCategory',
        headers: {
          'Content-Type': 'application/json',
          
        },
        data: JSON.stringify(data)
      };
      const response = await axios.request(config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
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
      console.log(result);
  }catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    if(ok===true)
    {
      reset();
    }
    setLoading(false);
   
  }
}

  return (

    <div className="relative mt-24 w-84 ">
      <form onSubmit={onSubmit} >
    <fieldset className='' style={{width:'100%'}}>
      <legend className='text-3xl mt-4 mb-4'>Add Category</legend>
  
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
          required/>
          <label htmlFor="displayOnHomeActive">Active</label>
          <input type="radio" id="displayOnHomeInactive" name="displayOnHome" value="INACTIVE" 
          onChange={(e)=> setDisplayOnHome(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="displayOnHomeInactive">Inactive</label>
        </section>
  
  
  
        <label htmlFor="displayOnHomeCoupons">Display On Home Coupons:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="displayOnHomeCouponActive" name="displayOnHomeCoupons" value="ACTIVE" 
          onChange={(e)=>setDisplayOnHomeCoupons(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="displayOnHomeCouponsActive">Active</label>
          <input type="radio" id="displayOnHomeCouponInactive" name="displayOnHomeCoupons" value="INACTIVE" 
          onChange={(e)=>setDisplayOnHomeCoupons(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="displayOnHomeCouponsInactive">Inactive</label>
        </section>
  
  
  
        <label htmlFor="displayFooter">Display On Footer:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="displayFooterActive" name="displayOnFooter" value="ACTIVE" 
          onChange={(e)=>setDisplayOnFooter(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="displayOnFooterActive">Active</label>
          <input type="radio" id="displayOnFooterInactive" name="displayOnFooter" value="INACTIVE" 
          onChange={(e)=>setDisplayOnFooter(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="displayOnFooterInactive">Inactive</label>
        </section>
  
  
        <label htmlFor="status">Status:</label>
        <section className="flex items-center gap-2">
          <input type="radio" id="statusActive" name="status" value="ACTIVE" 
          onChange={(e)=>setStatus(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          required/>
          <label htmlFor="statusActive">Active</label>
          <input type="radio" id="statusInactive" name="status" value="INACTIVE" 
          onChange={(e)=>setStatus(e.target.value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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