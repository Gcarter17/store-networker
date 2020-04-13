import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({

    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {


    // const ProfileItem = props => {

    //     console.log(props.profile.user._id)



    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <Link to={`/profile/${_id}`} className='justify-end other-btn' ><h2>{name}</h2></Link>

                <p>{status}{' '}{company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>

            </div>

            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className='text-primary'>
                        {/* <i className="fas fa-check" /> {skill} */}
                        {skill}
                    </li>
                ))}
            </ul>


        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem


