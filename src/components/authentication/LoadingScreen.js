import React from 'react'
import { View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'

export default class AuthLoadingScreen extends React.Component {

    constructor() {
        super();
        this._bootstrap();
    }

    _bootstrap = async () => {

        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.activitycontainer}>
                <View style={styles.activityStyle}>
                    <ActivityIndicator size="large" color="#17baa1" />
                    <StatusBar barStyle="default" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityStyle:{
        padding:30,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:"#eee",
        borderColor:"#17baa1"

    },
    activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});