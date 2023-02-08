import React,{ useState,} from 'react';
import { TextInput, View, Button } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import {SERVER} from '@env'; 

export default function LoginTest({navigation}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const postLogin = ()=>{
    if( !email || !password){
      alert("Please fill in all input!");
    }else{
      axios.post(`http://159.223.55.171:3000/user/login`,{email,password})
      .then(res=>{
        const userId = res.data.id;
        // alert(res.data.message);
        navigation.navigate('Profile',{userId:userId});
      }).catch(err=>{
        console.log(err)
        alert(err.response.data.error)
      })
    }
  }

  return (
    <View style={globalStyles.container}>
      
      <TextInput 
        placeholder="Email"
        onChangeText={(data)=>setEmail(data)}
      />

      <TextInput
        placeholder="Password"
        onChangeText={(data)=>setPassword(data)}
      />
      
      <Button 
        title="Login"
        onPress={()=>postLogin()}
      />

      <Button
        title="No Account Yet? Register Here"
        onPress={()=>navigation.navigate('Register')}
      />
    </View>
  );
}

