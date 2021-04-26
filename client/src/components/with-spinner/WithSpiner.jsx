import React from "react";
import Spinner from "../spinner/spinner-component";

const WithSpiner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpiner;
