import {Switch,Route} from 'react-router-dom';
import ProductPage from './ProductPage/ProductPage';
import HamePage from './HomePage/HomePage';
import PurchasePage from './PurchasePage/PurchasePage';
import LoginPage from './LoginPage/LoginPage';
import PDFBill from './PDF/PDFBill'
import SignupPage from './SignupPage/SignupPage';
import ReceiptHistory from './ReceiptHistory/ReceiptHistory'
import React from 'react';


const Main = ()=>(
  <div>
    <div className="">
    <Switch>
      <Route exact path="/" component={HamePage}/>
      <Route exact path="/product" component={ProductPage}/>
      <Route exact path="/purchase" component={PurchasePage}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/pdfbill" component={PDFBill}/>
      <Route exact path="/signup" component={SignupPage}/>
      <Route exact path="/receipt" component={ReceiptHistory}/>
    </Switch>
    </div>
  </div>
)

export default Main;
