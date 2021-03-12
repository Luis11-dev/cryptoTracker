import AsyncStorage from '@react-native-community/async-storage'

export class Storage {
    static  instance = new Storage();

    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.log(`storage Error: ${err}`);
            return false;
        }
    }

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log(`storage get Error: ${err}`);
            throw Error(err);
        }
    }

    multiget = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log(`storage multiget Error: ${err}`);
            throw Error(err);
        }
    }

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (err) {
            console.log(`storage getAllKeys Error: ${err}`);
            throw Error(err);
        }
    }

    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (err) {
            console.log(`storage remove Error: ${err}`);
            return false;
        }
    }
}