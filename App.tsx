/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {useAuthState} from './src/hooks/useAuthState';
import {MapScreen} from './src/screens';
import {useSignInUser} from './src/hooks';
import firestore from '@react-native-firebase/firestore';
import {useCurrentUserInfo} from './src/hooks/useCurrentUserInfo';
import {NameScreen} from './src/screens/NameScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const {user} = useAuthState();

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      pos => {
        const {latitude, longitude} = pos.coords;
        setPosition({latitude, longitude});
      },
      undefined,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );

    return () => Geolocation.clearWatch(watchID);
  }, []);

  useSignInUser();

  const {userInfo} = useCurrentUserInfo();

  useEffect(() => {
    if (!user || !position || !userInfo?.name) {
      return;
    }

    firestore()
      .collection('UserLocation')
      .doc(user.uid)
      .update({...position})
      .catch(err => console.log(err));
  }, [user, position, userInfo]);

  useEffect(() => {
    if (!user || !userInfo?.name) {
      return;
    }
    const updateTimeId = setInterval(() => {
      // firestore()
      //   .collection('UserLocation')
      //   .doc(user?.uid)
      //   .update({timestamp: Date.now()})
      //   .catch(err => console.log(err));
    }, 10000);

    return () => clearInterval(updateTimeId);
  }, [user?.uid, userInfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {user && (
        <View
          style={{
            flex: 1,
          }}>
          {userInfo?.name && position && <MapScreen position={position} />}
          {!userInfo?.name && <NameScreen />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
