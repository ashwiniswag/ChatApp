import React, { useEffect } from 'react';
import database from '@react-native-firebase/database';

export const useUpdateDisplayName = () => {

    function onAuthStateChanged(user) {
        if(user){
            database().ref(`/users/${user.uid}/name`).once('value').then(snapshot => {
                user.updateProfile({
                    displayName: snapshot.val()
                })
            })
        }
        else{
            navigate();
        }
    }

    useEffect(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            return subscriber;
    },[]);

}