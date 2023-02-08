import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";

export default function AddTaskForm({ addTask }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ description: "", deadline: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addTask(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Task Description"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder="Task Deadline"
              onChangeText={props.handleChange("deadline")}
              value={props.values.deadline}
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