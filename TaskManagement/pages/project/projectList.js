import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../components/card";
import AddProjectForm from "./addProjectForm";
import axios from "axios";
import {SERVER} from '@env'; 

export default function ProjectList({ navigation,route }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [project, setProject] = useState([]);
  
  useEffect(() => {
    postProject();
  }, []);

  const postProject = () => {
    axios.post(`http://159.223.55.171:3000/project/`,{userId:route.params.userId})
      .then((res) => {
        const response = res.data;
        setProject(response.data);
      })
      .catch((error) => console.log(error));
  };

  const addProject = (project) => {
    const data = {
      name: project.name,
      description: project.description,
      administrator:route.params.userId ,
    };
    axios.post(`http://159.223.55.171:3000/project/add`,{data})
    .then((res) => {
      postProject();
      console.log(res.data);
    })
    .catch((error) => console.log(error));
    setModalStatus(false);
  };

  

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
            <AddProjectForm addProject={addProject} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Ionicons
        name="add-sharp"
        size={50}
        color="black"
        style={styles.modalToggle}
        onPress={() => setModalStatus(true)}
      />

      <FlatList
        keyExtractor={(item) => item._id}
        data={project}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Project Detail", {
                userId:route.params.userId,
                id: item._id,
                name: item.name,
                description: item.description,
              })
            }
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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