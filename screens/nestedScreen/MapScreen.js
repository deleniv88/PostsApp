import { View, StyleSheet } from "react-native"
import MapView, {Marker} from "react-native-maps"
import React from "react";

export default function MapScreen({route}){

    console.log(route.params.longitude);
    console.log(route.params.latitude);

    return (
        <View style={styles.container} 
        >
            <MapView style={{flex:1}} 
            initialRegion={{ 
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta:0.001,
                longitudeDelta: 0.006
            }}>
                  <Marker coordinate={{latitude: route.params.latitude,
                  longitude: route.params.longitude}}
                  title="travel photo"></Marker>
            </MapView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})