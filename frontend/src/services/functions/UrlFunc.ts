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
  // console.log('urls ', u)
  return {
    client: u[0],
    year: u[1],
    // view: u[2]
  }
}

export function getUrlHost() {
  let url = window.location.pathname
  // console.log(window.location.protocol + "//" + location.host)
  return window.location.protocol + "//" + location.host;
}
