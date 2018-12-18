import React,{Component} from 'react';
import './LoginPage.css'
import {Link} from 'react-router-dom';
import validateInput from './validate'
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../setAuthorizationToken';
import {connect} from 'react-redux'
import {Modal,Button} from 'react-bootstrap'

class LoginPage extends Component{
  constructor(props){
    super(props)
    this.state={
      username:"",
      password:"",
      errors:{},
      message:"",
      isLoading:false,
      show: false
    }
  }

  handleUsername(e){
    this.setState({
      username:e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password:e.target.value
    })
  }

  isValid(){
    const {errors,isValid} = validateInput(this.state)
    if(!isValid){
      this.setState({errors})
    }

    return isValid
  }

  handleLogin(e){
    e.preventDefault()
    const {password ,username} = this.state;
    const {history,setCurrentUser} = this.props
    if(this.isValid()){
      this.setState({
        errors:{},
        isLoading:true
      })
      axios.post('https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/login/',
      {
        username:username,
        password:password,

      })
      .then(resp=>{
        //console.log(resp.data);
        if(resp.data.message === "This ID does't have"){
          this.setState({
            isLoading:false,
            message: "This ID does't have",
            show:true
          })
        }
        else if (resp.data.message === "password incorrect") {
          this.setState({
            isLoading:false,
            message: "password incorrect",
            show:true
          })
        }
        else {
          const token = resp.data.token
          localStorage.setItem('jwtToken', token)
          //console.log(jwt.decode(token));
          setCurrentUser(jwt.decode(token))
          setAuthorizationToken(token)
          history.push('/product')
        }
      })
    }
  }

  handleClose() {

    this.setState({ show: false });
  }

  render(){
    const {username,password,errors,isLoading,message} = this.state
    const load = (
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
    const noload = (
      <div></div>
    )
    return(
      <div className="container" style={{height:"600px"}}>
        <div className="login-card w3-animate-top" style={{marginTop:"2%"}}>
          <h1>เข้าสู่ระบบ</h1>
          <form>
    <div className="form-group">
      <label>Username/Email</label>
    <input onChange={this.handleUsername.bind(this)} type="text" value={username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  <small id="emailHelp" className="form-text text-muted">{errors.username}</small>
    </div>
    {isLoading?load:noload}
    <div className="form-group">
      <label >Password</label>
    <input onChange={this.handlePassword.bind(this)} type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  <small id="emailHelp" className="form-text text-muted">{errors.password}</small>
    </div>
    <hr/>
    <Link to="/signup">ลงทะเบียนผู้ใช้</Link>
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เข้าสู่ระบบผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleClose.bind(this)}>OK</Button>
      </Modal.Footer>
    </Modal>
  <hr/>
<small id="emailHelp" className="form-text text-muted">{message}</small>
<button type="submit" onClick={this.handleLogin.bind(this)} className="w3-btn w3-ripple w3-green" style={{width:"100%"}}>เข้าสู่ระบบ</button>
  </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return({
    auth: state.auth
  })
}

const mapDispatchToProps = (dispatch)=>{
  return {
    setCurrentUser:(user)=>{
      dispatch({
        type:"setCurrentUser",
        payload: user
      })
    }
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginPage));
