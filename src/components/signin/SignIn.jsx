import React, { Component } from "react";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./SignIn.scss";
import { googleSignInStart } from "../../redux/user/user-actions";
import { connect } from "react-redux";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.state({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }

    this.setState({ email: "", password: "" });
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    // const {googleSignInStart} = this.props
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            handleChange={this.handleChange}
            type="email"
            label="email"
            value={this.state.email}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
              Sign in with google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // googleSignInStart: () => dispatch(googleSignInStart)
})

export default connect(null, mapDispatchToProps)(Signin)