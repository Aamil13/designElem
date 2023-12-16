import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Row, Col, Select, Radio } from "antd"
import {doc,arrayUnion,updateDoc} from "firebase/firestore"
import { db } from '../firebase'
import { toast } from 'react-toastify'


const { TextArea } = Input;

const NewEdit = () => {

  const [date, setDate] = useState()
  // console.log("date",date);
  const [description, setDescription] = useState()
  const [email, setEmail] = useState()
  const [contactno, setContactno] = useState()
  const [sms, setSms] = useState()
  const [value, setValue] = useState(2);
  const [subject, setSubject] = useState("A")
  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value) => {
    setSubject(value)
  };


  const addreminider =async()=>{
    if(!date || !description || !email || !contactno || !sms || ! value || !subject){
      return toast.warning("All Fields Required!")
    }

    if(sms.length < 10){
      return toast.warning("Sms should be of 10 digit!")
    }
    if(contactno.length < 10){
      return toast.warning("Sms should be of 10 digit!")
    }
    try {
      await updateDoc(doc(db, "reminder", "eOZM13JnlL92UsrJFPmZ"), {
        a: arrayUnion({
          id:Date.now(),
          date:date,
          description,
          email,
          contactno,
          sms,
          value,
          subject,
        }),
      });
      toast.success("Created")
    } catch (error) {
      console.log(error);
    }
   
  }


  const handleLogout=()=>{
    localStorage.removeItem("user")
    window.location.reload()
  }

  const options = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'D',
      label: 'D',
    },
  ]

  return (
    <div className='m-5 p-5 rounded-lg shadow-md bg-white'>
        <h1 className='text-2xl font-light'>Set a New Reminder</h1>
    <hr></hr>
<Row gutter={16}>
  <Col xs={{
        span: 24
      }}
      lg={{
        span: 12
      }}>

  <div className="mb-3">
<label>Select a Date</label>
<Input onChange={(e)=>setDate(e.target.value)} type='date' placeholder="date" />
</div>

<div className="mb-3">
<label>Select a Subject</label>
<Select
      defaultValue="A"
      style={{
        width: '100%',
      }}
      onChange={handleChange}
      options={options}
    />
</div>

<div className="mb-3">
<label>Add Description</label>
<TextArea onChange={(e)=>setDescription(e.target.value)} rows={2} placeholder="description" />
</div>
</Col>

  <Col xs={{
        span: 24
      }}
      lg={{
        span: 12
      }}>
  <div className="mb-3">
<label>Email</label>
<Input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="email" />
</div>

<div className="mb-3">
<label>Contact No.</label>
<Input onChange={(e)=>setContactno(e.target.value)} type='number' placeholder="contact" />
</div>

<div className="mb-3">
<label>SMS</label>
<Input onChange={(e)=>setSms(e.target.value)} type='number' placeholder="SMS" />
</div>
  </Col>
</Row>
<Row gutter={16}>
  <Col xs={{
        span: 24
      }}
      lg={{
        span: 12
      }}>
  <div className="mb-3">
<label>Repeat For Next</label>
<div>
<Radio.Group onChange={onChange} value={value}>
      <Radio value={2}>2 Days</Radio>
      <Radio value={3}>3 Days</Radio>
      <Radio value={5}>5 Days</Radio>
      <Radio value={7}>7 Days</Radio>
</Radio.Group>
</div>
</div>
  </Col>
  <Col xs={{
        span: 24
      }}
      lg={{
        span: 12
      }}>
<div className='flex justify-end'>
<Button onClick={()=>addreminider()} type='primary' className='bg-green-500 px-5 mt-4'>Confirm</Button>
</div>
  </Col>
</Row>
<hr></hr>
<div className='flex justify-between items-center'>
<Link to='/' style={{textDecoration:'none'}}>
  <Button type='primary' className='bg-slate-400 px-5'>Back</Button>
</Link>
  <Button onClick={()=>handleLogout()} danger type='primary'>Logout</Button>
</div>
</div>
  )
}

export default NewEdit