import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect }  from 'react';
import { GiftedChat,Bubble,InputToolbar,LeftAction, ChatInput, SendButton} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export default function ChatScreens({route}) {

    const {uid,usids}=route.params;
   
    console.log( uid+usids);
  

    console.log(uid);
   console.log(usids);
    const [messages, setMessages] = useState([]);


    const getAllMessages = async ()=>{
        const docid  = uid+usids

        
        const querySanp = await firestore().collection('Chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg =   querySanp.docs.map(docSanp=>{
            return {
                ...docSanp.data(),
                createdAt:docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)
    }
    

    
        useEffect(() => {
            // getAllMessages()

           //  const docid  = uid+usids;
           const docid  = uid > usids ? usids+ "-" + uid : uid+"-"+usids

        
            const messageRef = firestore().collection('Chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")

      const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
            const allmsg =   querySnap.docs.map(docSanp=>{
             const data = docSanp.data()
             if(data.createdAt){
                 return {
                    ...docSanp.data(),
                    createdAt:docSanp.data().createdAt.toDate()
                }
             }else {
                return {
                    ...docSanp.data(),
                    createdAt:new Date()
                }
             }
                
            })
            setMessages(allmsg)
        })


        return ()=>{
          unSubscribe()
        }

        
      }, [])

        const onSend = (messaArray) => {
          const docid  = uid > usids ? usids+ "-" + uid : uid+"-"+usids
            // console.log(messaArray);
            const msg=messaArray[0];
            const mymsg={
                ...msg,
                sentTo:uid,
                sentBy:usids,
               createdAt:new Date()
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
            firestore().collection('Chatrooms')
            .doc(docid)
            .collection('messages')
            .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
        }

  return (
    <View style={{flex:2}}>
            <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: usids,
            }}

            renderBubble={(props)=>{
                return <Bubble
                {...props}
                wrapperStyle={{
                 left: {
                    backgroundColor:"chat",
                  
                    
                  },
                  right:{
                    backgroundColor:"#a5a5a5",
                   
                  }
                  
                }}
              />
            }}

            renderInputToolbar={(props)=>{
              return <InputToolbar {...props}
               containerStyle={{borderTopWidth: 1,borderBottomColor: '#a5a5a5'}} 
               textInputStyle={{ color: "black" }}
               />
          }}
        
        

            />
    </View>
  )
}