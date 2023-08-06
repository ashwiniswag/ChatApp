import React, { useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

const Callback = ({navigation}) => {

    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('onBoard');
            const token = await AsyncStorage.getItem('token');
            if (value !== null && token!==null) {
              // We have data!!
              navigation.navigate('GroupScreen')
            }
          } catch (error) {
            // Error retrieving data
          }
    },[])

    // return <View><Text>Hello</Text></View>
}

export default Callback;