import { Container } from "@mui/material";
import { ScrollView } from "react-native";
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

export default function About() {
  var content = [
    <TextComponent type="p" text="About" sx={styles.text}/>,
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

