import { Header, Menu, Icon } from 'semantic-ui-react'
import logout from 'src/api/users/logout'
import 'src/css/style.css'

function NavBar() {
  return (
    <>
      <Menu className="navBarStyle" secondary>
        <Menu.Item>
          <Icon name="calendar" size="big" />
        </Menu.Item>
        <Menu.Item className="contentNavBar">
          <Header as="h3">Daikon Calendar</Header>
        </Menu.Item>
        <Menu.Menu position="right" className="logoutButton">
          <Menu.Item onClick={logout}>
            <Header as="h3">Logout</Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default NavBar
