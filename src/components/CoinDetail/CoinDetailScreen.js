import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { http } from '../../libs/http';
import { Storage } from '../../libs/storage';
import { colors } from '../../res/colors';
import { CoinMarketItem } from './CoinMarketItem'


export const CoinDetailScreen = ({ route, navigation }) => {

    console.log('renderizando...');
    const [loading, setLoading] = useState(false);
    const [coin, setCoins] = useState(route.params.coin);
    const [markets, setMarkets] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    /* const {navigate} = navigation; */
    useEffect(() => {
        console.log('ejecutando efecto para establecer titulo de moneda');
        navigation.setOptions({ title: coin.symbol })         
    }, []);

    useEffect(() => {
        console.log('ejecutando efecto para obtener mercados');
        const getMarkets = async (coinId) => {
            setLoading(true);
            const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
            const response = await http.instance.get(url);
            setMarkets(response);
            setLoading(false);
        }
        getMarkets(coin.id);

    }, []);

    useEffect(() => {
        console.log('ejecutando efecto para obtener favoritos');
        const getFavorite = async () => {
            try {
                console.log('ejecutando el getfavorite');
                const key = `favorite -${coin.id}`
                const favStr = await Storage.instance.get(key);
                console.log(`fav: ${favStr}`);
                if (favStr !== null) {
                    console.log(`fav: ${favStr}`);
                    setIsFavorite(true);
                    console.log('al realizar getfavorite', isFavorite);
                }
                else{
                    console.log('get favorite dice: ', favStr);
                }
            } catch (error) {
                console.log('get your favorite', error)
            }

            /* setIsFavorite(false); */
        }
        getFavorite();
    }, [])

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const addFavorite = async () => {
        const str_coin = JSON.stringify(coin);
        const key = `favorite -${coin.id}`
        const stored = await Storage.instance.store(key, str_coin);
        console.log(`stored: ${stored}`);
        if (stored) {
            setIsFavorite(true);
            console.log('Al agregar a favorito', isFavorite);
        }
    }

    const removeFavorite = async () => {
        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite -${coin.id}`;
                    await Storage.instance.remove(key);
                    setIsFavorite(false);
                },
                style: 'destructive'
            }
        ])
        
    }

    //intuyo que hay problemas de performance ya que se está renderizado 4 veces
    /* console.log('1 loading', loading)
    console.log('2 route:',route)
    console.log('3 coin:',coin)
    console.log('4 navigation', navigation)
    console.log('5 markets', markets) */

    const getImageIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
        }
    }

    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd]
            },

            {
                title: "Volume 24h",
                data: [coin.volume24]
            },

            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ];

        return sections;
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image style={styles.iconImg} source={{ uri: getImageIcon(coin.name) }} />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                {console.log('al renderizar el botón', isFavorite)}
                <Pressable
                    style={[styles.btnFavorite, isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd]}
                    onPress={toggleFavorite}
                >
                    <Text style={styles.btnFavoriteText}>{isFavorite ? 'Remove Favorite' : 'Add Favorite'}</Text>
                </Pressable>
            </View>

            <SectionList
                style={styles.section}
                sections={getSections(coin)}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                }
                renderSectionHeader={({ section }) =>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                }
            />

            <Text style={styles.marketsTitle}>Markets</Text>
            <FlatList
                style={styles.list}
                horizontal={true}
                data={markets}
                keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
                renderItem={({ item }) => <CoinMarketItem item={item} />}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade
    },

    row: {
        flexDirection: 'row'
    },

    subHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8
    },

    iconImg: {
        width: 25,
        height: 25
    },

    section: {
        maxHeight: 220
    },

    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8
    },

    sectionItem: {
        padding: 8
    },

    itemText: {
        color: colors.white,
        fontSize: 14
    },

    sectionText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },

    list: {
        maxHeight: 100,
        paddingLeft: 16
    },

    marketsTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },

    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },

    btnFavoriteAdd: {
        backgroundColor: colors.picton
    },

    btnFavoriteRemove: {
        backgroundColor: colors.carmine
    },

    btnFavoriteText: {
        color: colors.white
    }
})

