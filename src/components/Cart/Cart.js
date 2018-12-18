import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

/*{items.map(item => (
    <CartItem key={item.id} {...item} onClick={() => removeFromCart(item.id)} />
))}*/
const Cart = ({ items, total, currency, removeFromCart , amount , isInCart}) => {
    var confirm;
    if(total === 0){
      confirm = (<div></div>)
    }
    else {
      confirm = (<Link to="/purchase"><button className="w3-btn w3-ripple w3-green w3-animate-right" style={{width:"100%"}}>ยืนยัน {total} {currency}</button></Link>)
    }
    return (
        <div className="">
            <h3>ตระกร้า</h3>

            <div className="cart">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {items.length > 0 && (
                            <div className="cart__body">
                              {items.map((item,index) => (
                                  <CartItem key={item.id} amounts={amount[index]} {...item} onClick={() => removeFromCart(item.id)} />
                                ))}
                            </div>
                        )}
                        {items.length === 0 && (
                            <div className="alert alert-info"><FontAwesomeIcon icon="shopping-cart" style={{fontSize:"30px"}}/> ตระกร้าว่าง</div>
                        )}
                        <div className="cart__total">รวม: {total} {currency}</div>
                        <hr/>
                        {confirm}
                  </div>
                </div>
            </div>
        </div>
    );
}

Cart.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    currency: PropTypes.string,
    removeFromCart: PropTypes.func.isRequired
}

export default Cart;
