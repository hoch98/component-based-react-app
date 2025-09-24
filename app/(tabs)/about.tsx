import { Layout } from "@ui-kitten/components";
import { StyleSheet } from 'react-native';
import TextComponent from "../components/Tabs";

const styles = StyleSheet.create({
  layout: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: "impact"
  }
});

export default function HomeScreen() {
  return (
    <Layout style={styles.layout}>
      <TextComponent type="p" text='About'/>
    </Layout>
  );
}

