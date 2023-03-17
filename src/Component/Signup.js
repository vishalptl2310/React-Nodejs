import React, { useState} from 'react'
import { useNavigate  } from 'react-router-dom';


export default function Signup() {

  const [credentials, setcredentials] = useState({name: "", email : "", password: ""});
  const navigation = useNavigate ();

  const handleChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
      console.log(credentials)
    }

  const createUser = async (e) => {
      e.preventDefault()
      let url = "http://localhost:5000/api/auth/createuser"

      let name = credentials.name
      let email = credentials.email
      let password = credentials.password


      let promise = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          name,
          email,
          password
        }),
      });

      let json = await promise.json();

      if (json.success){
          localStorage.setItem("token", json.AuthToken)
          navigation('/');
          console.log("successfull")
      }
      else{
          console.log("not success")
      }

    }
  return (
    <div className='form-main'>
        <div className='form-container' style={{"height":"52vh"}}>
            <h1>Sign Up</h1>
            <form className='form' onSubmit={createUser}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
)
}
