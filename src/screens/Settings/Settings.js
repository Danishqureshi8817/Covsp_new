import { StyleSheet, Text, View,TouchableHighlight,Switch,Alert,Platform} from 'react-native'
import React,{useState,useEffect} from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BluetoothSerial, { device } from '@infobiotech/react-native-bluetooth-serial-next'

import { onboardingState,loginState } from '../../store/recoil'
import { useRecoilState } from 'recoil'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import DeviceInfo from 'react-native-device-info';




const Settings = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [userInfo, setUserInfo] = useState(null)

  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  const navigation = useNavigation();
 

  //Fetch Login User Details
  const userFetch = async ()=>{
 

    try {
      const value = await AsyncStorage.getItem('userDetails');
      if (value !== null) {
         var dat = JSON.parse(value)
        await setUserInfo(dat)
        console.log("userData Setting",userInfo)
      }
    } catch (e) {
     console.log("ERRRO AYNC login",e)
    }
  }


useEffect( () => {
  //use to fetch user details
  userFetch()
}, [])

   

  const Divider = () => <View style={styles.divider} />;

//Marked Infected 
  const makeInfected = async() =>{
       

    const newName =await BluetoothSerial.setAdapterName('covsp')
      await setLoginStatus(false)
      await BluetoothSerial.enable()
      await console.log("NEw Device name",newName)
    
  }


//Delete Account function
  const deleteAccount = () =>{

    const signOut = async() =>{
      try {
        await AsyncStorage.removeItem('userDetails');
        Toast.show('Account Delete successfully');
        await setLoginStatus(false)
        await navigation.navigate('Login')
      } catch (error) {
         //error
      }

    }
    
    Alert.alert(
       
      'You want to delete your account',
      'Please click delete',
      [
        {
          text: 'Cancel',
          onPress: ()=>{
             console.log("Cancel Delete")
          }
        },
        {
          text: 'Delete',
          onPress: ()=>{
       
          signOut()
            
          }
        },
        
  
      ],
         {
          cancelable:true,
          onDismiss: () => console.log("cancel alert setting")
         }
  
     )

  }


  //By this will  open a popup, for slecting infected or not
  const markInfect = () =>{
   Alert.alert(
       
    'I conform that i have been officially',
    'Diagnosed with COVID-19',
    [
      {
        text: 'Uninfected',
        onPress: async()=>{
          const newNameChnge =await BluetoothSerial.setAdapterName(userInfo?.name)
          await BluetoothSerial.disable()
         await console.log("Cancel",newNameChnge)
        }
      },
      {
        text: 'Confirm',
        onPress: async()=>{
         await makeInfected()
          console.log("Conform")
          
        }
      },
      

    ],
    {
     cancelable:true,
     onDismiss: () => console.log("cancel alert infected")
    }

   )
  }

   

//Main UI

  return (


    <View style={styles.mainContainer}>
       <View style={styles.accountContainer}>
        <Text style={styles.accountText} >ACCOUNT</Text>

        <View>
          <Text style={styles.user}>Username</Text>
          <Text style={styles.username}>{userInfo?.name}</Text>
        </View>

        <TouchableHighlight onPress={()=>{markInfect()}} underlayColor="#ecf0f1">
          <Text style={styles.covid} >Mark as COVID-19 Infected</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>{deleteAccount()}} underlayColor="#ecf0f1">
          <Text style={styles.deleteAcc} >Deleted My Account</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>{BluetoothSerial.requestEnable()}} underlayColor="#ecf0f1">
        <View>
          <Text style={styles.user}>Device Enable</Text>
          <Text style={styles.username}>For visible</Text>
        </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>{
          BluetoothSerial.disable()
          Toast.show('Please Turn off bluetooth if not off');
          
        }} underlayColor="#ecf0f1">
        <View>
          <Text style={styles.user}>Device Disable</Text>
          
        </View>
        </TouchableHighlight>
       </View>

       <Divider/>
{/* //Alert */}
       <View style={styles.alertContainer}>
        <Text style={styles.accountText} >ALERTS</Text>

        <View style={styles.switchContainer} >
        
          <Text style={styles.switchText}>Enable Alert Notification</Text>
          
          <Switch 
              trackColor={{false: '#767577', true: '#d7f3f4'}}
        thumbColor={isEnabled ? '#0092bb' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
          />

        </View>

     
       </View>

       <Divider/>

       <View style={styles.alertContainer}>
        <Text style={styles.accountText} >HELP</Text>


        <View>
          <Text style={styles.user}>Send Feedback</Text>
          <Text style={styles.username}>Report technical issues or suggest new furtures</Text>
        </View>
     
       </View>

       <Divider/>
  
    </View>
  )
}

export default Settings

