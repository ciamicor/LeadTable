/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Search Attendees/Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
async function searchAttendeeName_Service(o: Array<{}>, s: String, r: any) {
  /*let searchTerms = s.split(' ')
  let searchHold: object[] = []
  console.log(searchTerms)
  for (let x = 0; x < searchTerms.length; x++) {
    console.log('Search Loop for: ', searchTerms[x])
    let f = o.filter((a: any) => {
      return a.name_First.trim().toUpperCase().includes(searchTerms[x].trim().toUpperCase())
        ||
        a.name_Last.trim().toUpperCase().includes(searchTerms[x].trim().toUpperCase())
    })

    searchHold.push(f)
    console.log('searchHold:', searchHold)
    console.log('o:', o)
  }

  console.log('Search Hold ', searchHold)
  r.value = searchHold
  console.log('Search Service ', r)*/

  /*-| Single Term Search |-*/
  r.value = o.filter((a: any) => {
    return a.name_First.trim().toUpperCase().includes(s.trim().toUpperCase()) || a.name_Last.trim().toUpperCase().includes(s.trim().toUpperCase())
  })
}

export { searchAttendeeName_Service }
