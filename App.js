import React, {useState} from 'react';
import { View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Keyboard,
  TouchableWithoutFeedback } from 'react-native';

// import { Container } from './styles';

// $json = file_get_contents(https://cutt.ly/api/api.php?key=[API_KEY]&short=[URL_YOU_WANT_SHORTEN]&name=[CUSTOM_URL_ALIAS]);
export default function encurtadorURL() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

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
        console.log(data);
      })
    }
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
      <Text style = {{ color: '#FFF' }}>Encurtar</Text>
    </TouchableOpacity>

      <Text style={styles.finalUrl}>https://culttly.com/NomeURLdele</Text>
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
    backgroundColor: '#ff7c7c',
    borderRadius: 20 ,
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