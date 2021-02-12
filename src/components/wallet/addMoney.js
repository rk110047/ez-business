import React, { Component } from "react";
import {StatusBar, ActivityIndicator, StyleSheet, View, Switch ,Button , Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Ionicons';







const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
   
    flex:1
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});


export default class AddPayment extends Component {
  state = { 
      useLiteCreditCardInput: false ,
      form :{},
      loading:false,
      data:{}
      };


  componentDidMount(){
      this.orderDetailHandler()
  }

  orderDetailHandler =async()=>{
    const {id} = this.props.navigation.state.params
    const {amount} = this.props.navigation.state.params
    let token = await AsyncStorage.getItem('token')
    this.setState({loading:false})

  }

  render() {
    const {id}      = this.props.navigation.state.params
    const {amount}  = this.props.navigation.state.params
    var url         = "https://management.ezswiftshops.com/billing/card-form-for-wallet/?amount="+amount+"&id="+id
    if(this.state.loading){
      return(
          <View style={{flex:1}}>
            <View style={styles.container1}>  
            <Icon style={{color:"#fff",padding:12}}  
                                size={30}name="md-arrow-back" 
                                onPress={()=>{this.props.navigation.goBack()}}/>
                          
          </View>
            <View style={styles.activitycontainer}>
                  <View style={styles.activityStyle}>
                      <ActivityIndicator size="large" color="#17baa1" />
                      <StatusBar barStyle="default" />
                    </View>
            </View>
          </View>
        )
    }
    else{
    return (
        <View style={{flex:1}}>
          <View style={styles.container1}>  
            <Icon style={{color:"#fff",padding:12}}  
                                size={30}name="md-arrow-back" 
                                onPress={()=>{this.props.navigation.goBack()}}/>
                          
          </View>
          <View style={s.container}>
                <Text style={{color:"purple",fontSize:20,alignSelf:"center",}}>
                                  This process may take some time 
                                      </Text>
                <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
          </View>
        </View>
    );
    }
  }
}

const styles= {
  container1:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"black"
  },
  activityStyle:{
    padding:30,
    // borderWidth:1,
    borderRadius:5,
    backgroundColor:"#ffffff",
    borderColor:"#17baa1"

  },
  activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}