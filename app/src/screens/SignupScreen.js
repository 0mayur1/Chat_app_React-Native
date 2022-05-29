import React,{useState} from 'react';
import { View, Text,Image ,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,ScrollView,ActivityIndicator} from 'react-native'
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


export default function SignupScreen({navigation}) {

 

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState('')
    const [showNext,setShowNext] = useState(false)
    

    const userSignup = async ()=>{
        
    
        if(!email || !password || !image|| !name){
               alert("please add all the field")
               return 
        }
       
        // auth()
        // .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        // .then(() => {
        //   console.log('User account created & signed in!');
        // })
        // .catch(error => {
        //   if (error.code === 'auth/email-already-in-use') {
        //     console.log('That email address is already in use!');
        //   }
      
        //   if (error.code === 'auth/invalid-email') {
        //     console.log('That email address is invalid!');
        //   }
      
        //   console.error(error);
        // });
        
      

            firestore()
            .collection('Users')
            .doc(email)
            .set({
                names:name,
               passwords:password,
               emails:email,
               pic:image,
               uid:email
            })
            .then(() => {
                console.log('User added..');
            });

            


    }
    const pickImageAndUpload = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{

          
            
         const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image")
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImage(downloadURL)
                    });
                }
                );
        })
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
                <Text style={{fontSize:10,fontWeight:'bold',color:'#a5a5a5'}}>Sign Up to continue</Text>
      </View>


      {!showNext && 
      <>
      <View style={{marginTop:70}}>
         
          <Icon name='mail' size={20} color="#a5a5a5" style={style.inputIcon}/>
          <TextInput style={style.input} placeholder='Enter Email' onChangeText={(value) => setEmail(value)}/>
      </View>
      <View style={{marginTop:80}}>
          <Icon name='lock' size={20} color="#a5a5a5" style={style.inputIcon}/>
          <TextInput style={style.input}  placeholder='Enter Password' onChangeText={(value) => setPassword(value)} secureTextEntry/>
      </View>
      </>
        }

        {showNext ?

        <>
             <View style={{marginTop:0}}>
                <Icon name='account-box' size={20} color="#a5a5a5" style={style.inputIcon}/>
                <TextInput style={style.input} placeholder='Enter Name' value={name} onChangeText={(value) => setName(value)}/>
             </View>

             <TouchableOpacity onPress={()=>pickImageAndUpload()}>
                <View style={style.btnPrimary}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Profile Pick</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>userSignup()}>
                <View style={style.btnPrimary}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Sign Up</Text>
                </View>
             </TouchableOpacity>
             </>
             :

             <TouchableOpacity onPress={()=>setShowNext(true)}>
                <View style={style.btnPrimary}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Sign Up</Text>
                </View>
        </TouchableOpacity>

       

        }
    
    
    <View style={{
                    flexDirection:'row',
                    alignItems:'flex-end',
                    justifyContent:'center',
                    marginTop:10,
                    marginBottom:20,
                }}>
                        <Text  style={{color:"#a5a5a5",fontWeight:'bold'}}>Don't have a account ?  </Text>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                             <Text style={{color:"#ff2d5f",fontWeight:'bold'}}>Sign In</Text>
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