import React from 'react'

import { Link, useParams } from 'react-router-dom'
import { getSingleCourse } from '../../../lib/api'

function LessonCard({ id, title, index }) {
  const { courseId,lessonId } = useParams()
  const [course, setCourse] = React.useState(null)

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
  }, [courseId,lessonId])


  return (
    <>
      <div key={id} className="lesson">
        <span className="">{index + 1}. </span><Link to={`/courses/${courseId}/lessons/${id}`}>{title}</Link>
      </div>
    </>
  )
}

export default LessonCard