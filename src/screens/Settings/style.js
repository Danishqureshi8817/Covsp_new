import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      gap:responsiveWidth(4),
      // backgroundColor:'#d7f3f4',
      
    },
    accountContainer:{
      
      gap:responsiveWidth(4),
      marginTop:responsiveWidth(8)
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: "#7F8487",
    },
    accountText:{
      color:'#0092bb',
      fontSize:responsiveFontSize(1.9),
      fontWeight:'bold',
      marginLeft:responsiveWidth(5),
    },
    user:{
      color:'#000',
      fontSize:responsiveFontSize(1.9),
      marginLeft:responsiveWidth(5),
      
    },
    username:{
     fontSize:responsiveFontSize(1.9),
     marginLeft:responsiveWidth(5),
    },
    covid:{
      color:'#000',
      fontSize:responsiveFontSize(1.9),
      paddingVertical:responsiveWidth(2),
      marginLeft:responsiveWidth(5),
    },
    deleteAcc:{
      color:'#000',
      fontSize:responsiveFontSize(1.9),
      marginLeft:responsiveWidth(5),
    },
    alertContainer:{
      gap:responsiveWidth(4),
      marginTop:responsiveWidth(1)
    },
    switchContainer:{
     alignItems:'center',
     flexDirection:'row',
     justifyContent:'space-between'
  
    },
    switchText:{
      color:'#000',
      fontSize:responsiveFontSize(1.9),
      marginLeft:responsiveWidth(5),
    }
  
  
  })