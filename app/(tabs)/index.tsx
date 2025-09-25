import { Container } from "@mui/material";
import React from "react";
import { ScrollView } from "react-native";
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

export default function HomeScreen() {
  const [content, setContent] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (localStorage.getItem("designCache")) {
      setContent(JSON.parse(localStorage.getItem("designCache")!))
    } else {
      setContent([]);
      localStorage.setItem("designCache", JSON.stringify(content))
    }
  }, []);

  return (
    <ScrollView>
      <Container sx={styles.container}>
        {content.map((item: any, idx: number) => {
          if (item.type === "text") {
            return (
              <TextComponent
                key={idx}
                type={item.variant}
                text={item.value}
                sx={item.sx}
              />
            );
          }
          if (item.type === "image") {
            return <ImageComponent
              key={idx}
              url={item.url}
              sx={item.sx}
            />
          }
          return null;
        })}
      </Container>
    </ScrollView>
  );
}

