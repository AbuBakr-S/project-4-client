import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faList, faPlus, faUserPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import siteLogo from '../../assets/images/site-logo.png'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Nav() {
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const [sidebarShow, setSidebarShow] = React.useState(false)
  
  const handleSideBar = () => {
    setSidebarShow(!sidebarShow)
  }

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <>
      <div className="navbar navbar-default-color">
        <Link to="/"><img src={siteLogo} alt="logo" width="140" /></Link>
        <div className="menu-items-end" onClick={handleSideBar}>
          <Hamburger toggled={sidebarShow} toggle={setSidebarShow} />
        </div>
      </div>
      <div className={sidebarShow ? 'side-nav-menu-container active' : 'side-nav-menu-container'}>
        <ul className="navbar-content-container">          
          <li><Link to="/" className="navbar-item" ><FontAwesomeIcon className="fa-items-icon" icon={faHome} />Home</Link></li>
          <li><Link to="/courses" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faList} />Courses</Link></li>
          <li><Link to="/courses/new" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faPlus} />New Course</Link></li>
          {!isLoggedIn ?
            <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUserPlus} />Register</Link></li>
              :
            <>
              <li><Link to="/dashboard" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faUserCircle} />Dashboard</Link></li>
              <li className="navbar-item logout-link" onClick={handleLogout}><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Log out</li>
            </>
          }
        </ul>
      </div>
    </>
  )
}
export default Nav