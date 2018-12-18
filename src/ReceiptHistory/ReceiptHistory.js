import React ,{ Component } from 'react';
import ReceiptItem from './ReceiptItem'

import {connect} from 'react-redux'
import axios from 'axios'

class ReceiptHistory extends Component{

  componentDidMount(){

  axios.get('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/ShowAllOrder')
  .then((resp)=>{
    resp.data.sort((a,b)=>{
      if (a.Bill < b.Bill)
        return 1;
      if (a.Bill > b.Bill)
        return -1;
      return 0;
    })

    this.setState({
      datas:resp.data,
      isLoading:false
    })
  })
  .catch((err)=>{
    console.log(err);
  })

  }

  constructor(props){
    super(props)
    this.state ={
      datas:[],
      isLoading:true
    }
  }

  render(){
    const {datas,isLoading} = this.state
    const load = (
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
    const items = datas.map((docs)=>{
      return <ReceiptItem key={docs.Bill} Date={docs.Date} time={docs.time} Bill={docs.Bill} total={docs.total} status={docs.status}/>
    })
    const {user} = this.props.auth
    return(
      <div className="container" style={{minHeight:"700px"}}>
        <div className="history-card">
          <h1>Bill รหัส# {user.username}</h1>
        </div>
        {isLoading?load:items}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(ReceiptHistory);
