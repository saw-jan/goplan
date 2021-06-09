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

// runs before the test run
BeforeAll(async function () {
  await startWebDriver({ env: 'chrome' })
})

// runs before every scenario
Before(async function () {
  await createSession()
})

// runs after every scenario
After(async function () {
  await closeSession()
})

// runs after the whole test run
AfterAll(async function () {
  await stopWebDriver()
  cleanUpDB()
})
