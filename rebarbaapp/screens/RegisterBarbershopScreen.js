import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Constants from '../screens/Constants';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const mapRef = React.createRef();

  const [origin, setOrigin] = useState({
    latitude: 6.29347090403236,
    longitude: -75.57644050298424,
  });

  /*async function getGalleryPermission() {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === 'granted');
  }*/

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permiso denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const locationCurrent = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }

    setOrigin(locationCurrent);

    mapRef?.current?.animateToRegion({
      latitude: locationCurrent.latitude,
      longitude: locationCurrent.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log("seleccion imagen: " + result.assets[0].uri);

    setImage(result.assets[0]);
  }

  function registerBarbershop() {

    const formData = new FormData();

    if (image != null) {
      const uri =
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", "");

      console.log("uri" + uri);

      const filename = image.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(String(filename));
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      console.log("extension: " + ext)
      console.log("type:" + type)

      formData.append("image", { uri, name: `image.${ext}`, type });
    }

    formData.append("name", nameBarbershop);
    formData.append("address", address);
    formData.append("nit", nit);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("longitude", origin.longitude);
    formData.append("latitude", origin.latitude);

    fetch(Constants.BARBERSHOP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then(response => {
      response.json()
        .then(data => {
          console.log("respuesta: " + data);
          Alert.alert('Información', 'El registro fue guardado correctamente.');
          onChangeName('');
          onChangeAddress('');
          onChangeNit('');
          onChangePhone('');
          onChangeDescription('');
          setImage(null);
        });
    });
  }

  useEffect(() => {
    try {
      getLocationPermission();
      //getGalleryPermission();
    }
    catch (err) {
      console.error(err)
    }

  }, []);

  const [nameBarbershop, onChangeName] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [nit, onChangeNit] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [description, onChangeDescription] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        maxLength={100}
        label="Nombre barbería"
        mode="outlined"
        cursorColor="black"
        activeUnderlineColor="black"
        activeOutlineColor="black"
        value={nameBarbershop}
        onChangeText={onChangeName} />

      <TextInput style={styles.input}
        maxLength={100}
        label="Dirección"
        mode="outlined"
        cursorColor="black"
        activeUnderlineColor="black"
        activeOutlineColor="black"
        value={address}
        onChangeText={onChangeAddress} />

      <TextInput style={styles.input}
        maxLength={20}
        label="Nit"
        mode="outlined"
        cursorColor="black"
        activeUnderlineColor="black"
        activeOutlineColor="black"
        value={nit}
        onChangeText={onChangeNit} />

      <TextInput style={styles.input}
        maxLength={15}
        label="Teléfono"
        mode="outlined"
        cursorColor="black"
        activeUnderlineColor="black"
        activeOutlineColor="black"
        value={phone}
        onChangeText={onChangePhone} />

      <TextInput
        editable
        multiline={true}
        numberOfLines={5}
        maxLength={100}
        label="Descripción"
        mode="outlined"
        cursorColor="black"
        activeUnderlineColor="black"
        activeOutlineColor="black"
        value={description}
        onChangeText={onChangeDescription} />

      <View style={{ paddingTop: 20 }}>
        <Button
          onPress={() => pickImage()}
          title="Seleccionar imagen"
        />
      </View>

      <Text style={styles.textInfo}>* Asegúrese de que el
        <MaterialCommunityIcons name="google-maps" size={12} color={'red'} />
        marqué correctamente la ubicación de la barbería.</Text>

      <MapView style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}>
        <Marker coordinate={origin} />
      </MapView>

      <View style={{ paddingTop: 20 }}>
        <Button
          onPress={() => registerBarbershop()}
          title="Registrar"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '25%',
  },
  input: {
    marginBottom: 5,
    height: 40,
  },
  textInfo: {
    paddingTop: 5,
  }
});
