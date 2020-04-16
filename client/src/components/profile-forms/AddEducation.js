import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../store/actions/profile'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TimePicker from './TimePicker'

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        // numShifts: ''
    })
    const { school, degree, fieldofstudy, from, to, current, description } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const [numShifts, setNumShifts] = useState(0)
    const shiftNumChange = value => {
        setNumShifts(value)
        // console.log(numShifts)
    }
    
    // const [shiftForms, setShiftForms] = useState({
    //     forms: [{
    //         day: '',
    //         from: '',
    //         to: ''
    //     }]
    // })
    // const onFormChange = e => setShiftForms({ ...formData, [e.target.name]: e.target.value })
    // const onFormChange = (from, to) => setShiftForms({forms: [day, from, to]})
    
    // this.setState({ myArray: [...this.state.myArray, 'new value'] }) //simple value
    const setShiftForms = prevState => ({
        forms: [ {"name": "object"}, ...prevState.myArray]
      })


    return (
        <div className="feed-container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <Typography id="discrete-slider" gutterBottom>
            # of shifts needing coverage
            </Typography>
            <Slider
                defaultValue={1}
                getAriaValueText={shiftNumChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />
            {Array(numShifts).fill(
            <div>
                <TimePicker beginLimit="5:00AM" endLimit="7:30PM" />
                <TimePicker beginLimit="7:00AM" endLimit="9:30PM" />
            </div>
            )}
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                addEducation(formData, history)
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current}
                        onChange={e => {
                            setFormData({ ...formData, current: !current })
                        }}
                    /> {' '}Currently Enrolled</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))
