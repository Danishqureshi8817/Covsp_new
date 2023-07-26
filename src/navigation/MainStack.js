import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Tabs from './TabNavigation'
import Loading  from '../components/Splash'

import Onboarding from '../screens/Onboarding/Onboarding'
import Splash from '../components/Splash'
import Login from '../screens/Login/Login'
import Settings from '../screens/Settings/Settings'
import { onboardingState,loginState } from '../store/recoil'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';


// it is native Stack object
const Stack = createNativeStackNavigator();

const AuthStack = () => {

  const [onboardingStatus, setOnboardingStatus] = useRecoilState(onboardingState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [loading, setLoading] = useState(true);

  const [splashShow, setSplashShow] = useState(true)
 
    // console.log("UpdateOnboarding_MainStack",updateOnboarding);
      

    //this Function use for checking user visited onboarding screen or not
    const checkOnboarding = async() =>{
      try {
        const value = await AsyncStorage.getItem('onboarding');
        
        if (value !== null) {
          await setOnboardingStatus(true)
        }
      } catch (e) {
       console.log("ERRRO AYNC",e)
      }

    }

//this Function use for checking user Loged in or not
    const checkLogin = async() =>{
      try {
        
        const value = await AsyncStorage.getItem('userDetails');
        if (value !== null) {
          console.log("userData stack",JSON.parse(value))
          await setLoginStatus(true)
        }
      } catch (e) {
       console.log("ERRRO AYNC login",e)
      }

    }

    //this function calling by useEffect automatically
    const load = ()=>{

      //first-It is Checking onboarding Screen Status
      checkOnboarding();
      
      //second- its is checking Login Status 
      checkLogin()

      setTimeout(() => {
        setSplashShow(false)
       }, 2000);
    }
    
  //this useEffect Run Ones time when user open the application  
  useEffect(() => {
   
    //In this Step , we calling load Function, it is decalare above
    load()

    console.log(" inside useeffect   ");
  
  }, []);

    // useEffect(() => {
    //   checkOnboarding()
    // }, [])
    
     console.log("mainStack",splashShow,onboardingStatus)
 
  return (

    // it is a navigator stack, contain all screen routes

<Stack.Navigator screenOptions={{headerShown:false}}>

 {splashShow?<Stack.Screen name='Splash' component={Splash}/>:null}
 { !onboardingStatus && <Stack.Screen name='Onboarding' component={Onboarding} />}
{ !loginStatus && <Stack.Screen name='Login' component={Login} />}

 {/* //it is a Bottom tab navigator component, contain all bottom tabs screen routes */}
  <Stack.Screen name='Tabs' component={Tabs} />

  <Stack.Screen name='Settings' component={Settings} options={{headerShown:true,headerStyle: {
        backgroundColor: '#0092bb',
      }, headerTintColor:'#ffffff'}} />


</Stack.Navigator>

  )
}

export default AuthStack