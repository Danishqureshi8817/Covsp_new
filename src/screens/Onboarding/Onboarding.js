
import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { onboardingState } from '../../store/recoil'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = () => {

  const [onboardingStatus, setOnboardingStatus] = useRecoilState(onboardingState);
  const navigation = useNavigation()
 

  //this is the custom button component
  const Done = ({...props})=>{
    return(<TouchableOpacity style={{marginHorizontal:10}} {...props} >
        <Icon
              name='arrow-forward'
              size={responsiveWidth(6.5)}
              color={'#d7f3f4'}
            
            />
    </TouchableOpacity>)
}


  //this is the custom button component
  const Next = ({...props})=>{
   return  ( <TouchableOpacity style={{marginHorizontal:10}} {...props} >
        <Text style={{fontSize:16}} >Next</Text>
      </TouchableOpacity>)
  }


  // 0082a6 color
  // ffffff white

  return (
    <Onboarding
    // NextButtonComponent={Next}
    DoneButtonComponent={Done}
      onSkip={ async()=> { 
        console.log("setitem ")
        //it is save the onboarding screen status in asyncStorage for checking vaildation user visited or not
        await AsyncStorage.setItem('onboarding', 'show');
        // setOnboardingStatus(true)

        //it is use to navigate the user to login screen
        navigation.replace("Login")}}
      onDone={async()=> { 

        console.log("setitem ")
       
        await AsyncStorage.setItem('onboarding', 'show');
        // setOnboardingStatus(true)
        navigation.replace("Login")}}



        //In this step- onboarding ui data
      pages={[
        {
          backgroundColor: '#0092bb',
          image: <Image source={require('../../assets/images/welcom.png')} className="w-80 h-72 object-contain" style={{width:responsiveWidth(120),height:responsiveHeight(40),resizeMode:'contain'}}/>,
          title: 'Welcome to Armor App',
          subtitle: 'Armor App helps in Identifying potential risk of getting infected by covid and stops spread of covid by turning Bluetooth on in the mobile device. Armor app sends notifications to the user about infected persons in 6 feet distance.',
          titleStyles:{color:'white',fontSize:30},
          subTitleStyles:{color:'white',fontSize:17,textAlign:'center'}
        },
        {
            backgroundColor: '#0092bb',
            image: <Image source={require('../../assets/images/welcom2.png')} style={{width:responsiveWidth(120),height:responsiveHeight(40),resizeMode:'contain'}}/>,
            title: 'How does it works?',
            subtitle: 'This application uses Bluetooth technology to scan for devices in 6 feet distance, they also has the application installed and exchange data about users covid illness information.',
            titleStyles:{color:'white',fontSize:30},
            subTitleStyles:{color:'white',fontSize:17,textAlign:'center'}
          },
      ]}
      
    />
  )
}

export default OnboardingScreen