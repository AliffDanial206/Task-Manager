import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TextInput, View, Button } from 'react-native';

//components
const Label = (props) => {
  return (
    <View>
      <Text>This is a picture of {props.name}</Text>
    </View>
  );
};

const FavouriteFood = (props)=>{
  const [food,setFood] =  useState('fish');
  return(
    <View>
      <Text>{props.name} loves to eat {food}</Text>
      <Button 
        onPress={()=>{
          if(food!="Friskies"){
            setFood("Friskies");          
          }else{
            setFood("fish");
          }
        }}
        title="Friskies?"
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
        <Text>This is an app</Text>
        <Label name="TOM"/>
        {/* image */}
        <Image source={{
          uri:'https://reactnative.dev/docs/assets/p_cat2.png',
          }} 
          style={styles.image}
        />
      <FavouriteFood name="TOM"/>
      <TextInput
        style={styles.textInput}
        defaultValue="This is an input text"
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:200,
    height:300,
  },
  textInput:{
    height:40,
    borderColor:'blue',
    borderWidth:1,
  }
});
