import app from './app'
// import { connect } from './connection'

async function main() {
  
  try {

    // database connection
    // await connect()
  
    // server listening
    // app.listen(app.get('port'), () => console.log(`Server listen on port: ${app.get('port')}`))
    app.listen(3000, () => console.log(`Server listen on port: 3000`))
  
  } catch (error) {
    console.log(error)
  }
}


main()