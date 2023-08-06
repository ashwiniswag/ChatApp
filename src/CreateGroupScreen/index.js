import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import Element from './Component/Elements';
import uuid from 'react-native-uuid'; 

const NewGroup = ({navigation}) => {

    const [data,setData] = useState([{_id: 1, displayName: 'Ashwini'},{_id: 2, displayName: 'dsgha'},{_id: 3, displayName: 'thgbvc'},{_id: 4, displayName: 'gfbbsd'},{_id: 5, displayName: 'jmghnfbf'}])
    const curuser = firebase.auth().currentUser;
    const [groupName,setGroupName] = useState('');
    const [groupMember,setGroupMember] = useState([]);

    useEffect(() => {
        database().ref('/users').once('value').then(snapshot => {
            const users = Object.values(snapshot.val()).filter(user => user.id !== curuser.uid);
            setData(users);
        })
    },[])

    const renderItem = ({item}) => {

        return (
            <Element item={item} setGroupMember={setGroupMember} groupMember={groupMember} />
        );
    }

    const createGroup = () => {
        if(groupName.length !== 0 && groupMember.length > 0){
            const groupid = uuid.v1();
            groupMember.forEach(user => {
                database().ref(`/users/${user.id}/groups/${groupid}`).set({
                    groupid: groupid,
                    groupName: groupName
                }).then(() => console.log("Set",user.name))
            })

            database().ref(`/users/${curuser.uid}/groups/${groupid}`).set({
                groupid: groupid,
                groupName: groupName
            }).then(() => console.log("Set",curuser.displayName));

            database().ref(`/groups/${groupid}`).set({
                groupid: groupid,
                admin: curuser.uid,
                groupMember: groupMember,
                groupName: groupName
            }).then(() => console.log('Group Created'));
            navigation.pop();
        }

    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Enter Group Name' style={styles.groupName} value={groupName} onChangeText={setGroupName} />
            <FlatList 
                keyExtractor={item => item.id}
                data={data}
                renderItem={renderItem}
            />
            <Pressable 
                onPress={() => {
                    createGroup();
                }}
                style={styles.createGroupBtn}
            >
                <Image source={require('../utils/drawables/check.png')} style={styles.createGroupImg} />
            </Pressable>
        </View>
    );
}

export default NewGroup;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', 
        height: '100%'
    },
    groupName: {
        fontSize: 20
    },
    createGroupBtn: {
        bottom: 40, 
        right: 40, 
        position: 'absolute'
    },
    createGroupImg: {
        height: 60, 
        width: 60
    }
});