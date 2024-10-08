
import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {Data} from './Data';
import {Validation} from './Validation';
// import { Calendar } from 'primereact/calendar';

function App() {
  const [data, setData] = useState([]);
  //creating states for our fields
  const [id, setId] =useState(0);
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [phone, setPhone] =useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');

  const [values, setValues] =useState({
    name: '',
    email:'',
    phone:'',
    date:'',
    password:'',
    confirmPassword:''
  })

  //keep a flag for changing update and save button

  const [isUpdate, setIsUpdate] =useState(false);

  const [errors, setErrors] = useState({}); 

  // function handleInput(e)
  // {
  //   const newObj = {...toHaveFormValues, [e.target.name]: e.target.value}
  //   setValues(newObj)
  // }

  function handleValidation(e)
  {
    e.preventDefault();
    setErrors(Validation(values));
  }


  //to bind dummy data from Data.js to the data array
  useEffect(()=>{setData(Data)
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
      setDate(dt[0].date);
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

        let error = '';
        if (name === '')
          // 
          return;

        if (email === '')
          // error += 'E-mail is a required field. ';
          return;

        if (phone === '')
          // error += 'Phone is a required field. ';
          return;

        if (date === '')
          return;

        if(error === '')
        {
        //current object with which we are binding our data is data (line 7)
        //we will put a new event object in our 'data' -> e
        e.preventDefault(); 
        //other events are restricted
        const dt = [...data]; //take the final existing object/data/records after deleting and adding etc into dt
        //create a new object
        //this states get added to the new data we input
        const newObject = 
        {
        id : data.length + 1,
        name : name,
        email : email,
        phone : phone,
        gender : gender,
        date : date //initial states
        }

        //we now push the latest/new object into dt array
        dt.push(newObject);
        //update our state
        setData(dt);
        console.log('Updated Data:', dt);
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
          dt[index].date = date;
          dt[index].gender = gender;
          dt[index].phone = phone;
          dt[index].date = date;

          setData(dt);
          handleClear();
        }
    const handleClear = () =>
      {
        setId(0);
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setGender('');
        setIsUpdate(false);
      }

  
  return (
    <div className='App'>
      
      <form className='Input-item' onSubmit={handleValidation}>
        <div>
          <label>
            Name:
            <input className='Input-data' type='text' placeholder='enter your name' onChange={(e) => setName(e.target.value)} value={name}
            />
            <span>{errors.name && <p style={{color:"red"}}>{ errors.name} </p>}
            </span>
          </label>
        </div>

        <div>
          <label>
            E-mail:
            <input className='Input-data' type='email' placeholder='enter your e-mail'  onChange={(e) => setEmail(e.target.value)} value={email}/>
            {errors.email && <p style={{color:"red"}}>{errors.email} </p>}
          </label>
        </div>

        <div>
          <label>
            Phone:
            <input className='Input-data' type='text' placeholder='enter your phone number'  onChange={(e) => setPhone(e.target.value)} value={phone}/>
            {errors.phone && <p style={{color:"red"}}>{errors.phone} </p>}
          </label>
        </div>

        <div>
          <label>
            Birthday: 
            <input className='Input-data' type='date' placeholder='birthday' onChange={(e) => setDate(e.target.value)} value={date} />
          </label>
        </div>

        <div className='radio-elements' >
          <label>
            Gender:
            <div className='radio-data' >
              <label>
                <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                Male
              </label>
              <label>
                <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                Female
              </label>
              <label>
                <input type="radio" value="Other" checked={gender === 'Other'} onChange={(e) => setGender(e.target.value)} />
                Other
              </label>
            </div>
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
      </form>


      <table className='table table-hover'> 
        <thead>

          <tr>
            <td>Sr. No</td>
            <td>Id</td>
            <td>Name</td>
            <td>Birthday</td>
            <td>Gender</td>
            <td>E-mail</td>
            <td>Phone</td>
            <td>Actions</td>
            
          </tr>
          </thead> 
          <tbody>
            {
              data.map((item,index)=>
              {
                let formattedDate = item.date;

                try {
                  const parsedDate = new Date(item.date);
                  if (!isNaN(parsedDate)) {
                    formattedDate = new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                    }).format(parsedDate);
                  } else {
                    console.error(`Invalid Date: ${item.date}`);
                  }
                } catch (error) {
                  console.error(`Error parsing date: ${item.date}`, error);
                }
          
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.gender}</td>
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
