import React,{Component} from 'react';
import {Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReceiptHistory.css';
import {connect} from 'react-redux'
import $ from 'jquery'
import axios from 'axios'
import Detail from './Detail'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

class ReceiptItem extends Component {

  constructor(props){
    super(props)
    this.state={
      open:false,
      detail:[],
      isLoading:false,
      success:false
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
      }
    }
  }

    componentDidMount(){
      $(document).ready(function() {

  //window and animation items
  var animation_elements = $.find('.history-card');
  var web_window = $(window);

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    //iterate through elements to see if its in view
    $.each(animation_elements, function() {

      //get the element sinformation
      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
        element.addClass('in-view');
      } else {
        element.removeClass('in-view');
      }
    });

  }

  //on or scroll, detect elements in view
  $(window).on('scroll resize', function() {
      check_if_in_view()
    })
    //trigger our scroll event on initial load
  $(window).trigger('scroll');

  });


    }

    handleClick(e){
      e.preventDefault();
      const {user} = this.props.auth
      axios.get('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/ShowAllOrder/List/'+this.props.Bill)
      .then((resp)=>{


        var pro =[]
        resp.data.forEach((data)=>{
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

        var docDefinition = {
        content: [
          {
          text: 'ใบเสร็จ',
          style: 'header',
          alignment: 'center',
          fontSize: 18,
        },
        {
          text:"รหัสสมาชิก: "+user.username,
          style: 'header',
          alignment: 'center',
          fontSize: 16,
        },
        {
        text: "บิลเลขท:ี่ "+this.props.id,
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
              text: this.props.total+" บาท",
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

      })
      .catch((err)=>{
        console.log(err);
      })

    }

    handleOpen(e){
      e.preventDefault()
      this.setState({open:!this.state.open})
      if(!this.state.open){
        this.setState({
          isLoading:true,
          success:false
        })
        axios.get('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/ShowAllOrder/List/'+this.props.Bill)
        .then((resp)=>{
          this.setState({
            detail: resp.data,
            isLoading:false,
            success:true
          })
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }

  render(){
    const {detail,success} = this.state
    var datas;
    if(success){
      datas = detail.map((data)=>
        <Detail key={data.productId} amount={data.amount} price={data.price} image={data.image} name={data.name}/>
      )
    }
    return(
      <div>
        <div className="history-card slide-top in-view w3-animate-right " id="elem" style={{marginTop:"2%"}}>
          <a onClick={this.handleOpen.bind(this)}>
            <h3>{this.props.Bill}</h3>
          </a>
          <hr/>
          {this.props.status}<br/>
        Date: {this.props.Date} &nbsp; {this.props.time}
          <a href="#" onClick={this.handleClick.bind(this)} style={{marginLeft:"50px"}}>ดาวน์โหลด&nbsp;<FontAwesomeIcon icon="file-pdf"/></a>
        <Collapse in={this.state.open} >
          <div>
            <h1>Purchase Bill</h1>
            <h4>สมาชิกเลขที่</h4>
            <p >Hy-order | ไฮออร์เดอร์</p>
            <p >Tell. 091-995-2998</p>
            <p >Address: 16/33 Kathu</p>
          <p >Phuket 83120</p>
            <hr/>
              {datas}
            <hr/>
          <h1>Est. {this.props.total}</h1>
          </div>
        </Collapse>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(ReceiptItem);
