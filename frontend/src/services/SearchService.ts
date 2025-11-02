/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Search Attendees/leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
async function searchAttendeeName_Service(o: any, s: String) {
  /*-| Single Term Search |-*/
  console.log(typeof o)
  console.log('o: ', o[3].name_First)

  return o.filter((a: any) => {
      // console.log(a.name_First.includes('Abhay'))
      return a.name_First.trim().toUpperCase().includes(s.trim().toUpperCase()) || a.name_Last.trim()
        .toUpperCase()
        .includes(s.trim().toUpperCase())
    }
  )

}

export { searchAttendeeName_Service }
