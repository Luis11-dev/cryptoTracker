import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../res/colors';
/* import { onChange } from 'react-native-reanimated'; */

export const CoinSearch = ({onChange}) => {

    const [query, setQuery] = useState('');

    const handleText = (query) => {
        setQuery(query);
        console.log(query);
        /* if (props.onchange) {
            props.onchange(query);            
        } */
        if (onChange) {            
            onChange(query)
        }
    }
    
    return (
        <View>
            <TextInput 
            style={[
                style.textInput,
                Platform.OS == 'android'
                ? style.textInputAndroid
                : style.textInputIOS
            ]}
            onChangeText={handleText}
            value={query}
            placeholder='search coin'
            placeholderTextColor='#fff'
            />
        </View>
    )
}

const style = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: colors.charade,
        paddingLeft: 16,
        color: '#fff'
    },

    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: colors.zircon
    },

    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
})