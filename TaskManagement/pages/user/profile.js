import React,{ useEffect, useState,} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from 'axios';
import {SERVER} from '@env'; 


export default function Profile({navigation,route}) {
  const userId = route.params.userId;
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const getProfile = ()=>{
      axios.get(`http://159.223.55.171:3000/user/${userId}`)
      .then(res=>{
        const user = res.data.user;
        setName(user.name);
        setEmail(user.email);
      }).catch(err=>{console.log(err.response.data.error)});
  };

  const putProfile = ()=>{
    if(!password){
        alert("Password can't be empty");
    }else{
        axios.put(`http://159.223.55.171:3000/user/${userId}`,{password})
        .then(res=>{alert(res.data.message)})
        .catch(err=>{alert(err.response.data.error)});
    }
  };

  useEffect(()=>{
    getProfile(userId);
  },[userId]);

  if(!name) return (<Text>Loading...</Text>);
  
  return (

      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Name: {name}</Text>
        <Text style={globalStyles.text}>Email: {email}</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Change your password"
          value={password}
          onChangeText={(data)=>setPassword(data)}
        />
        
        <Button 
          title="Update"
          onPress={()=>{
            putProfile(userId,password);
            setPassword('');
          }}
        />

        <TouchableOpacity style={globalStyles.secondButton}>
          <Button 
            title="Manage Project"
            onPress={()=>{navigation.navigate("Project List",{userId:userId})}}
          />
        </TouchableOpacity>

      </View>
  );
}

