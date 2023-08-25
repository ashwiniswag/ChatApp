import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { backPressHandle } from '../utils/Common/commonFunction';

const LoginScreen = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [phoneNumber, serPhoneNumber] = useState('');
  const [flag, setFlag] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [otpCheck, setOtpCheck] = useState(false);

  function onAuthStateChanged(user) {
    if (user) {
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then(snapshot => {
          navigation.pop();
          if (snapshot.val()) {
            console.log('Called',snapshot.val());
            navigation.navigate('GroupScreen');
          } else navigation.navigate('RegisterScreen');
        });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const backHandler = backPressHandle();
    return () => backHandler.remove();
  })

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmCode);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const result = await confirm.confirm(otp);
      console.log(result);
    } catch (error) {
      setOtpCheck(true);
      console.log('Invalid code.', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chatText}>Chat App</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.enterText}>
          {flag
            ? 'Enter mobile number and login'
            : 'We sent OTP code to verify your number'}
        </Text>
        <TextInput
          value={flag ? phoneNumber : otp}
          style={styles.enterSpace}
          placeholder={flag ? 'Enter Mobile No.' : 'Enter Otp'}
          onChangeText={flag ? serPhoneNumber : setOtp}
        />
        {otpCheck ? (
          <Text style={styles.otpErrorText}>*Please Enter Correct Otp</Text>
        ) : null}
      </View>
      <Pressable
        onPress={() => {
          if (flag) {
            setFlag(false);
            setOtpCheck(false);
            signInWithPhoneNumber(`+91${phoneNumber}`);
          } else {
            confirmCode();
          }
        }}
        style={styles.submitBtn}>
        <Text style={styles.submitText}>{flag ? 'Send Otp' : 'Submit'}</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  chatText: {
    fontSize: 40, 
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 40,
  },
  enterText: {
    textAlign: 'left', 
    width: '80%', 
    fontSize: 15, 
    fontWeight: '700'
  },
  enterSpace: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 3,
    fontSize: 20,
  },
  submitBtn: {
    backgroundColor: '#A4DC5D',
    width: '60%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  submitText: {
    fontSize: 23, 
    color: '#fff', 
    fontWeight: '600'
  },
  otpErrorText: {
    textAlign: 'left', 
    width: '80%', 
    color: 'red'
  },
});
