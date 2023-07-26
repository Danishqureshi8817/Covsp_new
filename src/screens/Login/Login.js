import { StyleSheet, Text, View, TouchableOpacity,Image,ToastAndroid,ActivityIndicator} from 'react-native'
import React,{useEffect,useState} from 'react'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

    const navigation = useNavigation();
  const [activity, setActivity] = useState(false)
    
    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
     

        GoogleSignin.configure({
            webClientId:"271100159197-1d35oissvca39825t1ecni7auk204slh.apps.googleusercontent.com",
        });

    }, [])


    //Toast MSG
 const showToast = () =>{
    Toast.show('SignIn successfully');
 }
    

// In this Step we provide the  google SignIn to user Method with help of firebase

console.log("google data",userInfo?.user?.name)
    //Google SignIn
    const signIn = async () => {

        try {
             setActivity(true)
            await GoogleSignin.signOut()


          await GoogleSignin.hasPlayServices();
          const userData = await GoogleSignin.signIn();
          await setUserInfo(userData);
          // await storeData(userInfo)
          console.log("user dat",userData?.user)

          //when google SignIn method return the user details then we store the info in Asyncstorage for checkinh some vailidations
         
          await AsyncStorage.setItem('userDetails', JSON.stringify(userData?.user));
           showToast()
             setActivity(false)
           //after user succesfully login the jump to home screen 
          navigation.navigate('Tabs')

        } catch (error) {

          //In this step handelinh the login Erros
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };



  return (

    //It is main Ui login screen
    <View style={styles.mainContainer} >
       <Image source={require('../../assets/icon.png')} style={styles.logo} />
<View>
<Text style={styles.textWl}>Welcome</Text>
<Text style={styles.textCov}>CovSp </Text>
</View>
     <TouchableOpacity style={styles.buttonMain} onPress={() =>{signIn()}} >

        <Text style={styles.buttonText} >SignIn With Google</Text>
        <Icon  name="arrow-forward" size={responsiveWidth(6)} color='#0092bb' style={{ marginRight: responsiveWidth(2) }} />

     </TouchableOpacity>

      <ActivityIndicator size='small' color='#ffffff' animating={activity} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:'#0092bb',
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
        color:'#0092bb',
        alignSelf:'center',
        fontSize:responsiveFontSize(2.1),
        fontWeight:'500'

    },
    logo:{
        width:responsiveWidth(20),
        height:responsiveHeight(10),
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