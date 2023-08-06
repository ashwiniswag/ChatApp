import React, {useState} from 'react';
import { Pressable, Text, Image, StyleSheet} from 'react-native';

const Element = ({item,setGroupMember,groupMember}) => {

    const [flag,setFlag] = useState(true);

    return (
        <Pressable 
             style={[styles.container,{backgroundColor: !flag ? '#f2f2f2' : null}]} 
             onPress={() => {
                if(flag){
                    setGroupMember([...groupMember,item]);
                    setFlag(false);
                }
                else{
                    setFlag(true);
                    setGroupMember(groupMember.filter(users => users.id !== item.id));
                }
             }} >
                <Image 
                    source={require('../../utils/drawables/group.png')}
                    style={styles.image} />
                <Text style={styles.text} >{item.name}</Text>
            </Pressable>
        );
}

export default Element;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 0.5,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    image: {height: 40, width: 40, borderWidth: 1, borderColor: '#000', borderRadius: 40, padding: 5},
    text: {fontSize: 18, fontWeight: '700',marginLeft: 15}
});