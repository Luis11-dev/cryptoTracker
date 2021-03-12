import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const FavoritesEmptySCreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }
})