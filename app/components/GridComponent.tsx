import { Grid } from '@mui/material';
import { Optional } from 'utility-types';

type props = {
  children: any,
  itemSize: number
  columnSpacing? : number
  rowSpacing? :number
  style?: any
}

function GridComponent(props: Optional<props, 'style' | "columnSpacing" | "rowSpacing">) {
  
  return (
    <Grid container rowSpacing={(props.rowSpacing ? props.rowSpacing : 2)} columnSpacing={(props.columnSpacing ? props.columnSpacing : 1)}>
      {props.children.map((child:any) => {
        return <Grid size={{lg: props.itemSize, md: 6, sm: 12}}>
          {child}
        </Grid>
      })}
    </Grid>
  )
}

export default GridComponent