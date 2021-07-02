import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

const HatsPage = () => <h1>HATS PAGE</h1>;

const JacketPage = () => <h1>JACKETS PAGE</h1>;

const SneakersPage = () => <h1>SNEAKERS PAGE</h1>;

const WomensPage = () => <h1>WOMENS PAGE</h1>;

const MensPage = () => <h1>MENS PAGE</h1>;

const ContactPage = () => <h1>CONTACT PAGE</h1>;

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const setCurrentUser = this.props.setCurrentUser;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth /*userAuth is null*/);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/shop/hats" component={HatsPage} />
          <Route path="/shop/jackets" component={JacketPage} />
          <Route path="/shop/sneakers" component={SneakersPage} />
          <Route path="/shop/womens" component={WomensPage} />
          <Route path="/shop/mens" component={MensPage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInPage />
            }
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
