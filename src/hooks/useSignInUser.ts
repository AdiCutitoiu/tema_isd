import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export function useSignInUser() {
  useEffect(() => {
    auth()
      .signInAnonymously()
      .catch(error => {
        console.error(error);
      });
  }, []);
}
