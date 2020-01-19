import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })

            }
        }

        loadInitialPosition()
    }, [])

    if (!currentRegion)
        return null

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: 51.4662185, longitude: -0.3446582}}>
                <Image style={styles.avatar} source={{uri: 'https://avatars2.githubusercontent.com/u/1500873?s=460&v=4'}} />

                <Callout onPress={() => {
                    //navigation
                    navigation.navigate('Profile', { github_username: 'mhayk'})
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Mhayk Whandson</Text>
                        <Text style={styles.devBio}>Passionate about JavaScript, ReactJS, React Native, NodeJS and the entire ecosystem around these technologies.</Text>
                        <Text style={styles.devTechs}>ReactJS, React Native, Node.Js</Text>
                    </View>
                </Callout>
            </Marker>
            <Marker coordinate={{latitude: 51.475959, longitude: -0.1325432}}>
                <Image style={styles.avatar} source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQHSFXLQ9sGEvA/profile-displayphoto-shrink_200_200/0?e=1585180800&v=beta&t=jMOPZEM3Lv6ZO_aGqvhv1UKv0oThSxBchILZFsaalTY'}} />

                <Callout onPress={() => {
                    // navigation
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Alberto Iglesias</Text>
                        <Text style={styles.devBio}>Lindo, metrosexual, adora jogar volley, pagando faço tudo!</Text>
                        <Text style={styles.devTechs}>C#,.Net Framework e muito mais.</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    }

})

export default Main;