import { Box, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { ScrollView } from "react-native";
import AddComponent from "../components/AddComponent";
import AddGridComponent from "../components/AddGridComponent";
import GridComponent from "../components/GridComponent";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent";

const styles = {
  container: { padding: 2 },
  text: {
    textAlign: "center",
    display: "block",
    width: "100%",
    fontSize: 30,
  },
};

const url =
  "https://images.genius.com/ebaf191aa4cf2754bb3180359860936d.890x890x1.jpg";

export default function Creator() {
  const [content, setContent] = React.useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  function addComponent(option: any) {
    let element: any;
    if (option === "Text") {
      element = { type: "text", variant: "h4", value: "default string", alignment: "left"};
    }
    if (option === "Image") {
      element = { type: "image", url: url, alignment: "left" };
    }
    if (option === "Grid") {
      element = { type: "grid", children: [
      ], itemSize: 6 };
    }
    setContent((prev: any) => {
      const updated = [...prev, element];
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  }
  function addGridComponent(option: any, gridIndex: number) {
    let element: any;
    if (option === "Text") {
      element = { type: "text", variant: "h4", value: "default string", alignment: "left"};
    }
    if (option === "Image") {
      element = { type: "image", url: url, alignment: "left" };
    }
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === gridIndex
          ? { ...item, children: [...(item.children || []), element] }
          : item
      );

      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  }

  React.useEffect(() => {
    if (localStorage.getItem("designCache")) {
      setContent(JSON.parse(localStorage.getItem("designCache")!))
    } else {
      setContent([]);
      localStorage.setItem("designCache", JSON.stringify(content))
    }
  }, []);

  const updateComponent = (parentIndex:number, childIndex:number, update:any) => {
    setContent(prev => {
      let updated;

      if (parentIndex === -1) {
        updated = prev.map((item, idx) =>
          idx === childIndex ? { ...item, ...update } : item
        );
      } else {
        updated = prev.map((item, idx) =>
          idx === parentIndex
            ? {
                ...item,
                children: item.children.map((child:any, cIdx:any) =>
                  cIdx === childIndex ? { ...child, ...update } : child
                )
              }
            : item
        );
      }
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const EditTextComponent = ({target, parentId, childId}:any) => (
    <React.Fragment>
      <TextField
        label="Edit text"
        fullWidth
        value={target[childId].value}
        onChange={(e) => updateComponent(parentId, childId, {value: e.target.value})}
        sx={{marginTop: "25px"}}
      />
      <FormControl sx={{marginTop: "25px"}}>
        <FormLabel id="text-alignment-label">Text Alignment</FormLabel>
        <RadioGroup
          row
          aria-labelledby="text-alignment-label"
          name="text-alignment"
          value={target[childId]?.alignment}
          onChange={(e) =>
            updateComponent(parentId, childId, { alignment: e.target.value })
          }
        >
          <FormControlLabel value="left" control={<Radio />} label="Left" />
          <FormControlLabel value="center" control={<Radio />} label="Center" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="text-variant-select-label">Variant</InputLabel>
        <Select
          labelId="text-variant-select-label"
          id="text-variant-select"
          value={target[childId]?.variant}
          label="Variant"
          onChange={(e) => updateComponent(parentId, childId, {variant: e.target.value})}
          sx={{marginTop: "25px"}}
        >
          <MenuItem value="h1">h1</MenuItem>
          <MenuItem value="h2">h2</MenuItem>
          <MenuItem value="h3">h3</MenuItem>
          <MenuItem value="h4">h4</MenuItem>
          <MenuItem value="body1">body</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
  )

  const EditImageComponent = ({target, parentId, childId}:any) => (
    <React.Fragment>
      <TextField
        label="Edit url"
        fullWidth
        value={target[childId].url}
        onChange={(e) => updateComponent(parentId, childId, {url: e.target.value})}
        sx={{marginTop: "25px"}}
      />
      <FormControl sx={{marginTop: "25px"}}>
        <FormLabel id="image-alignment-label">Image Alignment</FormLabel>
        <RadioGroup
          row
          aria-labelledby="image-alignment-label"
          name="image-alignment"
          value={target[childId]?.alignment}
          onChange={(e) => updateComponent(parentId, childId, { alignment: e.target.value })}
        >
          <FormControlLabel value="left" control={<Radio />} label="Left" />
          <FormControlLabel value="center" control={<Radio />} label="Center" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  )

  return (
    <ScrollView>
      <Box sx={{ display: "flex", gap: 2 }}>

        {/* Editor Bar */}
        <Container
          sx={{
            margin: 0,
            width: "30%",
            height: "100vh",
            border: "1px solid gray",
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            textAlign: "center",
            overflowY: "auto"
          }}
        >
          <Typography variant="h4">Editor</Typography>
          {selectedIndex !== null && content[selectedIndex].type === "text" && (
            <EditTextComponent target={content} parentId={-1} childId={selectedIndex}/>
          )}
          {selectedIndex !== null && content[selectedIndex].type === "image" && (
            <EditImageComponent target={content} parentId={-1} childId={selectedIndex}/>
          )}
          {selectedIndex !== null && content[selectedIndex].type === "grid" && (
            <React.Fragment>
              {content[selectedIndex].children.map((item:any, childIndex:number) => {
                if (item.type === "text") {
                  return (
                    <div>
                      <Typography sx={{marginTop: "50px"}}>Text</Typography>
                      <hr />
                      <EditTextComponent target={content[selectedIndex].children} parentId={selectedIndex} childId={childIndex}/>
                      <hr />
                    </div>
                  );
                }
                if (item.type === "image") {
                  return (
                    <div>
                      <Typography sx={{marginTop: "50px"}}>Image</Typography>
                      <hr />
                      <EditImageComponent target={content[selectedIndex].children} parentId={selectedIndex} childId={childIndex}/>
                      <hr />
                    </div>
                  )
                }
              })}
              <AddGridComponent addComponent={addGridComponent} gridIndex={selectedIndex}/>
            </React.Fragment>
          )}
        </Container>

        {/* Contents */}

        <Container sx={styles.container}>
          {content.map((item: any, idx: number) => {
            if (item.type === "text") {
              return (
                <TextComponent
                  key={idx}
                  type={item.variant}
                  text={item.value}
                  sx={item.sx}
                  alignment={item.alignment}
                  onSelect={() => setSelectedIndex(idx)}
                />
              );
            }
            if (item.type === "image") {
              return <ImageComponent
                key={idx}
                url={item.url}
                sx={item.sx}
                alignment={item.alignment}
                onSelect={() => setSelectedIndex(idx)}
              />
            } if (item.type === "grid") {
              return <GridComponent
                key={idx}
                children={item.children}
                itemSize={item.itemSize}
                onSelect={() => setSelectedIndex(idx)}
              />
            }
            return null;
          })}
          <AddComponent addComponent={addComponent} />
        </Container>
      </Box>
    </ScrollView>
  );
}
