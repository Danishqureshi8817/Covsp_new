import { StyleSheet, Text, View,ActivityIndicator,Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../utils/colors'

const Loading = () => {
  return (
    <View style={styles.container} >
    <Image  source={require('../assets/images/login.png')} style={styles.mainImg}/>
    <ActivityIndicator size='large' color="#0092bb" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {

      flex: 1,
      width: '100%',
      backgroundColor:colors.onBoarding,
      alignItems: 'center',
      justifyContent:'center',
      position:'relative'
  
    },

    mainImg:{
        width:responsiveWidth(40),
        height:responsiveHeight(20),
        resizeMode:'contain'
    }
  
      
  })