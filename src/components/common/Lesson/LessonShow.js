import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import parse from 'html-react-parser';
// import Error from '../Error';
// import Spinner from '../Spinner';
import { getSingleLesson, deleteLesson } from '../../../lib/api'  // addNewComment, deleteComment

function LessonShow() {
  
  // const [isError, setIsError] = React.useState(false)
  const { courseId, lessonId } = useParams()
  const [lesson, setLesson] = React.useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scoreShow, setShow] = useState(false)
  const [learnerScore, setLearnerScore] = useState(0)
  // const isLoading = !lesson && !isError
  const videoLinkUrl = lesson && lesson.videoLink
  
  //Function to embed youtube watch video to embed plus adding Iframe
  function youtubeEmbed(youtubeUrlLink) {
    const matchPattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeUrlLink.match(matchPattern);
    if (match && match[2].length === 11) {
      return match[2]
    }
  }

  const videoIdYoutube = youtubeEmbed(String(videoLinkUrl));
  const fullMarkup = parse(`<iframe width="660" height="415" src="https://www.youtube.com/embed/${videoIdYoutube}"> <iframe width="560" height="315" src="https://www.youtube.com/embed/w7ejDZ8SWv8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
  const history = useHistory()
  //handle form for comment data
  // const [commentFormData, setCommentFormData] = React.useState({
  //   content: '',
  // })

  const handleDeleteLesson = async () => {
    console.log(courseId, lessonId)
    await deleteLesson(courseId, lessonId)
    history.push('/courses')
  }

   // ### COMMENT FEATURE ###
  // const handleDelete = async (commentId) => {
  //   await deleteComment(lessonId, commentId)
  // }

  // const handleAddUserComment = async e => {
  //   e.preventDefault()
  //   history.go(0)

  //   try {
  //     const { data } = await addNewComment(lessonId, commentFormData)
  //     console.log(`data is: ${lessonId}`)
  //     setCommentFormData({ content: '' })
  //   } catch (err) {
  //     setIsError(true)
  //   }
  // }
  //
  // const handleChange = event => {
  //   const nextFormData = { ...commentFormData, [event.target.name]: event.target.value }
  //   setCommentFormData(nextFormData)
  // }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setLearnerScore(learnerScore + 1)
    }

    const nextQuestionBtn = currentQuestion + 1
    if (nextQuestionBtn < lesson.assessment.questions.length) {
      setCurrentQuestion(nextQuestionBtn)
    } else {
      setShow(true)
    }
  }


  React.useEffect(() => {
    const getSingleLessonData = async () => {
      try {
        const res = await getSingleLesson(courseId, lessonId)
        setLesson(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    setTimeout(getSingleLessonData, 1000)
  }, [courseId, lessonId])


  return (
    <>
      <div className="main-lesson-container">
        {/* {isError && <Error />} */}
        {/* {isLoading && <Spinner />} */}
        {lesson && <div>
          <div className="lesson-banner">
            <div>
              {/* banner for the lesson and description,subject */}
              <h1>{lesson.title}</h1>
            </div>
          </div>
          <div className="lesson-description">
            <h2>Description</h2>
            <hr /><br />
            <p>{lesson.description}</p>
          </div>
          {/* section for video and playground for practice */}
          <div className="container-for-content">
            <div className="video-section">
              {/* embed video from youtube which has been added  */}
              <div className="youtube-vid">
                {fullMarkup}
              </div>
              <div className="lesson-content">
                {lesson?.content}
              </div>
            </div>

            {/* Quiz/AssessmentSection */}

            <div className="quiz-title-styling">
              <h2>Quiz</h2>
              <hr /><br />
            </div>
            {
              lesson.assessment ?
                (
                  <>
                    <p>{lesson.assessment.name}</p>
                    {scoreShow ? (
                      <div>You Scored <b>{learnerScore}</b> out of {lesson.assessment.questions.length} </div>
                    ) : (
                      <div>
                        <div>
                          <span>Question 1</span>/ {lesson.assessment.questions.length}
                        </div>
                        <hr></hr>
                        <div>
                          {lesson.assessment.questions[currentQuestion].question}
                        </div>
                        <div>
                          {lesson.assessment.questions[currentQuestion].answers.map(answer => <button onClick={() => handleAnswerClick(answer.isCorrect)} key={answer.id}>{answer.answer}</button>)}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <p className="no-quiz-section">Quizzes will be posted shortly to test your knowledge for this lesson</p>
                  </div>
                )
            }
            {/* <section className="comments-section">
              <div>
                <h1>Comments</h1>
                <p className="discussion-text">Add any questions about the lesson / discussion here...</p>
                <form onSubmit={handleAddUserComment}>
                  <textarea
                    className="styled-area"
                    name="content"
                    value={commentFormData?.content}
                    onChange={handleChange}
                    placeholder="Name"
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "Name"}
                    rows="4"
                  /><br></br>
                  <div className="btn-send-section">
                    <button className="send-comment">SEND</button>
                  </div>
                </form>
                {lesson?.comments.slice(0).reverse().map(comment => {
                  return (
                    <div key={comment.id}>
                      <p>BY ---
                      {comment.user ? comment.user : 'User'}
                      </p>
                      <p>{comment.content}</p>
                      <button onClick={() => handleDelete(comment.id)}>DELETE</button>
                    </div>
                  )
                })}
              </div>
            </section> */}
          </div>
        </div>
        }
      </div>


      <button onClick={handleDeleteLesson}>
        Delete This Lesson
    </button>
    </>
  )
}

export default LessonShow