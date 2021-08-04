import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, isOwner } from '../../../lib/auth'
import { deleteCourse } from '../../../lib/api'
// import Star from './Star'
import ReactStars from 'react-rating-stars-component'

// const createArrayOfStars = length => [...Array(length)]



function CourseCard({ id, name, courseImage, subject, description, lessons,feedback, totalStars = 5, owner  }) {
  // const [starsSelected, setStarsSelected] = useState(0)
  const [ratingValue, setRatingValue] = React.useState(
    feedback?.map(rating => rating.rating)
  )
  
  // 8 3 
  const SumOfRatingsForCourse = ratingValue.reduce((totalRating, currentRating) => totalRating + parseInt(currentRating), 0) 
  const feedbackRatingArrLength = ratingValue.length === 0 ? 1 : ratingValue.length
  const averageRatingForCourse = Math.round((SumOfRatingsForCourse / feedbackRatingArrLength) * 2) / 2
  console.log(`average for this course: ${averageRatingForCourse}`)
  
  // console.log(feedback?.map(rating => rating.rating))
  // console.log(`feedback ${feedback}`)
  // console.log(`ratings: ${ratingValue} for ${id} course`)
  // console.log(`Average: ${ratingValue}`)

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
        {/* {createArrayOfStars(totalStars).map((eachStar, i) => (<Star key={eachStar} selected={averageRatingForCourse > i} onSelect={() => setStarsSelected(i + 1)} />))} / 5.0 */}
       
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
        {/* <h4>{`Course ID: ${id}`}</h4>
        <h4>{`Owner ID: ${owner.id}`}</h4>
        <button onClick={handleDelete}>
          Delete this Course
        </button> */}
        {!isLoggedIn && <button>Register to unlock all lessons!</button> }
        {/* <h1>AVERAGE:{averageRatingForCourse}</h1> */}
      </div>

      

    </>
  )
}

export default CourseCard