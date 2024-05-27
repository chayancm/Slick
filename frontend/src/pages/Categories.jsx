/* eslint-disable no-unused-vars */
import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Header } from '../components';
import Cookies from 'js-cookie';
import {  CategoryGrid,gridCategoryImage,gridCategoryStatus } from '../dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import {Edit_Category} from './'

const Categories =() => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {activeMenu, setActiveMenu,}=useStateContext();
  axios.defaults.withCredentials = true;
useEffect(() => {
  const identifier = Date.now(); 
  console.log('Categories useEffect executed:', identifier);
  const fetchData = async () => {
    try {
      setLoading(true);

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3600/AdminPanel/manageCategory',
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
      };

      const response = await axios.request(config);
      console.log(response);
      console.log(response.data.categories);
      setData(response.data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
const handleDelete=async (record)=>{
  axios.defaults.withCredentials = true; 
  const id=record.categoryId;
try {
  setLoading(true);

  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://localhost:3600/AdminPanel/manageCategory/${id}`,
    headers: {
      'Content-Type': 'application/json',
      
    },
  };

  const response = await axios.request(config);
  setData(data.filter((item) => item.categoryId !== id));
  console.log(response.data);

}
catch(error){
  console.log(error);

}
}
// Call the fetchData function
const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
    const columns = CategoryGrid.map((item, index) => ({
      title: item.headerText,
      dataIndex: item.field,
      key: item.field,
      style: { fontSize: '16px',}
    }));
    columns.push({
      title: "Edit",
      width: "100",
      textAlign: "Center",
      render: (record) => ( 
        <span>
           <button type="button" onClick={() => handleEdit(record)} style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '12px',
            zIndex: '1',
            transitionDuration: '0.4s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >Edit</button>

        </span>
      ),
    });
    columns.push({
      title: "Delete",
      width: "100",
      textAlign: "Center",
      render: (record) => ( 
        <span>
          
          <button type="button" onClick={() => handleDelete(record)} style={{
            backgroundColor: '#f44336', /* Red */
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '12px',
            zIndex: '1',
            transitionDuration: '0.4s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
          >Delete</button>


        </span>
      ),
    });
    const paginationOptions = {
      pageSize: 5,
      showSizeChanger: false,
    };
  
    const editing = {
      type: 'multiple',
       allowEditing: true,
       allowDeleting: true,
    };
    
      const handleEdit=(record)=>{
        console.log(record.categoryId);
        navigate('/DashBoard/Edit_category', { state: { data: record} });

      }
    
    // Modify your Table component to include the new class
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  "
        style={{
          maxHeight: 'auto',
          maxWidth:  "auto",
          width:'100%',
          height:'100%',
          overflow:'auto'

        }}>
        <div className="flex-grow overflow-auto">
          <Table
            dataSource={data}
            columns={columns}
             pagination={paginationOptions}
            rowKey={(record) => record.categoryId}
            bordered
            editable={editing}
            className="
              position: fixed;
              top: 0;
              background: white;
              z-index: 10;
            }" // Add this class to your Table component
            style={{
              width: '100%', 
            }}
          
          />
        </div>
      </div>
    );
  }

export default Categories;

