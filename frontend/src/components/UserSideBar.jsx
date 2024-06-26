// eslint-disable-next-line no-unused-vars
import React from 'react'
 import {Link,NavLink} from 'react-router-dom'
// import { AiOutlineMenu } from 'react-icons/ai';
// import { FiShoppingCart } from 'react-icons/fi';
// import { BsChatLeft } from 'react-icons/bs';
// import { RiNotification3Line } from 'react-icons/ri';
// import { MdKeyboardArrowDown } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import { Tooltip } from 'antd';
import { MdOutlineCancel } from 'react-icons/md';
import { SiShopware } from 'react-icons/si';
import {links} from '../dummy'
const SideBar = () => {
  const {activeMenu, setActiveMenu,}=useStateContext();
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 '>
      {activeMenu?(<>
      <p> hello</p>
      <div className='flex justify-between items-center'>
        <Link to='/DashBoard' onClick={()=>{setActiveMenu(false)}} className='items-center gap-3 ml-3 mt-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
          <SiShopware/> <span> Slick</span>
          
        </Link>
        <Tooltip title="Menu" placement="bottom">
        <button
          type="button"
          onClick={()=>{setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}}
          style={{ color: 'currentColor' }}
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
        >
          <MdOutlineCancel />
        </button>
      </Tooltip>
        </div>

        <div className='mt-10'>
          {links.map((item)=>(
            <div key={item.title}>
              <p className='text-gray-400 m-3 mt-4 uppercase'>
                {item.title}
              </p>
              {item.links.map((link)=>(
                <NavLink
                to={`/DashBoard/${link.route}`}
                key={link.name}
                  onClick={()=>{}}
                  className={({isActive})=>isActive?activeLink:normalLink}>
                    <span className='capatalize'>
                      {link.name}
                    </span>

                </NavLink>
              ))}

               </div>
          ))}
          
        </div>
        </>
        ):(<></>)}
      
    </div>
  )
}

export default SideBar
