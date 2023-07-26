import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import{Text,StyleSheet, View} from 'react-native'
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';

export default function HeaderIcon(props) {

    console.log("icon",props)

 return(   <View style={{flexDirection:'row'}} >
    <Icon onPress={() => { }} name="play-circle" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(2) }} />
    <MaterialIcons onPress={() => { }} name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} />
    </View>)

}