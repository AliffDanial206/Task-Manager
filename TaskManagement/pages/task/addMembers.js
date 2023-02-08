import React,{ useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, TextInput, View, Button, FlatList,CheckBox, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import {SERVER} from '@env'; 
import { globalStyles } from '../../styles/global';

//functions
const putTask = (adminId,taskId,assignedTo)=>{
  if(assignedTo.length<1){
    alert("Please add a member!");
  }else{
    axios.put(`http://159.223.55.171:3000/task/${taskId}`,{adminId,assignedTo})
    .then(res=>{
      const message = res.data.message;
      alert(message);
    }).catch(err=>{console.log(err)});
  }
}

//components
const Form = ({adminId,taskId})=>{
  const [task,setTask] = useState();
  const [assignedTo,setAssignedTo] = useState([]);
   
  const getTask = (taskId)=>{ 
    axios.get(`http://159.223.55.171:3000/task/${taskId}`)
    .then(res=>{
        console.log(res);
        setTask(res.data.task);
    }).catch(err=>console.log(err.response.data.error));
  };

  const handlePress = (member)=>{
    if(assignedTo.includes(member._id) == false){
        setAssignedTo([...assignedTo,member._id]);
    }else{
        alert("user is already selected")
    }
  }
  
  useEffect(()=>{
    getTask(taskId);
  },[taskId]);

  if(!task) return(<Text>Loading....</Text>)
  return(
    <View style={globalStyles.container}>
      <Text>Task:{task.description}</Text>
      <Text>Assign to member:</Text>
      <FlatList
        data = {task.project.members}
        keyExtractor={member=>member._id}
        renderItem={member=>
          <Pressable onPress={()=>handlePress(member.item)}>
            <Text>{member.item.name}</Text>
          </Pressable>
        }
      />
      <Button 
        title="Assign"
        onPress={()=>putTask(adminId,taskId,assignedTo)}
      />

    </View>
  );
};


export default function AddMembers({navigation,route}) {
  return (
    <View style={globalStyles.container}>
        <Form 
         taskId={route.params.taskId}
         adminId = {route.params.adminId}
        />
        <StatusBar style="auto"/>
    </View>
  );
}

