import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const user = firebase.auth().currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Profile Information</Text>
      <Image
        source={require('../utils/drawables/chat.png')}
        style={styles.logoImage}
      />
      <TextInput
        placeholder="Enter Display Name"
        style={styles.nameInput}
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Pressable
        onPress={() => {
          database()
            .ref(`/users/${user.uid}`)
            .set({
              id: user.uid,
              name: displayName,
            })
            .then(() => {
              console.log('Data set.');
              navigation.pop();
              navigation.navigate('GroupScreen');
            });
        }}
        style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    height: '100%', 
    backgroundColor: '#fff'
  },
  infoText: {
    fontSize: 30, 
    marginTop: 40
  },
  logoImage: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    marginTop: 40,
  },
  nameInput: {
    width: '100%',
    fontSize: 17,
    borderBottomWidth: 1,
    textAlignVertical: 'bottom',
    paddingBottom: 6,
    marginVertical: 30,
  },
  submitBtn: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#A4DC5D',
    height: 50,
    justifyContent: 'center',
    borderRadius: 100,
  },
  submitText: {
    color: '#fff', 
    fontSize: 25, 
    fontWeight: '700'
  },
});
