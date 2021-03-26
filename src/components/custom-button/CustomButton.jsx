import React from "react";
import { CustomButtonContainer } from "./CustomButtonStyles";

export default function CustomButton({children, ...props}) {
  return (
    <CustomButtonContainer {...props}>
      {children}
    </CustomButtonContainer>
  );
}
