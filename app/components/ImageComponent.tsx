import { Box } from "@mui/material";
import { Optional } from "utility-types";

type props = {
  url: string;
  sx?: any;
  onSelect?: () => void;
};

function ImageComponent(props: Optional<props, "sx">) {
  const alignment = props.sx?.alignment || "left";

  // Map alignment -> flexbox
  const justifyMap: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <Box
      onClick={props.onSelect}
      sx={{
        display: "flex",
        justifyContent: justifyMap[alignment],
        width: "100%",
        marginTop: "2%",
        marginBottom: "2%"
      }}
    >
      <Box
        component="img"
        src={props.url}
        sx={{
          maxWidth: "500px",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          ...props.sx,
        }}
      />
    </Box>
  );
}

export default ImageComponent;
