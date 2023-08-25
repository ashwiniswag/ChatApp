import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image, Pressable, StyleSheet, Modal, BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import { backPressHandle } from '../utils/Common/commonFunction';

const GroupScreen = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={styles.chatBtn}
        onPress={() => {
          navigation.navigate('ChatScreen', item);
        }}>
        <Image
          style={styles.groupImage}
          source={require('../utils/drawables/group.png')}
        />
        <View style={styles.groupContainer}>
          <Text style={styles.groupText}>{item.groupName}</Text>
          {/* <Text style={{fontSize: 14}} >Last message</Text> */}
        </View>
      </Pressable>
    );
  };

  const logout = () => {
    try {
      auth()
        .signOut()
        .then(() => {
          console.log('Successfully Sign out');
          navigation.pop();
        });
    } catch (err) {
      console.log('Error', err);
    }
  };

  const getGroupData = () => {
    database()
      .ref(`/users/${firebase.auth().currentUser.uid}/groups`)
      .on('value', snapshot => {
        snapshot.val() ? setGroups(Object.values(snapshot.val())) : null;
      });
  }

  useEffect(() => {
    getGroupData();
    const backHandler = backPressHandle();
    
    return () => backHandler.remove();

  }, []);

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{width: '70%', height: '20%', borderWidth: 1, backgroundColor: '#fff', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-evenly', marginTop: 300, borderRadius: 10}} >
          <Text style={{fontSize: 18, fontWeight: '600'}} >Do you really want to log out?</Text>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}} >
            <Pressable style={{backgroundColor: '#A4DC5D', borderRadius: 10}} onPress={() => logout()} >
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '600', marginVertical: 5, marginHorizontal: 8}} >Yes</Text>
            </Pressable>
            <Pressable style={{backgroundColor: '#A4DC5D', borderRadius: 10}} onPress={() => setModalVisible(!modalVisible)} ><Text style={{color: '#fff', fontSize: 18, fontWeight: '600', marginVertical: 5, marginHorizontal: 8}} >No</Text></Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.navigationContainer}>
        <Text style={styles.navText}>Groups</Text>
        <Pressable style={styles.logOutBtn} onPress={() => setModalVisible(true)}>
          <Image
            source={require('../utils/drawables/logout.png')}
            style={styles.logOutImage}
          />
        </Pressable>
      </View>
      {groups.length == 0 ? <Text style={{width: '100%', textAlign: 'center', fontSize: 18, alignSelf: 'center', marginTop: 100}} >
          Not a part of any group?{`\n Create New Group`}
        </Text> : <FlatList
        data={groups}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />}
      <Pressable
        onPress={() => navigation.navigate('NewGroupSCreen')}
        style={styles.newGroupBtn}>
        <Image
          source={require('../utils/drawables/plus.png')}
          style={styles.newGroupImg}
        />
      </Pressable>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    height: '100%'
  },
  navigationContainer: {
    backgroundColor: '#A4DC5D',
    paddingVertical: 10,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
  },
  logOutBtn: {
    position: 'absolute', 
    right: 20
  },
  logOutImage: {height: 30, width: 30},
  newGroupBtn: {
    bottom: 40, 
    right: 40, 
    position: 'absolute'
  },
  newGroupImg: {height: 60, width: 60},
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  groupImage: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 40,
    padding: 20,
  },
  groupContainer: {marginLeft: 15},
  groupText: {
    fontSize: 18, 
    fontWeight: '700'
  },
});
