
import React, { useEffect, useState } from 'react';
import './App.css';
import {Data} from './Data';

function App() {
  const [data, setData] = useState([]);
  //creating states for our fields
  const [id, setId] =useState(0);
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [phone, setPhone] =useState();

  //keep a flag for changing update and save button

  const [isUpdate, setIsUpdate] =useState(false);




  //to bind dummy data from Data.js to the data array
  useEffect(()=>{
    setData(Data)
  },[]);

  //event handlers

  const handleEdit = (id) =>
  {
    const dt =data.filter(item => item.id ===id);
    if(dt !== undefined)
    {
      setIsUpdate(true)
      setId(id);
      setName(dt[0].name);
      setEmail(dt[0].email);
      setPhone(dt[0].phone);
    }
  }
  const handleDelete = (id) =>
    {
      if(id>0)
      { if (window.confirm("Do you want to delete this item?"))
        {const dt= data.filter(item => item.id !==id);
        setData(dt);
        }
      }
    }

    const handleSave = (e) =>
      {
        //form validation

        let error = ' ';
        if (name === ' ')
          error += 'Name is a required field';

        if (email === ' ')
          error += 'E-mail is a required field';

        if (phone === ' ')
          error += 'Phone is a required field';

        if(error !== ' ')
        {
        //current object with which we are binding our data is data (line 7)
        //we will put a new event object in our 'data' -> e
        e.preventDefault(); //other events are restricted
        const dt = [...data]; //take the final existing object/data/records after deleting and adding etc into dt
        //create a new object
        //this states get added to the new data we input
        const newObject = {
          id : data.length + 1,
        name : name,
        email : email,
        phone : phone, //initial states
        }
        //we now push the latest/new object into dt array
        dt.push(newObject);
        //update our state
        setData(dt);
      }

      else
      {
        alert(error);
      }
    }

      const handleUpdate = () =>
        {
          //first we have to find the ID of the item to be updated
          const index = data.map((item) =>
          {
            return item.id
          }).indexOf(id);

          const dt = [...data]; //we take the stored Data to dt though spread
          dt[index].name = name;
          dt[index].email = email;
          dt[index].phone = phone;

          setData(dt);
          handleClear();
        }
    const handleClear = () =>
      {
        setId(0);
        setName('');
        setEmail('');
        setPhone('');
        setIsUpdate(false);
      }

  return (
    <div className='App'>

      <div className='Input-item'>
        <div>
          <label>
            Name:
            <input className='Input-data' type='text' placeholder='enter your name' onChange={(e) => setName(e.target.value)} value={name}/>
          </label>
        </div>

        <div>
          <label>
            E-mail:
            <input className='Input-data' type='text' placeholder='enter your email'  onChange={(e) => setEmail(e.target.value)} value={email}/>
          </label>
        </div>

        <div>
          <label>
            Phone:
            <input className='Input-data' type='text' placeholder='enter your phone number'  onChange={(e) => setPhone(e.target.value)} value={phone}/>
          </label>
        </div>

        <div>

          {
            !isUpdate ?
            <button className='btn btn-primary' onClick={(e) =>handleSave(e)}>Save</button>
            :
            <button className='btn btn-primary' onClick={() =>handleUpdate()}>Update</button>
            

          }
        
        
        <button className='btn btn-danger'onClick={() =>handleClear()}>Clear</button>
        </div>
      </div>


      <table className='table table-hover'> 
        <thead>

          <tr>
            <td>Sr. No</td>
            <td>Id</td>
            <td>Name</td>
            <td>email</td>
            <td>Phone</td>
            <td>Actions</td>
          </tr>
          </thead> 
          <tbody>
            {
              data.map((item,index)=>
              {
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button className='btn btn-primary' onClick={() =>handleEdit(item.id)}>Edit</button>
                      <button className='btn btn-danger'onClick={() =>handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody> 
      </table> 
    </div>
  );

}

export default App;
