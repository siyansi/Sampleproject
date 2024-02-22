import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection,getDocs } from 'firebase/firestore';
import { deleteDoc, doc} from 'firebase/firestore';



const EmployeInfo = () => {

  const [val,setVal]=useState([]);
 
  const value=collection(db,"user")

  useEffect(()=>{
    const getData=async()=>{
      const dbval=await getDocs(value)
      setVal(dbval.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getData()
  })

  const handleDelete=async(id)=>{
    // const deleteValue=doc(database,"demo",id)
    const deleteValue=doc(db,"user",id)
    await deleteDoc(deleteValue)
}


  return (


    <div>
      <div className="overflow-x-auto">
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









    {/* <table>
=======
    <div className='  lg:ml-80 mt-24'>
    <table>

      <thead>
        <tr>
          <td>USERNAME</td>
          <td>EMAIL</td>
          <td>ROLE</td>
        </tr>
      </thead>
      <tbody>
          {val.map(details=>(
            <tr key={details.id}>
              <td>{details.userName}</td>
              <td>{details.email}</td>
              <td>{details.role}</td>
            </tr>
          ))}
       
      </tbody>

    </table> */}
     
=======
    </table>

    </div>
  );
};

export default EmployeInfo;



//   return (

//     <div>
//     <table>
//       <thead>
//         <tr>
//           <td>USERNAME</td>
//           <td>EMAIL</td>
//           <td>ROLE</td>
//         </tr>
//       </thead>
//       <tbody>
//           {val.map(details=>(
//             <tr key={details.id}>
//               <td>{details.userName}</td>
//               <td>{details.email}</td>
//               <td>{details.role}</td>
//             </tr>
//           ))}
       
//       </tbody>
//     </table>
     
//     </div>
//   );
// };


// import React from 'react'

// const EmployeInfo = () => {
//   return (
//     <div className=' mt-24'>EmployeInfo</div>
//   )
// }

// export default EmployeInfo