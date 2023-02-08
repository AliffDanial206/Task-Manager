import React,{ useState,} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, TextInput, View, Button } from 'react-native';
import axios from 'axios';
import {SERVER} from '@env'; 
import { globalStyles } from '../../styles/global';

export default function CreateTask({navigation,route}) {

  const [description,setDescription] = useState('');
  const [deadline,setDeadline] = useState('');
  const projectId = route.params.projectId;
  
  const postTask = ()=>{
    if(!description || !deadline){
      alert("Please fill in all field");
    }else{
      axios.post(`http://159.223.55.171:3000/task/create`,{projectId,description,deadline})
      .then(res=>{
        const message = res.data.message;
        const id = res.data.id;
        alert(message+"\n The id is "+id);
      }).catch(err=>{alert(err.response.data.error)});
    }
  }

  return (
    <View style={globalStyles.container}>
      <TextInput 
        placeholder="Description"
        onChangeText={(data)=>setDescription(data)}
      />

      <TextInput
        placeholder="Deadline"
        onChangeText={(data)=>setDeadline(data)}
      />
      
      <Button 
        title="Create Task"
        onPress={()=>postTask()}/>

        <StatusBar style="auto"/>
    </View>
  );
}

