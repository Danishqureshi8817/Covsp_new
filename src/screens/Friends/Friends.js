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
  Alert
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
          <TouchableOpacity
            onPress={() => {
              clearFriends();
            }}>
            <MaterialIcons
              name="delete-forever"
              size={responsiveWidth(6)}
              color="#d7f3f4"
              style={{marginRight: responsiveWidth(2)}}
            />
          </TouchableOpacity>
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
  const clearFriends = async () => {
    await AsyncStorage.removeItem('Devices');

    console.warn('delete');
    let prvD = await AsyncStorage.getItem('Devices');
    let prvDs = JSON.parse(prvD);

    console.log('Delete prv Effect...', prvDs);

    await setAvailableFriend(prvDs);


  };

  var devicess;

  //BlueTooth Service

  const bleSearch = async (frnd) => {
    console.log('bleSRCH');

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

    // await setVisible(true);

    // await setScan(false)

    console.log('Devices...scaning ');

    //it is  returning the unpaired device list

    devicess = await BluetoothSerial.discoverUnpairedDevices();

    // const newName =await BluetoothSerial.setAdapterName('Ble')
    // const myDevice = await BluetoothSerial.setAdapterName

    // const adress = await devices?.length

    console.log('Devices....', devicess);

    console.log("Adapter-Name....",frnd)

    //In this step we Store the device list in the UseState Hook in a  Array Form
    for (i = 0; i < devicess.length; i++) {
      // &&devices[i]?.name==='covsp'

      if (devicess[i]?.name != null&&devicess[i]?.name==frnd ) {
        var name = [devicess[i]?.name, devicess[i]?.id];

        // console.log("Devidces ",i,devices[i]?.name)

        setusersBle(prevState => {
          return [...prevState, name];
        });
      }
    }

    // console.log("Devices....Size",adress)

    // await setScan(true)

    //By this Stop the scaning
    await BluetoothSerial.cancelDiscovery();
  };

  console.log('userble..Friend', usersBle);


  //Floatinf Button Actions
  const actions = [
    // {
    //   text: 'Add Friend',
    //   icon: require('../../assets/images/add.png'),
    //   name: 'Add',
    //   position: 3,
    //   color: '#0092bb',
    // },
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

const onBle = async() =>{
  await BluetoothSerial.requestEnable();
  // await setVisibleQRCode(true)
}


 const isEnabled = await BluetoothSerial.isEnabled();
 console.log("bluetooth status",isEnabled)

if(isEnabled){
  await BluetoothSerial.disable()
  await onBle()
 
}
else{
  await BluetoothSerial.requestEnable();
  n = await BluetoothSerial.setAdapterName(userInfo?.givenName)
  await setVisibleQRCode(true)
}


 await console.log("bleAdreess",n)



}

const scanQRCode = async() => {

  setVisibleQRScan(true)


}

const addBle = async ()=>{
// let dvs =[]
await console.log("size devicess",usersBle?.length)
var ss = usersBle?.length
if(ss>=1){
  for(var vl of usersBle){
   await console.log("Add Ble...",vl)
  // dvs=[...dvs,...vl]
  addDevices(vl[0],vl[1])
  }
  setVisibleQRScan(false)
  }else{
    Toast.show('Please Try Again');
    setVisibleQRScan(false) 
   }
  // console.log("Add Ble...dvS",dvs[0])
         
}


const onSuccess = async (e) => {

let n = e.data

  
  await bleSearch(n)

  Alert.alert(
       
    'QR Code read Successfuly',
    `Please click Close `,
    [
      {
        text: 'Close',
        onPress: ()=>{
           setVisibleQRScan(false)
        }
      },
      {
        text: 'Add',
        onPress: ()=>{
         
          addBle()
          
        }
      },
      

    ],
       {
        cancelable:true,
        onDismiss: () => console.log("cancel alert setting")
       }

   )
  
   console.log("Scaner",e.data)

}

console.log("bleAdreessII",userInfo)


  const devices = [
    ['danish', 1258],
    ['mummy', 2589],
    ['abhisehk', 3692],
    ['papa', 7412],
  ];

  // this function is checking previous friends available or not ,
  const prvAddDevc = async select => {
    // let demo =[['danish',1258],['mummy',2589],['abhisehk',3692]]
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
    await setDeviceStore([]);
    let select = [name, id];

    await prvAddDevc(select);

    let lt = await AsyncStorage.getItem('Devices');
    let ltt = await JSON.parse(lt);
    await console.log('addDevices.. Lttt', ltt);

    setVisible(false);
    Toast.show('Your Friend Add Successfully!');
  };

  // its show the added frind list
  const renderMain = props => {
    console.log('main scren frinds', props.item);
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
              style={{fontSize: responsiveFontSize(1.9), fontWeight: '500'}}>
              {props?.index + 1}.
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: responsiveFontSize(1.9),
              }}>
              {props?.item[0]}
            </Text>
            <Text style={{fontSize: responsiveFontSize(1.9)}}>
              {props?.item[1]}
            </Text>
          </View>
        </View>
      </>
    );
  };

  //its show the  available frinds around
  const renderItem = props => {
    return (
      <Item
        item={props.item[0]}
        id={props.item[1]}
        num={props.index}
        onPress={() => {
          addDevices(props.item[0], props.item[1]);
        }}
      />
    );
  };

  //this component has called in renderitem
  const Item = ({item, onPress, num, id}) => {
    // console.log("flatlist item",)

    return (
      <>
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: responsiveWidth(2),
            borderWidth: 1,
            marginBottom: responsiveWidth(2),
            borderColor: '#0092bb',
            borderRadius: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '500', textTransform: 'capitalize'}}>
            {item}
          </Text>
          <Text style={{fontWeight: '500', textTransform: 'capitalize'}}>
            {id}
          </Text>
          <Text style={styles.textMain}>Click To Add</Text>
        </TouchableOpacity>
      </>
    );
  };

  // when will devices not available around so this empty component show
  const EmptyText = () => {
    return (
      <View style={{flex: 1, gap: responsiveWidth(2)}}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.1),
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          No Devices Available
        </Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2.1),
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Please Wait
        </Text>

        <ActivityIndicator size="large" color={'#0092bb'} />
      </View>
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
          source={require('../../assets/images/friends.png')}
          style={styles.mainImg}
        />
      </>
    );
  };

  // Main UI
  return (
    <View style={{flex: 1, backgroundColor: '#d7f3f4'}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {availableFriend !== null ? (
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

        {/* Model */}
        <Modal transparent={true} visible={visible}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              alignItems: 'center',
              padding: responsiveWidth(10),
            }}>
            <View
              style={{
                backgroundColor: '#d7f3f4',
                borderRadius: responsiveWidth(3),
                position: 'relative',
                marginTop: window.height * 0.1,
              }}>
              <Icon
                name="close"
                size={responsiveWidth(6)}
                onPress={() => {
                  setVisible(false);
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
                  padding: responsiveWidth(5),
                  marginTop: responsiveWidth(1),
                  width: window.width * 0.9,
                  height: window.height * 0.6,
                }}>
                <Text
                  style={[
                    styles.textMain,
                    {alignSelf: 'center', marginBottom: responsiveWidth(2)},
                  ]}>
                  Add Your Friend
                </Text>

                <FlatList
                  data={usersBle}
                  renderItem={renderItem}
                  ListEmptyComponent={EmptyText}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* Model */}

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
              someone they can scan it with their Covsp
                </Text>
                <Text
                  style={[
                    styles.textMain,
                    { marginBottom:responsiveWidth(5)},
                   
                  ]}>
               camera to add you as a close friend
                </Text>



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
                  width: window.width * 0.9,
                  height: window.height * 0.3,
                  // alignSelf:'center'
                  justifyContent:'center',
                  alignItems:'center'
                }}>

<Text
                  style={[
                    styles.textMain,
                    { marginBottom: responsiveWidth(2)},
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

