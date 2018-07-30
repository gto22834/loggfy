'use strict'

const Serve = require('webpack-serve')
const chalk = require('chalk')

/** @see https://www.npmjs.com/package/react-dev-utils */
const openBrowser = require('react-dev-utils/openBrowser')

const webpackCompiler = require('./build/utils/compiler.js')
const config = require('./build/config/webpack.config.dev.js')

process.env.NODE_ENV = 'development'
const cli = 'npm'
const port = 9890
const host = process.env.HOST || 'localhost'

function run (port) {
  const onReady = (showInstructions) => {
    if (!showInstructions) {
      return
    }
    console.log()
    console.log('The app is running at:')
    console.log()
    console.log(`  ${chalk.cyan(`http://${host}:${port}/`)}`)
    console.log()
    console.log('Note that the development build is not optimized.')
    console.log(`To create a production build, use ${chalk.cyan(`${cli} run build`)}.`)
    console.log()
  }

  const compiler = webpackCompiler(config, onReady)
  
  Serve({}, {
    compiler,
    host,
    port,
    hotClient: false, // Use `webpack-hot-client` need to install.
  })
    .then(server => {
      server.on('listening', ({ server, options }) => {
        console.log(chalk.cyan('Starting the development server...'))
        console.log()
        openBrowser(`http://${host}:${port}/`)
      })
    })
    .catch(err => console.log(err))
}

run(port)
