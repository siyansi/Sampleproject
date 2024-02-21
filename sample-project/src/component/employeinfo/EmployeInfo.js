

//   return (

    <div>
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
    </table>
     
    </div>
  );
};


