import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App({ route, navigation }) {

    const barbershop = route.params;

    const [origin, setOrigin] = useState({
        latitude: parseFloat(barbershop.latitude),
        longitude: parseFloat(barbershop.longitude),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{barbershop.name}</Text>
            <Text style={styles.normalText}>{barbershop.description}</Text>
            <Text style={styles.normalText}>Teléfono: {barbershop.phone}</Text>
            <Text style={styles.normalText}>Dirección: {barbershop.address}</Text>

            <MapView style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                }}>
                <Marker coordinate={origin} />
            </MapView>

            <View style={{ paddingTop: 30 }}>
                <Button style={{ padding: 20 }}
                    onPress={() => navigation.navigate('BarbershopDetail', barbershop)}
                    title="Reservar cita"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    map: {
        width: '100%',
        height: '40%'
    },
    logo: {
        width: 50,
        height: 50,
    },
    description: {
        color: '#3a3a3a',
        fontSize: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 0,
    },
    normalText: {
        paddingTop: 10,
        paddingBottom: 10
    }
});