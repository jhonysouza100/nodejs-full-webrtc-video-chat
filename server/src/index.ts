import {server, app} from './app'
// import { connect } from './connection'

async function main() {
  
  try {

    // database connection
    // await connect()
  
    // server listening
    server.listen(app.get('port'), () => console.log(`Server listen on port: ${app.get('port')}`))
  
  } catch (error) {
    console.log(error)
  }
}

main()