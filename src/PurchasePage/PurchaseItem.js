import React,{Component} from 'react';


class PurchaseItem extends Component{

  /*constructor(props){
    super(props);
  }*/

  render(){
    const {name,price,amount} = this.props
    return(
      <div className="row">
        <div className="col-xs-6">
          <p>{name} * {amount}</p>
        </div>
        <div className="col-xs-6">
          <p>{amount*price} Bath</p>
        </div>

      </div>
    )
  }
}

export default PurchaseItem;
