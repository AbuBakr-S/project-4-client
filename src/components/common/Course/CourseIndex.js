import React from 'react'
import axios from 'axios'
import CourseCard from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated } from '../../../lib/auth'
import { Link } from 'react-router-dom'
//import { createCourse } from '../../../lib/api'
import Spinner from '../Spinner'
import Error from '../Error'


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
        const { data } = await axios.get(`/api/courses/`)
        setCourses(data)
      } catch (err) {
        setIsError(true)
      }
    }
    setTimeout(getData, 1300)
  }, [])


  console.log(courses)

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
