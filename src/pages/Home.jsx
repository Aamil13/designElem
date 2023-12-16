import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Switch } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot,doc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

  

const Home = () => {
  const Navigate = useNavigate()

  const handleDelete =async(id)=>{
    const cd = chats?.a?.findIndex((x)=> x.id == id) 

    try {
      await updateDoc(doc(db, "reminder", "eOZM13JnlL92UsrJFPmZ"), {
        a: arrayRemove(chats.a[cd]),
      });
      toast.success("Deleted")
    } catch (error) {
      console.log(error);
    }
  }
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width:'120px'
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width:'auto'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width:'auto'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width:'auto'
    },
    {
      title: 'Contact No.',
      dataIndex: 'contactno',
      key: 'contactno',
      width:'auto'
    },
    {
      title: 'SMS',
      dataIndex: 'sms',
      key: 'sms',
      width:'auto'
    },
    {
      title: 'Repeat(days)',
      dataIndex: 'value',
      key: 'value',
      width:'auto'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:(status)=> <Switch checkedChildren="Active" unCheckedChildren="Disabled" checked={status} />
    },
    {
      title: 'Action',
      key: 'action',
      render:(data)=><div className="flex items-center gap-3">
        <Tooltip title="Edit">
        <Button onClick={()=>Navigate(`/update/${data.id}`)} type="primary" shape="circle" className="bg-yellow-300 text-black" icon={<EditOutlined />} />
      </Tooltip>
        <Tooltip title="Delete">
        <Button onClick={()=>handleDelete(data.id)} type="primary" shape="circle" danger icon={<DeleteOutlined />} />
      </Tooltip>

      </div>
    },
  ];

  const [chats, setChats] = useState([]); 
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
  // console.log("chats",chats);

  return (
    <div className='m-5 p-5 rounded-lg shadow-md bg-white'>
        <div className="flex justify-between items-center">
        <h1 className='text-2xl font-light'>My Reminders</h1>
        <Link to='/action' style={{textDecoration:'none'}} className="bg-red-500 rounded-lg shadow p-1 px-2 text-white text-sm">Add New</Link>
        </div>
        <hr></hr>
    <div className='my-5' style={{overflowX:'auto'}} >
    <Table dataSource={chats?.a} columns={columns}/>
    </div>
    </div>
  )
}

export default Home