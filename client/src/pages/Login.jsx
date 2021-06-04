import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Button, Header, Message, Grid } from 'semantic-ui-react'
import 'src/css/style.css'

function Login({
  loginErrorMsg,
  createUserStatus,
  email,
  handleEmailChange,
  password,
  handlePassChange,
  handleLogin,
  resetCreateStatus,
}) {
  return (
    <>
      <div className="background go-bg">
        <Grid centered columns={1} className="grid-login">
          <Grid.Row style={{ marginTop: '100px' }}>
            <Grid.Column>
              <Header as="h1" textAlign="center">
                GOPLAN
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form size="small" key="small" className="go-form login">
              <Grid.Row style={{ marginBottom: '30px', textAlign: 'left' }}>
                <h2>Login</h2>
                <div className="go-divider"></div>
              </Grid.Row>
              <Grid.Row style={{ marginBottom: '20px' }}>
                <Grid.Column width={4}>
                  {loginErrorMsg ? (
                    <Message negative>{loginErrorMsg}</Message>
                  ) : null}
                </Grid.Column>
              </Grid.Row>
              {createUserStatus ? (
                <Grid.Row style={{ marginBottom: '20px' }}>
                  <Grid.Column width={4}>
                    <Message positive>{createUserStatus}</Message>
                  </Grid.Column>
                </Grid.Row>
              ) : null}
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
              <Grid.Row className="btn-row">
                <Button onClick={handleLogin}>Log In</Button>
              </Grid.Row>
              <Grid.Row className="btn-text">
                New user?&nbsp;
                <Link onClick={resetCreateStatus} to="/signup">
                  Signup now
                </Link>
              </Grid.Row>
            </Form>
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}

Login.propTypes = {
  loginErrorMsg: PropTypes.string,
  createUserStatus: PropTypes.string,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  resetCreateStatus: PropTypes.func.isRequired,
}

export default Login
