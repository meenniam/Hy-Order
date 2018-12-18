import React,{Component} from 'react'

class Detail extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <p>
          {this.props.name}*{this.props.amount} Price {this.props.price}
        </p>
      </div>
    )
  }
}

export default Detail;
