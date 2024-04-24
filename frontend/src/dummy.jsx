/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
export const links = [
  {
    title: "DashBoard",
    links: [],
  },
  {
    title: "Category",
    links: [
      {
        name: "Add_Category",
        route: "Add_Category",
      },
      {
        name: "Edit_Category",
        route: "Edit_Category",
      },
      {
        name: "Categories",
        route: "Categories",
      },
    ],
  },
  {
    title: "Admin",
    links: [
      {
        name: "Add User",
        route: "Add_User",
      },
      {
        name: "Edit User",
        route: "Edit_User",
      },
    ],
  },
];

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

export const adminGrid = [
  {
    headerText: "Employee",
    width: "150",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  { field: "email", headerText: "email", width: "170", textAlign: "Center" },
  { headerText: "status", width: "120", textAlign: "Center" },

  {
    field: "Department",
    headerText: "Deparment",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },
];
export const adminData = [
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
  },
];

export const gridCategoryImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridCategoryStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);


export const CategoryGrid = [
  {
    headerText: "CategoryUrl",
    width: "150px",
    template: gridCategoryImage,
    textAlign: "Center",
  },
  {
    field: "categoryName",
    headerText: "categoryName",
    width: "50px",
    textAlign: "Center",
  },
  {
    field: "displayOnHome",
    headerText: "displayOnHome",
    template: gridCategoryStatus,
    width: "50px",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "displayOnHomecoupons",
    headerText: "displayOnHomecoupons",
    template: gridCategoryStatus,
    width: "50px",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "displayOnFooter",
    headerText: "displayOnFooter",
    template: gridCategoryStatus,
    width: "50px",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "imageUrl",
    headerText: "imageUrl",
    width: "50px",
    textAlign: "Center",
  },
  {
    field: "metaDescription",
    headerText: "metaDescription",
    width: "170px",
    textAlign: "Center",
  },
  {
    field: "metaKeyword",
    headerText: "metaKeyword",
    width: "170px",
    textAlign: "Center",
  },
  {
    field: "metaCanonical",
    headerText: "metaCanonical",
    width: "170px",
    textAlign: "Center",
  },
  {
    field: "metaSchema",
    headerText: "metaSchema",
    width: "170px",
    textAlign: "Center",
  },{
    field: "metaTitle",
    headerText: "metaTitle",
    width: "120px",
    textAlign: "Center",
    font:"black",
  },
  {
    field: "status",
    headerText: "status",
    template: gridCategoryStatus,
    width: "50",
    format: "yMd",
    textAlign: "Center",
  },
  
];


export const StoreGrid = [
  {
      headerText: "Store Logo",
      width: "120px",
      template: gridStoreImage, // Assuming you have an image display template
      textAlign: "Center"
  },
  {
      field: "storeName",
      headerText: "Store Name",
      width: "150px",
      textAlign: "Center"
  },
  {
      field: "merchantId",  // Or change to a more descriptive 'merchantName' if available
      headerText: "Merchant",
      width: "150px",
      textAlign: "Center"
  },
  {
      field: "status",
      headerText: "Status",
      template: gridStoreStatus, // Assuming you have a status display template
      width: "80px",
      textAlign: "Center"    
  },
  { 
      field: "displayOnMenu",
      headerText: "Show on Menu",
      template: gridStoreStatus,  
      width: "120px",
      textAlign: "Center"  
  },
  { 
    field: "metaTitle", 
    headerText: "Meta Title", 
    width: "150px",
    textAlign: "Center" 
},
{ 
    field: "metaDescription", 
    headerText: "Meta Description", 
    width: "200px", 
    textAlign: "Center" 
},
{ 
    field: "metaKeyword", 
    headerText: "Meta Keywords", 
    width: "180px", 
    textAlign: "Center" 
},
{ 
    field: "metaCanonical", 
    headerText: "Meta Canonical", 
    width: "180px", 
    textAlign: "Center" 
},
{ 
    field: "metaSchema", 
    headerText: "Meta Schema", 
    width: "220px", 
    textAlign: "Center" 
},
  
  {
      field: "storeUrl",
      headerText: "Store URL",
      width: "180px",
      textAlign: "Center" 
  }, 
  {
      field: "metaTitle",
      headerText: "Meta Title",
      width: "150px",
      textAlign: "Center"
  },
  { 
    field: "storeAlternateName", 
    headerText: "Alternate Name", 
    width: "180px",
    textAlign: "Center" 
},
{ 
    field: "TrackingLink", 
    headerText: "Tracking URL",
    width: "250px", // Might need a wide column
    textAlign: "Center" 
}, 
{  
    field: "storeDomainName",
    headerText: "Domain Name",
    width: "180px",
    textAlign: "Center"  
},
{  
    field: "utmParameter",
    headerText: "UTM Parameters",
    width: "180px",
    textAlign: "Center"  
},
{ 
    field: "displayOnNotification",
    headerText: "Show on Notifications",
    template: gridStoreStatus,  
    width: "180px",
    textAlign: "Center"  
},
{ 
    field: "topStore",
    headerText: "Top Store",
    template: gridStoreStatus,  
    width: "100px",
    textAlign: "Center"  
},
{ 
    field: "topStoreInFooter",
    headerText: "Show in Footer",
    template: gridStoreStatus,  
    width: "150px",
    textAlign: "Center"  
}
  // ... Add other meta fields similarly ...
];
