import React, { useState } from "react";
import "./sign-in.styles.scss";
//Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
//Redux
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectSignInError } from "../../redux/user/user.selectors";

const SignIn = () => {
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const isError = useSelector(selectSignInError);

  const signInWithGoogle = () => dispatch(googleSignInStart());
  const signInWithEmail = (email, password) =>
    dispatch(emailSignInStart({ email, password }));

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmail(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form className="contact-form" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        {isError !== null ? (
          <span style={{ color: "red" }}>Check your Email and Password</span>
        ) : (
          <span />
        )}
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            {" "}
            Sign in With Google{" "}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
