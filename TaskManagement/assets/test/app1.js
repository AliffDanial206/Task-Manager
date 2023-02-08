import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <ScrollView >
      <Text>This is an app</Text>
    
      <View style={styles.container}>
        <Text>A picture of a cat</Text>
        {/* image */}
        <Image source={{
          uri:'https://reactnative.dev/docs/assets/p_cat2.png',
          }} 
          style={styles.image}
        />
      </View>
      
      <TextInput
        style={styles.textInput}
        defaultValue="This is an input text"
      />


    </ScrollView>
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
