import { React, useState } from 'react';
import Base from '../core/Base';
import { Link, Navigate } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin= () =>{
    const [values, setValues] = useState({
        name:"",
        email:"duser@c.com",
        password:"123",
        error:"",
        success:false,
        loading:false,
        didRedirect:false,
    })

    const {name, email, password, error, success, loading, didRedirect} = values;

    const handleFormChange = (email) => 
    (event) => {
        setValues({ ...values, error: false, [email] : event.target.value});
    };

    const onSubmitSignin =(event) =>{
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        // const user = {email,password}
        signin({email,password})
        .then((data) => {
            console.log('DATA', data)
            if (data.token){
                // let sessionToken = data.token;

                authenticate(data, () =>{
                    console.log("USER DATA ADDED");
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                });
            }else {
                setValues({
                    ...values,
                    loading:false
                });
            }
        })
        .catch((e)=> console.log(e))
    };

    const performRedirect = () =>{
        if (isAuthenticated()){
            return <Navigate to="/" />;
        }
    };

    const loadingMessage = () => {
        // console.log("Loading...")
        return(
            loading && (
                <div className="alert alert-info">
                <h2> Loading...</h2>
                </div>
            )
        )
    };

    const successMessage = () =>{
        return(
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className='alert alert-success' style={{display: success ? "" : "none"}}>
                        New account created successfully. Please <Link to="/signin">Login now.</Link>
                    </div>
                </div>
            </div>
        )
    };

    const errorMessage = () =>{
        return(
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                        Check all fields again.
                    </div>
                </div>
            </div>
        )
    };

    const signInForm = () =>{
        return(
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                                name="email"
                                type="text" 
                                className="form-control" 
                                value={email} 
                                onChange={handleFormChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">password</label>
                            <input 
                                name="password"
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={handleFormChange("password")}
                            />
                        </div>
                        <button 
                        onClick={onSubmitSignin}
                        className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    };
    
    
  return (
    <Base title="Welcome to sign in page" description='COC merchantile store'>
    {loadingMessage()}

    {signInForm()}
    <p className='text-white text-center'>{JSON.stringify(values)}</p>
    {performRedirect()}    
    </Base>
  )
};

export default Signin;