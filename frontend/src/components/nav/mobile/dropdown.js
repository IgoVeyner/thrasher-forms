// import Authorized from './authorized'
import Authorized from '../authorized'
import Unauthorized from './unauthorized'
import DummyNav from './dummy'
import DummyForm from '../../forms/mobileDummyForm'

export default function DropDown({ user, handleLogout, resetDropDown }) {
  const classArgs = ["mobile-nav-link-container", "mobile-nav-link", "mobile-logout", "mobile-logout-text"]

  return (
    <div id="mobile-dropdown">
      { user !== "" ? 
        <Authorized handleLogout={handleLogout} resetDropDown={resetDropDown} classArgs={classArgs} /> 
        : 
        <Unauthorized resetDropDown={resetDropDown}/> 
      }
      <DummyNav />
      <DummyForm />
    </div>
  )
}