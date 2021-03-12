import React, { useState, useEffect } from 'react'
/* import { Fragment } from 'react'; */
/* import ReactDOM from 'react-dom' */
/* import { FlatList, Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native' */
import { ActivityIndicator, FlatList, StyleSheet, Text, View, } from 'react-native'

/* import { FlatList } from 'react-native-gesture-handler'; */
import { http } from '../../libs/http'
import { colors } from '../../res/colors';
import { CoinSearch } from './CoinSearch';
import { CoinsItem } from './CoinsItem';

export const CoinsScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allCoins, setAllCoins] = useState([]);
    

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const coins = await http.instance.get('https://api.coinlore.net/api/tickers/')
            /* .then(Response => {
                
            }) */
            const coinsData = coins.data;
            setData(coinsData);     
            setAllCoins(coinsData);       
            setLoading(false);
            console.log('aqui es',coins)
            
        }
        getData();
        
       
        /* console.log(`coins ${data}`);  descubrir porque no puedo hacer el template string
        console.log(data);  */
        /* fetch('https://api.coinlore.net/api/tickers/')
            .then(res => res.json())
            .then(response => {
                setData(response)
            }) */


    }, []);
    
    const { navigate } = navigation;

    const handlePress = (coin) => {
        console.log('Go to detail')
        navigate('CoinDetail', {coin});
    }    

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
            coin.symbol.toLowerCase().includes(query.toLowerCase());
        });
        setData(coinsFiltered);
    }
    /* const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    ); */

    return (
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch} />
            {
                loading
                ? <ActivityIndicator color='black' size='large' style={styles.loader}/>
                : null
            }
            <FlatList
                data={data}
                /* renderItem={renderItem}  */
                renderItem={({item}) => <CoinsItem item={item} onPress={() =>handlePress(item)} />}
                /* keyExtractor={item => item.id}  */
            />
        </View>
        /* <SafeAreaView style={styles.container}>
            {console.log(data)}
            <FlatList
                data={data}
                /* renderItem={renderItem} 
                renderItem={({item}) => <Text style={styles.title}>{item.name}</Text>}
                /* keyExtractor={item => item.id} 
            />
        </SafeAreaView> */
        

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blackPearl
    },

    tittleText: {
        color: "#000",
        textAlign: "center"
    },

    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },

    btnTxt: {
        color: "#fff",
        textAlign: "center"
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 32,
    },

    loader: {
        marginTop: 60
    }

})

/* class CoinsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Coin Screen</Text>
            </View >
        );
    }
}

export default CoinsScreen; */