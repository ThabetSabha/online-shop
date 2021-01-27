import React, { useEffect, lazy, Suspense } from "react";
import "./App.scss";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoading } from "./redux/user/user.selectors";

import { checkUserSession } from "./redux/user/user.actions";
//React Router
import PrivateRoute from "./Components/private-route/private-route.component";
import { Switch, Route } from "react-router-dom";
//Components to render
import Header from "./Components/header/header.component";
import Spinner from "./Components/spinner/spinner.component";
import ErrorBoundary from "./Components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./Pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./Pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./Pages/checkout/checkout.component"));
const ContactPage = lazy(() =>
  import("./Pages/contact/contact-page.component")
);
const NotFoundPage = lazy(() =>
  import("./Pages/not-found-page/not-found-page.component")
);

const App = () => {
  const dispatch = useDispatch();
  const isUserLoading = useSelector(selectIsUserLoading);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <>
      {isUserLoading ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/shop">
                  <ShopPage />
                </Route>
                <Route path="/contact">
                  <ContactPage />
                </Route>
                <Route exact path="/checkout">
                  <CheckoutPage />
                </Route>
                <PrivateRoute exact path="/signin">
                  <SignInAndSignUpPage />
                </PrivateRoute>
                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </>
  );
};

export default App;
