/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const navigate=useNavigate()

  const [values, setValues] = useState({
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
  })

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { reset} = useForm();

  const onSubmit = async (e) => {
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
      // setValues(
      //   {...values,
      //     categoryName : '',
      //     categoryUrl  : '',
      //     imageUrl:'',
      //     metaTitle:'',
      //     metaKeyword:'',
      //     metaCanonical:'',
      //     metaSchema:'',
      //     metaDescription:'',
      //     displayOnHome:"INACTIVE",
      //     displayOnHomeCoupons:"INACTIVE",
      //     displayOnFooter:"INACTIVE",
      //     status:"INACTIVE",
      //   }
      // )
      // navigate('/DashBoard/Categories')
  }catch (error) {
    console.error('Error fetching data:', error);
    alert(error.response.data.message);
  } finally {
    setLoading(false);
   
  }
}

  return (

    <div className="relative mt-24 w-84 ">
      <form onSubmit={onSubmit} >
    <fieldset className='' style={{width:'100%'}}>
      <legend className='text-3xl mt-4 mb-4'>Add Category</legend>
    <div className="grid grid-cols-3 gap-4">
      <section className="form-group mb-3 mr-5">
        <label className="block mb-1" htmlFor="categoryName">Category Name:</label>
        <input type="text" 
        id="categoryName" 
        name="categoryName" 
        value={values.categoryName}
        onChange={(e)=>setValues({ ...values, categoryName : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="categoryUrl">Category URL:</label>
        <input type="text" id="categoryUrl" name="categoryUrl" 
        value={values.categoryUrl}
        onChange={(e)=>setValues({ ...values, categoryUrl : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <div>
        <label className="block mb-2">Image</label>
        <input 
          type="file" 
          className="w-full p-2 border rounded" 
          onChange={(e) => setValues({...values,imageUrl:e.target.files[0]})} // Handle file selection
        />
      </div>
      </div>
      <hr className=" border-2 my-6"/>
      <div className="grid grid-cols-3 gap-4">
      <section className="form-group mb-3">
        <label htmlFor="metaTitle">Meta Title:</label>
        <input type="text" id="metaTitle" name="metaTitle" 
        value={values.metaTitle}
        onChange={(e)=>setValues({ ...values,metaTitle : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaKeyword">Meta Keyword:</label>
        <input type="text" id="metaKeyword" name="metaKeyword" 
        value={values.metaKeyword}
        onChange={(e)=>setValues({ ...values, metaKeyword : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaCanonical">Meta Canonical:</label>
        <input type="text" id="metaCanonical" name="metaCanonical" 
        value={values.metaCanonical}
        onChange={(e)=>setValues({ ...values, metaCanonical : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaSchema">Meta Schema:</label>
        <input type="text" id="metaSchema" name="metaSchema" 
        value={values.metaSchema}
        onChange={(e)=>setValues({ ...values, metaSchema : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required/>
      </section>
  
      <section className="form-group mb-3">
        <label htmlFor="metaDescription">Meta Description:</label>
        <textarea id="metaDescription" name="metaDescription" 
        value={values.metaDescription}
        onChange={(e)=>setValues({ ...values, metaDescription : e.target.value })}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 w-full"
        required></textarea>
      </section>
  </div>
  <hr className=" border-2 my-6"/>
  <div className="grid grid-cols-3 gap-4">
      
        <div>
          <label className=" mt-4 mb-2">DisplayOnHome (Active/Inactive)</label>
              <input 
                  type="checkbox" 
                  className="w-5 h-5 mt-4 mb-2  ml-4"
                  checked={values.displayOnHome==="ACTIVE"?true:false} 
                  onChange={(e) =>{ 
                      if(e.target.checked)setValues({ ...values, displayOnHome :"ACTIVE"  })
                      else setValues({ ...values, displayOnHome :"INACTIVE"  })
                      }} 
                  /> 
                        </div>
  
  
  
        <div>
                    <label className=" mt-4 mb-2">DisplayOnHomeCoupon (Active/Inactive)</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={values.displayOnHomeCoupons==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setValues({ ...values, displayOnHomeCoupons :"ACTIVE"  })
                            else setValues({ ...values, displayOnHomeCoupons :"INACTIVE"  })
                            }} 
                        /> 
                        </div>
  
  
  
        <div>
                    <label className=" mt-4 mb-2">DispalyOnFooter (Active/Inactive)</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={values.displayOnFooter==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setValues({ ...values, displayOnFooter :"ACTIVE"  })
                            else setValues({ ...values, displayOnFooter :"INACTIVE"  })
                            }} 
                        /> 
                        </div>
  
  
        <div>
                    <label className=" mt-4 mb-2">Status (Active/Inactive)</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={values.status==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setValues({ ...values, status :"ACTIVE"  })
                            else setValues({ ...values, status :"INACTIVE"  })
                            }} 
                        /> 
                        </div>
          
        
        </div>
        <hr className=" border-2 my-6"/>
      <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mb-8 grow-0">Submit</button>
    </fieldset>
   </form>
  </div>
    )
  }
  export default CategoryForm;