import React,{useState} from 'react';
import { View, Text,Image ,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native'
import Icon  from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default function LoginScreen({navigation}) {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const userLogin = async ()=>{
    //    console.warn(email);
    //    console.warn(password);
        if(!email || !password){
               alert("please add all the field")
               return 
        }
        const user = await firestore().collection('Users').doc(email).get();

       
    //  console.warn("user nm"+user._data.names);
        // console.warn(user._data.passwords);

        if(email===user._data.emails && password===user._data.passwords )
        {
            alert("Login Done");
            navigation.navigate("Home",{userid:email,name:user._data.names});
        }
        else
        {
            alert("Invalide Password");
        }

    }

  return (
    <SafeAreaView style={{paddingHorizontal:20,flex:1,backgroundColor:'white'}}>
        <ScrollView showsHorizontalScrollIndicator={false}>

      <View style={{alignItems:'center',marginTop:50,flexDirection:'row'}}>
          <Text  style={style.text1}>CHAT</Text>
          <Text  style={style.text2}>APP</Text>
      </View>

      <View style={{alignItems:'center',marginTop:20}}>
          <Image style={style.img} source={require('../assets/icon.png')}/>
      </View>

      <View style={{marginTop:70}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Welcome Back,</Text>
                <Text style={{fontSize:10,fontWeight:'bold',color:'#a5a5a5'}}>Sign In to continue</Text>
      </View>

    
      <View style={{marginTop:70}}>
         
          <Icon name='mail' size={20} color="#a5a5a5" style={style.inputIcon}/>
          <TextInput style={style.input} placeholder='Enter Email' onChangeText={(value) => setEmail(value)}/>
      </View>
      <View style={{marginTop:80}}>
          <Icon name='lock' size={20} color="#a5a5a5" style={style.inputIcon}/>
          <TextInput style={style.input}  placeholder='Enter Password' onChangeText={(value) => setPassword(value)} secureTextEntry/>
      </View>
     


        <TouchableOpacity  onPress={()=>userLogin()}>
                <View style={style.btnPrimary}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Login</Text>
                </View>
        </TouchableOpacity>

        <View style={{
                    flexDirection:'row',
                    alignItems:'flex-end',
                    justifyContent:'center',
                    
                    marginBottom:20,
                }}>
                        <Text  style={{color:"#a5a5a5",fontWeight:'bold'}}>Don't have a account ?  </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
                             <Text style={{color:"#ff2d5f",fontWeight:'bold'}}>Sign Up</Text>
                        </TouchableOpacity>
                       
                </View>

    </ScrollView>
   </SafeAreaView>
  )
}

const style=StyleSheet.create({
    text1:{
     fontSize:20,
     color:'black',
     fontWeight:'bold',
    },
    text2:{
        fontSize:20,
        color:'#64beff',
        fontWeight:'bold',
       },
    img:{
        width:70,
        height:70,
    },
    inputIcon:{
       padding:20,
        position:"absolute",
    },
    input:{
        borderBottomWidth:2,
        marginLeft:60,
        marginRight:60,
        borderColor:'#a5a5a5',
        color:'black',
    },
    btnPrimary:{
        backgroundColor:'#29388f',
        height:50,
        margin:50,
        marginTop:70,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
  })