import { useEffect, useState } from "react";
import { Text,FlatList, View, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../../styles/global";
import Card from "../../components/card";
import axios from "axios";

export default function TaskDetail({route}){
    const [members,setMembers] = useState([]);
    const [selected,setSelected] = useState("");
    const [description,setDescription] = useState('');
    const [deadline,setDeadline] = useState('');
    const [status,setStatus] = useState('');
    const [assignedTo,setAssignedTo] = useState([]);
    const taskId =  route.params.taskId;
    const projectId =  route.params.projectId;
    const userId =  route.params.userId;

    const getTask = ()=>{
        // axios.get(`http://159.223.55.171:3000/task/${taskId}`)
        axios.get(`http://159.223.55.171:3000/task/${taskId}`)
        .then(res=>{
            console.log(res.data.task.assignedTo)
            setDescription(res.data.task.description);
            setDeadline(res.data.task.deadline);
            setStatus(res.data.task.status);
            setAssignedTo(res.data.task.assignedTo);
        }).catch(err=>console.log(err));
    }

    const getMembers = ()=>{
        axios.get(`http://159.223.55.171:3000/project/${projectId}`)
        .then((res) => {
          console.log(res.data)
          const users = res.data.users.map((user) => {
            return{ 
              key: user._id,
              value: user.name,
            };
          });
          setMembers(users);
        })
        .catch((error) => console.log(error));   
    }

    const assignTask = (newUser)=>{
        // axios.get(`http://159.223.55.171:3000/task/${taskId}`)
        axios.put(`http://159.223.55.171:3000/task/${taskId}`,{adminId:userId,newUser})
        .then(res=>{
            alert("Successfully assigned");
            getTask();
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        getTask();
        getMembers();
    },[]);

    return(
        <View style={globalStyles.container}>
            <Card>
                <Text style={globalStyles.titleText}>{name}</Text>
                <Text>{description}</Text>
                <Text>{status}</Text>
                <Text>{deadline}</Text>
                <FlatList
                    data={assignedTo}
                    keyExtractor={(item)=>item._id}
                    renderItem={({item})=>(<Text>{item.name}</Text>)}
                />
                <Card>
                    <SelectList
                        setSelected={setSelected}
                        data={members}
                        placeholder="Select Member"
                    />

                    <Button
                      color="maroon"
                      title="Submit"
                      onPress={()=>assignTask(selected)}
                    />
                </Card>
            </Card>
        </View>
    )
}