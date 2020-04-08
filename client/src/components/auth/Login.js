import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../store/actions/auth'

const Login = ({ login, nowAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // array destructuring allowing us to get two values from a single function call
    // useState hook has an array of the state (formData) and the function call to update state (setFormData)
    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }, console.log(e.timeStamp, e.target))

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
        console.log('SUCCESS')
    }

    // Redirect if logged in 
    if (nowAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form onSubmit={e => onSubmit(e)} className="form" action="create-profile.html">
                <div className="form-group">
                    <input value={email} onChange={e => onChange(e)} type="email" placeholder="Email Address" name="email" />

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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    nowAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    nowAuthenticated: state.auth.isAuthenticated,
})

// check Register.js for connect usage
// export default connect(null, { login })(Login)
export default connect(mapStateToProps, { login })(Login)
