import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet ,SafeAreaView,ScrollView,Image,FlatList,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {FAB} from 'react-native-paper'



export default function HomeScreen({navigation,route}) {

    const {userid,name}=route.params;



    console.log('user nu nme'+name);

    const [users,setUsers] = useState(null)
   

        const getUsers = async ()=>{
            const querySanp = await firestore().collection('Users').where('uid','!=',userid).get()
            const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            //  console.log(allusers)
             setUsers(allusers)
         
      }

    useEffect(()=>{
        getUsers()
    },[])

    const RenderCard=({item})=>{
        return(
           <TouchableOpacity onPress={()=> navigation.navigate("Chat",{name:item.names,uid:item.emails,usids:userid})}>
            <View style={styles.mycard}>
                    <Image source={{uri:item.pic}} style={styles.img}/>
                    <View>
                        <Text style={styles.text1}>
                            {item.names}
                        </Text>
                        <Text style={styles.text2}>
                            {item.emails}
                        </Text>
                    </View>
            </View>
            </TouchableOpacity>
        )
    }
    
  return (
    <View style={{flex:1}}>
      {/* <View  style={styles.main}>
        
          <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>CHAT</Text>
          <Text style={{fontSize:18,color:'#29388f',fontWeight:'bold'}}>APP</Text>
      </View> */}

     
        <View  style={{flex:1}}>
            <FlatList
                data={users}
                renderItem={({item})=><RenderCard item={item}/>}
                keyExtractor={(item)=>item.emails}
            />

             <FAB
                style={styles.fab}
                icon="account-details"
                color="black"
                onPress={() => navigation.navigate("Accoun",{profiles:userid,namess:name})}
            />

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:5,
    },
    img:{
        width:28,
        height:28,
       
    },
    title: {
      fontSize: 18,
      color:'white',
      fontWeight:'400'
    },
    main:{
      flexDirection:'row',
      padding:20,
      backgroundColor:'#a5a5a5',
      
    },
    item: {
        backgroundColor: '#a5a5a5',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:15,
       flexDirection:'row'
      },
      img:{width:55,height:55,borderRadius:30,backgroundColor:"#a5a5a5"},
   text1:{
       fontSize:17,
        paddingTop:10,
        paddingLeft:14,
        color:'black'
   },
   text2:{
    fontSize:14,
    paddingLeft:10,
    paddingTop:3,
    paddingBottom:3,
    color:'black'
    
},
   mycard:{
    flexDirection:"row",
    margin:3,
    padding:4,
    backgroundColor:"white",
    borderBottomWidth:1,
    borderBottomColor:'grey'
   },
   fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"white"
  },
  });
  