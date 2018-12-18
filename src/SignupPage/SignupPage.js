import React ,{Component} from 'react';
import './SignupPage.css'
import validateInput from './validate';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import {geolocated} from 'react-geolocated';
import {Radio,Modal,Button,Collapse} from 'react-bootstrap'
import Map from '../Map/Map'


class SignupPage extends Component{

  componentDidMount(){
    //console.log(this.props.isGeolocationEnabled);
    this.setState({
      gps:this.props.isGeolocationEnabled
    })
    this.getMyLocation()
  }


  constructor(props){
    super(props)
    this.state={
      name:"",
      phone:"",
      address:"",
      email:"",
      password:"",
      errors:{},
      isLoading:false,
      messages:"",
      confirmpassword:"",
      type:"0",
      show:false,
      gps:false,
      success:false,
      latitude: '',
      longitude: '',
      billType: '0',
      open:false,
      code:"",
      val:[]

    }
    this.handleClose = this.handleClose.bind(this);
    this.getMyLocation = this.getMyLocation.bind(this)

  }

  isValid(){
    const {errors,isValid,val} = validateInput(this.state)
    if(!isValid){
      this.setState({errors,val,show:true})
    }

    return isValid
  }

  handleSignup(e){
    const {billType,name, email, phone , password ,address,type} = this.state;
    //const {history} = this.props
    e.preventDefault()
    if(this.isValid()){
      this.setState({
        errors:{},
        isLoading:true
      })
      //console.log("valid");
      axios.post('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/regist/addUser',
      {
        address:address,
        email:email,
        phoneNumber:"+66"+phone.slice(1),
        password:password,
        displayName:name,
        lat:this.props.coords.latitude,
        lon:this.props.coords.longitude,
        type: type,
        id:"",
        billType:billType

      })
      .then(resp=>{
        //console.log(resp.data);
        if(resp.data.message === "auth/email-already-exists"){
          this.setState({
            messages:"email already exists",
            isLoading:false,
            show:true
          })
        }
        else if(resp.data.message === "auth/phone-number-already-exists") {
          this.setState({
            messages:"phone number already exists",
            isLoading:false,
            show:true
          })
        }
        else {
          //console.log(resp.data);
          this.setState({success:true ,show: true , isLoading:false, messages: "Username ของคุณคือ"+resp.data.username });
        }

      })
    }

  }

  handleName(e){
    this.setState({
      name:e.target.value
    })
  }
  handlePhone(e){
    this.setState({
      phone:e.target.value
    })
  }

  handleAddress(e){
    this.setState({
      address:e.target.value
    })
  }
  handleEmail(e){
    this.setState({
      email:e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password:e.target.value
    })
  }

  handleConPassword(e){
    this.setState({
      confirmpassword:e.target.value
    })
  }


  onRadioChange(value){
    this.setState({type:value})
  }

  onbillRadioChange(value){
    if(value === 1){
      this.setState({ open: !this.state.open })
    }
    else {
      this.setState({ open: !this.state.open })
    }
    this.setState({billType:value})
  }

  handleClose() {
    const {history} = this.props;
    this.setState({ show: false });
    history.push('/login')
  }

  handleCloses() {
    this.setState({ show: false });
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  handleCode(e){
    this.setState({
      code:e.target.value
    })
  }

  render(){
    const {val,code,success,name,address,phone,email,password,errors,messages,isLoading,confirmpassword} = this.state;
    //console.log("lat:"+latitude);
    //console.log("lon:"+longitude);
    const vali = val.map((str)=><p>{str}</p>)
    const load = (
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
    const noload = (
      <div></div>
    )
    return(
      <div className="container" >
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ลงทะเบียนสำเร็จ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {messages}
              {vali}
          </Modal.Body>
          <Modal.Footer>
            {success?<Button onClick={this.handleClose}>OK</Button>:<Button onClick={this.handleCloses.bind(this)}>close</Button>}
          </Modal.Footer>
        </Modal>
        <div className="signup-card w3-animate-top" style={{marginTop:"2%"}}>
          <h1>ลงทะเบียน</h1>
          <form>
            <div className="form-group">
              <label >ชื่อ</label>
            <input onChange={this.handleName.bind(this)} value={name} type="text" className="form-control"  aria-describedby="" placeholder="Enter name"/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.name}</small>
          </div>
            <div className="form-group">
              <label >เบอร์โทร</label>
            <input onChange={this.handlePhone.bind(this)} value={phone} type="number" className="form-control"  aria-describedby="" placeholder="เบอร์โทรศัพท์"/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.phone}</small>
          </div>
          <div className="form-group">
            <label >ที่อยู่</label>
          <input onChange={this.handleAddress.bind(this)} value={address} type="text" className="form-control"  aria-describedby="" placeholder="Enter Address"/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.address}</small>
          <div>
            {!this.props.isGeolocationAvailable
              ? <div>Your browser does not support Geolocation</div>
              : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                  ?<div>
                    <Map marker={{lat:this.props.coords.latitude,lng:this.props.coords.longitude}}/>
                  </div>
                  : <div>Getting the location data&hellip; </div>}
          </div>
          {isLoading?load:noload}
          <br/>
          <label >กรุณาเลือกประเภทผู้ใช้</label>
          <div>
      <Radio value="0" checked={this.state.type === '0'} onChange={(e) => this.onRadioChange('0')}  name="radioGroup" inline>
        ร้านอาหาร
      </Radio>{' '}
      <Radio value="1" checked={this.state.type === '1'} onChange={(e) => this.onRadioChange('1')}  name="radioGroup" inline>
        โรงแรม
      </Radio>
          </div>
          <label >วิธีชำระเงิน</label>
          <div>
      <Radio value="0" checked={this.state.billType === '0'} onChange={(e) => this.onbillRadioChange('0')}  name="billradioGroup" inline>
        จ่ายทันที
      </Radio>{' '}<br/>
    <Radio value="1" checked={this.state.billType === '1'} onChange={(e) => this.onbillRadioChange('1')}  name="billradioGroup" inline>
        วางบิล(ต้องผ่านการยืนยันจากแอดมินเท่านั้น)
      </Radio>

    <Collapse in={this.state.open} >
      <div className="form-group">
        <label >กรุณาใส่โค๊ด</label>
      <input onChange={this.handleCode.bind(this)} value={code} type="password" className="form-control"  placeholder="Confirm Code"/>
    <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.code}</small>
      </div>
    </Collapse>
          </div>
          </div>
          <div className="form-group">
            <label >Email</label>
          <input onChange={this.handleEmail.bind(this)} value={email} type="email" className="form-control"  aria-describedby="" placeholder="Enter email"/>
        <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.email}</small>
          </div>
            <div className="form-group">
              <label >Password</label>
            <input onChange={this.handlePassword.bind(this)} value={password} type="password" className="form-control"  placeholder="Password"/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.password}</small>
            </div>
            <div className="form-group">
              <label >Password</label>
            <input onChange={this.handleConPassword.bind(this)} value={confirmpassword} type="password" className="form-control"  placeholder="Confirm Password"/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.confirmpassword}</small>
            </div>
            <hr/>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{errors.gps}</small>
          <small id="emailHelp" style={{color:"#ff0000"}} className="form-text text-muted">{messages}</small>
        <button type="submit" disabled={!this.props.isGeolocationEnabled||isLoading} className="w3-btn w3-ripple w3-green" onClick={this.handleSignup.bind(this)} style={{width:"100%"}}>ลงทะเบียน</button>
          </form>
        </div>
      </div>
    )
  }
}


export default withRouter(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SignupPage));
