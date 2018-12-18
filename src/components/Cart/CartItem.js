import React,{Component} from 'react';
import PropTypes from 'prop-types';


class CartItem extends Component{


  render(){
    const { image ,amounts , name, price, currency, onClick } = this.props;
    return (
        <div className="cart-item w3-animate-right">
            <div>
                <button className="w3-btn w3-ripple w3-red btn-xs" onClick={onClick}>X</button>
              <img src={image} alt="" width="30px" />
                <span className="cart-item__name">{name}</span>
                <span className="cart-item__name">*{amounts}</span>
            </div>
            <div className="cart-item__price">{price*amounts} {currency}</div>
        </div>
    );
  }

}

/*const CartItem = ({ image ,amounts , name, price, currency, onClick }) => {
    return (
        <div className="cart-item w3-animate-right">
            <div>
                <button className="w3-btn w3-ripple w3-red btn-xs" onClick={onClick}>X</button>
              <img src={image} width="30px" />
                <span className="cart-item__name">{name}</span>
                <span className="cart-item__name">*{amounts}</span>
            </div>
            <div className="cart-item__price">{price*amounts} {currency}</div>
        </div>
    );
}*/

CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CartItem;
