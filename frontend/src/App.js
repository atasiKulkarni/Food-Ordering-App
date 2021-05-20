// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// Importing Components
import Nav from "./customer components/Nav";
import Home from "./customer components/Home";
import About from "./customer components/About";
import Contact from "./customer components/Contact";
import Option from "./customer components/Option";
import FoodOrderPage from "./customer components/FoodOrderPage";
import Menu from "./customer components/Menu";
import Checkout from "./customer components/Checkout";
import Cart from "./customer components/Cart";

import BookHallsPage from "./customer components/BookHallsPage";
import Marquee from "./customer components/Marquee";

import Login from "./customer components/Login";
import Signup from "./customer components/Signup";
// import businessLogin from "./business components/Login";
import businessSignup from "./business components/Signup";
import businessLogin from "./business components/Login";

import restaurantDashboard from "./business components/RestaurantDashboard";

// Importing Other Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/option" component={Option} />

            {/* Food Order Components */}
            <Route path="/food-order" component={FoodOrderPage} />
            <Route path="/menu" component={Menu} />
            {/* <Route path="/menu/cart" component={Cart} /> */}
            <Route path="/checkout" component={Checkout} />

            {/* Hall Booking Components */}
            <Route path="/book-halls" component={BookHallsPage} />
            <Route path="/marquee" component={Marquee} />
            <Route path="/checkout" component={Checkout} />

            {/* Adding Login/Signup Components for customers*/}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {/* Adding Login/Signup Components for businesses*/}
            {/* <Route path="/business-login" component={businessLogin} /> */}
            <Route path="/business-signup" component={businessSignup} />
            <Route path="/business-login" component={businessLogin} />

            {/* Adding Restaurant Dashboard */}
            <Route
              path="/restaurant-dashboard"
              component={restaurantDashboard}
            />
          </Switch>
        </div>
      </Router>
      <div className="custom-footer">
        <p>© 2021 BeeAhead All Rights Reserved</p>
      </div>
    </>
  );
}

export default App;