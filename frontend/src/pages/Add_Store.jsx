/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';

function StoreForm() {
  const [storeName, setStoreName] = useState(''); 
  const [merchantId, setMerchantId] = useState('');
  const [storeAlternateName, setStoreAlternateName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [storeDomainName, setStoreDomainName] = useState('');
  const [utmParameter, setUtmParameter] = useState('');
  const [status, setStatus] = useState('active'); 
  const [displayOnMenu, setDisplayOnMenu] = useState('active');
  const [displayOnNotificaton, setDisplayOnNotificaton] = useState('active');
  const [topStore, setTopStore] = useState('active');
  const [topStoreInFooter, setTopStoreInFooter] = useState('active');
  const [storeDescription, setStoreDescription] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaCanonical, setMetaCanonical] = useState('');
  const [metaSchema, setMetaSchema] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [categories, setCategories] = useState([]); 

  // Simulating loading your store data
  useEffect(() => {
    // ... Logic to fetch storeData 
  }, []);

  return (
    <article className="bg-zinc-100 p-24 flex" style={{minWidth:'100%'}}>
    <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add Store</h1>
    <form>
      <div className="grid grid-cols-3 gap-4"> 

     <div>
        <label className="block mb-2">Store Alternate Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={storeName} 
          onChange={(e) => setStoreName(e.target.value)} 
        />
      </div>
      <div>
        <label className="block mb-2">Merchant ID</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={merchantId} 
          onChange={(e) => setMerchantId(e.target.value)} 
        />
      </div>

      <div>
        <label className="block mb-2">Store Alternate Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={storeAlternateName} 
          onChange={(e) => setStoreAlternateName(e.target.value)} 
        />
      </div>

      <div>
        <label className="block mb-2">Store URL</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={storeUrl} 
          onChange={(e) => setStoreUrl(e.target.value)} 
        />
      </div>
    

    <div> {/* Assuming this is within a larger component */}
      <div>
        <label className="block mb-2">Store Logo</label>
        <input 
          type="file" 
          className="w-full p-2 border rounded" 
          onChange={(e) => setStoreLogo(e.target.files[0])} // Handle file selection
        />
      </div>

      <div>
        <label className="block mb-2">Tracking Link</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={trackingLink} 
          onChange={(e) => setTrackingLink(e.target.value)} 
        />
      </div>

      <div>
        <label className="block mb-2">Store Domain Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={storeDomainName} 
          onChange={(e) => setStoreDomainName(e.target.value)} 
        />
      </div>
    </div>

    <div>
        <label className="block mb-2">UTM Parameter</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={utmParameter} 
          onChange={(e) => setUtmParameter(e.target.value)} 
        />
      </div>

      <div>
        <label className="block mb-2">Store Description</label>
        <textarea 
          className="w-full p-2 border rounded"  
          value={storeDescription} 
          onChange={(e) => setStoreDescription(e.target.value)} 
        ></textarea>
      </div>

      <div>
        <label className="block mb-2">Meta Title</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded"  
          value={metaTitle} 
          onChange={(e) => setMetaTitle(e.target.value)} 
        />
      </div>

         
          <div className="mt-8"> 
      <h2 className="text-lg font-bold mb-4">SEO Section</h2>
      <div className="grid grid-cols-3 gap-4">
      <div>
      <label className="block mb-2">Meta Keywords</label>
      <input type="text" className="w-full p-2 border rounded" 
             value={metaKeyword}  
             onChange={(e)=>setMetaKeyword(e.target.value)} />
    </div>
  </div>
</div>
        </div>


        <div className="grid grid-cols-3 gap-4"> 
        <div>
    <label className="block mb-2">Status (Active/Inactive)</label>
    <input 
      type="checkbox" 
      className="w-5 h-5"
      checked={status==="ACTIVE"?true:false} 
      onChange={(e) =>{ 
        if(e.target.checked)setStatus("ACTIVE")
        else setStatus("INACTIVE")
        }} 
    /> 
  </div>  

  <div>
    <label className="block mb-2">Display On Menu</label>
    <input 
      type="checkbox" 
      className="w-5 h-5"
      checked={displayOnMenu==="ACTIVE"?true:false} 
      onChange={(e) =>{ 
        if(e.target.checked)setDisplayOnMenu("ACTIVE")
        else setDisplayOnMenu("INACTIVE")
        }} 
        />
   </div>

  <div>
    <label className="block mb-2">Display On Notification</label>
    <input 
      type="checkbox" 
      className="w-5 h-5"
      checked={displayOnNotificaton==="ACTIVE"?true:false} 
      onChange={(e) =>{ 
        if(e.target.checked)setDisplayOnNotificaton("ACTIVE")
        else setDisplayOnNotificaton("INACTIVE")
        }} 
        />
  </div>

  <div>
    <label className="block mb-2">Top Store</label>
    <input 
      type="checkbox" 
      className="w-5 h-5"
      checked={topStore==="ACTIVE"?true:false} 
      onChange={(e) =>{ 
        if(e.target.checked)setTopStore("ACTIVE")
        else setTopStore("INACTIVE")
        }} 
        />
  </div>

  <div>
    <label className="block mb-2">Top Store in Footer</label>
    <input 
      type="checkbox" 
      className="w-5 h-5"
      checked={topStoreInFooter==="ACTIVE"?true:false} 
      onChange={(e) =>{ 
        if(e.target.checked)setTopStoreInFooter("ACTIVE")
        else setTopStoreInFooter("INACTIVE")
        }} 
        />
  </div>
  <div>
  <label className="block mb-2">Store Logo</label>
  <input type="file" className="w-full p-2 border rounded" 
         onChange={(e) => setStoreLogo(e.target.files[0])} 
  />
</div>

<div>
  <label className="block mb-2">Meta Canonical</label>
  <input type="text" className="w-full p-2 border rounded" 
         value={metaCanonical} 
         onChange={(e) => setMetaCanonical(e.target.value)} 
   />
</div>

<div>
  <label className="block mb-2">Meta Schema</label>
  <textarea className="w-full p-2 border rounded"  
            value={metaSchema} 
            onChange={(e) => setMetaSchema(e.target.value)} 
  ></textarea>
</div>

<div>
  <label className="block mb-2">Meta Description</label>
  <textarea className="w-full p-2 border rounded"  
            value={metaDescription} 
            onChange={(e) => setMetaDescription(e.target.value)} 
  ></textarea>
</div>
</div>


              
      <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </div>
</article>
  );
}

export default StoreForm;