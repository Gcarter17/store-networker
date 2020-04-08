import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import GoogleLogin from 'react-google-login'


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }


    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <section className="landing">

            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Store-Networker</h1>
                    {/* <GoogleLogin
                        clientId=""
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    <p className="lead">
                        Come check out what your store is up to, trade shifts, get important news updates, and search for puns
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired, // ptbr
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
