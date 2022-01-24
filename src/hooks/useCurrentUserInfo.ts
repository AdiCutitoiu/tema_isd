import {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuthState} from './useAuthState';

export function useCurrentUserInfo() {
  const {user} = useAuthState();

  const [userInfo, setUserInfo] = useState<{name: string} | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore()
      .collection('UserLocation')
      .doc(user.uid)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot) {
          return;
        }

        const data = querySnapshot.data();
        if (!data) {
          return;
        }

        setUserInfo({name: data.name});
      });

    return unsubscribe;
  }, [user, setUserInfo]);

  const setName = useCallback(
    (name: string) => {
      if (!user) {
        return;
      }

      const doc = firestore().collection('UserLocation').doc(user.uid);

      if (!userInfo) {
        doc.set({
          name,
        });
      } else {
        doc.update({
          name,
        });
      }
    },
    [user, userInfo],
  );

  return {userInfo, setName};
}
