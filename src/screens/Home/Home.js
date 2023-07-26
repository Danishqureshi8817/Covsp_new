import { KeyboardAvoidingView, SafeAreaView, StyleSheet, 
  Text, View,Image, TouchableOpacity,useWindowDimensions,Dimensions, ActivityIndicator,ToastAndroid, Platform } from 'react-native'
import React,{useEffect,useState,useLayoutEffect} from 'react'
import {  responsiveWidth, responsiveHeight, responsiveFontSize,} from 'react-native-responsive-dimensions';
import BleManager from 'react-native-ble-manager';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuOptions,MenuOption,MenuTrigger,MenuProvider} from 'react-native-popup-menu';
import { WINDOWS } from 'nativewind/dist/utils/selector';
import BluetoothSerial from '@infobiotech/react-native-bluetooth-serial-next'
import {checkMultiple, PERMISSIONS, request,openSettings} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { scanDevice} from '../../store/recoil'
import { useRecoilState } from 'recoil'

const Home = (props) => {
  const navigation = useNavigation();
  const window =useWindowDimensions()
  const [scan, setScan] = useState(true)
  const [usersBle, setusersBle] = useState([])
  const [scanDevices, setScanDevices] = useRecoilState(scanDevice);
  const Divider = () => <View style={styles.divider} />;

useEffect(() => {
  
  setTimeout(() => {
    console.log("opensetting")
    openSetting()
  }, 4000);


}, [])




//Headeer Icons
  useLayoutEffect(() => {


    navigation.setOptions({
    
      headerRight: () =>
      (

        <View style={{flexDirection:'row'}} >
       <TouchableOpacity onPress={() => { openSetting() }}><Icon  name="play-circle" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(2) }} /></TouchableOpacity> 
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

  

  // 0092bb tab bar color
  //d7f3f4 bg color

  var devices;
 //its a function that  contain bluetooth scaning functionality


 const openSetting =async()=>{
    //first-it is checking multiple permission,need for scanning

 await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.BLUETOOTH_SCAN]).then((statuses) => {
  console.log('Location ', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
  console.log('Scan ', statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]);

  console.log("android permission..",Platform.OS)

 

  if(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]!= 'granted' ){     
    ToastAndroid.show('Please allowed all permissions !', ToastAndroid.LONG);
 openSettings().catch(() => console.warn('cannot open settings'));}
  // if(statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] != 'granted')
  // {}

});
 }



 const Bluetooth =async () => {



    openSetting()



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

    await setScan(false)


  console.log("Devices...scaning ")

  //it is  returning the unpaired device list

 devices = await BluetoothSerial.listUnpaired()


// const newName =await BluetoothSerial.setAdapterName('Ble')
// const myDevice = await BluetoothSerial.setAdapterName


// const adress = await devices?.length

  console.log("Devices....",devices)

  // console.log("Adapter-Name....",newName)




//In this step we Store the device list in the UseState Hook in a  Array Form
  for (i=0;i<devices.length;i++){

    // &&devices[i]?.name==='covsp'

    if(devices[i]?.name!=null&&devices[i]?.name==='covsp'){    

       var name =[devices[i]?.name,devices[i]?.id]
       
    // console.log("Devidces ",i,devices[i]?.name)
  
   
    setusersBle(prevState => { return [...prevState,name]})
          }
     
       
  }


  // console.log("Devices....Size",adress)

    await setScan(true)

 

 //By this Stop the scaning
 await BluetoothSerial.cancelDiscovery();
}


// console.log("length",devices)

setScanDevices(usersBle)
console.log("setScanDevices..",scanDevices)
console.log("userble..",usersBle)


// var str = []
// for(let i=0;i<usersBle.length;i++){
//   str.push(JSON.stringify(usersBle[i]))
// }
 
// var filterDevice = []
// filterDevice = str.filter((val,i)=> str.indexOf(val)===i);
// console.log("filterDevices ",filterDevice)

// var finalList = []
// for(let i=0; i<filterDevice.length;i++){
//   finalList.push(JSON.parse(filterDevice[i]))
// }
// console.log("finalList ",finalList)


  return (
   <View style={styles.container}>
    <KeyboardAvoidingView behavior="padding">

    { scan ?  <Image source={require('../../assets/images/il_shieldanim_avatar_1.png')} style={styles.mainImg} /> :
        
    <Image source={require('../../assets/images/scaningGif.gif')} style={styles.mainImg} /> }

   
     {/* <Text> {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}</Text> */}

  <TouchableOpacity style={[styles.floatingButton,{right:scan?Dimensions.get('window').width*0.03:Dimensions.get('window').width*0.04,}]} onPress={()=>{Bluetooth()}} >
  {/* <Icon onPress={()=>{}} name="play-circle" size={responsiveWidth(17)} color="#0092bb"  /> */}
{ scan ? <Image source={require('../../assets/images/scanstart.png')} style={{width:responsiveWidth(18),height:responsiveHeight(10),resizeMode:'contain'}}/> :
<Image source={require('../../assets/images/scanstop.png')} style={{width:responsiveWidth(16),height:responsiveHeight(10),resizeMode:'contain'}}/>}
  </TouchableOpacity>

    </KeyboardAvoidingView>
   </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d7f3f4',
    // alignItems: 'center',
    position:'relative'

  },
  mainImg:{
    width:responsiveWidth(130),
    height:responsiveHeight(60),
    resizeMode:'contain',
    alignSelf:'center'
  },
  floatingButton:{ 
  
    marginRight: responsiveWidth(2),
    position:'absolute',
    // right:Dimensions.get('window').width*0.03,
    top:Dimensions.get('window').height*0.74,
  
  
    
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },

    
})