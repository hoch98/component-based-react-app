import { Container } from "@mui/material";
import { ScrollView } from "react-native";
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

export default function HomeScreen() {
  var content = [
    <TextComponent type="p" text="Index" sx={styles.text}/>,
    <GridComponent children={[
      <TextComponent type="p" text="grid element 1" sx={{fontSize: "50px"}}/>,
      <TextComponent type="p" text="grid element 2"/>,
      <GridComponent children={[
        <ImageComponent url={url}/>,
        <TextComponent type="p" text="dskjffd" sx={{fontSize: "30px"}}/>,
      ]} itemSize={6}/>
    ]} itemSize={4} columnSpacing={0}/>,
  ]

  return (
    <ScrollView>
      <Container sx={styles.container}>
        {content.map((child:any) => {
          return child
        })}
      </Container>
    </ScrollView>
  );
}

