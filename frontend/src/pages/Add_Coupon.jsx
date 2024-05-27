/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';

const Add_Coupon = () => {
  const [values, setValues] = useState({
    type: '',
    AggregatorType: '',
    publisherName: '',
    cashbackType: '',
    minOff: '',
    startDate: new Date().toISOString().split('T')[0], 
    expiryDate: new Date().toISOString().split('T')[0], 
    couponCode: '',
    imageUrl: null,
    merchantLink: '',
    affiliateUrl: '',
    description:'',
    termsAndConditions: '',
    couponPunchline: '',
    status: 'ACTIVE',
    topOffer: 'INACTIVE',
    hotOfTheDay: 'INACTIVE',
    showWithCategory: 'INACTIVE',
    category: [],
    stores: [],
    store: '',
    checkedItems: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (categoryName) => {
    if (values.checkedItems.includes(categoryName)) {
      setValues({ ...values, checkedItems: values.checkedItems.filter((item) => item !== categoryName) });
    } else {
      setValues({ ...values, checkedItems: [...values.checkedItems, categoryName] });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:3600/AdminPanel/manageCategory/');
        setValues((prevValues) => ({ ...prevValues, category: response.data.category }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:3600/store/name');
        setValues((prevValues) => ({ ...prevValues, stores: response.data.map((store) => store.storeName) }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }

  const validateFields = () => {
    const newErrors = {};
    if (!values.type) newErrors.type = 'Type is required';
    if (!values.AggregatorType) newErrors.AggregatorType = 'Aggregator Type is required';
    if (!values.publisherName) newErrors.publisherName = 'Publisher Name is required';
    if (!values.minOff) newErrors.minOff = 'Minimum Off is required';
    if (!values.couponCode) newErrors.couponCode = 'Coupon Code is required';
    if (!values.description) newErrors.description = 'Description is required';
    if (!values.merchantLink) newErrors.merchantLink = 'Merchant Link is required';
    if (!values.affiliateUrl) newErrors.affiliateUrl = 'Affiliate URL is required';
    if (!values.termsAndConditions) newErrors.termsAndConditions = 'Terms and Conditions are required';
    if (!values.couponPunchline) newErrors.couponPunchline = 'Coupon Punchline is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const resetFormFields = () => {
      setValues({
        type: '',
        AggregatorType: '',
        publisherName: '',
        cashbackType: '',
        minOff: '',
        startDate: new Date().toISOString().split('T')[0], 
        expiryDate: new Date().toISOString().split('T')[0], 
        couponCode: '',
        description:'',
        imageUrl: null,
        merchantLink: '',
        affiliateUrl: '',
        termsAndConditions: '',
        couponPunchline: '',
        status: 'ACTIVE',
        topOffer: 'INACTIVE',
        hotOfTheDay: 'INACTIVE',
        showWithCategory: 'INACTIVE',
        store: '',
        checkedItems: [],
      });
    };

    console.log('Submit called');

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === 'checkedItems' || key === 'category' || key === 'stores') {
        formData.append(key, JSON.stringify(values[key]));
      } else if (key === 'startDate' || key === 'expiryDate') {
        formData.append(key, formatDate(values[key]));
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
        url: 'http://localhost:3600/coupon',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };
      const response = await axios(config);
      console.log(response);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.data;
      resetFormFields();
    } catch (error) {
      console.error('Error creating store:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="bg-zinc-100 p-24 flex" style={{ minWidth: '100%' }}>
      <div className="mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add Coupon</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Aggregator Type</label>
              <select
                className="w-full p-2 border rounded"
                value={values.AggregatorType}
                onChange={(e) => setValues({ ...values, AggregatorType: e.target.value })}
              >
                <option>Select Network</option>
                <option>FMTC</option>
                <option>Coupon Rover</option>
              </select>
              {errors.AggregatorType && <p className="text-red-500">{errors.AggregatorType}</p>}
            </div>

            <div>
              <label className="block mb-2">Publisher Name</label>
              <select
                className="w-full p-2 border rounded"
                value={values.publisherName}
                onChange={(e) => setValues({ ...values, publisherName: e.target.value })}
              >
                <option>Select</option>
                <option>Independent</option>
              </select>
              {errors.publisherName && <p className="text-red-500">{errors.publisherName}</p>}
            </div>

            <div>
              <label className="block mb-2">Select Store</label>
              <select
                className="w-full p-2 border rounded"
                value={values.store}
                onChange={(e) => setValues({ ...values, store: e.target.value })}
              >
                <option>Goldstar Coupons</option>
                <option>Silverstar Coupons</option>
                {values.stores.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mt-4 mb-2">Select Type</label>
              <select
                className="w-full p-2 border rounded"
                value={values.type}
                onChange={(e) => setValues({ ...values, type: e.target.value })}
              >
                <option>Select Voucher Type</option>
                <option>Coupon</option>
                <option>Free Shipping</option>
                <option>Dollar Off</option>
              </select>
              {errors.type && <p className="text-red-500">{errors.type}</p>}
            </div>

            <div>
              <label className="block mt-4 mb-2">Cashback Type</label>
              <select
                className="w-full p-2 border rounded"
                value={values.cashbackType}
                onChange={(e) => setValues({ ...values, cashbackType: e.target.value })}
              >
                <option>Select</option>
                <option>Value</option>
              </select>
            </div>
          </div>
          <hr className="border-2 my-6" />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mt-4 mb-2">Min off (% or $)</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Percentage"
                value={values.minOff}
                onChange={(e) => setValues({ ...values, minOff: e.target.value })}
              />
              {errors.minOff && <p className="text-red-500">{errors.minOff}</p>}
            </div>
            <div>
              <label className="block mt-4 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={values.startDate}
                onChange={(e) => setValues({ ...values, startDate:e.target.value })}
              />
            </div>
            <div>
              <label className="block mt-4 mb-2">Expiry</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={values.expiryDate}
                onChange={(e) => setValues({ ...values, expiryDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block mt-4 mb-2">Coupon Image (ONLY JPG FILE SUPPORTED)</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                accept="image/jpeg"
                onChange={(e) => setValues({ ...values, imageUrl: e.target.files[0] })}
              />
            </div>

            <div>
              <label className="block mt-4 mb-2">Merchant Link</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Merchant Link"
                value={values.merchantLink}
                onChange={(e) => setValues({ ...values, merchantLink: e.target.value })}
              />
              {errors.merchantLink && <p className="text-red-500">{errors.merchantLink}</p>}
            </div>

            <div>
              <label className="block mt-4 mb-2">Coupon Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Coupon Code"
                value={values.couponCode}
                onChange={(e) => setValues({ ...values, couponCode: e.target.value })}
              />
              {errors.couponCode && <p className="text-red-500">{errors.couponCode}</p>}
            </div>
            <div>
              <label className="block mt-4 mb-2">Description</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Description"
                value={values.description}
                onChange={(e) => setValues({ ...values, description: e.target.value })}
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            <div>
              <label className="block mt-4 mb-2">Affiliate URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Affiliate URL"
                value={values.affiliateUrl}
                onChange={(e) => setValues({ ...values, affiliateUrl: e.target.value })}
              />
              {errors.affiliateUrl && <p className="text-red-500">{errors.affiliateUrl}</p>}
            </div>

            <div>
              <label className="block mt-4 mb-2">Terms & Conditions</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                value={values.termsAndConditions}
                onChange={(e) => setValues({ ...values, termsAndConditions: e.target.value })}
              ></textarea>
              {errors.termsAndConditions && <p className="text-red-500">{errors.termsAndConditions}</p>}
            </div>
          </div>

          <hr className="border-2 my-6" />
          <div className="grid grid-cols-3 gap-2 mt-4 mb-2">
            <div>
              <label className="block mt-4 mb-2 ml-4">Coupon Punchline</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter Coupon Punchline"
                value={values.couponPunchline}
                onChange={(e) => setValues({ ...values, couponPunchline: e.target.value })}
              />
              {errors.couponPunchline && <p className="text-red-500">{errors.couponPunchline}</p>}
            </div>

            <div>
              <label className="mt-4 mb-2">Hot Of The Day</label>
              <input
                type="checkbox"
                className="w-5 h-5 mt-4 mb-2 ml-4"
                checked={values.hotOfTheDay === 'ACTIVE'}
                onChange={(e) => {
                  if (e.target.checked) setValues({ ...values, hotOfTheDay: 'ACTIVE' });
                  else setValues({ ...values, hotOfTheDay: 'INACTIVE' });
                }}
              />
            </div>

            <div>
              <label className="mt-4 mb-2">Status (Active/Inactive)</label>
              <input
                type="checkbox"
                className="w-5 h-5 mt-4 mb-2 ml-4"
                checked={values.status === 'ACTIVE'}
                onChange={(e) => {
                  if (e.target.checked) setValues({ ...values, status: 'ACTIVE' });
                  else setValues({ ...values, status: 'INACTIVE' });
                }}
              />
            </div>

            <div>
              <label className="mt-4 mb-2">Top Offer</label>
              <input
                type="checkbox"
                className="w-5 h-5 mt-4 mb-2 ml-4"
                checked={values.topOffer === 'ACTIVE'}
                onChange={(e) => {
                  if (e.target.checked) setValues({ ...values, topOffer: 'ACTIVE' });
                  else setValues({ ...values, topOffer: 'INACTIVE' });
                }}
              />
            </div>
            <div>
              <label className="mt-4 mb-2">Show With Category</label>
              <input
                type="checkbox"
                className="w-5 h-5 mt-4 mb-2 ml-4"
                checked={values.showWithCategory === 'ACTIVE'}
                onChange={(e) => {
                  if (e.target.checked) setValues({ ...values, showWithCategory: 'ACTIVE' });
                  else setValues({ ...values, showWithCategory: 'INACTIVE' });
                }}
              />
            </div>
          </div>
          <hr className="border-2 my-6" />
          <h2 className="block">Select Categories</h2>
          <div className="grid grid-cols-3 gap-2 mt-4 mb-2">
            {values.category.map((cat, index) => {

              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={values.checkedItems.includes(cat)}
                    onChange={() => handleCheckboxChange(cat)}
                  />
                  <span className="header mb-1 ml-2">{cat}</span>
                </div>
              );
            })}
          </div>
          <hr className="border-2 my-6" />
          <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </article>
  );
};

export default Add_Coupon;
