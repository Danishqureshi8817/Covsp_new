import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import notifee from '@notifee/react-native';




export const displayNotifications = async() =>{
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
    
        await notifee.displayNotification({
            title: '<b>Warning</b>',
            // subtitle: '<span style="color:red;" ><b>&#9888;</b></span>',
            body: 'Please maintain your distance.',
            android: {
              channelId,
              color:'#e1b12c',
              //local Image
              largeIcon: require('../assets/icon.png'),
              smallIcon: 'ic_launcher' , // optional, defaults to 'ic_launcher'.
              // pressAction is needed if you want the notification to open the app when pressed
              pressAction: {
                id: 'default',
              },
              
            },
          });

        setTimeout(() => {
            nextNotification()
        }, 2000);
 
}

 const nextNotification = async ()=>{

     // Create a channel (required for Android)
     const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });




      await notifee.displayNotification({
        title: '<b>You may have been exposed</b>',
        subtitle: '<span style="color:red;" ><b>&#9888;</b></span>',
        body: 'a COVID-19 patient.',
        android: {
          channelId,
          color:'red',
          //local Image
          largeIcon: require('../assets/icon.png'),
          smallIcon: 'ic_launcher' , // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
          
        },
      });
}

