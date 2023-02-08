import React,{ useState,} from 'react';
import {Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import {SERVER} from '@env'; 

export default function Register({navigation}) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const postRegister = (name,email,password)=>{
    if(!name || !email || !password){
      alert("Please fill in all input!");
    }else{
      if(/^.+@(?:[\w-]+\.)+\w+$/.test(email) === false){
          alert("Not a valid email");
      }else{
          axios.post(`http://159.223.55.171:3000/user/register`,{name,email,password})
          .then(res=>{alert(res.data.message)})
          .catch(err=>{alert(err.response.data.error)});
      }
    }
  }

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        onChangeText={(data)=>setName(data)}
      />

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
        title="Register"
        onPress={()=>postRegister(name,email,password)}
      />
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.text}>Already registered? Login Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    color:"blue",
  },
});

