import PropTypes from 'prop-types'
import {
  Form,
  Grid,
  Message,
  MessageHeader,
  MessageList,
  MessageItem,
  Button,
} from 'semantic-ui-react'
import 'src/css/style.css'
import { Link } from 'react-router-dom'

function Signup({
  createUserErr,
  handleSignup,
  firstName,
  firstNameChange,
  lastName,
  lastNameChange,
  email,
  emailChange,
  password,
  passwordChange,
}) {
  const specialChars = '(!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~)'
  return (
    <>
      <div className="background go-bg">
        <Grid centered columns={2}>
          <Grid.Row>
            <Form
              size="small"
              key="small"
              onSubmit={handleSignup}
              className="go-form signup"
            >
              <Grid.Row style={{ marginBottom: '30px' }}>
                <h2>Register</h2>
                <div className="go-divider"></div>
              </Grid.Row>
              <Grid.Row style={{ marginBottom: '20px' }}>
                <Grid.Column width={4}>
                  {createUserErr ? (
                    <Message negative>{createUserErr}</Message>
                  ) : null}
                </Grid.Column>
              </Grid.Row>
              <Form.Input
                label="First name"
                icon="user"
                value={firstName}
                iconPosition="left"
                type="firstName"
                placeholder="Enter Your First Name"
                onChange={firstNameChange}
              />
              <Form.Input
                label="Last Name"
                icon="user"
                iconPosition="left"
                value={lastName}
                placeholder="Enter Your Last Name"
                type="lastName"
                onChange={lastNameChange}
              />
              <Form.Input
                label="Email"
                icon="mail"
                iconPosition="left"
                value={email}
                placeholder="example@hotmail.com"
                type="email"
                onChange={emailChange}
              />
              <Form.Input
                label="Password"
                icon="lock"
                iconPosition="left"
                value={password}
                placeholder="Password"
                type="password"
                onChange={passwordChange}
              />
              <Message size="tiny">
                <MessageHeader>
                  Password must contain the following:
                </MessageHeader>
                <MessageList>
                  <MessageItem>6 to 16 characters in length</MessageItem>
                  <MessageItem>At least 1 upper case letter</MessageItem>
                  <MessageItem>At least 1 number</MessageItem>
                  <MessageItem>
                    At least 1 special character of
                    {specialChars}
                  </MessageItem>
                </MessageList>
              </Message>
              <Grid.Row className="btn-row">
                <Button>Register</Button>
              </Grid.Row>
              <p>
                Already have an account?&nbsp;
                <Link to="/">Login</Link>
              </p>
            </Form>
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}

Signup.propTypes = {
  createUserErr: PropTypes.func,
  handleSignup: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  firstNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  lastNameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordChange: PropTypes.func.isRequired,
}

export default Signup
