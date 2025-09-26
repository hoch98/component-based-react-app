import Typography from "@mui/material/Typography";
import React from "react";
import { Optional } from "utility-types";

type props = {
  type: any;
  text: string;
  alignment: string;
  sx?: any;
  onSelect?: () => void; 
};

function TextComponent(props: Optional<props, "sx">) {
  return (
    <Typography
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
        textAlign: props.alignment,
        ...props.sx
      }}
      variant={props.type}
      onClick={props.onSelect}
    >
      {props.text}
    </Typography>
  );
}

export default TextComponent;
