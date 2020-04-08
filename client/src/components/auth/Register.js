import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../store/actions/alert'
import { register } from '../../store/actions/auth'
import PropTypes from 'prop-types'


// props here for props.setAlert
const Register = ({ setAlert, register, nowAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    // array destructuring allowing us to get two values from a single function call
    // useState hook has an array of the state (formData) and the function call to update state (setFormData)
    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }, console.log(e.timeStamp, e.target))

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords dont match', 'danger')
        } else {
            register({ name, email, password })
            console.log('Success')
        }
    }

    if (nowAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            {/* <form onSubmit={e => onSubmit(e)} className="form" action="create-profile.html"> */}
            <form onSubmit={e => onSubmit(e)} className="form" >
                <div className="form-group">
                    <input value={name} onChange={e => onChange(e)} type="text" placeholder="Name" name="name" required />
                    {/* on change passes  */}
                </div>
                <div className="form-group">
                    <input value={email} onChange={e => onChange(e)} type="email" placeholder="Email Address" name="email" />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        value={password} onChange={e => onChange(e)}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={password2} onChange={e => onChange(e)}
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    nowAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    nowAuthenticated: state.auth.isAuthenticated,
})


// conect takes in 2 things, 1 any state you want to map (null), 2 any objects with actions you want to use (setAlert, register), and is given an export name (Register)
// below syntax allows us to axcess props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);
