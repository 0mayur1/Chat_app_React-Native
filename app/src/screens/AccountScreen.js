import React,{useEffect,useState} from 'react'
import { View, Text,ActivityIndicator ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth'


export default function AccountScreen({route,navigation}) {

    const {profiles}=route.params;
    const [profile,setProfile] = useState('')

    console.log("Login bahu : -"+profiles);

    useEffect(()=>{
        firestore().collection('Users').doc(profiles).get().then(docSnap=>{
           setProfile(docSnap.data())
        })
        },[])

        if(!profile){
            return  <ActivityIndicator size="large" color="black" />
        }

  return (
    <View style={style.constainer}>
        <View style={{paddingLeft:'30%'}}>
                    <Image style={style.img} source={{uri:profile.pic}}/>

                    <View style={{paddingTop:90}}> 
                                <View style={{flexDirection:'row'}}>
                                    <MaterialIcons name="person"size={30}style={{paddingRight:15,color:'black'}}/>
                                    <Text style={style.text}>:  {profile.names}</Text>
                                </View>
                                <View style={{flexDirection:'row',paddingTop:20}}>
                                    <MaterialIcons name="mail"size={30}style={{paddingRight:15,color:'black'}}/>
                                    <Text style={style.text}>:  {profile.emails}</Text>
                                </View>
                                <View style={{flexDirection:'row',paddingTop:20}}>
                                    <MaterialIcons name="lock"size={30}style={{paddingRight:15,color:'black'}}/>
                                    <Text style={style.text}>:  {profile.passwords}</Text>
                                </View>
                        
                    
                    
                        </View>
        </View>
        <TouchableOpacity onPress={()=>{ navigation.navigate("login")}}>
                <View style={style.btnPrimary}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Logout</Text>
                </View>
        </TouchableOpacity>
          
    </View>
  )
}


const style=StyleSheet.create({
    constainer:{
        flex:1,
        backgroundColor:"#a5a5a5",
        
      paddingTop:100
    },
    img:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:3,
        borderColor:"white"
    },
    text:{
        fontSize:18,
        color:"black"
    },
    btn:{
        borderColor:"white",
        borderWidth:3
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