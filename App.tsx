import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { height } = Dimensions.get('window');

export default function App() {
  const [description, setDescription] = useState('Descripción');
  const [editMode, setEditMode] = useState(false);
  const [backgroundImageUri, setBackgroundImageUri] = useState(require('./assets/background.jpeg'));
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
          <MaterialIcons name="person" size={24} color="white" style={styles.icon} />
          <Text style={styles.profileName}>{personName}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton} onPress={toggleEditMode}>
        <MaterialIcons name="more-vert" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Perfil</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formPersonName}
            onChangeText={handleFormPersonNameChange}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="description" size={24} color="black" style={styles.icon} />
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
          <MaterialIcons name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={editMode}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
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
            source={{ uri: "https://i.pinimg.com/564x/d9/e6/77/d9e677d2a71a45536825168bde8e570d.jpg" }}
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
            source={{ uri: "https://i.pinimg.com/564x/2e/9e/63/2e9e63b534a6cef06f94eaf11d89ba86.jpg" }}
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
  optionsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    position: 'absolute',
    top: 100,
    left: 100,
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    color: 'white',
    marginTop: 10,
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
  },
  form: {
    width: '90%',
    height: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    bottom: 80,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 0.1,
    marginLeft: 10,
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
