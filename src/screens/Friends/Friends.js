import { ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,useWindowDimensions,Image,Modal, FlatList,ActivityIndicator } from 'react-native'
import React,{useLayoutEffect,useState,useEffect} from 'react'
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { Menu,MenuOptions,MenuOption,MenuTrigger,MenuProvider} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BluetoothSerial from '@infobiotech/react-native-bluetooth-serial-next'
import {checkMultiple, PERMISSIONS, request,openSettings} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Friends = () => {

  const navigation = useNavigation();
 const window =useWindowDimensions()

const [visible, setVisible] = useState(false)
const [deviceStore, setDeviceStore] = useState([])
const [availableFriend, setAvailableFriend] = useState(null)
const [refres, setRefres] = useState(false)
const [clear, setClear] = useState(false)
const [usersBle, setusersBle] = useState([])
const [userInfo, setUserInfo] = useState(null)

  //Fetch Login User Details
  const userFetch = async ()=>{
    try {
      const value = await AsyncStorage.getItem('userDetails');
      if (value !== null) {
         var dat = JSON.parse(value)
        await setUserInfo(dat)
        console.log("userData friend",userInfo)
      }
    } catch (e) {
     console.log("ERRRO AYNC login",e)
    }
  }




  const Divider = () => <View style={styles.divider} />;

const getFrinds = async() =>{
  let prvD=await AsyncStorage.getItem('Devices')
  let prvDs = JSON.parse(prvD)

  console.log("store prv Effect...",prvDs)

  await setAvailableFriend(prvDs)

}

const clearFriends = async()=>{
  await AsyncStorage.removeItem('Devices')
           
  console.warn("delete")
  let prvD=await AsyncStorage.getItem('Devices')
  let prvDs = JSON.parse(prvD)

  console.log("Delete prv Effect...",prvDs)

  await setAvailableFriend(prvDs)

}
var devicess;

const bleSearch = async()=>{
 
  console.log("bleSRCH")

  await setusersBle([])

  //it shows the popup to turn on the Bluetooth
    await BluetoothSerial.requestEnable();
  
     //it is show the popup to turn on the Location
     await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
             console.log("Location ",data)
      })
      .catch((err) => {
       //Error
      });
  
      await setVisible(true)

      // await setScan(false)
  
  
    console.log("Devices...scaning ")
  
    //it is  returning the unpaired device list
  
   devicess = await BluetoothSerial.listUnpaired()
  
  
  // const newName =await BluetoothSerial.setAdapterName('Ble')
  // const myDevice = await BluetoothSerial.setAdapterName
  
  
  // const adress = await devices?.length
  
    console.log("Devices....",devices)
  
    // console.log("Adapter-Name....",newName)
  
  
  
  
  //In this step we Store the device list in the UseState Hook in a  Array Form
    for (i=0;i<devicess.length;i++){
  
      // &&devices[i]?.name==='covsp'
  
      if(devicess[i]?.name!=null){    
  
         var name =[devicess[i]?.name,devicess[i]?.id]
         
      // console.log("Devidces ",i,devices[i]?.name)
    
     
      setusersBle(prevState => { return [...prevState,name]})
            }
       
         
    }
  
  
    // console.log("Devices....Size",adress)
  
      // await setScan(true)
  
   
  
   //By this Stop the scaning
   await BluetoothSerial.cancelDiscovery();


}

console.log("userble..Friend",usersBle)


  useEffect(() => {
    getFrinds()
   
  }, [refres]);

  //Headeer Icons
    useLayoutEffect(() => {
  
  
      navigation.setOptions({
      
        headerRight: () =>
        (
  
          <View style={{flexDirection:'row'}} >
         <TouchableOpacity onPress={() => {
      
          clearFriends()
           }}><MaterialIcons  name="delete-forever" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(2) }} /></TouchableOpacity> 
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
      text: "Request To Add",
      icon: require("../../assets/images/qrscanner.png"),
      name: "Request",
      position: 2,
      color:'#0092bb'
    },
  
  ];

const devices = [['danish',1258],['mummy',2589],['abhisehk',3692],['papa',7412]]

const prvAddDevc = async(select) =>{
  // let demo =[['danish',1258],['mummy',2589],['abhisehk',3692]]
  let prvDevices=await AsyncStorage.getItem('Devices')
  let prvDv = JSON.parse(prvDevices)

  console.log("store prv devices...",prvDv)

  if(prvDv!= null){
      console.log('add device null')
      await setRefres(!refres)

      for(let val of prvDv){
        console.log("array reasy",val)
      await deviceStore.push(val)
    
      }

      await deviceStore.push(select)

    await AsyncStorage.setItem('Devices',JSON.stringify(deviceStore))
  }
  else{
    
    deviceStore.push(select)
    await AsyncStorage.setItem('Devices',JSON.stringify(deviceStore))
    await setRefres(!refres)
  }


}


const addDevices = async(name,id) =>{

  await setDeviceStore([])
  let select =[name,id]

  await prvAddDevc(select)
 


  let lt=await AsyncStorage.getItem('Devices')
  let ltt = await JSON.parse(lt)
  await console.log('addDevices.. Lttt',ltt)

  setVisible(false)
  



}

const renderMain = (props) => {

console.log("main scren frinds",props.item)
  return (
    <>

    <View style={{margin:responsiveWidth(1),borderWidth:responsiveWidth(0.2),paddingVertical:responsiveWidth(1.5),paddingHorizontal:responsiveWidth(20),borderColor:'#0092bb',borderRadius:responsiveWidth(2),paddingLeft:0}}>
        
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',paddingLeft:responsiveWidth(2),gap:responsiveWidth(2)}} >
        <Text style={{fontSize:responsiveFontSize(1.9),fontWeight:'500'}}>{(props?.index)+1}.</Text>
        <Text style={{textTransform:'capitalize',fontSize:responsiveFontSize(1.9),}}>{props?.item[0]}</Text>
        <Text style={{fontSize:responsiveFontSize(1.9),}}>{props?.item[1]}</Text>
        </View>
      
    </View>

    </>
    

  );
};

const renderItem = (props) => {


  return (
    <Item
      item={props.item[0]}
      id={props.item[1]}
      num={props.index}
      onPress={() => {
  
        addDevices(props.item[0],props.item[1])
        
     
        }}
    
     
    />
  );
};

const Item = ({item, onPress,num,id}) => {
  
  // console.log("flatlist item",)
  
  return (
    <>
  
    <TouchableOpacity onPress={onPress} style={{padding:responsiveWidth(2),borderWidth:1,marginBottom:responsiveWidth(2),borderColor:'#0092bb',borderRadius:responsiveWidth(2),flexDirection:'row',justifyContent:'space-between'}} >
    <Text style={{fontWeight:'500',textTransform:'capitalize'}} >{item}</Text>
    <Text style={{fontWeight:'500',textTransform:'capitalize'}} >{id}</Text>
    <Text style={styles.textMain}>Click To Add</Text>

    </TouchableOpacity>
   
 
   </>
);


}

const EmptyText = () =>{
  return (
    <View style={{flex:1,gap:responsiveWidth(2)}} >
      <Text style={{fontSize:responsiveFontSize(2.1),fontWeight:'bold',alignSelf:'center'}} >No Devices Available</Text>
      <Text style={{fontSize:responsiveFontSize(2.1),fontWeight:'bold',alignSelf:'center'}} >Please Wait</Text>

      <ActivityIndicator size='large' color={'#0092bb'} />
      
    </View>
  )
}

const EmptyMain = () =>{
  return (
    <>
    <View style={styles.textMainContainer}>

    <Text style={styles.textMain} >Mute alerts by whitelisting friends who you trust. </Text>
    <Text style={styles.textMain}>You have no whitelisted friends</Text>
    </View>
    <Image source={require('../../assets/images/friends.png')} style={styles.mainImg} />
    </>
  )
}




  return (
    <View style={{flex:1,backgroundColor:'#d7f3f4'}}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">

 { availableFriend!==null ?  <Text style={{alignSelf:'center',fontSize:responsiveFontSize(2.1),fontWeight:'500'}} >Friend List</Text> : ''}
   
    <FlatList
     data={availableFriend}
        renderItem={renderMain}
        ListEmptyComponent={EmptyMain}
        showsVerticalScrollIndicator={false}

     />
 




    <FloatingAction
 showBackground={false}
    actions={actions}
    position='right'
    color='#0092bb'

    onPressItem={ async(name )=> {
      if(name==='Add'){
        console.log(`selected button: Add`);
        bleSearch()
        
     
      }
      else if(name==='Request'){

      }
     
    }}
  />

  
  {/* Model */}
<Modal
    transparent={true}
    visible={visible}
   
    >
    <View style={{backgroundColor:'#000000aa',flex:1,alignItems:'center',padding:responsiveWidth(10),}}>
     
    <View style={{backgroundColor:"#d7f3f4",borderRadius:responsiveWidth(3),position:'relative',marginTop:window.height*0.1,}}>
    <Icon  name="close" size={responsiveWidth(6)} onPress={()=>{setVisible(false)}} color="#000" style={{ marginRight: responsiveWidth(2),position:'absolute',right:0 }} />
     <View style={{padding:responsiveWidth(5),marginTop:responsiveWidth(1),width:window.width*0.9,height:window.height*0.6}}>
    <Text style={[styles.textMain,{alignSelf:'center',marginBottom:responsiveWidth(2)}]} >Add Your Friend</Text>

     <FlatList
     data={usersBle}
        renderItem={renderItem}
        ListEmptyComponent={EmptyText}
        showsVerticalScrollIndicator={false}

     />
       {/* <TouchableOpacity style={{borderRadius:responsiveWidth(0.5),borderColor:'#000000aa'}} >
        <Text>Denish Qureshi</Text>
       </TouchableOpacity> */}

      

    </View>

    </View>

    </View>
   

    </Modal>
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

    // alignSelf: 'center',
    // alignItems: 'center',
    gap:responsiveWidth(5)
    // justifyContent: 'center',
  },
  mainImg:{
    width:responsiveWidth(110),
    height:responsiveHeight(60),
    resizeMode:'contain',
    alignSelf:'center'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
  textMainContainer:{
   
  //  alignItems:'center', 
   marginTop:responsiveWidth(3)

  },
  textMain:{
    color:'#0092bb',
    fontSize:responsiveFontSize(1.9),
    alignSelf:'center'
  }
    
})