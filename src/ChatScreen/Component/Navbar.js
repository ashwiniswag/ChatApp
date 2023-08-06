import React from "react";
import { Image, Text, View, Pressable } from "react-native";

const Navbar = ({navigation, group_name}) => {
    return <View style={{backgroundColor: '#A4DC5D', flexDirection: 'row', alignItems: 'center'}} >
        <Pressable
            onPress={() => {
                console.log('Pressed')
                navigation.pop()}}>
            <Image 
            style={{ height: 25, width: 25, marginHorizontal: 10}}
            source={require('../../utils/drawables/back.png')}  />
        </Pressable>
        
        <Text style={{backgroundColor: '#A4DC5D', color: '#fff', fontSize: 25, fontWeight: '600', textAlign: 'center', paddingVertical: 10}} >{group_name}</Text>
    </View>
}

export default Navbar;