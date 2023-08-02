import React,{useState,useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {Text, StyleSheet, View} from 'react-native';
import Home from '../screens/Home/Home';
import HeaderIcon from '../components/HeaderIcon';

import Friends from '../screens/Friends/Friends';

import Alerts from '../screens/Alerts/Alerts';

import { scanDevice} from '../store/recoil'
import { useRecoilState } from 'recoil'
import {responsiveWidth, responsiveHeight,responsiveFontSize,} from 'react-native-responsive-dimensions';
import { displayNotifications } from '../utils/notifee';



// it is BottomTabs  object
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  
  const [scanDevices, setScanDevices] = useRecoilState(scanDevice);
  const [noti, setNoti] = useState(false)
 

  var str = []
for(let i=0;i<scanDevices?.length;i++){
  str.push(JSON.stringify(scanDevices[i]))
}
 
var filterDevice = []
filterDevice = str?.filter((val,i)=> str.indexOf(val)===i);
// console.log("filterDevices",filterDevice)

var finalList = []
for(let i=0; i<filterDevice?.length;i++){
  finalList.push(JSON.parse(filterDevice[i]))
}
// console.log("finalList",finalList)


  console.log("tabss size devices",finalList?.length,scanDevices?.length)


  // useMemo(() =>  displayNotifications() , [scanDevices])
  

  //it is the bottom Tabs Styles,their are stores in a object form
  var options = {
    Home: {
      tabBarLabel: ({focused}) => {
        return focused ? <Text style={styles.headerText}>Home</Text> : '';
      },
      headerStyle: {
        backgroundColor: '#0092bb',
      },
      headerTintColor: '#ffffff',
     

    },

    Friends: {
      tabBarLabel: ({focused}) => {
   
        return focused ? <Text style={styles.headerText}>Friends</Text> : '';
      },
      headerStyle: {
        backgroundColor: '#0092bb',
      },
      headerTintColor: '#ffffff',
   
    },
 
    Alerts: {
      
      tabBarLabel: ({focused}) => {
   
        return focused ? <Text style={styles.headerText}>Alerts</Text> : '';
      },
      headerStyle: {
        backgroundColor: '#0092bb',
      },
      headerTintColor: '#ffffff',
      tabBarBadge:finalList?.length >=1 ?finalList?.length:undefined,
      tabBarBadgeStyle:{marginTop:responsiveWidth(2.5)},
      
      
      
    },
 
    
  };





  return (

// it is a Bottom Tabs Naviagtor,containe all screen routes

    <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
        headerShown: true,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'bluetooth' : 'bluetooth';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people';
          } else if (route.name === 'Alerts') {
            iconName = focused ? 'md-notifications' : 'md-notifications';
          }

          return (
            <Icon
              name={iconName}
              size={focused?responsiveWidth(6.5):responsiveWidth(7.5)}
              color={'#d7f3f4'}
            
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#0092bb',
          paddingHorizontal: responsiveWidth(15),
          height:responsiveWidth(15),
          
      
        },
        tabBarIconStyle:{
         marginBottom:responsiveWidth(-4),
         marginTop:responsiveWidth(-3)
        },
      
       

      })}>
 
     {/* Their are all Bottom Tabs screen , All screen component declaration top of the file */}

      <Tab.Screen
        name="Friends"
        component={Friends}
        options={options.Friends}
      />
      <Tab.Screen name="Home" component={Home} options={options.Home} />

      <Tab.Screen name="Alerts" component={Alerts} options={options.Alerts} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  headerText: {
    color: '#ffffff',
    letterSpacing: responsiveFontSize(0.1),
    marginBottom:responsiveWidth(3)
  },
});
