import React,{Component} from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css'
import $ from 'jquery'

class HomePage extends Component {
  componentDidMount(){
    $(document).ready(function() {

//window and animation items
var animation_elements = $.find('.animation-element');
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
  render(){
    return (
        <div className="w3-animate-top">
        <Carousel interval={2000} slide pauseOnHover={false}>
    <Carousel.Item>
      <img width={"100%"} height={300} alt="900x300" src="http://www.takepart.com/sites/default/files/styles/large/public/garlic-farm.jpg" />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={"100%"} height={300} alt="900x300" src="http://www.takepart.com/sites/default/files/styles/large/public/garlic-farm.jpg" />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={"100%"} height={300} alt="900x300" src="http://www.takepart.com/sites/default/files/styles/large/public/garlic-farm.jpg" />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  <div className="parallax"></div>
  <div className="main-container">
  <div className="container">
    <h1>Slide in from the left </h1>
    <p>This animation will focus on sliding an element from the left once it enters the view of the user</p>
  </div>
  <div className="container">
    <h2>
 Our Testimonials <i className="fa fa-comment"></i></h2>
    <p> We have worked in the industry for 15 years and have provided services to a wide range of clients.</p>
    <p>Come and see what our clients are saying about our services. </p>
  </div>
  <div className="container cf">
    <div className="animation-element slide-left testimonial">
      <div className="header">
        <div className="left">
          <img alt="" src="https://drive.google.com/uc?export=download&id=0B7UPM0QugWUjVTdZcktRTWhNamM" />
        </div>
        <div className="right">
          <h3>Johnathon Richard Smith</h3>
          <h4>CEO / Manager - Auto Incorporated</h4>
        </div>
      </div>
      <div className="content"><i className="fa fa-quote-left"></i> When I started using their service I was skeptical. They promised me a 300% return on my initial investment. However they came through on their word and now my business is flourishing.. <i className="fa fa-quote-right"></i>
      </div>
      <div className="rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-half-o"></i>
      </div>
    </div>
    <div className="animation-element slide-left testimonial">
      <div className="header">
        <div className="left">
          <img alt="" src="https://drive.google.com/uc?export=download&id=0B7UPM0QugWUjV3BseTMtcEU1T2M" />
        </div>
        <div className="right">
          <h3>Joanna Hammerlton</h3>
          <h4>Marketing Manager - Omega Creative</h4>
        </div>
      </div>
      <div className="content"><i className="fa fa-quote-left"></i> Our company first enlisted their services when we had a down-turn in sales and revene. They outlined a series of steps we could take to improve our position and within a year we are making signifcant improvements..
        <i className="fa fa-quote-right"></i>
      </div>
      <div className="rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
      </div>
    </div>

    <div className="animation-element slide-left testimonial">
      <div className="header">
        <div className="left">
          <img alt="" src="https://drive.google.com/uc?export=download&id=0B7UPM0QugWUjTURta0pyMEtoUmc" />
        </div>
        <div className="right">
          <h3>Mark Jamerson</h3>
          <h4>CEO - Generic Business</h4>
        </div>
      </div>
      <div className="content"><i className="fa fa-quote-left"></i> We entered into a 12 month period of service with this company in the hopes to improve our returns. After this period we have a return of double our initial investment..
        <i className="fa fa-quote-right"></i>
      </div>
      <div className="rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
      </div>
    </div>

    <div className="animation-element slide-left testimonial">
      <div className="header">
        <div className="left">
          <img alt="" src="https://drive.google.com/uc?export=download&id=0B7UPM0QugWUjb1dxcGZEYUc0Z3M" />
        </div>
        <div className="right">
          <h3>Susan Hilton</h3>
          <h4>Financial Officer - People Tech</h4>
        </div>
      </div>
      <div className="content"><i className="fa fa-quote-left"></i> Our involvement in this company has been mutually beneficial. We were hoping for slightly higher returns, however the current level of returns are sufficient..
        <i className="fa fa-quote-right"></i>
      </div>
      <div className="rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
      </div>
    </div>
  </div>


        </div>
      </div>

    );
  }
}


export default HomePage;
