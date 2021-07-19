import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import ImageUpload from '../common/ImageUpload'

function Register() {

  const history = useHistory()
  // useForm returns an object. Destructure with an object
  const { formData, handleChange, formErrors, setFormErrors } = useForm({
    fullName: '',
    email: '',
    username: '',
    role: 'LRN',
    password: '',
    passwordConfirmation: '',
  })

  const handleImageUpload = file => {
    handleChange({ target: { name: 'profileImage', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //Call set form errors & validate method to validate with regex

    try {
      await registerUser(formData)
      history.push('/')
    } catch (err) {
      console.log(err)
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      <div className="registration-page-container">
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <h3>Create an <span><em>E-Learn</em></span> account</h3>

            <p>Empower your learning from today...</p>
            <div className="form-content-container">
              <label htmlFor="fullName">Full Name:</label><br />
              <input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={handleChange} />
              {formErrors.fullName && <small>Full Name is Required</small>}<br />

              <label htmlFor="email">Email:</label><br />
              <input type="email" id="email" name="email" placeholder="email@domain.com" onChange={handleChange} />
              {formErrors.email && <small>Email is Required</small>}<br />

              <label htmlFor="username">Username:</label><br />
              <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} />
              {formErrors.username && <small>Userame is Required</small>}<br />

              <label htmlFor="role">Account Type:</label><br />
              <div className="account-elements">
                <label htmlFor="learner">Learner</label><br />
                <input type="radio" id="learner" name="role" value="LRN" checked={formData.role === 'LRN'} onChange={handleChange} />
                <label htmlFor="instructor">Instructor</label>
                <input type="radio" id="instructor" name="role" value="INS" onChange={handleChange} />
              </div>
              <br />

              <label htmlFor="password">Password:</label><br />
              <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} />
              {formErrors.password && <small>Password is Required</small>}<br />

              <label htmlFor="password-confirmation">Password Confirmation:</label><br />
              <input type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="password confirmation" onChange={handleChange} />
              {formErrors.passwordConfirmation && <small>Password Confirmation is Required</small>}<br />

              <div>
                <ImageUpload onUpload={handleImageUpload} />
              </div>
              {formErrors.profileImage && <small>Profile Image is Required</small>}<br />
              

              <input className="register-button" type="submit" value="Submit" />
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Register