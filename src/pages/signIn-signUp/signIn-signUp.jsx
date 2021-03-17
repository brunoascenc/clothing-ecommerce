import React from "react";
import Signin from "../../components/signin/SignIn";
import SignUp from "../../components/signup/Signup";

import './signIn-signUp.scss'

export default function signInAndSignUp() {
  return (
    <div className="sign-in-and-sign-up">
      <Signin />
      <SignUp/>
    </div>
  );
}
