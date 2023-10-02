import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import colors from '../../utils/colors';


export default styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.onBoarding,
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveWidth(5)
   
    },
    buttonMain:{
        
     
        backgroundColor:'#ffffff',
        paddingHorizontal:responsiveWidth(6),
        paddingVertical:responsiveHeight(1.3),
        borderRadius:responsiveWidth(1),
        flexDirection:'row',
        gap:responsiveWidth(2)
        // width:responsiveScreenWidth(50)


    },
    buttonText:{
        color:colors.onBoarding,
        alignSelf:'center',
        fontSize:responsiveFontSize(2.1),
        fontWeight:'500'

    },
    logo:{
        width:responsiveWidth(90),
        height:responsiveHeight(25),
        resizeMode:'contain'
    },
    textWl:{
        color:'#ffffff',
        fontSize:responsiveFontSize(4),

    },
    textCov:{
        color:'#ffffff',
        fontSize:responsiveFontSize(2.1),
        alignSelf:'center'
    }
})