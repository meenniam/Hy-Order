import React,{Component} from 'react';


class MoreItem extends Component{

  /*constructor(props){
    super(props);
  }*/

  render(){
    const {name,price,amount,image} = this.props
    return(
      <div className="cart-item w3-animate-right">
          <div>
            <img src={image} alt="" width="30px" />
              <span className="cart-item__name">{name}</span>
              <span className="cart-item__name">*{amount}</span>
          </div>
          <div className="cart-item__price">{price*amount} Bath</div>
      </div>
    )
  }
}

export default MoreItem;
