import React from 'react'
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigation = useNavigate ();

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigation("/login")
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    
                </div>
                <div className='user-buttons'>
                {!localStorage.getItem('token')?
                <div>
                <Link type="button" className="btn btn-success" to='/login'> LOGIN </Link>
                <Link type="button" className="btn btn-success" to='/signup'> SIGN UP </Link>
                </div>:<button  type="button" className="btn btn-success" onClick={handleLogout} > LOG OUT </button>
                }
                </div>
            </nav>
        </>
    )
}
