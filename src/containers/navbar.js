import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
//import {Glyphicon,Button} from 'react-bootstrap';
import $ from 'jquery';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import setAuthorizationToken from '../setAuthorizationToken'
import {resetToCart } from '../ducks/cart';

class Navbar extends Component{

  componentDidMount(){
    $(document).ready(function(){
    $(".button a").click(function(){
        $(".overlay").fadeToggle(200);
       $(this).toggleClass('btn-open').toggleClass('btn-close');
    });
});
$('.overlay').on('click', function(){
    $(".overlay").fadeToggle(200);
    $(".button a").toggleClass('btn-open').toggleClass('btn-close');
    //var open = false;
});
  }

  handleLogout(e){
    const {setStates,history,resetToCart} = this.props;
    e.preventDefault();
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    setStates({type:"setCurrentUser",payload:{}})
    resetToCart();
    history.push('/login')
  }

  render(){
    const { isAuthenticate} = this.props.auth;
    //console.log(isAuthenticate);
    const users =(
          <li><a href="" onClick={this.handleLogout.bind(this)}>Logout</a></li>
    )

    const guest =(
      <li><Link to="/login">Login</Link></li>
    )
    return(
      <div>
        <nav>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Product</Link></li>
            <li>{isAuthenticate?users:guest}</li>
          <li><a href="https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/staff" target="_blank">Staff</a></li>
          </ul>

<div className="button">
	<a className="btn-open" href="#"></a>
</div>
</nav>
<div className="overlay">
	<div className="wrap">
		<ul className="wrap-nav">
			<li><Link to="/">Home</Link>
  			<ul>
  				<li><a href="">About Company</a></li>

  			</ul>
			</li>
			<li><Link to="/product">Product</Link>
  			<ul>
  				<li><Link to="/receipt">Receipt</Link></li>

  			</ul>
			</li>
			<li>{isAuthenticate?users:guest}
  			<ul>
  				<li><Link to="/signup">Sign Up</Link></li>
  			</ul>
			</li>
      <li><a href="https://us-central1-hyorder-36a01.cloudfunctions.net/widgets/staff" target="_blank">Staff</a></li>
		</ul>
	</div>
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
  return{
    setStates:(user)=>{
      dispatch({
        type:user.type,
        payload:user.payload
      });
    },
    resetToCart: ()=> dispatch(resetToCart())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));
