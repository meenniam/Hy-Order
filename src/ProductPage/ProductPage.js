import React,{Component} from 'react';
import Cart from '../containers/Cart';
import ProductList from '../containers/ProductList';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {addProduct} from '../ducks/products';
import axios from 'axios'

class ProductPage extends Component {
  componentDidMount(){
    const {addProduct} = this.props
    axios.get('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/product')
    .then(resp=>{
      addProduct(resp.data)
    })
  }
  /*constructor(props) {
    super(props)
  }*/
  render(){
    const {isAuthenticate} = this.props.auth

    const auth = (
      <div className="container w3-animate-top">
        <div className="row">
          <div className="col-md-12">
            <h1>Hy-Order | ไฮออร์เดอร์</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <ProductList />
      </div>
      <div className="col-md-4">
        <Cart />
    </div>
  </div>

</div>
    )

    const noauth = (
      <Redirect to="/login" />
    )

    return(
      <div>
        {isAuthenticate?auth:noauth}

      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return ({
    auth:state.auth
  })
}

const mapDispatchToProps = (dispatch) => ({
    addProduct: (product) => dispatch(addProduct(product))
})


export default connect(mapStateToProps,mapDispatchToProps)(ProductPage);
