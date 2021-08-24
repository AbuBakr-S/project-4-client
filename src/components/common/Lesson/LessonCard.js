import React from 'react'
import { Link, useParams } from 'react-router-dom'

function LessonCard({ id, title, index }) {
  const { courseId } = useParams()

  return (
    <>
      <div key={id} className="lesson">
        <span className="">{index + 1}. </span><Link to={`/courses/${courseId}/lessons/${id}`}>{title}</Link>
      </div>
    </>
  )
}

export default LessonCard