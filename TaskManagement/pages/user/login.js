import React,{ useState,} from 'react';
import {Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import {SERVER} from '@env'; 

export default function Login({navigation}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const postLogin = ()=>{
    if( !email || !password){
      alert("Please fill in all input!");
    }else{
      axios.post(`http://159.223.55.171:3000/user/login`,{email,password})
      .then(res=>{
        const userId = res.data.id;
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
        style={globalStyles.input}
        placeholder="Email"
        onChangeText={(data)=>setEmail(data)}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        onChangeText={(data)=>setPassword(data)}
      />
      
      <Button
        color="#ff5c5c"
        title="Login"
        onPress={()=>postLogin()}
      />

      <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={styles.text}>No Account Yet? Register Here</Text>
      </TouchableOpacity>

    </View>
  ) 
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    color:"red",
  },

});

