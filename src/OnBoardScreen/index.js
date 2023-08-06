import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardScreen = ({navigation}) => {
  const navigate = async () => {
    try {
      await AsyncStorage.setItem('onBoard', 'true');
      navigation.pop();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome To Group Chat</Text>
      <Pressable
        style={styles.getStartedBtn}
        onPress={() => {
          navigate();
        }}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontWeight: 'bold',
    height: '40%',
    width: '70%',
    textAlign: 'center',
    fontSize: 40,
    verticalAlign: 'middle',
  },
  getStartedBtn: {
    backgroundColor: '#A4DC5D',
    width: '60%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  getStartedText: {
    fontSize: 25,
    color: '#fff', 
    fontWeight: '500'
  },
});
