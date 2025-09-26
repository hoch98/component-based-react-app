// GridComponent.tsx
import { Grid, Typography } from "@mui/material";
import React from "react";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";

type Props = {
  children?: any;
  itemSize: number;
  columnSpacing?: number;
  rowSpacing?: number;
  style?: any;
  onSelect?: () => void;
};

export default function GridComponent({ children = [], itemSize, rowSpacing = 2, columnSpacing = 1, onSelect }: Props) {
  return (
    <Grid container rowSpacing={rowSpacing} columnSpacing={columnSpacing}>
      {children.map((child: any, idx: number) => (
        <Grid key={idx} size={{lg: itemSize, md: 6, sm: 12}} onClick={() => {onSelect!()}}>
          {child.type === "text" ? <TextComponent type={child.variant} text={child.value} sx={(child.sx || {})} alignment={child.alignment}/> :
            child.type === "image" ? <ImageComponent url={child.url} sx={child.sx} alignment={child.alignment}/> : "Invalid Child"}
        </Grid>
      ))}
      {children.length == 0 ? <Typography variant="h4" onClick={() => {onSelect!()}}>Empty Grid</Typography> : ""}
    </Grid>
  );
}
