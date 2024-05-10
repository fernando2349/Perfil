import React, { useState, useEffect } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



const { height } = Dimensions.get('window');

export default function App() {
  const [description, setDescription] = useState('Descripción');
  const [editMode, setEditMode] = useState(false);
  const [backgroundImageUri, setBackgroundImageUri] = useState(require('./assets/background.png'));
  const [profileImageUri, setProfileImageUri] = useState(require('./assets/chef.jpeg'));
  const [personName, setPersonName] = useState('Nombre de la persona');
  const [phoneNumber, setPhoneNumber] = useState('123456789'); 
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState('');
  const [formPersonName, setFormPersonName] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // No es necesario realizar ninguna acción cuando el teclado se muestra
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // No es necesario realizar ninguna acción cuando el teclado se oculta
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveDescription = () => {
    console.log('Descripción guardada:', description);
    setEditMode(false); 
  };

  const savePhoneNumber = () => {
    console.log('Número de celular guardado:', phoneNumber);
    setEditMode(false); 
  };

  const selectBackgroundImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permisos insuficientes', 'Se necesita permiso para acceder a la galería de imágenes');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      const selectedImageUri = pickerResult.assets[0].uri;
      setBackgroundImageUri({ uri: selectedImageUri });
    } else {
      console.log('Selección de imagen cancelada');
    }
  };

  const selectProfileImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permisos insuficientes', 'Se necesita permiso para acceder a la galería de imágenes');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      const selectedImageUri = pickerResult.assets[0].uri;
      setProfileImageUri({ uri: selectedImageUri });
    } else {
      console.log('Selección de imagen cancelada');
    }
  };

  const handleFormPersonNameChange = (newName: string) => {
    setFormPersonName(newName);
    setPersonName(newName);
  };
  

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      
      <View style={styles.backgroundContainer}>
        <Image
          source={backgroundImageUri}
          style={styles.backgroundImage}
        />
      </View>
      <TouchableOpacity style={styles.profileContainer} onPress={selectProfileImage}>
        <Image
          source={profileImageUri}
          style={styles.profileImage}
        />
        <View style={styles.profileNameContainer}>
       
          <Text style={styles.profileName}>{personName}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton} onPress={toggleEditMode}>
        <MaterialIcons name="more-vert" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Perfil</Text>
        <View style={styles.inputContainer}>
        <Image
            source={{ uri: "https://i.pinimg.com/236x/eb/26/db/eb26db4e1e95322eca0e636d5187cc31.jpg" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formPersonName}
            onChangeText={handleFormPersonNameChange}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
        <Image
            source={{ uri: "https://i.pinimg.com/236x/4d/00/8b/4d008b130bfc3d54968c88e9cf93c53b.jpg" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
        <Image
            source={{ uri: "https://i.pinimg.com/236x/da/d2/9b/dad29b5b6763ed2b27421910b1b39748.jpg" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
        <Image
            source={{ uri: "https://i.pinimg.com/236x/f0/f6/58/f0f658ffaba2814e227003c9f1c004e9.jpg" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: "https://i.pinimg.com/236x/47/3b/be/473bbe699bf984150689eb586d448c0b.jpg" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram"
            value={instagram}
            onChangeText={setInstagram}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
        <Image
            source={{ uri: "https://www.flaticon.es/icono-gratis/viber_152851?related_id=226277&origin=search" }}
            style={styles.socialIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Twitter"
            value={twitter}
            onChangeText={setTwitter}
            editable={editMode}
          />
        </View>
        {editMode && (
          <TouchableOpacity style={styles.saveButton} onPress={savePhoneNumber}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsButton: { // los 3 puntos que sirven para editar 
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileContainer: { // imagen 
    position: 'absolute',
    top: 50,
    left: 100,
    alignItems: 'center',
  },
  profileImage: { // imagen 
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: { //Nombre del fotografo 
    color: 'black',
    marginTop: 10,
    fontSize: 18,
  },
  backgroundContainer: {  // imagen del fondo 
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  form: { // contenedor 
    width: '80%',
    height: '55%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    bottom: 50,
  },
  formTitle: {
    fontSize: 20, // perfil 
    fontWeight: 'bold',
    marginBottom: 20, // espacio estre el perfil y el Nombre 
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,// espacios entre Nombre, descripcion etc 
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    flex: 0.8, // largo de la linea 
    fontSize: 16, //letra 
    color: 'black',
    borderBottomWidth: 1, // grosor de las lineas 
    borderBottomColor: 'gray',
    paddingBottom: 0.2,
    marginLeft: 1, // ancho entre los iconos y las lineas 
  },
  saveButton: {
    alignSelf: 'center', // Alinea el botón al centro horizontalmente
    backgroundColor: 'orange', // Solo un color de ejemplo, puedes ajustarlo según sea necesario
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20, // Agrega un poco de margen desde el campo de entrada anterior
  },
  
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  socialIcon: { //iconos
    width: 25,
    height: 25,
    marginRight: 15,
    marginLeft: 30,
  },
});
