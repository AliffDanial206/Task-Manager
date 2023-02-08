import React from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { SelectList } from "react-native-dropdown-select-list";
import {SERVER} from '@env'; 

export default function AddMemberForm({ addMember }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios.get(`http://159.223.55.171:3000/user/`)
      .then((res) => {
        console.log(res.data.users)
        let users = res.data.users.map((user) => {
          return{ 
            key: user._id,
            value: user.name,
          };
        });
        setMembers(users);
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <View style={globalStyles.container}>
          <SelectList
            setSelected={setSelected}
            data={members}
            placeholder="Select Member"
            // onSelect={() => alert(selected)}
          />

          <Button
            color="maroon"
            title="Submit"
            onPress={()=>addMember(selected)}
          />
    </View>
  );
}