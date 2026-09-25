/*-| Check for Error |-*/
export function checkError(x: any) {
  console.log(`** Checking for error **`)
  // console.log( x )
  if (x.error) {
    console.error(`I've got an error.`)
    throw Error("Error detected!")
  }
  else {
    console.log("Nice. No error found.")
  }
}
