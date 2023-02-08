import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";

export default function AddProjectForm({ addProject }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addProject(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Project Name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder="Project Description"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />

            <Button
              color="maroon"
              title="Submit"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}