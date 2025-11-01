// TODO replace with Vue Router "route.params"

export function getUrl_ClientYear() {
  let url = window.location.pathname
  let slashIndex = url.indexOf("/")
  if (slashIndex === 0) {
    url = url.slice(1)
  }
  let u = url.split("/")
  // console.log("Current URL:", params)
  if (u[0] === 'admin') {
    console.log('admin?', u[0])
    u.shift()
    console.log('urls ', u)
  }
  console.log('Detected URL: ', u)
  return {
    client: u[0].toUpperCase(),
    year: u[1],
    view: u[2]
  }
}

export function getUrlHost() {
  let url = window.location.pathname
  // console.log(window.location.protocol + "//" + location.host)
  return window.location.protocol + "//" + location.host;
}

// Gets all URL Parameters OR specific parameter if specified.
// TODO: Add better conditional detection of parameters, for hiding items that don't have parameters
export function getURLParams(getter = null) {
  let params = new URLSearchParams(document.location.search)
  if (getter !== null && typeof getter === 'string') {
    return params.get(getter)
  }
  else {
    let paramsList: any = []
    params.forEach((value, key) => {
      paramsList.push({[key]: value})
    })
    params = paramsList.reduce((accumulator: any, currentObject: any) => {
      return {...accumulator, ...currentObject};
    }, {});
    return params
  }
}
