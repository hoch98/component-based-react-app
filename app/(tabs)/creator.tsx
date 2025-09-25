import { Box, Container, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { ScrollView } from "react-native";
import AddComponent from "../components/AddComponent";
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
      element = { type: "text", variant: "h4", value: "default string" };
    }
    if (option === "Image") {
      element = { type: "image", url: url };
    }
    if (option === "Grid") {
      element = { type: "grid", children: [
        { type: "text", variant: "h4", value: "default string" },
        { type: "image", url: url }
      ], itemSize: 6 };
    }
    setContent((prev: any) => {
      const updated = [...prev, element];
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
    console.log(content)
  }, []);

  const handleTextChange = (newText: string) => {
    if (selectedIndex === null) return;
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === selectedIndex ? { ...item, value: newText } : item
      );
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const handleTextVariantChange = (newVariant: string) => {
    if (selectedIndex === null) return;
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === selectedIndex ? { ...item, variant: newVariant } : item
      );
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const handleTextAlignmentChange = (alignment: any) => {
    if (selectedIndex === null) return;
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === selectedIndex
          ? { ...item, sx: { ...(item.sx || {}), textAlign: alignment } }
          : item
      );
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUrlChange = (newUrl: string) => {
    if (selectedIndex === null) return;
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === selectedIndex ? { ...item, url: newUrl } : item
      );
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const handleImageAlignmentChange = (alignment: string) => {
    if (selectedIndex === null) return;
    setContent(prev => {
      const updated = prev.map((item, idx) =>
        idx === selectedIndex
          ? { ...item, sx: { ...(item.sx || {}), alignment } }
          : item
      );
      localStorage.setItem("designCache", JSON.stringify(updated));
      return updated;
    });
  };

  const EditTextComponent = ({target, index}:any) => (
    <React.Fragment>
      <TextField
        label="Edit text"
        fullWidth
        value={target[index].value}
        onChange={(e) => handleTextChange(e.target.value)}
        sx={{marginTop: "25px"}}
      />
      <FormControl sx={{marginTop: "25px"}}>
        <FormLabel id="text-alignment-label">Text Alignment</FormLabel>
        <RadioGroup
          row
          aria-labelledby="text-alignment-label"
          name="text-alignment"
          value={target[index]?.sx?.textAlign || "left"}
          onChange={(e) => handleTextAlignmentChange(e.target.value)}
        >
          <FormControlLabel value="left" control={<Radio />} label="Left" />
          <FormControlLabel value="center" control={<Radio />} label="Center" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </RadioGroup>
        <Select
          labelId="text-variant-select-label"
          id="text-variant-select"
          value={target[index]?.variant}
          label="Variant Type"
          onChange={(e) => {handleTextVariantChange(e.target.value)}}
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

  const EditImageComponent = ({target, index}:any) => (
    <React.Fragment>
      <TextField
        label="Edit url"
        fullWidth
        value={target[index].url}
        onChange={(e) => handleUrlChange(e.target.value)}
        sx={{marginTop: "25px"}}
      />
      <FormControl sx={{marginTop: "25px"}}>
        <FormLabel id="image-alignment-label">Image Alignment</FormLabel>
        <RadioGroup
          row
          aria-labelledby="image-alignment-label"
          name="image-alignment"
          value={target[index]?.sx?.alignment || "left"}
          onChange={(e) => handleImageAlignmentChange(e.target.value)}
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
            textAlign: "center"
          }}
        >
          <Typography variant="h4">Editor</Typography>
          {selectedIndex !== null && content[selectedIndex].type === "text" && (
            <EditTextComponent target={content} index={selectedIndex}/>
          )}
          {selectedIndex !== null && content[selectedIndex].type === "image" && (
            <EditImageComponent target={content} index={selectedIndex}/>
          )}
          {selectedIndex !== null && content[selectedIndex].type === "grid" && (
            <React.Fragment>
              hi
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
                  onSelect={() => setSelectedIndex(idx)}
                />
              );
            }
            if (item.type === "image") {
              return <ImageComponent
                key={idx}
                url={item.url}
                sx={item.sx}   // <-- this is required
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
