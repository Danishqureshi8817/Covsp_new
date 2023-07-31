import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
  
      // alignSelf: 'center',
      // alignItems: 'center',
      gap: responsiveWidth(5),
      // justifyContent: 'center',
    },
    mainImg: {
      width: responsiveWidth(110),
      height: responsiveHeight(60),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#7F8487',
    },
    textMainContainer: {
      //  alignItems:'center',
      marginTop: responsiveWidth(3),
    },
    textMain: {
      color: '#0092bb',
      fontSize: responsiveFontSize(1.9),
      alignSelf: 'center',
    },
  });