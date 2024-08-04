import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import { screensEnabled } from 'react-native-screens';

type RootStackParamList = {
  HomePage: undefined;
  LivePage: { isHost: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// HomePage Component
function HomePage({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'HomePage'> }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Start a Live" onPress={() => navigation.navigate('LivePage', { isHost: true })} />
      <Button title="Watch a Live" onPress={() => navigation.navigate('LivePage', { isHost: false })} />
    </View>
  );
}

// LivePage Component
function LivePage({ route }: { route: { params: { isHost: boolean } } }) {
  const { isHost } = route.params;
  const randomUserID = String(Math.floor(Math.random() * 100000));

  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={632416856} // Replace with your App ID
        appSign="4e372600955f536c6b0f9ca268a27655de4f38cba18dd3546fcfe5445332c0ab" // Replace with your App Sign
        userID={randomUserID}
        userName={'user_' + randomUserID}
        liveID="Jl9fZ" // A unique ID for the live session
        config={{
          ...(isHost ? {
            ...HOST_DEFAULT_CONFIG,
            screensEnabled: true, // Enable screen sharing
            onLeaveLiveStreaming: () => { /* Handle leaving the stream */ },
          } : {
            ...AUDIENCE_DEFAULT_CONFIG,
            screensEnabled: true, // Enable screen viewing for audience
            onLeaveLiveStreaming: () => { /* Handle leaving the stream */ },
          })
        }}
        
      />
    </View>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LivePage" component={LivePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
