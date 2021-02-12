import React , {Component} from 'react';
import {View , Text , Button , TextInput ,  TouchableOpacity , ScrollView , ActivityIndicator ,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';



export default class PayMoney extends React.Component{
  state={
    amount:'',
    wallet_id:'',
    loading:false
  }

  payMoneyHandler = async()=>{
    this.setState({loading:true})
    if(this.state.amount&&this.state.wallet_id){
      let token   = await AsyncStorage.getItem('token')
      let res = await axios.get('http://100.25.15.160/ewallet/pay/?amount='+this.state.amount+'&wallet_id='+this.state.wallet_id,{
        headers:{
          Authorization:token
        }
      })
      Toast.show(res.data.message)
      this.setState({loading:false})
    }else{
      Toast.show('fields can not be empty')
      this.setState({loading:false})

    }
  }


  render(){
    if(this.state.loading){
      return (
        <View  style={{flex:1}}>
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
    return(
      <View style={{flex:1}}>
          <View style={styles.container1}>  
            <Icon style={{color:"#fff",padding:12}}  
                                size={30}name="md-arrow-back" 
                                onPress={()=>{this.props.navigation.goBack(null)}}/>
                          
          </View>
          <ScrollView>
        <View style={{flex:1,backgroundColor:"#e0ffff",padding:10,margin:15,borderRadius:5}}>
              <Text>Pay Money</Text>
              <TextField
                      labelFontSize={15}
                      tintColor="orange"
                      baseColor="#17baa1"
                      label="Wallet Id"
                      value={this.state.wallet_id}
                      onChangeText={(value) =>{this.setState({wallet_id:value})}}/>
               <TextField
                      labelFontSize={15}
                      tintColor="orange"
                      baseColor="#17baa1"
                      label="Amount"
                      value={this.state.amount}
                      onChangeText={(value) =>{this.setState({amount:value})}}/>
               <Button onPress={this.payMoneyHandler}
                  color="orange"
                  style={{color:"orange"}}
                  title="Pay Money"/>
            </View>
          </ScrollView>
        </View>
      )
    }
  }
}


const styles = {
        activityStyle:{
        padding:30,
        // borderWidth:1,
        borderRadius:5,
        backgroundColor:"#fff",
        borderColor:"#17baa1"

      },
      activitycontainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        mainContainer:{
          flex:1,
          padding:8,
          alignItems: 'center',
          justifyContent: 'center',
          // alignItems:"center"
          backgroundColor:"#fff",
        },
        container:{
          borderWidth:1,
          marginBottom:20,
          borderRadius:3,
          borderColor:"rgb(204, 204, 204)",
          backgroundColor:"rgb(245, 245, 245)",
          padding:15

        },
          container1:{
            width:"100%",
            flexDirection:"row",
            justifyContent:"space-between",
            backgroundColor:"black"
          },


}