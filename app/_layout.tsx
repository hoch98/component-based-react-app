import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};



export default function RootLayout() {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
