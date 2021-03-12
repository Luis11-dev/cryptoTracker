import React, { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Storage } from '../../libs/storage'
import { colors } from '../../res/colors'
import { FavoritesEmptySCreen } from './FavoritesEmptyState'
import {CoinsItem} from '../Coins/CoinsItem'

export const FavoritesScreen = ({navigation}) => {

    console.log('renderizando...');
    console.log(navigation);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        console.log('inició el efecto');
        const getFavorites = async () => {
            try {
                const allKeys = await Storage.instance.getAllKeys();
                console.log('ya se resolvió el getAllKeys');
                const keys = allKeys.filter((key) => key.includes('favorite -'));
                console.log("allkeys", allKeys);
                console.log("keys", keys);
                const favs = await Storage.instance.multiget(keys);
                const favoritos = favs.map((fav) => JSON.parse(fav[1]));
                console.log('favs', favoritos);
                setFavorites(favoritos);
                console.log('favorites', favorites);
                
            } catch (error) {
                console.log('get favorites error: ', error)
            }
        }
        /* getFavorites(); */
        navigation.addListener('focus', getFavorites);
        return () => navigation.removeListener('focus', getFavorites);
        
    }, [])

   
    const handlepress = (coin) => {
        navigation.navigate('CoinDetail', {coin})
    }

    return (
        <View style={styles.container}>
            {
                favorites.length === 0 
                ? <FavoritesEmptySCreen />
                : null
            }

            {
                favorites.length > 0
                ? <FlatList
                    data={favorites}
                    renderItem={({item}) => 
                        <CoinsItem 
                            item={item}
                            onPress={() => handlepress(item)}
                        />
                    }
                  />
                : null
            }

            {console.log('acabo el renderizado')}
        </View>  
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1
    }
})