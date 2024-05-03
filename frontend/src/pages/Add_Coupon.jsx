/* eslint-disable no-unused-vars */
import { useEffect,useState } from "react"
const Add_Coupon = () => {
    const [couponId, setCouponId] = useState(''); 
  const [type, setType] = useState(''); 
  const [AggregatorType, setAggregatorType] = useState(''); 
  const [publisherName, setPublisherName] = useState(''); 
  const [publisherId, setPublisherId] = useState(''); 
  const [cashbackType, setCashbackType] = useState(''); 
  const [minOff, setMinOff] = useState(0); 
  const [startDate, setStartDate] = useState(new Date()); 
  const [expiryDate, setExpiryDate] = useState(new Date()); 
  const [couponCode, setCouponCode] = useState(''); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [merchantLink, setMerchantLink] = useState(''); 
  const [affiliateUrl, setAffiliateUrl] = useState(''); 
  const [termsAndConditions, setTermsAndConditions] = useState(''); 
  const [couponPunchline, setCouponPunchline] = useState('');
  const [status, setStatus] = useState('active'); 
  const [topOffer, setTopOffer] = useState('inactive'); 
  const [hotOfTheDay, setHotOfTheDay] = useState('inactive'); 
  const [showWithCategory, setShowWithCategory] = useState('inactive');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]); 
  const [store, setStore] = useState('');   
  const [storeid, setStoreid] = useState('');


useEffect(()=>{


},[])


  return (
    <article className="bg-zinc-100 p-24 flex " style={{minWidth:'100%'}}>
    <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add Coupon</h1>
        <form>
                <div className="grid grid-cols-3 gap-4">
                <div >
                <label className="block mb-2">Aggregator Type</label>
                <select 
                className="w-full p-2 border rounded"
                value={AggregatorType} 
                onChange={(e) => setAggregatorType(e.target.value)}
                >
                <option>Coupon Rovers</option>
                </select>
            </div>

            <div>
                <label className="block mb-2">Publisher Name</label>
                <select 
                className="w-full p-2 border rounded"
                value={publisherName} 
                onChange={(e) => setPublisherName(e.target.value)}
                >
                <option>Independent</option>
                </select>
            </div>

            <div>
                <label className="block mb-2">Select Store</label>
                <select 
                className="w-full p-2 border rounded"
                value={store} 
                onChange={(e) => setStore(e.target.value)}
                >
                <option>Goldstar Coupons</option>
                <option>Silverstar Coupons</option>
                {/* Add more options if needed */}
                </select>
            </div>
                     <div>
                        <label className="block mt-4 mb-2">Select Type</label>
                        <select 
                            className="w-full p-2 border rounded"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>Coupon</option>
                            {/* Add other types if needed */}
                        </select>
                        </div>

                        <div>
                        <label className="block mt-4 mb-2">Cashback Type</label>
                        <select 
                            className="w-full p-2 border rounded"
                            value={cashbackType}
                            onChange={(e) => setCashbackType(e.target.value)}
                        >
                            <option>Value</option>
                            {/* Add other types if needed */}
                        </select>
                        </div>
                        </div>
                        <hr className=" border-2 my-6"/>

                        <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mt-4 mb-2">Min off (% or $)</label>
                            <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            placeholder="Enter Percentage"
                            value={minOff}
                            onChange={(e) => setMinOff(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mt-4 mb-2">Start Date</label>
                            <input 
                            type="date" 
                            className="w-full p-2 border rounded"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mt-4 mb-2">Expiry</label>
                            <input 
                            type="date" 
                            className="w-full p-2 border rounded"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mt-4 mb-2">Coupon Image (ONLY JPG FILE SUPPORTED)</label>
                            <input 
                                type="file" 
                                className="w-full p-2 border rounded" 
                                accept="image/jpeg" // Restrict to JPG only
                                //onChange={handleImageChange} 
                            />
                            </div>

                            <div>
                            <label className="block mt-4 mb-2">Merchant Link</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded" 
                                placeholder="Enter Merchant Link"
                                value={merchantLink}
                                onChange={(e) => setMerchantLink(e.target.value)} 
                            />
                            </div>

                            <div>
                            <label className="block mt-4 mb-2">Coupon Code</label>
                            <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            placeholder="Enter Coupon Code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)} 
                            />
                        </div>

                        <div>
                            <label className="block mt-4 mb-2">Affiliate url</label>
                            <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            placeholder="Enter Affiliate url"
                            value={affiliateUrl}
                            onChange={(e) => setAffiliateUrl(e.target.value)} 
                            />
                        </div>

                            <div>
                            <label className="block mt-4 mb-2">Terms & Conditions</label>
                            <textarea 
                                className="w-full p-2 border rounded" 
                                rows="3"
                                value={termsAndConditions}
                                onChange={(e) => setTermsAndConditions(e.target.value)} 
                            ></textarea>
                            </div>
                        </div>
                        
                
                <hr className=" border-2 my-6"/>
                <div className="grid grid-cols-3 gap-2 mt-4 mb-2">
                <div>
                    <label className="block mt-4 mb-2  ml-4">Coupon Punchline</label>
                    <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="Enter Coupon Punchline"
                    value={couponPunchline}
                    onChange={(e) => setCouponPunchline(e.target.value)} 
                    />
                </div>

                    <div>
                    <label className=" mt-4 mb-2 ">Hot Of The Day</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={hotOfTheDay==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setHotOfTheDay("ACTIVE")
                            else setHotOfTheDay("INACTIVE")
                            }} 
                        /> 
                </div>

                
                    <div>
                    <label className=" mt-4 mb-2">Status (Active/Inactive)</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={status==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setStatus("ACTIVE")
                            else setStatus("INACTIVE")
                            }} 
                        /> 
                        </div>
                
                    <div>
                    <label className=" mt-4 mb-2 ">Top Offer</label>
                    <input 
                    type="checkbox" 
                    className="w-5 h-5 mt-4 mb-2 ml-4"
                    checked={topOffer==="ACTIVE"?true:false} 
                    onChange={(e) =>{ 
                        if(e.target.checked)setTopOffer("ACTIVE")
                        else setTopOffer("INACTIVE")
                        }} 
                    /> 
                    </div>
                    <div  >
                    <label className=" mt-4 mb-2">Show With Category</label>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 mt-4 mb-2  ml-4"
                        checked={showWithCategory==="ACTIVE"?true:false} 
                        onChange={(e) =>{ 
                            if(e.target.checked)setShowWithCategory("ACTIVE")
                            else setShowWithCategory("INACTIVE")
                            }} 
                        /> 
                        </div>
                </div>
            <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </form>
    </div>
</article>

  )
}

export default Add_Coupon
