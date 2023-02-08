import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Keyboard,
  FlatList
} from "react-native";
import { globalStyles } from "../../styles/global";
import Card from '../../components/card';
import { Ionicons } from "@expo/vector-icons";
import AddMemberForm from "./addMemberForm";
import AddTaskForm from "./addTaskForm";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

export default function ProjectDetail({ navigation,route }) {
  const { userId,id,name,description } = route.params;
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(true);
  const [members,setMembers] = useState([]);
  const [tasks,setTasks] = useState([]);
  const [file,setFile] = useState();
  const [attachments,setAttachments]=useState([]);

  useEffect(()=>{
    getMembers();    
    postTasks();
    postAttachements();
  },[]);

  const postAttachements = ()=>{
  
    axios.post(`http://159.223.55.171:3000/attachment/`,{project:id})
    .then(res=>{setAttachments(res.data.attachments)})
    .catch(err=>console.log(err))
  }

  const pickDocument = () => {
    DocumentPicker.getDocumentAsync({type:['application/pdf','image/jpeg','audio/mpeg']})
    .then(result=>{
      console.log(result);
      setFile(result);
    }).catch(err=>console.log(err));
  };

  const uploadDocument = () =>{
    if(!file){
      alert("No attachment chosen");
    }else{     
      let fileUploaded = new FormData();
      fileUploaded.append('file',file.file);
      fileUploaded.append('projectId',id);
      axios.post(`http://159.223.55.171:3000/attachment/create`,fileUploaded)
      .then(res=>{
        alert(res.data.message);
        setFile();
        postAttachements();
      }).catch(err=>alert(err.response.data.error||"Something went wrong"));
    }
  };

  const getMembers = ()=>{
    axios.get(`http://159.223.55.171:3000/project/${id}`)
    .then(res=>{setMembers(res.data.users)})
    .catch(err=>console.log(err));
  };

  const postTasks = ()=>{
    axios.post(`http://159.223.55.171:3000/task/`,{projectId:id})
    .then(res=>{
      setTasks(res.data.tasks)
    })
    .catch(err=>console.log(err));
  };

  const addMember = (memberId) => {
    axios.put(`http://159.223.55.171:3000/project/${id}`,{member:memberId})
    .then((res) => {
      getMembers()
    })
    .catch((error) => console.log(error));
    setModalStatus(false);
  };

  const addTask = (task)=>{
    if(!task.description || !task.deadline){
      alert("Please fill in all field");
    }else{
      axios.post(`http://159.223.55.171:3000/task/create`,
      {
       projectId:id,
       description:task.description,
       deadline:task.deadline
      }).then(res=>{
        postTasks();
        setModalStatus(false);
        alert(res.data.message+"\n The id is "+res.data.id);
      }).catch(err=>{alert(err.response.data.error)});
    }
  }

  const uploaded = file?true:false;
  return (
    <View style={globalStyles.container}>
      <Modal visible={modalStatus} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Ionicons
              name="close-sharp"
              size={50}
              color="black"
              style={styles.modalToggle}
              onPress={() => setModalStatus(false)}
            />
           {selectedComponent?
            (<AddMemberForm addMember={addMember} />):
            (<AddTaskForm addTask={addTask} />)
           } 
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Card>
        <Text style={globalStyles.titleText}>{name}</Text>
        <Text>{description}</Text>
        <Card>
        <TouchableOpacity onPress={() => {
          setModalStatus(true)
          setSelectedComponent(true)
          }}>
          <View style={globalStyles.clickAddMember}>
            <Text style={styles.addText}>Add Member</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={members}
          keyExtractor={(item)=>item._id}
          renderItem={({item})=>(<Text>{item.name}</Text>)}
        />
        </Card>
        <Card>
        <TouchableOpacity onPress={() => {
          setModalStatus(true)
          setSelectedComponent(false)
        }}>
          <View style={globalStyles.clickAddMember}>
            <Text style={styles.addText}>Add Task</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(item)=>item._id}
          renderItem={({item})=>(
            <TouchableOpacity
              onPress={()=>{
                navigation.navigate("Task Detail",{userId,projectId:id,taskId:item._id})
              }}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
        </Card>
        <Card>
        <Text style={globalStyles.titleText}>Upload Attachment</Text>
        {
           uploaded?
           (<Text>{file.name}</Text>):(<Text>No file Chosen</Text>)
        }
        <TouchableOpacity
         onPress={pickDocument}
        >
          <View style={globalStyles.clickAddMember}>
            <Text style={styles.addText}>Choose File</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={uploadDocument}
        >
          <View style={globalStyles.clickAddMember}>
            <Text style={styles.addText}>Upload</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={attachments}
          keyExtractor={(item)=>item._id}
          renderItem={({item})=>(
              <TouchableOpacity>
              <Text>{item.name}</Text>
              </TouchableOpacity>
          )}
        />
        </Card>
        <TouchableOpacity
          onPress={()=>{
            axios.delete(`http://159.223.55.171:3000/project/${id}`)
            .then(res=>navigation.push("Project List",{userId}))
          }}
        >
          <Text style={styles.delText}>Delete Project</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  addText:{
    color:"green"
  },
  delText:{
    color:"red"
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});