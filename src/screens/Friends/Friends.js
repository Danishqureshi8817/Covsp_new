import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
  
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-simple-toast';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BluetoothSerial from '@infobiotech/react-native-bluetooth-serial-next';
import {
  checkMultiple,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import styles from './style';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Loader from '../../components/Loader'
import Share from 'react-native-share';


const Friends = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [visibleQRCode, setVisibleQRCode] = useState(false);
  const [visibleQRScan, setVisibleQRScan] = useState(false);
  const [deviceStore, setDeviceStore] = useState([]);
  const [availableFriend, setAvailableFriend] = useState(null);
  const [refres, setRefres] = useState(false);
  const [clear, setClear] = useState(false);
  const [usersBle, setusersBle] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [reGt, setReGt] = useState(true)
  const [QRImage, setQRImage] = useState('')

  //Fetch added frinds

  useEffect(() => {
    userFetch()
   
  }, []);

  useEffect(() => {
    getFrinds();
   
  }, [refres]);



  //Headeer Icons
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
         
          {/* <TouchableOpacity onPress={() => {  }}><MaterialIcons name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} /></TouchableOpacity> */}

          <Menu>
            <MenuTrigger>
              <MaterialIcons
                name="dots-vertical"
                size={responsiveWidth(6)}
                color="#d7f3f4"
                style={{marginRight: responsiveWidth(3)}}
              />
            </MenuTrigger>

            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: responsiveWidth(2),
                  padding: responsiveWidth(2),
                  marginTop: window.width * 0.07,
                  width: window.width * 0.35,
                  backgroundColor: '#d7f3f4',
                },
                optionsWrapper: {},
                optionWrapper: {},
              }}>
              <MenuOption
                onSelect={() => navigation.navigate('Settings')}
                text="Settings"
              />
              <Divider />
              <MenuOption onSelect={() => {}}>
                <Text style={{}}>About</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      ),
    });
  }, []);

  //Fetch Login User Details
  const userFetch = async () => {
    try {
      const value = await AsyncStorage.getItem('userDetails');
      if (value !== null) {
        var dat = JSON.parse(value);
        await setUserInfo(dat);
        console.log('userData friend', userInfo);
      }
    } catch (e) {
      console.log('ERRRO AYNC login', e);
    }
  };

  const Divider = () => <View style={styles.divider} />;
  //Get Added frinds from AsyncStorage
  const getFrinds = async () => {
    let prvD = await AsyncStorage.getItem('Devices');
    let prvDs = JSON.parse(prvD);

    console.log('store prv Effect...', prvDs);

    await setAvailableFriend(prvDs);
  };

  //Remove All friends from AsyncStorage
  const clearFriends = async (CIndex) => {
    // await AsyncStorage.getItem('Devices');
     console.warn("CI",CIndex)
    const tempDv = availableFriend;
    
    const selectedDv = tempDv.filter((item,ind) => {
      return ind != CIndex
    })

    await setAvailableFriend(selectedDv);

    await AsyncStorage.setItem('Devices',JSON.stringify(selectedDv))

    // console.warn('delete');
    // let prvD = await AsyncStorage.getItem('Devices');
    // let prvDs = JSON.parse(prvD);

    // console.log('Delete prv Effect...', prvDs);

    // await setAvailableFriend(prvDs);


  };

  var devicess;

  //BlueTooth Service

  const bleSearch = async (frnd) => {
    console.log('bleSRCH');
await setReGt(true)
    await setusersBle([]);

    //it shows the popup to turn on the Bluetooth
    await BluetoothSerial.requestEnable();

    //it is show the popup to turn on the Location
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        console.log('Location ', data);
      })
      .catch(err => {
        //Error
      });

    

    console.log('Devices...scaning ');

    //it is  returning the unpaired device list

    devicess = await BluetoothSerial.discoverUnpairedDevices();

  

    // const adress = await devices?.length

    console.log('Devices....', devicess);

    console.log("Adapter-Name....",frnd)

    //In this step we Store the device list in the UseState Hook in a  Array Form
    for (i = 0; i < devicess.length; i++) {
      // &&devices[i]?.name==='covsp'

      if (devicess[i]?.name != null&&devicess[i]?.name==frnd ) {
        var name = [devicess[i]?.name, devicess[i]?.id];
          setReGt(false)

        addDevices(devicess[i]?.name, devicess[i]?.id)
        // console.log("Devidces ",i,devices[i]?.name)

        setusersBle(prevState => {
          return [...prevState, name];
        });

       
      }

    }
  

    //By this Stop the scaning
    await BluetoothSerial.cancelDiscovery();
  };

  console.log('userble..Friend', usersBle);


  //Floatinf Button Actions
  const actions = [

    {
      text: 'Display QR Code',
      icon: require('../../assets/images/qr.png'),
      name: 'qrcode',
      position: 1,
      color: '#0092bb',
    },
    {
      text: 'Scan QR Code',
      icon: require('../../assets/images/qrscanner.png'),
      name: 'scanqrcode',
      position: 2,
      color: '#0092bb',
    },
  ];


 
const  qrGenerate = async() => {
  let n
// await userFetch()



 const isEnabled = await BluetoothSerial.isEnabled();
 console.log("bluetooth status",isEnabled)

if(isEnabled){
  await BluetoothSerial.disable()
  
  Toast.show('Please Turn off bluetooth if not off');
}
else{
  await BluetoothSerial.requestEnable();
  n = await BluetoothSerial.setAdapterName(userInfo?.givenName)
  await setVisibleQRCode(true)
}


 await console.log("bleAdreess",n)



}

//Share QR Code 

const shareQR = () => {
  
  QRImage.toDataURL((data) => {

    const shareImageBase64 = {
       title:'QR',
       message: "Here is my QR code!",
       url:`data:image/jpeg;base64,${data}`
    };
     setQRImage(String(shareImageBase64.url));
     Share.open(shareImageBase64)
  })
}

const scanQRCode = async() => {
  await setusersBle([])

  setVisibleQRScan(true)


}



//


const onSuccess = async (e) => {

  await setLoadingStatus(true)
  

let n = e.data

  
  await bleSearch(n)

  await setLoadingStatus(false)

 
 

  Alert.alert(
       
    'QR Code read Successfuly',
     `Please click Close`,
    [
      {
        text: 'Close',
        onPress: ()=>{
           setVisibleQRScan(false)
        }
      },
  
      

    ],
       {
        cancelable:true,
        onDismiss: () => console.log("cancel alert setting")
       }

   )
   if(reGt){
  
    Toast.show('Please Try Again ,Regenerate your friend QRCode');
 
  }
   console.log("Scaner",e.data)

}






  // this function is checking previous friends available or not ,
  const prvAddDevc = async select => {

    let prvDevices = await AsyncStorage.getItem('Devices');
    let prvDv = JSON.parse(prvDevices);

    console.log('store prv devices...', prvDv);

    if (prvDv != null) {
      console.log('add device null');
      await setRefres(!refres);

      for (let val of prvDv) {
        console.log('array reasy', val);
        await deviceStore.push(val);
      }

      await deviceStore.push(select);

      await AsyncStorage.setItem('Devices', JSON.stringify(deviceStore));
    } else {
      deviceStore.push(select);
      await AsyncStorage.setItem('Devices', JSON.stringify(deviceStore));
      await setRefres(!refres);
    }
  };

  //by this devices add in friend list
  const addDevices = async (name, id) => {
   let date = await new Date();
   const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
     
     let dateH=  `${date.getDate()}/${weekday[date.getDay()]} - ${date.getHours()}:${date.getMinutes()}`
    
    
    await setDeviceStore([]);
    let select = [name, id,dateH];
 

    await prvAddDevc(select);

    let lt = await AsyncStorage.getItem('Devices');
    let ltt = await JSON.parse(lt);
    await console.log('addDevices.. Lttt', ltt);

    setVisible(false);
    Toast.show('Your Friend Add Successfully!');
  };

  // its show the added frind list
  const renderMain = props => {
    console.log('main scren frinds', props.index);
    return (
      <>
        <View
          style={{
            margin: responsiveWidth(1),
            borderWidth: responsiveWidth(0.2),
            paddingVertical: responsiveWidth(1.5),
            paddingHorizontal: responsiveWidth(20),
            borderColor: '#0092bb',
            borderRadius: responsiveWidth(2),
            paddingLeft: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: responsiveWidth(2),
              gap: responsiveWidth(2),
            }}>
            <Text
              style={{fontSize: responsiveFontSize(1.9), fontWeight: '500',color:'#000'}}>
              {props?.index + 1}.
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: responsiveFontSize(1.9),color:'#000'
              }}>
              {props?.item[0]}
            </Text>
            <Text style={{fontSize: responsiveFontSize(1.9),color:'#000'}}>
              {props?.item[1]}
            </Text>

            <Text style={{fontSize: responsiveFontSize(1.9)}}>
              {props?.item[2]}
            </Text>

            <MaterialIcons
              name="delete-forever"
              size={responsiveWidth(6)}
              color="#0092bb"
              style={{marginRight: responsiveWidth(2)}}
              onPress={()=>{clearFriends(props.index)}}
            />

          </View>
        </View>
      </>
    );
  };



  //when friends will  not available in friend list  so this empty component show

  const EmptyMain = () => {
    return (
      <>
        <View style={styles.textMainContainer}>
          <Text style={styles.textMain}>
            Mute alerts by whitelisting friends who you trust.{' '}
          </Text>
          <Text style={styles.textMain}>You have no whitelisted friends</Text>
        </View>
        <Image
          source={require('../../assets/images/friend.png')}
          style={styles.mainImg}
        />
      </>
    );
  };

  // Main UI
  return (
    <View style={{flex: 1, backgroundColor: '#d7f3f4'}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Loader loadingStatus = {loadingStatus} />
        {availableFriend != 0 ? (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: responsiveFontSize(2.1),
              fontWeight: '500',
            }}>
            Friend List 
          </Text>
        ) : (
          ''
        )}

        <FlatList
          data={availableFriend}
          renderItem={renderMain}
          ListEmptyComponent={EmptyMain}
          showsVerticalScrollIndicator={false}
        />

        <FloatingAction
          showBackground={false}
          actions={actions}
          position="right"
          color="#0092bb"
          onPressItem={async name => {
            if (name === 'Add') {
              console.log(`selected button: Add`);
              bleSearch();
            } else if (name === 'qrcode') {
                qrGenerate()
            }
            else if (name === 'scanqrcode') {
                scanQRCode()
            }
          }}
        />

   

                {/* Model QR Code */}
       <Modal transparent={true} visible={visibleQRCode}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              alignItems: 'center',
              // padding: responsiveWidth(10),
              justifyContent:'center'
            }}>
            <View
              style={{
                backgroundColor: '#d7f3f4',
                borderRadius: responsiveWidth(3),
                position: 'relative',
                // marginTop: window.height * 0.1,
              }}>
              <Icon
                name="close"
                size={responsiveWidth(6)}
                onPress={() => {
                  setVisibleQRCode(false);
                }}
                color="#000"
                style={{
                  marginRight: responsiveWidth(2),
                  position: 'absolute',
                  right: 0,
                }}
              />
           
              <View
                style={{
                  // padding: responsiveWidth(5),
                  // marginTop: responsiveWidth(1),
                  width: window.width * 0.9,
                  height: window.height * 0.3,
                  // alignSelf:'center'
                  justifyContent:'center',
                  alignItems:'center'
                }}>
               


                  <QRCode
                    value={userInfo?.givenName}
                     size={responsiveWidth(40)}

                  
                     getRef={(ref)=> setQRImage(ref)}
                    
                    />
              </View>
              
              <Text
                  style={[
                    styles.textMain,
                    
                  ]}>
               Your QR code is private. If you share it with
                </Text>
                <Text
                  style={[
                    styles.textMain,
                   
                  ]}>
              someone they can scan it with their Armor
                </Text>
                <Text
                  style={[
                    styles.textMain,
                
                   
                  ]}>
               camera to add you as a close friend
                </Text>
                <TouchableOpacity onPress={()=>{shareQR()}} style={{backgroundColor:'#0092bb',alignSelf:'center',paddingHorizontal:responsiveWidth(10),
                paddingVertical:responsiveWidth(2),borderRadius:responsiveWidth(1),marginVertical:responsiveWidth(3),flexDirection:'row',gap:responsiveWidth(3),alignItems:'center'}} >
                  <Text style={{color:'#ffffff',fontSize:responsiveFontSize(2.1)}} >Share</Text>
                  <Icon  name="share-social" size={responsiveWidth(6)}  color="#ffffff"  />
                  
                 </TouchableOpacity>



            </View>
          </View>
        </Modal>
        {/* Model QR Code*/}


                      {/* Model Scan QR Code */}
                      <Modal transparent={true} visible={visibleQRScan}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              alignItems: 'center',
              // padding: responsiveWidth(10),
              justifyContent:'center'
            }}>
            <View
              style={{
                backgroundColor: '#d7f3f4',
                borderRadius: responsiveWidth(3),
                position: 'relative',
                // marginTop: window.height * 0.1,
              }}>
              <Icon
                name="close"
                size={responsiveWidth(6)}
                onPress={() => {
                  setVisibleQRScan(false);
                }}
                color="#000"
                style={{
                  marginRight: responsiveWidth(2),
                  position: 'absolute',
                  right: 0,
                }}
              />
           
              <View
                style={{
                  // padding: responsiveWidth(5),
                  // marginTop: responsiveWidth(1),
                  width: window.width * 0.8,
                  height: window.height * 0.5,
                  // alignSelf:'center'
                  justifyContent:'center',
                  alignItems:'center',
                  overflow:'hidden'
                }}>

                   <Text
                  style={[
                    styles.textMain,
                    { marginBottom: responsiveWidth(2),textAlign:'center'},
                  ]}>
                Your Device ready to scanning
                </Text>
               
               <QRCodeScanner
        onRead={(e)=>onSuccess(e)}

        // flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
    
      />


                
              </View>
              

            </View>
          </View>
        </Modal>
        {/* Model Scan QR Code*/}

      </KeyboardAvoidingView>
    </View>
  );
};

export default Friends;

