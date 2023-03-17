import React, { useContext, useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import noteContext from '../Context/NotesContext';

export default function Login() {

    const [credentials, setcredentials] = useState({email : "", password: ""});
    const navigation = useNavigate ();

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    const loginUser = async (e) => {
        e.preventDefault()
        let url = "http://localhost:5000/api/auth/loginuser"

        let email = credentials.email
        let password = credentials.password

        let promise = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body : JSON.stringify({
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
            <div className='form-container'>
                <h1>Welcome Back</h1>
                <form className='form' onSubmit={loginUser}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}
