import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateTask,ProjectDetail,Login,Register,Profile,UploadAttachment,AddMembers,ProjectList,TaskDetail } from './pages/index';

export default function App(){
  const Stack =  createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        {/*Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          option = {{
            title:'Login',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Register */}
        <Stack.Screen
          name="Register"
          component={Register}
          option = {{
            title:'Register',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />


        {/* Profile */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          option = {{
            title:'Profile',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Project  List*/}
        <Stack.Screen
          name="Project List"
          component={ProjectList}
          options = {{
            title:'Project List',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Project Detail  */}
        <Stack.Screen
          name="Project Detail"
          component={ProjectDetail}
          option={{
            title:'Project Detail',
              headerStyle: {
                backgroundColor: "coral",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
        />

        {/* Create Task */}
        <Stack.Screen
          name="Create Task"
          component={CreateTask}
          option={{
            title:'Create Task',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Task Detail */}
        <Stack.Screen
          name="Task Detail"
          component={TaskDetail}
          option={{
            title:'Create Task',
            headerStyle: {
              backgroundColor: "coral",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const HomeScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//     <Text>Task Management App</Text>
//     <Button
//       title="Login"
//       onPress={() =>
//         navigation.navigate('Login')
//       }
//     />
    
//     <Button
//       title="Profile"
//       onPress={() =>
//         navigation.navigate('Profile',{userId:'63c61418b63f8405dfa6a435'})
//       }
//     />
//     <Button
//       title="Register"
//       onPress={() =>
//         navigation.navigate('Register')
//       }
//     />
//     <Button
//       title="CreateTask"
//       onPress={() =>
//         navigation.navigate('CreateTask',{projectId:'63c6de892ca15d50be60e2a8'})
//       }
//     />
//     <Button
//       title="AddMembers"
//       onPress={()=>
//         navigation.navigate('AddMembers',{adminId:'63c61418b63f8405dfa6a435',taskId:'63d7350f06f6e84bc09688af'})
//       }
//     />
//     <Button
//       title="Project Detail"
//       onPress={() =>
//         navigation.navigate('ProjectDetail',{projectId:'63c6de892ca15d50be60e2a8'})
//       }
//     />
//     <Button
//       title="Upload Attachement"
//       onPress={() =>
//         navigation.navigate('UploadAttachment',{projectId:'63c6de892ca15d50be60e2a8'})
//       }
//     />
//     <Button
//       title="Test"
//       onPress={() =>
//         navigation.navigate('Test')
//       }
//     />
//     </View>
//   );
// };

// //JSONPLACEHOLDER
// const Test = ()=>{
//   const [data,setData] = React.useState({});
//   async function getData(){
//     const response =  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     console.log(response)
//     setData(response);
//   } 
//   React.useEffect(()=>{
//     getData();
//   },[]);
//   if(Object.keys(data).length>0){
//     return <Text>{data.data.title}</Text>
//   }else{
//     return <Text>Loading...</Text>
//   }
  
// }



