import PropTypes from 'prop-types'
import {
  Form,
  Segment,
  Grid,
  Header,
  Message,
  MessageHeader,
  MessageList,
  MessageItem,
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
      <div className="background">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            {createUserErr ? <Message error>{createUserErr}</Message> : null}
            <Form onSubmit={handleSignup}>
              <Segment stacked>
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
                <Form.Button content="Submit" />
                <p>
                  Already have an account?&nbsp;
                  <Link to="/">Login</Link>
                </p>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

Signup.propTypes = {
  createUserErr: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
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
