import React, {useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const navigate = async () => {
    try {
      const value = await AsyncStorage.getItem('onBoard');
      console.log('onBoard', value);
      if (value) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('OnBoard');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  function onAuthStateChanged(user) {
    if (user) {
      navigation.navigate('GroupScreen');
    } else {
      navigate();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../utils/drawables/chat.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 100, width: 100},
  text: {position: 'absolute', bottom: 20},
});
