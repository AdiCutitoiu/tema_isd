import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuthState} from './useAuthState';

export function useLocations() {
  const [locations, setLocations] = useState<Array<any>>([]);

  const {user} = useAuthState();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore()
      .collection('UserLocation')
      .onSnapshot(querySnapshot => {
        const now = Date.now();

        if (!querySnapshot) {
          return;
        }

        setLocations(
          querySnapshot.docs
            .filter(x => x.id !== user?.uid)
            .map(x => {
              const data = x.data();

              if (!data.latitude && !data.longitude) {
                return null;
              }

              // if (!data.timestamp || now - data.timestamp > 30 * 1000) {
              //   return null;
              // }

              return {id: x.id, ...data};
            })
            .filter(x => !!x),
        );
      });

    return unsubscribe;
  }, [user, setLocations]);

  return {locations};
}
