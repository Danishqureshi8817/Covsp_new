import { useWindowDimensions,ScrollView,Alert, ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,FlatList, ActivityIndicator,ToastAndroid, Platform } from 'react-native'
import React,{useState,useLayoutEffect,useEffect} from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation,useFocusEffect,useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuOptions,MenuOption,MenuTrigger,MenuProvider} from 'react-native-popup-menu';
import { scanDevice} from '../../store/recoil'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';


const Alerts = () => {
  const navigation = useNavigation();
  const window = useWindowDimensions()
  const [selectedId, setSelectedId] = useState(-1);
  const [prvDevices, setPrvDevices] = useState(null)
  const focus = useIsFocused()

  const [scanDevices, setScanDevices] = useRecoilState(scanDevice);

  console.log("Alert Recoil",scanDevices)

  const Divider = () => <View style={styles.divider} />;

  const fetchPrvDevices = async()=>{
    let prv = await AsyncStorage.getItem('Devices')
 let prvD = await JSON.parse(prv)
 setPrvDevices(prvD)
  }



  useEffect(() => {
    console.log("FocusEffect")
    fetchPrvDevices()
  }, [focus])

//   useFocusEffect(() => {

// console.log("FocusEffect")
// fetchPrvDevices()

//       });
  

  //Headeer Icons
  useLayoutEffect(() => {


    navigation.setOptions({
    
      headerRight: () =>
      (

        <View style={{flexDirection:'row'}} >
       {/* <TouchableOpacity onPress={() => {  }}><Icon  name="play-circle" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(2) }} /></TouchableOpacity>  */}
       {/* <TouchableOpacity onPress={() => {  }}><MaterialIcons name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} /></TouchableOpacity> */}
        
       <Menu  >
      <MenuTrigger>
      <MaterialIcons name="dots-vertical" size={responsiveWidth(6)} color="#d7f3f4" style={{ marginRight: responsiveWidth(3) }} />
      </MenuTrigger>
      
      <MenuOptions customStyles={{
           optionsContainer: {
             borderRadius: responsiveWidth(2),
             padding:responsiveWidth(2),
             marginTop:window.width*0.07,
            width:window.width*0.35,
            backgroundColor:'#d7f3f4',
             
            
           },
          optionsWrapper:{
            
          },
          optionWrapper:{
           
          }
          

         }} >
        <MenuOption onSelect={() => navigation.navigate('Settings')} text='Settings' />
        <Divider />
        <MenuOption onSelect={() => {}} >
          <Text style={{}}>About</Text>
        </MenuOption>
     
      </MenuOptions>
    </Menu>
        
        </View>

      ),



    });
  }, []);





var str = []
for(let i=0;i<scanDevices?.length;i++){
  str.push(JSON.stringify(scanDevices[i]))
}
 
var filterDevice = []
filterDevice = str?.filter((val,i)=> str.indexOf(val)===i);
// console.log("filterDevices",filterDevice)

var finalList = []
for(let i=0; i<filterDevice?.length;i++){
  finalList.push(JSON.parse(filterDevice[i]))
}
console.log("finalList",finalList)

console.log("friend with covsp in prvDevice Alert",prvDevices)

var  frndDv = []

for( var val of finalList){
  var i;
  console.log("friend with covsp",val)

  
for(i=0;i<prvDevices?.length;i++){

if(val[1]==prvDevices[i][1]){
  console.log("friend with covsp in forr prvDevice",prvDevices[i][1],val[1])
  // frndDv.push(val)

  break;
  }

}
console.log("friend with covsp in i value",i,prvDevices?.length)
if(i===prvDevices?.length){

  console.log("friend with covsp in i value",i,prvDevices?.length)
  frndDv.push(val)
}


}

console.log('frvDv Alert',frndDv)






let newFinalList
   
if(prvDevices?.length==1){
  newFinalList=frndDv
}
else{
  newFinalList=frndDv.length==0?finalList:frndDv
}
  

console.log("New finalList Alert",newFinalList)



const renderItem = (props) => {


  return (
    <Item
      item={props.item[0]}
      num={props.index}
      onPress={() => {
        deleteDevice(props.item[1],props.item[0])
        setSelectedId(props.item[0])
     
        }}
    
     
    />
  );
};

const Item = ({item, onPress,num}) => {
  
  // console.log("flatlist item",)
  
  return (
    <>
  <View style={{width:window.width*0.9,backgroundColor:'#ffffff',height:window.height*0.21,borderRadius:window.width*0.015,alignItems:'center',marginBottom:responsiveWidth(2)}}>
   
  <View style={{marginTop:responsiveWidth(2),gap:responsiveWidth(2)}}>

 <View style={{flexDirection:'row',alignItems:'center'}}>
  <MaterialIcons name="alert" size={responsiveWidth(15)} color="#0092bb" style={{ marginRight: responsiveWidth(3) }} />
   
   <View>
   <Text style={{color:'#0092bb',fontSize:responsiveFontSize(2.2),fontWeight:'500'}} >You may have been exposed to</Text>
   <Text style={{color:'#0092bb',fontSize:responsiveFontSize(2.2),fontWeight:'500'}} >a COVID-19 patient</Text>
   </View>

   </View>

  <View style={{flexDirection:'row',alignItems:'center'}} >
   <Text style={{color:'#000',fontSize:responsiveFontSize(1.9)}} >You were exposed during {`(${item})`} </Text> 
   <Text style={{color:'#000',fontSize:responsiveFontSize(1.9),fontWeight:'bold'}} >{num+1}/{finalList.length}.</Text>
   </View>
   <Text style={{color:'#000',fontSize:responsiveFontSize(1.9),fontWeight:'bold'}} >Please self-quarantine.</Text>

   <TouchableOpacity onPress={onPress} >
     <Text style={{color:'#0092bb',fontSize:responsiveFontSize(1.9),fontWeight:'bold'}} >DISMISS</Text>
   </TouchableOpacity>

</View>
   
   </View>

  

   </>
);


}

const EmptyText = () =>{
  return (
    <View style={{flex:1,}} >
      <Text style={{fontSize:responsiveFontSize(2.1),fontWeight:'bold'}} >No Infected Person Available</Text>
    </View>
  )
}

  return (
  
    //this is the Main Alert Screen UI
     <View style={{flex:1,backgroundColor:'#d7f3f4'}}>

    <KeyboardAvoidingView style={styles.container} behavior="padding">
 

    <FlatList
        data={newFinalList}
        renderItem={renderItem}
        ListEmptyComponent={EmptyText}
        showsVerticalScrollIndicator={false}
      />

    </KeyboardAvoidingView>
   
</View>

  )
}

export default Alerts

