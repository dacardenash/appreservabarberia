import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import * as Constants from '../screens/Constants';

let barbershopsBack = [];
let usedBarbershopBack = false;

export default function App() {

    const navigation = useNavigation();
    const [barbershops, setBarbershops] = useState([]);

    const Item = ({ title, address, urlImage, phone, barbershop }) => (
        <View style={styles.item}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: urlImage,
                }}
            />
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    <MaterialCommunityIcons name="google-maps" size={12} />
                    {address}
                </Text>
                <Text style={styles.description}>
                    <MaterialCommunityIcons name="phone" size={12} />
                    {phone}
                </Text>
            </View>
            <View style={{ alignSelf: 'flex-start', flexDirection: "row", justifyContent: "flex-end" }}>
                <Button style={{ display: 'flex', justifyContent: 'right' }}
                    onPress={() => navigation.navigate('BarbershopDetail', barbershop)}
                    title="Ver detalle"
                    accessibilityLabel="Ver detalle de la barbería"
                />
            </View>
        </View>
    );

    useEffect(() => {
        try {
            const unsubscribe = navigation.addListener('focus', () => {
                getBarbershops();
            });

            return unsubscribe;
        }
        catch (err) {
            console.error(err)
        }
    }, []);

    const getBarbershops = async () => {
        try {
            const response = await fetch(Constants.BARBERSHOP);
            const json = await response.text();
            const data = eval(json);
            setBarbershops(data);
        } catch (error) {
            console.error(error);
        }

    };

    const [parameterSearch, onChangeParameterSearch] = React.useState('');

    function onChangeParameter() {

        if (parameterSearch.length > 0) {
            if (usedBarbershopBack == false) {
                barbershopsBack = barbershops;
                usedBarbershopBack = true;
            }

            let barbershopsFiltered = barbershopsBack.filter(item =>
                item.name.toUpperCase().includes(parameterSearch.toUpperCase()));

            setBarbershops(barbershopsFiltered);
        }
        else {
            usedBarbershopBack = false;
            setBarbershops(barbershopsBack);
        }
    }

    return (
        <View>
            <View style={{ paddingVertical: 10, marginHorizontal: 10 }}>
                <TextInput style={styles.input}
                    maxLength={20}
                    label="Búsqueda"
                    cursorColor="black"
                    activeUnderlineColor="black"
                    activeOutlineColor="black"
                    value={parameterSearch}
                    onChangeText={onChangeParameterSearch} />
                <Button style={{}} onPress={onChangeParameter} title="Buscar" />
            </View>
            <FlatList nestedScrollEnabled
                data={barbershops}
                renderItem={({ item }) =>
                    <Item title={item.name}
                        address={item.address}
                        urlImage={item.logo.startsWith("http://localhost:8000") ?
                            item.logo.replace('http://localhost:8000', Constants.URL_DOMAIN) : item.logo}
                        phone={item.phone}
                        barbershop={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    item: {
        backgroundColor: 'white',
        //borderColor: '#009a9a',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        color: '#3a3a3a',
        fontSize: 11,
    },
    title: {
        fontWeight: 'bold',
    },
    input: {
        height: 60,
        backgroundColor: 'white',
    },
});
