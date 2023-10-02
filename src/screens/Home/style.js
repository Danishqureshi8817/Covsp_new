import { StyleSheet,Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import colors from '../../utils/colors';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.appBackground,
      // alignItems: 'center',
      position:'relative'
  
    },
    mainImg:{
      width:responsiveWidth(130),
      height:responsiveHeight(60),
      resizeMode:'contain',
      alignSelf:'center'
    },
    mainImgIcon:{
      width:responsiveWidth(140),
      height:responsiveHeight(70),
      resizeMode:'contain',
      alignSelf:'center'
    },
    floatingButton:{ 
    
      marginRight: responsiveWidth(2),
      position:'absolute',
      // right:Dimensions.get('window').width*0.03,
      top:Dimensions.get('window').height*0.74,
    
    
      
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: "#7F8487",
    },
  
      
  })