import { StyleSheet, Text, View,ActivityIndicator,Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Loading = () => {
  return (
    <View style={styles.container} >
    <Image  source={require('../assets/icon.png')} style={styles.mainImg}/>
   <ActivityIndicator size='large' color="#0092bb" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      width: '100%',
      backgroundColor:'#d7f3f4',
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