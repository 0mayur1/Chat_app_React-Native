import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';
import { View,Text,StatusBar,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './app/src/screens/SignupScreen';
import LoginScreen from './app/src/screens/LoginScreen';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/src/screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import ChatScreens from './app/src/screens/ChatScreens';
import AccountScreen from './app/src/screens/AccountScreen';


const Stack = createStackNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Navigation =()=>{


    return(
    <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignupScreen}  options={{headerShown:false}} />
          {/* <Stack.Screen name="Home" component={HomeScreen}  options={({ route }) => ({ title: route.params.emails })} /> */}
          <Stack.Screen name="Home"  component={HomeScreen} options={{
                headerRight:()=><MaterialIcons
                name="call"
                size={28}
                style={{paddingRight:15}}
                />,
                headerLeft:()=> <MaterialIcons
                name="videocam"
                size={30}
                style={{paddingLeft:380}}
                />,
                title:'ChatApp'
          }}>
                  
          </Stack.Screen>

          <Stack.Screen name="Chat" component={ChatScreens}  options={({ route }) => ({ title:<View style={{alignItems:'center'}}><Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>{route.params.name}</Text></View> })}/>
          <Stack.Screen name="Accoun" component={AccountScreen}   options={({ route }) => ({ title:<View style={{alignItems:'center'}}><Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>{route.params.namess}</Text></View> })}/>
        

        </Stack.Navigator>
  </NavigationContainer>
  );

}


export default function App() {
  return (
   <>
        <StatusBar barStyle='dark-content' backgroundColor='#a5a5a5'/>

        <View style={style.constainer}>
           <Navigation/>
        </View>
   </>
  )
}


const style=StyleSheet.create({
  constainer:{
    flex:1,
    backgroundColor:'white'
  },
})