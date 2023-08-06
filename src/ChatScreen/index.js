import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Navbar from './Component/Navbar';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/auth';

const ChatScreen = ({navigation, route}) => {
  const [chats, setChats] = useState([]);
  let currUser = firebase.auth().currentUser;
  const [message, setMessage] = useState('');
  const groupData = route.params;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    database()
      .ref(`/users/${currUser.uid}/name`)
      .once('value')
      .then(snapshot => setUserName(snapshot.val()));
    database()
      .ref(`/groups/${groupData.groupid}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        data?.chats
          ? setChats(Object.values(data?.chats).sort((a, b) => b.time - a.time))
          : null;
      });
  }, []);

  const dateFormat = timestamp => {
    const date = new Date(parseInt(timestamp));
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
      date,
    );
    return formattedDate;
  };

  const renderChat = ({item}) => {
    if (item?.senderId == currUser?.uid) {
      return (
        <View style={styles.sendMsgConatainer}>
          <Text style={styles.msgText}>{item?.message}</Text>
          <Text>{item?.time ? dateFormat(item?.time) : null}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.msgreceiveContainer}>
          <Text>{item.senderName}</Text>
          <Text style={styles.msgReceiveText}>{item.message}</Text>
          <Text style={styles.timeText}>
            {item?.time ? dateFormat(item?.time) : null}
          </Text>
        </View>
      );
    }
  };

  const sendMessage = () => {
    if (message)
      database()
        .ref(`/groups/${groupData.groupid}/chats/${uuid.v1()}`)
        .set({
          userid: currUser.uid,
          senderName: userName,
          message: message,
          time: Date.now(),
          senderId: currUser.uid,
        })
        .then(() => {
          console.log('Message sent successfully');
          setMessage('');
        });
  };

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} group_name={groupData.groupName} />
      <FlatList
        data={chats}
        keyExtractor={item => item.time}
        renderItem={renderChat}
        contentContainerStyle={{flexDirection: 'column-reverse'}}
      />
      <View style={styles.sendContainer}>
        <TextInput
          placeholder="Enter Your Message"
          value={message}
          onChangeText={setMessage}
          style={styles.textInput}
        />
        <Pressable onPress={() => sendMessage()} style={styles.sendBtn}>
          <Image
            source={require('../utils/drawables/send.png')}
            style={styles.sendImg}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {height: '100%'},
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 5,
  },
  textInput: {
    borderWidth: 1,
    width: '83%',
    marginHorizontal: 5,
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 17,
  },
  sendBtn: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4DC5D',
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  sendImg: {height: 20, width: 20},
  sendMsgConatainer: {
    alignItems: 'flex-end',
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  msgText: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: '#A4DC5D',
    marginTop: 10,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#000',
    padding: 7,
    borderRadius: 10,
  },
  msgreceiveContainer: {
    alignItems: 'flex-start',
    marginLeft: 10,
    maxWidth: '70%',
  },
  msgReceiveText: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: '#ECE5C7',
    borderWidth: 1,
    borderColor: '#000',
    padding: 7,
    borderRadius: 10,
    marginBottom: 1,
  },
  timeText: {
    marginBottom: 10, 
    textAlign: 'right'
  },
});
