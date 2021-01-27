import React, { useState } from "react";
import "./sign-up.styles.scss";
//Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import toast, { Toaster } from "react-hot-toast";
import { selectSignUpError } from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;
  const cartItems = useSelector(selectCartItems);
  const isError = useSelector(selectSignUpError);
  const dispatch = useDispatch();
  const signUp = (displayName, email, password, cartItems) =>
    dispatch(signUpStart({ displayName, email, password, cartItems }));

  const handleSubmit = (event) => {
    toast.dismiss();
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    signUp(displayName, email, password, cartItems);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-up">
      <Toaster
        toastOptions={{
          style: {
            margin: "10rem",
            zIndex: 1,
            minWidth: "300px",
          },
          duration: 4000,
        }}
      />
      <h2>I don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          handleChange={handleChange}
          label="Name"
          required
        />
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
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        {isError !== null ? (
          <span style={{ color: "red" }}>{isError.message}</span>
        ) : (
          <span />
        )}
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
