import { ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,useWindowDimensions,Image,Modal, FlatList,TouchableHighlight } from 'react-native'
import React,{useLayoutEffect,useState,useEffect} from 'react'
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

const [visible, setVisible] = useState(false)


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
      text: "Add Friend",
      icon: require("../../assets/images/add.png"),
      name: "Add",
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

const devices = [['danish',1258],['mummy',2589],['abhisehk',3692]]


  return (
    <View style={{flex:1,backgroundColor:'#d7f3f4'}}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">

    <View style={styles.textMainContainer}>

    <Text style={styles.textMain} >Mute alerts by whitelisting friends who you trust. </Text>
    <Text style={styles.textMain}>You have no whitelisted friends</Text>
    </View>
    <Image source={require('../../assets/images/friends.png')} style={styles.mainImg} />
   
    
    <Modal
    transparent={true}
    visible={visible}
    >
    <View style={{backgroundColor:'#000000aa',flex:1,alignItems:'center'}}>
     
    <View style={{backgroundColor:"#d7f3f4",borderRadius:responsiveWidth(3),position:'relative',marginTop:window.height*0.2}}>
    <Icon  name="close" size={responsiveWidth(6)} onPress={()=>{setVisible(false)}} color="#000" style={{ marginRight: responsiveWidth(2),position:'absolute',right:0 }} />
     <View style={{padding:responsiveWidth(5),marginTop:responsiveWidth(1),width:window.width*0.9}}>
    <Text style={[styles.textMain,{alignSelf:'center',marginBottom:responsiveWidth(2)}]} >Add Your Friend</Text>

     <FlatList
       data={devices}
        renderItem={(item)=>{
          console.log("Frind flatlist",item)
      return (   <>
        <TouchableHighlight style={{borderRadius:responsiveWidth(0.5),borderColor:'#000000aa'}} >
        <Text>{item.item[0]}</Text>
       </TouchableHighlight>
       </>)}}
        ListEmptyComponent={<Text>No Data found</Text>}
        showsVerticalScrollIndicator={false}

     />
       {/* <TouchableOpacity style={{borderRadius:responsiveWidth(0.5),borderColor:'#000000aa'}} >
        <Text>Denish Qureshi</Text>
       </TouchableOpacity> */}

      

    </View>

    </View>

    </View>
   

    </Modal>




    <FloatingAction
 showBackground={false}
    actions={actions}
    position='right'
    color='#0092bb'

    onPressItem={name => {
      if(name==='Add'){
        console.log(`selected button: Add`);
        setVisible(true)
      }
     
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