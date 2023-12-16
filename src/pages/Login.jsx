import { Button, Input } from "antd"
import { Link,useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { useEffect, useState } from 'react'
import { async } from '@firebase/util'


const Login = ({setUser,user}) => {

  const [email ,setEmail] = useState('designelementary@email.com');
    const [password ,setPassword] = useState('12345678');
    const navigate = useNavigate();


    useEffect(()=>{
        if(user.name != ""){
          navigate("/")
        }
    },[])

    const handleSubmit = async(e)=>{
            e.preventDefault();

            try {
              let res =   await signInWithEmailAndPassword(auth,email , password);
              console.log(res);
              setUser({name:"Design Elementary"})
              localStorage.setItem("user","Design Elementary")
                navigate("/")
            } catch (error) {
                console.log("err",error);
            }
    }

  return (
    <div className='w-[90%] sm:w-[50%] md:w-[30%] mx-auto p-5 rounded-lg shadow-md bg-white mt-20'>
       <h1 className='text-2xl font-light text-center'>Login</h1>
    
   <hr></hr>
<div className='my-5'>
<div className="mb-3">
<label>Username/Email</label>
<Input placeholder="Enter your username/email" />
</div>

<div className="mb-3">
<label>Password</label>
<Input type="password" placeholder="Enter your password" />
</div>

<div className="text-center mt-4 flex flex-col gap-3">
  <Button type="primary" className="px-10 shadow bg-green-600">Login</Button>
  <Button onClick={(e)=>handleSubmit(e)} type="primary" className="px-10 shadow bg-green-600">Guest Login</Button>
</div>

</div>
<hr></hr>
<p className="text-center font-light text-slate-400 pb-1 mb-0">A Reminder Setter App.</p>
<p className="text-center font-light text-slate-400 mt-0 pt-0">&copy; Reminder Inc. 2023</p>
</div>
  )
}

export default Login