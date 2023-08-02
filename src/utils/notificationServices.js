import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS); //show allow notifucation dialog

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async() => {
       
        let fcmToken = await AsyncStorage.getItem('fcmToken')
        console.log("The Old Fcm Token",fcmToken)

        if(!fcmToken){
         
            try {
                const fcmToken = await messaging().getToken();

                if(fcmToken){
                    console.log("The NEw Genrated Fcm Token",fcmToken)
                    await AsyncStorage.setItem('fcmToken',fcmToken)
                }
            } catch (error) {
                console.log(error,"error rasied in fcmToken")
            }
        }
}


export const notificationListener = () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',remoteMessage.notification);
     
      });


      //ForeGround
      messaging().onMessage( async remoteMessage => {
        console.log("Recived in foreground",remoteMessage)
      }

      )



          // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
 
      }
    
    });
}