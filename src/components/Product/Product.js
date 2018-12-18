import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Product extends Component {

    constructor(props){
      super(props);
      this.state={
        amount:1
      }
    }
    handleClick = () => {
        const { id,image, addToCart, removeFromCart, isInCart , price , increaseToCart , name } = this.props;
        const {amount} = this.state;

        if (isInCart) {
            removeFromCart(id);
        } else {
            addToCart(id,amount);
            increaseToCart(amount,id,price,name,image)
        }
    }

    handleDecrease(e){
      //var decrease = parseInt(e.target.value)-1;
      const {id,removeFromCart, isInCart } = this.props;
      if (isInCart) {
          removeFromCart(id);
      }
      if(this.state.amount!== 0){
        this.setState({
          amount: this.state.amount-0.5
        })
      }
      else {
        this.setState({
          amount: 0
        })
      }
    }

    handleIncrease(e){
      //var increase = parseInt(e.target.value)+1
      const {id,removeFromCart, isInCart } = this.props;
      if (isInCart) {
          removeFromCart(id);
      }
      this.setState({
        amount:this.state.amount+0.5
      })
    }

    handleNum(e){
      //const {price } = this.props;
      this.setState({
        amount:e.target.value
      })
    }

    render() {
        const { name, price, currency, image, isInCart } = this.props;
        return (

            <div className="w3-btn w3-ripple product thumbnail">
                <img src={image} className="zoomImg" alt="product" style={{height:"250px"}} />
                <div className="caption">
                  <h3>{name}</h3>
                <div className="row" style={{width:"100%"}}>
                  <div className="col-sm-2"><a onClick={this.handleIncrease.bind(this)} style={{fontSize: "2rem"}}><FontAwesomeIcon icon="plus-circle"/></a></div>
                  <div className="col-sm-6">
                    <input className="form-control" type="number" value={this.state.amount} onChange={this.handleNum.bind(this)}/>
                  </div>
                  <div className="col-sm-2"><a onClick={this.handleDecrease.bind(this)} style={{fontSize: "2rem"}}><FontAwesomeIcon icon="minus-circle"/></a></div>
                  <div className="col-sm-2">
                    <p>Kg</p>
                  </div>
                </div>
                  <div className="product__price">{price} {currency}/Kg</div>
                    <div className="product__button-wrap w3-animate-right">
                        <button
                            className={isInCart ? 'w3-btn w3-ripple w3-red w3-animate-top' : 'w3-btn w3-ripple w3-blue w3-animate-left'}
                            onClick={this.handleClick}
                        >
                            {isInCart ? 'นำออก' : 'เพิ่มเข้า'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    currency: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    increaseToCart: PropTypes.func.isRequired,
}

export default Product;
