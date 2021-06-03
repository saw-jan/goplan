import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
  Form,
  Button,
  Label,
  Header,
  Message,
  Image,
  Grid,
} from 'semantic-ui-react'
import 'src/css/style.css'

function Login({
  loginErrorMsg,
  email,
  handleEmailChange,
  password,
  handlePassChange,
  handleLogin,
}) {
  return (
    <>
      <div className="background">
        <Grid centered columns={1}>
          <Grid.Row style={{ marginTop: '100px' }}>
            <Grid.Column>
              <Header as="h1" textAlign="center">
                <Image
                  src="https://www.freeiconspng.com/uploads/letter-d-icon-png-28.png"
                  centered
                />
                aikon Calendar
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '20px' }}>
            <Grid.Column width={4}>
              {loginErrorMsg ? (
                <Message negative>{loginErrorMsg}</Message>
              ) : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form size="medium" key="small">
              <Form.Field style={{ textAlign: 'left' }}>
                <label>Email</label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="example@hotmail.com"
                  className="loginInputStyle"
                  style={{ marginBottom: '10px' }}
                />
              </Form.Field>
              <Form.Field style={{ textAlign: 'left' }}>
                <label style={{ marginBottom: '8px' }}>Password</label>
                <input
                  onChange={handlePassChange}
                  type="password"
                  value={password}
                  placeholder="*********"
                />
              </Form.Field>
              <Button onClick={handleLogin} width={100}>
                Log In
              </Button>
              <Button as={NavLink} exact to="/signup" width={100}>
                Sign up
              </Button>
            </Form>
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}

Login.propTypes = {
  loginErrorMsg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
