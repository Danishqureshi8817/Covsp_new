import { ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,useWindowDimensions,Image } from 'react-native'
import React,{useLayoutEffect} from 'react'
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';

const Friends = () => {

  const navigation = useNavigation();
 const window =useWindowDimensions()
  const Divider = () => <View style={styles.divider} />;

  //Headeer Icons
    useLayoutEffect(() => {
  
  
      navigation.setOptions({
      
        headerRight: () =>
        (
  
          <View style={{flexDirection:'row'}} >
         <TouchableOpacity onPress={() => {  }}><Icon  name="play-circle" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(2) }} /></TouchableOpacity> 
         {/* <TouchableOpacity onPress={() => {  }}><MaterialIcons name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} /></TouchableOpacity> */}
          
         <Menu  >
      <MenuTrigger>
      <MaterialIcons name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} />
      </MenuTrigger>
      
      <MenuOptions customStyles={{
           optionsContainer: {
             borderRadius: responsiveWidth(2),
             padding:responsiveWidth(2),
             marginTop:window.width*0.07,
            width:window.width*0.35,
            backgroundColor:'#d7f3f4',
             
            
           },
          optionsWrapper:{
            
          },
          optionWrapper:{
           
          }
          

         }} >
        <MenuOption onSelect={() => navigation.navigate('Settings')} text='Settings' />
        <Divider />
        <MenuOption onSelect={() => {}} >
          <Text style={{}}>About</Text>
        </MenuOption>
     
      </MenuOptions>
    </Menu>
          </View>
  
        ),
  
  
  
      });
    }, []);

  const actions = [
    {
      text: "Display QR Code",
      icon: require("../../assets/images/qrcode.png"),
      name: "qr_code",
      position: 1,
      color:'#0092bb'
    },
    {
      text: "Scan QR Code",
      icon: require("../../assets/images/qrscanner.png"),
      name: "qr_scanner",
      position: 2,
      color:'#0092bb'
    },
  
  ];




  return (
    <View style={{flex:1,backgroundColor:'#d7f3f4'}}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">

    <View style={styles.textMainContainer}>

    <Text style={styles.textMain} >Mute alerts by whitelisting friends who you trust. </Text>
    <Text style={styles.textMain}>You have no whitelisted friends</Text>
    </View>
    <Image source={require('../../assets/images/friends.png')} style={styles.mainImg} />

    <FloatingAction
 showBackground={false}
    actions={actions}
    position='right'
    color='#0092bb'

    onPressItem={name => {
      console.log(`selected button: ${name}`);
    }}
  />

  
  

    </KeyboardAvoidingView>
   </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',

    alignSelf: 'center',
    alignItems: 'center',
    gap:responsiveWidth(5)
    // justifyContent: 'center',
  },
  mainImg:{
    width:responsiveWidth(130),
    height:responsiveHeight(60),
    resizeMode:'contain',
    alignSelf:'center'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
  textMainContainer:{
   
   alignItems:'center', 
   marginTop:responsiveWidth(3)

  },
  textMain:{
    color:'#0092bb',
    fontSize:responsiveFontSize(1.9)
  }
    
})