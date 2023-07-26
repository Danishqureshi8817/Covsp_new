import { View, Text,StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './MainStack'


const Naviagtion = () => {



  // console.log("UpdateOnboarding_MainStack",updateOnboarding);
    

  return (
   
    // it is a main navigator container, contain all naviagtors
  <NavigationContainer>
   
   {/* it is main Stack navigator component, it is contain all declaration of routes */}
  <MainStack/>


  </NavigationContainer>


  )
}

export default Naviagtion