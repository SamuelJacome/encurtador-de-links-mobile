import React, {useState} from 'react';
import { View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

export default function encurtadorURL() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const short = async () => {
    if(url.includes('https://')|| url.includes('https://')){
      await fetch(`https://cutt.ly/api/api.php?key=fea068531673e58fa06dd7131461ed0013904&short=${url}&name=${name}`)
      .then(async res =>{
        const data = await res.json();
        if(data.url.status === 3 ){
          alert('Esse nome já está em uso, escolha outro');
            return;
        }
        if(data.url.status === 2){
          alert('url invalida');
          return;
        }
        setUrlFinal(data.url.shortLink);
        Keyboard.dismiss();
      })
    }
  }

  function copyUrl(){
    Clipboard.setString(urlFinal);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {styles.container}>
      <Text style = {styles.title}>url
        <Text style = {{ color: '#1076F7'}}>Sujeito</Text>
      </Text>

      <TextInput style = {styles.urlInput} 
      onChangeText={(texto) => setUrl(texto)}
      value={url}
      placeholder="Digite a url"
      />

    <TextInput style = {styles.urlInput} 
      onChangeText={(texto) => setName(texto)}
      value={name}
      placeholder="Nome personalizado"
      />

 
    <TouchableOpacity onPress={()=> short()} style={styles.shortBtn}>
      <Text style = {{ color: '#FFF', fontWeight: 'bold', fontSize: 20, }}>Encurtar</Text>
    </TouchableOpacity>


    <TouchableWithoutFeedback onPress={ urlFinal ? copyUrl: () => {}}>
      <Text style={styles.finalUrl}>{urlFinal}</Text>
    </TouchableWithoutFeedback>
    </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color:'#21243d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,

  },

  urlInput:{
    height: 50,
    width: '80%',
    borderColor: '#21243d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    fontSize: 20,
  },

  shortBtn:{
    backgroundColor: '#1076F7',
    borderRadius: 4 ,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalUrl:{
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center'
    
  }
})


// --primary-color: #7259c1;
// --secondary-color: #F7DF1E;