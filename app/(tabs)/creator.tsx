import { Container } from "@mui/material";
import React from 'react';
import { ScrollView } from "react-native";
import AddComponent from "../components/AddComponent";
import GridComponent from "../components/GridComponent";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent";

const styles = {
  container: {
    padding: 2,
  },
  text: {
    textAlign: "center",
    display: "block",
    width: "100%",
    fontSize: 30
  }
}

const url = "https://images.genius.com/ebaf191aa4cf2754bb3180359860936d.890x890x1.jpg"

export default function Creator() {
  const [content, setContent] = React.useState<any>([]);

  function addComponent(option:any) {
    var element:any;
    if (option == "Text") {
      element = <TextComponent type="h3" text="default string"/>
    }if (option == "Image") {
      element = <ImageComponent url={url}/>
    } if (option == "Grid") {
      element = <GridComponent itemSize={6} children={[
        
      ]}/>
    }
    setContent((prev:any) => [...prev, element]);
    console.log(content)
  }

  React.useEffect(() => {
    setContent([
      <TextComponent type="p" text="Index" sx={styles.text}/>,
      <GridComponent children={[
        <TextComponent type="p" text="grid element 1" sx={{fontSize: "50px"}}/>,
        <TextComponent type="p" text="grid element 2"/>,
        <GridComponent children={[
          <ImageComponent url={url}/>,
          <TextComponent type="p" text="dskjffd" sx={{fontSize: "30px"}}/>,
        ]} itemSize={6}/>
      ]} itemSize={4} columnSpacing={0}/>
    ]);
  }, [])

  return (
    <ScrollView>
      <Container sx={styles.container}>
        {content.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{child}</React.Fragment>
        ))}
        <AddComponent addComponent={addComponent} />
      </Container>
    </ScrollView>
  );
}

