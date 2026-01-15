import http from '../../http-common'

export default class ProductDataService {
  getProduct(eventId: number) {
    return http.get('/product/event/' + eventId)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Functions |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const productService = new ProductDataService()

/*-| Get Product by Event ID
---+----+---+----+---+----+---+----+---*/
async function getProduct_Service(eventId: number) {
  try {
    let product = await productService.getProduct(eventId)
    console.log(product.data)
    return product.data
  } catch (e) {
    console.log(e)
  }
}

export {
  getProduct_Service
}
