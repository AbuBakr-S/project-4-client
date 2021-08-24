import React from 'react'
import { getUserId } from '../../lib/auth'
import { getUserData } from '../../lib/api'

function Dashboard() {
  const [userId, setUserId] = React.useState(null)
  const [userData, setUserData] = React.useState(null)

  //Quotes of the day!
  const quotes = [
    [{ id: 1, quotedBy: 'Albert Einstein', quote: '“Wisdom is not a product of schooling but of the lifelong attempt to acquire it.”' }],
    [{ id: 2, quotedBy: 'Anthony J. D’Angelo', quote: '“Develop a passion for learning. If you do, you will never cease to grow.”' }],
    [{ id: 3, quotedBy: 'Jim Lovell', quote: '“You don’t understand anything until you learn it more than one way.”' }]
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  React.useEffect(() => {
    const getData = async () => {
      try {
        setUserId(getUserId)
        const res = await getUserData(userId)
        setUserData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  return (
    <>
      <h1>Welcome to your Dashboard</h1>
      {userData && userData.role === 'INS' ? 
      (<h2>Hi Instructor</h2>)
      : 
      (<h2>Hi {userData?.username}</h2>)}
      <img src={userData && userData.profileImage} alt='profile' />
      <h1>Quote of the Day</h1>
      {randomQuote.map(quoteDetails => {
          return (
            <>
              {console.log(quoteDetails.id)}
              <div key={quoteDetails.id}>
                <figure className="quote-container">
                  <blockquote>
                    <p className="quote">{quoteDetails.quote}</p>
                    <p className="quote quote-caption"> &mdash;{quoteDetails.quotedBy}, <cite>{quoteDetails.quotedBy}</cite></p>
                  </blockquote>
                </figure>
              </div>
            </>
          )
        })}
      <p>My Favourite Courses</p>
      {/* {userData && userData.favorites.map(favorite => (
        <>
          <li>{favorite.title}</li>
        </>
      ))} */}

    </>
  )
}

export default Dashboard