// GridComponent.tsx
import { Grid } from "@mui/material";
import React from "react";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";

type Props = {
  children?: any;
  itemSize: number;
  columnSpacing?: number;
  rowSpacing?: number;
  style?: any;
  onSelect?: (childIdx: number) => void;
};

export default function GridComponent({ children = [], itemSize, rowSpacing = 2, columnSpacing = 1, onSelect }: Props) {
  return (
    <Grid container rowSpacing={rowSpacing} columnSpacing={columnSpacing}>
      {children.map((child: any, idx: number) => (
        <Grid key={idx} size={{lg: itemSize, md: 6, sm: 12}} onClick={() => onSelect?.(idx)}>
          {child.type === "text" ? <TextComponent type={child.variant} text={child.value} sx={child.sx} /> :
            child.type === "image" ? <ImageComponent url={child.url} sx={child.sx} /> : "Invalid Child"}
        </Grid>
      ))}
    </Grid>
  );
}
