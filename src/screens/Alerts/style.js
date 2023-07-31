import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: responsiveWidth(5),
      width: '100%',
     position:'relative',
      // alignSelf: 'center',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: "#7F8487",
    },
      
  })