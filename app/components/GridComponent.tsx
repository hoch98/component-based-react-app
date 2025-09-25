import { Grid } from '@mui/material';
import React from 'react';
import { Optional } from 'utility-types';
import AddComponent from './AddComponent';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

type props = {
  children?: any,
  itemSize: number
  columnSpacing? : number
  rowSpacing? :number
  style?: any
}

const options = [
  "Text",
  "Image", 
  "Grid"
];
const url = "https://images.genius.com/ebaf191aa4cf2754bb3180359860936d.890x890x1.jpg"

function GridComponent(props: Optional<props, 'style' | "columnSpacing" | "rowSpacing" | "children">) {
  const [content, setContent] = React.useState<any>([]);
  
  function addComponent(option:any) {
    var element:any;
    if (option == "Text") {
      element = <TextComponent type="h3" text="default string"/>
    }if (option == "Image") {
      element = <ImageComponent url={url}/>
    } if (option == "Grid") {
      element = <GridComponent itemSize={6}/>
    }
    setContent((prev:any) => [...prev, element]);
    console.log(content)
  }

  React.useEffect(() => {
    if (props.children.length != 0) {
      setContent(props.children)
    } else {
      console.log("yes")
      setContent([
        <AddComponent addComponent={addComponent}/>
      ])
    }
  }, [])
  
  return (
    <Grid container rowSpacing={(props.rowSpacing ? props.rowSpacing : 2)} columnSpacing={(props.columnSpacing ? props.columnSpacing : 1)}>
      {content.map((child:any) => {
        return <Grid size={{lg: props.itemSize, md: 6, sm: 12}}>
          {child}
        </Grid>
      })}
    </Grid>
  )
}

export default GridComponent