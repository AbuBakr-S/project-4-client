import { createCourse } from '../../../lib/api'
import { useForm } from '../../../hooks/useForm'
import { useHistory } from 'react-router-dom'


import ImageUpload from '../ImageUpload'

function CourseNew() {
  const history = useHistory()
  const { formData, handleChange, formErrors, setFormErrors } = useForm({
    title: '',
    description: '',
    name: '',
    subject: '',
  })

  const handleImageUpload = file => {
    handleChange({ target: { name: 'courseImage', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createCourse(formData)
      history.push('/courses')
    } catch (err) {
      console.log(err)
      setFormErrors(err.response.data)
    }
  }

  return (
    <>
      <h1>Add A New Course Page</h1>
      <div className="container">
        <form className="container" onSubmit={handleSubmit}>
          <label htmlFor="title">Course Title:</label><br />
          <input type="text" id="title" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} />
          {formErrors.title && <small>Course Title is Required</small>}<br />

          <label htmlFor="description">Course Description:</label><br />
          <input type="text" id="description" name="description" placeholder="Course Description" value={formData.description} onChange={handleChange} />
          {formErrors.description && <small>Course Description is Required</small>}<br />

          <label htmlFor="courseImage">Course Image:</label><br />
          <div>
            <ImageUpload onUpload={handleImageUpload} />
          </div>
          {formErrors.courseImage && <small>Course Image is Required</small>}<br />
          <br />

          <label htmlFor="name">Course Name:</label><br />
          <input type="text" id="name" name="name" placeholder="Course Name" value={formData.courseName} onChange={handleChange} />
          {formErrors.name && <small>Course Name is Required</small>}<br />

          <label htmlFor="subject">Course Subject:</label><br />
          <input type="text" id="subject" name="subject" placeholder="Course Subject" value={formData.courseSubject} onChange={handleChange} />
          {formErrors.subject && <small>Course Subject is Required</small>}<br /><br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )

}

export default CourseNew