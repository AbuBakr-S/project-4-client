import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Home() {
  const history = useHistory()
  const [formErrors , setFormErrors] = React.useState(false)

 // useForm returns an object. Destructure with an object
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      history.push('/courses')
    } catch (err) {
      console.log(err.request)
      setFormErrors(true)
    }
  }

  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <div className="welcome-text animate__animated animate__fadeInLeft">
            <h1 className="hero-header">Welcome to E-Learn</h1>
            <hr /><br />
            <p>On this website you will find resources to help you expand your knowledge across multiple subjects. Register below to gain access to courses taught by experts</p>
            <Link to="/register">
              <button className="register-today">Register Here</button>
            </Link>
          </div>
          <div className="login-form animate__animated animate__fadeInRight">
            <form className="home-page-login" onSubmit={handleSubmit}>
              <fieldset>
                <h2>Login</h2> 
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" placeholder="email@domain.com" onChange={handleChange} /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} /><br /><br />
                {formErrors && (
                  <p className="form-login-errors">Please check Email or Password!</p>
                )}
                <input className="form-submit-btn" type="submit" value="Login" />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="main-section-home">
        <h1>Why E-learn</h1>
        <div className="why_us">
          <div className="first-column">
            <h4>Great Instructors</h4>
            <p>Students practice at their own pace, first filling in gaps in their understanding and then accelerating their learning.</p>
          </div>
          <div className="second-column">
            <h4>Tools for both Instructors and Learners</h4>
            <p> Post courses / lessons and assignments for Learners to practice
            </p>
          </div>
          <div className="third-column">
            <h4>Great Content to use</h4>
            <p>Keep progressing and meeting targets everyday. Subjects ranging from 
            Math, science and many more. Free for learners
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home