import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Input, Row, Col, Select, Radio } from "antd"
import {doc,arrayUnion,updateDoc, onSnapshot} from "firebase/firestore"
import { db } from '../firebase'
import { toast } from 'react-toastify'

const { TextArea } = Input;

const Update = () => {
    const {id} = useParams()
    // console.log("idid",id);
    const [chats, setChats] = useState([]); 
    const [data, setData] =useState([])
    const [date, setDate] = useState()

    // console.log("date",date);
    const [description, setDescription] = useState()
    console.log(description);
    const [email, setEmail] = useState()
    const [contactno, setContactno] = useState()
    const [sms, setSms] = useState()
    const [value, setValue] = useState(2);
    const [subject, setSubject] = useState("A")
    
    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "reminder", "eOZM13JnlL92UsrJFPmZ"), (doc) => {
          setChats(doc.data());
          
        });
    
        return () => {
          unsub();
        };
      };
  
       getChats();
     
      
    }, []);

    useEffect(()=>{
        const currentdata = ()=>{
            chats?.a?.map((item)=>{
                // console.log("item",item.id);
                if(item.id == id){
                    // console.log(item.sms);
                     setDate(item.date)
                     setDescription(item.description)
                     setEmail(item.email)
                     setContactno(item.contactno)
                     setSms(item.sms)
                     setValue(item.value)
                     setSubject(item.subject)
                }else{
                    console.log("not matched");
                }
            })
        }
        
    currentdata()

  
        
    },[chats])

    useEffect(()=>{
        
    },[])
    // console.log("chats",chats);

    
   
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
        const cd = chats?.a?.findIndex((x)=> x.id == id) 
        // console.log("cd",cd);

        let temp = chats;
        temp.a[cd].description = description
        temp.a[cd].date = date
        temp.a[cd].email = email
        temp.a[cd].contactno = contactno
        temp.a[cd].sms = sms
        temp.a[cd].value = value
        temp.a[cd].subject = subject
        setChats(temp.a)

        await updateDoc(doc(db, "reminder", "eOZM13JnlL92UsrJFPmZ"), {
          a: chats.a
        });
        toast.success("Updated Successfully")
      } catch (error) {
        console.log(error);
      }
     
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
          <h1 className='text-2xl font-light'>update Reminder</h1>
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
  <Input onChange={(e)=>setDate(e.target.value)} type='date' value={date} placeholder="date" />
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
        value={subject}
      />
  </div>
  
  <div className="mb-3">
  <label>Add Description</label>
  <TextArea onChange={(e)=>setDescription(e.target.value)} value={description} rows={2} placeholder="description" />
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
  <Input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder="email" />
  </div>
  
  <div className="mb-3">
  <label>Contact No.</label>
  <Input onChange={(e)=>setContactno(e.target.value)} value={contactno} type='number' placeholder="contact" />
  </div>
  
  <div className="mb-3">
  <label>SMS</label>
  <Input onChange={(e)=>setSms(e.target.value)} value={sms} type='number' placeholder="SMS" />
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
    <Button danger type='primary'>Logout</Button>
  </div>
  </div>
    )
}

export default Update