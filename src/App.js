import React, { createContext } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/ShopingMol/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderReview from './Component/OrderReview/OrderReview';
import ManageEnventory from './Component/ManageEnventory/ManageEnventory';
import WrongPath from './Component/WrongPath/WrongPath';
import InfoProduct from './Component/InfoProduct/InfoProduct';
import Login from './Component/Login/Login';
import Shipment from './Component/Shipment/Shipment';
import { useState } from 'react';
import PrivetRoute from './Component/PrivetRoute/PrivetRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});


  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
  
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
            <Shop></Shop>
          </Route>
          <Route path="/Review">
            <OrderReview></OrderReview>
          </Route>
          <Route path="/Enventory">
            <ManageEnventory></ManageEnventory>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivetRoute path="/shipment">
            <Shipment></Shipment>
          </PrivetRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/Productivity/:Productivitykey">
            <InfoProduct></InfoProduct>
          </Route>
          <Route path="*">
            <WrongPath></WrongPath>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
