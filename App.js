import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import Navigation from './src/navigation/index'
import {RecoilRoot} from 'recoil';
import { MenuProvider } from 'react-native-popup-menu';
import {requestUserPermission, notificationListener} from './src/utils/notificationServices'

const App = () => {
  // console.log("app")

  useEffect(() => {
    
  requestUserPermission()
  notificationListener()
   
  }, [])
  


  return (

 <>

 <RecoilRoot>  
  <MenuProvider>
 
 {/* Main Navigation component, it is declare top of the file */}
  <Navigation/>

  </MenuProvider>
  </RecoilRoot>
 </>
 
  )
}

export default App