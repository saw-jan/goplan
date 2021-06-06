const {
  setDefaultTimeout,
  AfterAll,
  BeforeAll,
  Before,
  After,
} = require('@cucumber/cucumber')
const {
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession,
} = require('nightwatch-api')

const { cleanUpDB } = require('./tests/lib')

setDefaultTimeout(60000)

// before the test run
BeforeAll(async function () {
  await startWebDriver({ env: 'chrome' })
  await createSession()
})

// before every scenario
Before(function () {})

// cleanup after every scenario
After(function () {})

// after the whole test run
AfterAll(async function () {
  await closeSession()
  await stopWebDriver()
  cleanUpDB()
})
