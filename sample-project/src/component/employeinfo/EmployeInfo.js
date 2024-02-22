import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection,getDocs } from 'firebase/firestore';
import { deleteDoc, doc} from 'firebase/firestore';



const EmployeInfo = () => {

  const [val,setVal]=useState([]);
 
  const value=collection(db,"user")

  
  
  // Function to fetch data when button is clicked
  const fetchDataOnClick = () => {
    const getData = async () => {
      const dbval = await getDocs(value);
      setVal(dbval.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
  <table className="table table-zebra w-[600px] ml-[400px] mt-[200px] ">
    {/* head */}
    <thead>
    <tr key={val.id}>
        <th>USERNAME</th>
        <th>EMAIL</th>
        <th>ROLE</th>
        <th>EDIT</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        val.map(details=><tr>
            <td>{details.userName}</td>
            <td>{details.email}</td>
            <td>{details.role}</td>
            <td>
                <button className='btn btn-outline btn-sm btn-info h-10 ' onClick={()=>handleDelete(details.id)}>DELETE</button>
            </td>
        </tr>)
     }
    </tbody>
  </table>
 
</div>
<div className=' flex place-content-end  mt-36'>
    {/* Button to trigger data fetching */}
    <button className='bg-white  text-black w-28 rounded-xl h-10 '  onClick={fetchDataOnClick}>Show Users</button>
    {/* Render your data here */}
  </div>
</div>
  );
};

export default EmployeInfo;



