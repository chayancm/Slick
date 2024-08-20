import axios from 'axios';
import { useState, useEffect } from 'react';
//import CategorySearch from "../Category/CategorySearch";

const initialState = {
  storeName: '',
  storeAlternateName: '',
  merchantId: '',
  storeUrl: '',
  storeLogo: null,
  trackingLink: '',
  storeDomainName: '',
  utmParameter: '',
  status: 'INACTIVE',
  displayOnMenu: 'INACTIVE',
  displayOnNotificaton: 'INACTIVE',
  topStore: 'INACTIVE',
  topStoreInFooter: 'INACTIVE',
  storeDescription: '',
  metaKeyword: '',
  metaDescription: '',
  metaCanonical: '',
  metaTitle: '',
  metaSchema: '',
  categories: [],
  displayCategories: [],
  checkedItems: []
};

const StoreForm = () => {
  const [values, setValues] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [merchantIdError, setMerchantIdError] = useState('');

  const resetFormFields = () => {
    setValues(initialState);
    setErrors({});
    setMerchantIdError('');
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = [
      'storeName', 'merchantId', 'storeUrl', 'storeDescription',
      'metaKeyword', 'metaTitle', 'metaCanonical', 'metaDescription'
    ];
    
    requiredFields.forEach(field => {
      if (!values[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (!values.storeLogo) {
      newErrors.storeLogo = 'Store logo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkMerchantId = async (merchantId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/store/check-merchant-id/${merchantId}`);
      if (response.status === 200) {
        setMerchantIdError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMerchantIdError('Merchant ID already exists');
      } else {
        setMerchantIdError('Error checking Merchant ID');
      }
    }
  };

  const handleMerchantIdChange = (e) => {
    const merchantId = e.target.value;
    setValues({ ...values, merchantId });
    if (merchantId.length >= 4) {
      checkMerchantId(merchantId);
    } else {
      setMerchantIdError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit called");

    if (!validateFields()) {
      return;
    }

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        values[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/store`, 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      };

      const response = await axios(config);
      console.log(response);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //const result = await response.data;
      resetFormFields();
    } catch (error) {
      console.error('Error creating store:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (categoryName) => {
    setValues((prevValues) => ({
      ...prevValues,
      checkedItems: prevValues.checkedItems.includes(categoryName)
        ? prevValues.checkedItems.filter((item) => item !== categoryName)
        : [...prevValues.checkedItems, categoryName]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_URL}/store/categories`,
        };
        const response = await axios.request(config);
        console.log(response.data);
        const categoryName = response.data.map((category) => category.categoryName);
        setValues((prevValues) => ({
          ...prevValues,
          displayCategories: categoryName
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("displayCategories", values.displayCategories);
  }, [values.displayCategories]);

  return (
    <article className="bg-zinc-100 p-24 flex" style={{ minWidth: '100%' }}>
      <div className="mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add Store</h1>
        <form onSubmit={onSubmit}>
          <fieldset className='' style={{ width: '100%' }}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Store Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.storeName}
                  onChange={(e) => setValues({ ...values, storeName: e.target.value })}
                />
                {errors.storeName && <p className="text-red-500">{errors.storeName}</p>}
              </div>
              <div>
                <label className="block mb-2">Merchant ID</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.merchantId}
                  onChange={handleMerchantIdChange}
                />
                {errors.merchantId && <p className="text-red-500">{errors.merchantId}</p>}
                {merchantIdError && <p className="text-red-500">{merchantIdError}</p>}
              </div>
              <div>
                <label className="block mb-2">Store Alternate Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.storeAlternateName}
                  onChange={(e) => setValues({ ...values, storeAlternateName: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Store URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.storeUrl}
                  onChange={(e) => setValues({ ...values, storeUrl: e.target.value })}
                />
                {errors.storeUrl && <p className="text-red-500">{errors.storeUrl}</p>}
              </div>
            </div>
            <hr className="border-2 my-6" />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Store Logo</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setValues({ ...values, storeLogo: e.target.files[0] })}
                />
                {errors.storeLogo && <p className="text-red-500">{errors.storeLogo}</p>}
              </div>
              <div>
                <label className="block mb-2">Tracking Link</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.trackingLink}
                  onChange={(e) => setValues({ ...values, trackingLink: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Store Domain Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={values.storeDomainName}
                  onChange={(e) => setValues({ ...values, storeDomainName: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Store Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={values.storeDescription}
                  onChange={(e) => setValues({ ...values, storeDescription: e.target.value })}
                ></textarea>
                {errors.storeDescription && <p className="text-red-500">{errors.storeDescription}</p>}
              </div>
            </div>
            <hr className="border-2 my-6" />
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">SEO Section</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={values.metaKeyword}
                    onChange={(e) => setValues({ ...values, metaKeyword: e.target.value })}
                  />
                  {errors.metaKeyword && <p className="text-red-500">{errors.metaKeyword}</p>}
                </div>
                <div>
                  <label className="block mb-2">Meta Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={values.metaTitle}
                    onChange={(e) => setValues({ ...values, metaTitle: e.target.value })}
                  />
                  {errors.metaTitle && <p className="text-red-500">{errors.metaTitle}</p>}
                </div>
                <div>
                  <label className="block mb-2">Meta Canonical</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={values.metaCanonical}
                    onChange={(e) => setValues({ ...values, metaCanonical: e.target.value })}
                  />
                  {errors.metaCanonical && <p className="text-red-500">{errors.metaCanonical}</p>}
                </div>
                <div>
                  <label className="block mb-2">Meta Schema</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={values.metaSchema}
                    onChange={(e) => setValues({ ...values, metaSchema: e.target.value })}
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-2">Meta Description</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={values.metaDescription}
                    onChange={(e) => setValues({ ...values, metaDescription: e.target.value })}
                  ></textarea>
                  {errors.metaDescription && <p className="text-red-500">{errors.metaDescription}</p>}
                </div>
              </div>
            </div>
            <hr className="border-2 my-6" />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mt-4 mb-2">Status (Active/Inactive)</label>
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-4 mb-2 ml-4"
                  checked={values.status === "ACTIVE"}
                  onChange={(e) => {
                    setValues({ ...values, status: e.target.checked ? "ACTIVE" : "INACTIVE" });
                  }}
                />
              </div>
              <div>
                <label className="mt-4 mb-2">Display On Menu</label>
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-4 mb-2 ml-4"
                  checked={values.displayOnMenu === "ACTIVE"}
                  onChange={(e) => {
                    setValues({ ...values, displayOnMenu: e.target.checked ? "ACTIVE" : "INACTIVE" });
                  }}
                />
              </div>
              <div>
                <label className="mt-4 mb-2">Display On Notification</label>
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-4 mb-2 ml-4"
                  checked={values.displayOnNotificaton === "ACTIVE"}
                  onChange={(e) => {
                    setValues({ ...values, displayOnNotificaton: e.target.checked ? "ACTIVE" : "INACTIVE" });
                  }}
                />
              </div>
              <div>
                <label className="mt-4 mb-2">Top Store</label>
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-4 mb-2 ml-4"
                  checked={values.topStore === "ACTIVE"}
                  onChange={(e) => {
                    setValues({ ...values, topStore: e.target.checked ? "ACTIVE" : "INACTIVE" });
                  }}
                />
              </div>
              <div>
                <label className="mt-4 mb-2">Top Store in Footer</label>
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-4 mb-2 ml-4"
                  checked={values.topStoreInFooter === "ACTIVE"}
                  onChange={(e) => {
                    setValues({ ...values, topStoreInFooter: e.target.checked ? "ACTIVE" : "INACTIVE" });
                  }}
                />
              </div>
            </div>
            <hr className="border-2 my-6" />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {values.displayCategories.map((category, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={values.checkedItems.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                  />
                  <span className="header font-semibold mb-1 ml-2">
                    {category}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-2 my-6" />
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mb-8 grow-0">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </article>
  );
};

export default StoreForm;
