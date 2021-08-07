import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { useParams, useHistory } from 'react-router-dom'
import { createLesson, getSingleCourse } from '../../../lib/api'
import LessonCard from '../Lesson/LessonCard'
import { useForm } from '../../../hooks/useForm'
import ImageUpload from '../ImageUpload'

function CourseShow() {
  const { courseId } = useParams()
  const [course, setCourse] = React.useState(null)
  const [toggleForm, setToggleForm] = React.useState(false)
  const history = useHistory()

  React.useEffect(() => {
    const getSingleCourseData = async () => {
      try {
        const res = await getSingleCourse(courseId)
        setCourse(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getSingleCourseData()
  }, [courseId])


  const { formData, handleChange } = useForm({
    title: '',
    description: '',
    content: '',
    videoLink: '',
  })

  const handleImageUpload = file => {
    handleChange({ target: { name: 'fileUpload', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createLesson(courseId, formData)
      history.push('/courses')
    } catch (err) {
      console.log(err)
    }

  }

  const toggle = () => {
    setToggleForm(!toggleForm)
  }

  return (
    <>
      <h1>{course && course.title} Lessons</h1>
      <div className="lesson-container">
        <div className="lesson-card-container">
          <h3>Current Lessons:</h3>
          {course && course.lessons.map((lesson, i) => <LessonCard key={lesson.id} {...lesson} index={i} /> )}
        </div>

        {!toggleForm ? 
          <div className="add-lesson" onClick={toggle}>
            <FontAwesomeIcon className="fa-items-plusicon" icon={faPlusCircle} />
            <span>Add Lesson</span>
          </div>
        :
          <div className="new-lesson-container">
            <h2>Create a New Lesson for Course: {courseId}</h2>
            <div className="container">
              <form className="container" onSubmit={handleSubmit}>
                <label htmlFor="full">Lesson Title:</label><br />
                <input type="text" id="title" name="title" placeholder="Lesson Title" onChange={handleChange} /><br />
                <label htmlFor="description">Description:</label><br />
                <input type="text" id="description" name="description" placeholder="Lesson Description" onChange={handleChange} /><br />
                <label htmlFor="username">Content:</label><br />
                <textarea id="content" name="content" placeholder="Lesson Content" onChange={handleChange} /><br />
                <label htmlFor="role">Image Upload:</label><br />
                <div>
                  <ImageUpload onUpload={handleImageUpload} />
                </div>
                <br />
                <label htmlFor="videoLink">Lesson Video Link:</label><br />
                <input type="text" id="videoLink" name="videoLink" placeholder="Lesson Video Link" onChange={handleChange} /><br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        }
      </div>  
    </>
  )
}

export default CourseShow