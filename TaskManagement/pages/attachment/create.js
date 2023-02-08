import React, {useState } from "react";
import {Text,View,Button} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from 'axios';
import {SERVER} from '@env'; 

export default function UploadFile({navigation,route}){
  const [file,setFile] = useState();
  const projectId = route.params.projectId;
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
      fileUploaded.append('projectId',projectId);
      axios.post(`http://159.223.55.171:3000/attachment/create`,fileUploaded)
      .then(res=>{
        alert(res.data.message);
        setFile();
      }).catch(err=>alert(err.response.data.error||"Something went wrong"));

    }
  };

  const uploaded = file?true:false;
  return (
    <View>
      <Text>Upload CSV File</Text>
      <View>
          {
           uploaded?
           (<Text>{file.name}</Text>):(<Text>No file Chosen</Text>)
          }
          <Button
            title="choose file"
            color="black"
            onPress={pickDocument}
          />
          <Button
            title="upload your file"
            color="black"
            onPress={uploadDocument}
          />
      </View>
    </View>
  );
};