export function productData(){
  return fetch('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/product').then(res=> res.json)
}
