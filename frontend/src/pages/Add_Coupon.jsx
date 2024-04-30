const Add_Coupon = () => {
  return (
    <body className="bg-zinc-100 p-8">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add Coupon</h1>
        <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                    <label className="block mb-2">Aggregator Name</label>
                    <select className="w-full p-2 border rounded">
                        <option>Coupon Rovers</option>
                    </select>

                    <label className="block mt-4 mb-2">Select Type</label>
                    <select className="w-full p-2 border rounded">
                        <option>Coupon</option>
                    </select>

                    <label className="block mt-4 mb-2">Min off (% or $)</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Enter Percentage"/>

                    <label className="block mt-4 mb-2">Coupon Image (ONLY JPG FILE SUPPORTED)</label>
                    <input type="file" className="w-full p-2 border rounded"/>

                    <label className="block mt-4 mb-2">Merchant Link</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Enter Merchant Link"/>

                    <label className="block mt-4 mb-2">Coupon Punchline</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Enter Coupon Punchline"/>

                    <label className="block mt-4 mb-2">Hot Of The Day</label>
                    <input type="checkbox" className="w-5 h-5"/>

                    <label className="block mt-4 mb-2">Description</label>
                    <textarea className="w-full p-2 border rounded" rows="4"></textarea>
                </div>

                
                <div>
                    <label className="block mb-2">Publisher Name</label>
                    <select className="w-full p-2 border rounded">
                        <option>Independent</option>
                    </select>

                    <label className="block mt-4 mb-2">Select Store</label>
                    <select className="w-full p-2 border rounded">
                        <option>Goldstar Coupons</option>
                    </select>

                    <label className="block mt-4 mb-2">Cashback Type</label>
                    <select className="w-full p-2 border rounded">
                        <option>Value</option>
                    </select>

                    <label className="block mt-4 mb-2">Start Date</label>
                    <input type="date" className="w-full p-2 border rounded"/>

                    <label className="block mt-4 mb-2">Expiry</label>
                    <input type="date" className="w-full p-2 border rounded"/>

                    <label className="block mt-4 mb-2">Coupon Code</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Enter Coupon Code"/>

                    <label className="block mt-4 mb-2">Affiliate url</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Enter Affiliate url"/>

                    <label className="block mt-4 mb-2">Terms & Conditions</label>
                    <textarea className="w-full p-2 border rounded" rows="3"></textarea>

                    <label className="block mt-4 mb-2">Status (Active/Inactive)</label>
                    <input type="checkbox" className="w-5 h-5"/>

                    <label className="block mt-4 mb-2">Top Offer</label>
                    <input type="checkbox" className="w-5 h-5"/>

                    <label className="block mt-4 mb-2">Show With Category</label>
                    <input type="checkbox" className="w-5 h-5"/>
                </div>
            </div>
            <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </form>
    </div>
</body>

  )
}

export default Add_Coupon
