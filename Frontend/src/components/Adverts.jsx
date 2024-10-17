import  { useState, useRef, useEffect } from 'react';
import profile from '../assets/profileAD.svg'
import fashion from '../assets/ad/game-icons_clothes.svg'    
import elect from '../assets/ad/solar_tv-bold.svg'
import real from '../assets/ad/bi_houses-fill.svg'
import auto from '../assets/ad/mingcute_car-3-fill.svg'
import Home from '../assets/ad/maki_furniture.svg'
import food from '../assets/ad/Vector.svg'
import pharm from '../assets/ad/map_health.svg'
import art from '../assets/ad/fluent_sport-soccer-16-filled.svg'

const Adverts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Category');
    const dropdownRef = useRef(null);
    
    const [isLocation, setIsLocation] = useState(false);
const [selectedLocation, setSelectedLocation] = useState('Location');

    const options = [
        { value: 'Fashion', label: 'Fashion', icon: (<img src={fashion} className='w-[20px] h-[30px]' alt="" />)  },
        { value: 'Electronics', label: 'Electronics', icon: (<img src={elect} alt="" className='w-[20px] h-[30px]'/>) },
        { value: 'Real Estate', label: 'Real Estate', icon: (<img src={real} alt="" className='w-[20px] h-[30px]'/>) },
        { value: 'Automobiles', label: 'Automobiles', icon: (<img src={auto} alt="" className='w-[20px] h-[30px]'/>) },
        { value: 'Home appliance & Furniture', label: 'Home appliance & Furniture', 
            icon: (<img src={Home} alt="" className='w-[20px] h-[30px]' />) },
        { value: 'Agriculture and Food', label: 'Agriculture and Food', icon: (<img src={food} alt="" className='w-[20px] h-[30px]'/>) },
        { value: 'Pharmacies', label: 'Pharmacies', icon: (<img src={pharm} alt="" className='w-[20px] h-[30px]'/>) },
        { value: 'Sports, Arts & Outdoors', label: 'Sports, Arts & Outdoors', icon: (<img src={art} alt="" className='w-[20px] h-[30px]'/>) },
 
    ];

    const location = [
        { value: 'new', label: 'new', icon: '🌟' },
        { value: 'Electronics', label: 'Electronics', icon: '🚀' },
        { value: 'Real Estate', label: 'Real Estate', icon: '⚡️' },
        { value: 'Automobiles', label: 'Automobiles', icon: '🌟' },
        { value: 'Home appliance & Furniture', label: 'Home appliance & Furniture', icon: '🚀' },
        { value: 'Agriculture and Food', label: 'Agriculture and Food', icon: '⚡️' },
        { value: 'Pharmacies', label: 'Pharmacies', icon: '🌟' },
        { value: 'Sports, Arts & Outdoors', label: 'Sports, Arts & Outdoors', icon: '🚀' },
 
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        

    };

    // const handleClickOutside = (event) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //         setIsOpen(false);
            
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);
    


    const toggleDropdownLocation = () => setIsLocation(!isLocation);

    const selectLocation = (location) => {
        setSelectedLocation(location.label);
        setIsLocation(false);
    };



    return (
   
<div>
        
    <div className="max-w-[1000px] mx-auto flex-col">
        <div className="border border-[#FFFFFF] shadow-md text-center h-[70px] m-6 flex justify-center items-center">
          <h2 className="text-[#236C13] text-xl font-bold">Place an Advert</h2>
        </div>

        <div className="border border-[#FFFFFF]  shadow-lg   m-8 pb-8 flex flex-col justify-center items-center ">    
        <div className="p-6 mt-[55px]">
        {/* <select className="w-[400px] border-red-500 bg-white focus:border-[#236c13] md:p-4 p-2 md:font-semi-bold rounded-lg" /> */}

        {/* <option value="" key="">xxxxxxxx</option>
        <option value="" key="">xxxxxxxx</option>        <option value="" key="">xxxxxxxx</option>            
        </Select> */}
     {/* <div className="relative  flex justify-center items-center">
    <select className="block w-[400px] mt-1 md:p-3 p-2  md:font-semi-bold rounded-lg bg-white border border-[#236C13] shadow-sm br-re focus:outline-none focus:ring-[#236C13] focus:border-[#236C13] appearance-none focus:ring-0">
        <option className="border-b-red-600 br mt-4 border" value="" disabled selected>Category</option>
        <option value="option1" className=''>Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex justify-center mt-1 items-center px-2 pointer-events-none">
        <svg className="w-5 h-5 text-[#070706]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </div>
</div>
*/}

<div>
    <div className="relative inline-block" ref={dropdownRef}>
<div className='flex justify-center items-center mx-auto'>
            <button 
                onClick={toggleDropdown} 
                className="text-left 
                block w-[400px] mt-1 md:p-3 p-2  md:font-semi-bold rounded-lg bg-white border border-[#236C13] shadow-sm br-red focus:outline-none focus:ring-[#236C13] focus:border-[#236C13] appearance-none focus:ring-0
                "
            >
                <span>{selectedOption}</span>
                <svg className="w-4 h-4 text-[#236C13] absolute flex justify-center text-center items-center right-3 top-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#236C13] rounded-md shadow-lg">
                    <div className="max-h-60 overflow-auto text-[#236C13]">

                        {options.map((option) => (
                            <div key={option.value} className="border-b border-b-[#236C13] last:border-b-0">
                    
                                <button 
                                    onClick={() => selectOption(option)} 
                                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    <span className="mr-2 text-lg">{option.icon}</span>
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        </div>

       {/* location  */}
        <div className='mt-8'>
     <div className="relative inline-block" ref={dropdownRef}>
    {/* <div className='flex justify-center items-center mx-auto'> */}
            <button 
                onClick={toggleDropdownLocation} 
                className="text-left 
                block w-[400px] mt-1 md:p-3 p-2  md:font-semi-bold rounded-lg bg-white border border-[#236C13] shadow-sm br-red focus:outline-none focus:ring-[#236C13] focus:border-[#236C13] appearance-none focus:ring-0
                "
            >
                <div className='flex items-center align-center'>
                <span>{selectedLocation}</span>
                <svg className="w-4 h-4 text-[#236C13] absolute  flex justify-between text-center items-center right-3 top-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                </div>
            </button>

            
            {isLocation && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#236C13] rounded-md shadow-lg">
                    <div className="max-h-60 overflow-auto text-[#236C13]">

                        {location.map((location) => (
                            <div key={location.value} className="border-b border-b-[#236C13] last:border-b-0">
                    
                                <button 
                                    onClick={() => selectLocation(location)} 
                                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    <span className="mr-2 text-lg">{location.icon}</span>
                                    {location.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        </div>
        <div className="my-5">
          <h2>Add Photos</h2>
          <div className='flex'>         
             <div className='border bg-slate-100  w-[100px] h-[100px] mt-3 rounded-md'>
            <div className='flex items-center justify-center justify-items-center mt-4'>
          <img src={profile} alt="" className='text-center flex items-center mx-auto justify-center w-[60px] h-[60px]'/> 
          </div>
          </div>

        <div className='ml-4 mt-7 text-sm'>
            <span className='flex items-center align-middle '>
            <li className='text-[#236C13] mt-1'></li>
            You can add 3-20 photos
            </span>
            
            <span className='flex items-center'>
            <li className='text-[#236C13] mt-1'></li>
            First photo is the title photo
            </span>

            <span className='flex items-center'>
            <li className='text-[#236C13] mt-1'></li>
            Supported File formats: *.jpg and *.png
            </span>
        </div>
        </div>
    
       </div>
    

        </div> 
        

        <button className='w-[400px] p-3 rounded-md font-bold mb-6 text-center bg-[#236C13] text-white'>NEXT</button>

    
        </div>

        </div>
        <div>

       </div>
    </div>
  )
}

export default Adverts;
// import React from 'react';

// const Advert = ({ subpage }) => {
//   let content;

//   switch (subpage) {
//     case 'my-adverts':
//       content = <MyAdverts />;
//       break;
//     case 'feedback':
//       content = <Feedback />;
//       break;
//     case 'insights':
//       content = <Insights />;
//       break;
//     default:
//       content = <div>Select an option from the sidebar</div>;
//   }

//   return (
//     <div>
//       {/* Sidebar and main profile content */}
//       <div className="min-h-screen flex">
//         <aside className="w-1/5 bg-white p-4">
//           <nav>
//             <ul>
//               <li className="py-2 hover:bg-gray-200 rounded-lg">
//                 <a href="/profile/my-adverts" className="block text-gray-700">My Adverts</a>
//               </li>
//               <li className="py-2 hover:bg-gray-200 rounded-lg">
//                 <a href="/profile/feedback" className="block text-gray-700">Feedback</a>
//               </li>
//               <li className="py-2 hover:bg-gray-200 rounded-lg">
//                 <a href="/profile/insights" className="block text-gray-700">Insights</a>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* Main profile content */}
//         <main className="w-full p-6 bg-gray-100">
//           {content}
//         </main>
//       </div>
//     </div>
//   );
// };

// const MyAdverts = () => <div>My Adverts Content</div>;
// const Feedback = () => <div>Feedback Content</div>;
// const Insights = () => <div>Insights Content</div>;

// export default Advert;
// >>>>>>> 4af4441a14b7d2867deca64a57e3c79e28e84613
