import React,{Component} from 'react'
import {connect} from 'react-redux'
import { getCurrency, getTotal, removeFromCart , getPurc , resetToCart } from '../ducks/cart';
import './PurchasePage.css';
import PurchaseItem from './PurchaseItem'
import MoreItem from './MoreItem';
import {withRouter,Redirect} from 'react-router-dom'
//import Invoice from '../invoice.PNG';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import axios from 'axios'

import { Collapse ,Well } from 'react-bootstrap';

class PurchasePage extends Component {
  constructor(props, context) {
    super(props, context);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
      }
    }

    this.state = {
      open: false,
      posY: 75,
      bill: "",
      isClick:false
    };
  }

  handleNormal(){
    this.setState({isClick:true})
    const {history} = this.props;
    const {purc,resetToCart,total,auth} = this.props;
    var pro =[]
    purc.forEach((data)=>{

      pro.push({
          alignment: 'justify',
          columns: [
            {
              text: ''+data.name+"*"+data.amount},
            {
              text: ''+data.amount*data.price+" บาท",
              alignment: 'right',}
          ]
        })
    })

    axios.post('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/order/',{
      product: purc,
      total: total
    })
    .then(resp=>{

      var docDefinition = {
      content: [
        {
  			text: 'ใบเสร็จ',
  			style: 'header',
  			alignment: 'center',
        fontSize: 18,
  		},
      {
        text:"รหัสสมาชิก: "+auth.user.username,
        style: 'header',
        alignment: 'center',
        fontSize: 16,
      },
      {
      text: "บิลเลขท:ี่ "+resp.data.bill,
      fontSize: 14,
    },
    {
    text: 'Hy-order | ไฮออร์เดอร',
    fontSize: 14,
  },
  {
  text: 'Tell. 091-995-2998',
  fontSize: 14,
  },
  {
  text: 'Address: 16/33 Kathu',
  fontSize: 14,
  },
  {
  text: 'Phuket 83120',
  fontSize: 14,
  },
  {
  text: '____________________________________',
  fontSize: 14,
  },
  pro[0],
  pro[1],
  pro[2],
    {
    text: '____________________________________',
    fontSize: 14,
    },
    {
        alignment: 'justify',
        columns: [
          {
            text: 'Total',
            fontSize: 24},
          {
            text: ''+total+" บาท",
            alignment: 'right',
            fontSize: 24}
        ]
      },

      ],defaultStyle:{
        font:'THSarabunNew'
      },pageSize: {width: 200,height:400},
      pageMargins: [ 10, 10, 10, 10 ],
      };
      pdfMake.createPdf(docDefinition).download();
      resetToCart();
      history.push("/receipt")
    })
    .catch(error =>{
      console.log(error);
    })
    }



  render(){
    const {purc,total,currency,auth} = this.props;
    const {isClick} = this.state
    //console.log(total);
    //console.log(purc);
    //console.log(purc.length);
    const items = purc.map((pur)=>(
      <PurchaseItem key={pur.productId} name={pur.name} price={pur.price} amount={pur.amount}/>
    ))

    const moreitems = purc.map((pur)=>(
      <MoreItem key={pur.productId} name={pur.name} price={pur.price} amount={pur.amount} image={pur.image}/>
    ))

    const ordered =(
      <div className="container">
        <div className="purchase-card w3-animate-right" style={{marginTop:"2%"}} id="canvas">
          <h1>Purchase Bill</h1>
        <h4>สมาชิกเลขที่ {auth.user.username}</h4>
          <p >Hy-order | ไฮออร์เดอร์</p>
          <p >Tell. 091-995-2998</p>
          <p >Address: 16/33 Kathu</p>
        <p >Phuket 83120</p>
          <hr/>
          {items}
          <a onClick={() => this.setState({ open: !this.state.open })}>
            see more detail.
          </a>
        <Collapse in={this.state.open} >
          <div>
            <Well>
              {moreitems}
            </Well>
          </div>
        </Collapse>
          <hr/>
          <h1>Est. {total} {currency}</h1>

        </div>
        <div className="purchase-card w3-animate-left" style={{marginTop:"20px"}}>

          <hr/>
        <button onClick={this.handleNormal.bind(this)} disabled={isClick} className="w3-btn w3-ripple w3-green" style={{width:"100%"}}>ยืนยันการสั่งซื้อ</button>

        </div>
      </div>

    )

    const noordered = (
      <Redirect to="/product" />
    )

    var cart;
    if(purc.length === 0){
      cart = false
    }
    else {
      cart = true
    }

    return(
      <div>
        {cart?ordered:noordered}
      </div>
    )
  }

}

const mapStateToProps = (state, props) => {
    return {
        currency: getCurrency(state, props),
        total: getTotal(state, props),
        purc: getPurc(state,props),
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    resetToCart: ()=> dispatch(resetToCart())
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PurchasePage));
