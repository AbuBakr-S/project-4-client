import React from 'react'
import CourseCard from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated } from '../../../lib/auth'
import { Link } from 'react-router-dom'
//import { createCourse } from '../../../lib/api'
import Spinner from '../Spinner'
import Error from '../Error'
import { getAllCourses } from '../../../lib/api'


function CourseIndex() {
  const [courses, setCourses] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  //const [averageStars, setAverageStars] = React.useState([])
  const isLoggedIn = isAuthenticated()
  //const [selectedSubjects, setSelectedSubjects] = React.useState([])
  //const subjects = ['Computing', 'Math', 'Science', 'English']
  const isLoading = !courses && !isError


  React.useEffect(() => {
    const getData = async (e) => {
      try {
        const { data }  = await getAllCourses()
        setCourses(data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    setTimeout(getData, 1300)
  }, [])

  return (
    <>
      <h1>Courses</h1>
      <div className="main-container">
        {isError && <Error />}
        {isLoading && <Spinner />}
        <div className="course-container">
          {courses && (
            courses.map(course => <CourseCard key={course.id} {...course} />)
          )}
        </div>
        {isLoggedIn && (
          <Link to={`/courses/new`} >
            <div className="add-course-section">
              <FontAwesomeIcon className="fa-items-plusicon" icon={faPlusCircle} />
              <span className="add-course">Add Course</span>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}

export default CourseIndex
