import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection,getDocs } from 'firebase/firestore';
import { deleteDoc, doc} from 'firebase/firestore';



const EmployeInfo = () => {

  const [val,setVal]=useState([]);
 
  const value=collection(db,"user")

  // useEffect(()=>{
  //   const getData=async()=>{
  //     const dbval=await getDocs(value)
  //     setVal(dbval.docs.map(doc=>({...doc.data(),id:doc.id})))
  //   }
  //   getData()
  // })



  
  
  // Function to fetch data when button is clicked
  const fetchDataOnClick = () => {
    const getData = async () => {
      try{
        const dbval = await getDocs(value);
      setVal(dbval.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }catch(err){
        console.log(err)
      }
    };
    // Call the getData function when button is clicked
    getData();
  };

  const handleDelete=async(id)=>{
    // const deleteValue=doc(database,"demo",id)
    const deleteValue=doc(db,"user",id)
    await deleteDoc(deleteValue)
}


  return (


    <div>
      <div className="overflow-x-auto w-full">
  <table className="table table-zebra w-[600px] ml-[400px] mt-[200px]   ">
    {/* head */}
    <thead>
    <tr key={val.id} className=' border-b-2 border-cyan-400 text-cyan-100 text-lg'>
        <th >USERNAME</th >
        <th>EMAIL</th>
        <th>ROLE</th>
        <th >EDIT</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        val.map(details=><tr>
            <td c>{details.userName}</td>
            <td>{details.email}</td>
            <td>{details.role}</td>
            <td>
                <button className='border w-24 h-10 rounded-xl border-cyan-400 text-white hover:text-red-500 hover:border-red-600' onClick={()=>handleDelete(details.id)}>DELETE</button>
            </td>
        </tr>)
     }
    </tbody>
  </table>
 
</div>
<div className=' flex place-content-end  mt-36'>
    {/* Button to trigger data fetching */}
    <button className='border-2 border-cyan-300  text-white w-28 rounded-xl h-10 '  onClick={fetchDataOnClick}>Show Users</button>
    {/* Render your data here */}
  </div>
</div>

  


  );
};

export default EmployeInfo;



