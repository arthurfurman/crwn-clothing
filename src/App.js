import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInPage from "./pages/sign-in/sign-in.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const HatsPage = () => <h1>HATS PAGE</h1>;

const JacketPage = () => <h1>JACKETS PAGE</h1>;

const SneakersPage = () => <h1>SNEAKERS PAGE</h1>;

const WomensPage = () => <h1>WOMENS PAGE</h1>;

const MensPage = () => <h1>MENS PAGE</h1>;

const ContactPage = () => <h1>CONTACT PAGE</h1>;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth /*userAuth is null*/ });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/shop/hats" component={HatsPage} />
          <Route path="/shop/jackets" component={JacketPage} />
          <Route path="/shop/sneakers" component={SneakersPage} />
          <Route path="/shop/womens" component={WomensPage} />
          <Route path="/shop/mens" component={MensPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
