import React from 'react';
//import Cart from './containers/Cart';
//import ProductList from './containers/ProductList';
import Navbar from './containers/navbar'
import Main from './main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee , faBars , faPlusCircle , faMinusCircle , faShoppingCart , faFilePdf } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee ,faBars , faPlusCircle , faMinusCircle , faShoppingCart ,faFilePdf)

const App = () => {
    return (
      <div style={{backgroundColor:"#F5F5F5"}}>
        <Navbar/>
        <div className="" id="body">
          <Main/>
        </div>

        <footer style={{backgroundColor:"#A9A9A9",height:"100px"}}>
        </footer>

      </div>
    );
}

export default App;
