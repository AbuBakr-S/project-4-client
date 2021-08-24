import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, isOwner } from '../../../lib/auth'
import { deleteCourse } from '../../../lib/api'
import ReactStars from 'react-rating-stars-component'

function CourseCard({ id, name, courseImage, subject, description, lessons,feedback, totalStars = 5, owner  }) {
  const [ratingValue] = React.useState(
    feedback?.map(rating => rating.rating)
  )
  
  const SumOfRatingsForCourse = ratingValue.reduce((totalRating, currentRating) => totalRating + parseInt(currentRating), 0) 
  const feedbackRatingArrLength = ratingValue.length === 0 ? 1 : ratingValue.length
  const averageRatingForCourse = Math.round((SumOfRatingsForCourse / feedbackRatingArrLength) * 2) / 2
  
  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  const handleDelete = async () => {
    await deleteCourse(id)
    history.go(0)
  }

  return (
    <>
      <div className="individual-course-container" key={id}>
        <figure>
          <img className="course-card-images" src={courseImage} alt={name}/>
        </figure>
        <h2>{name}</h2>
        <h3>Course Rating : </h3>
        <ReactStars count={5} value={averageRatingForCourse} size={20} isHalf={true} edit={false} onChange={averageRatingForCourse}/>
        <div className="overflow-text line-clamp">
          {description}
        </div>
        {!isLoggedIn ? 
          <Link to ={`/`}><h3>Lessons</h3></Link>
          :
          <Link to ={`/courses/${id}`}><h3>Lessons</h3></Link>}
        <h4>
        {lessons && lessons.slice(0,3).map(lesson => (
            <li key={lesson.id}>{lesson.title}</li>
        ))}
        </h4>
        {isOwner(owner.id) && (
          <>
          <button onClick={handleDelete}>
            Delete this Course
          </button>
          </>
        )}
        {!isLoggedIn && <button>Register to unlock all lessons!</button> }
      </div>
    </>
  )
}

export default CourseCard