import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords are not matching");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            required
            handleChange={this.handleChange}
            label="Display Name"
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            required
            handleChange={this.handleChange}
            label="Email"
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            required
            handleChange={this.handleChange}
            label="Password"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            required
            handleChange={this.handleChange}
            label="Confirm Password"
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
