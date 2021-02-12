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







export default class Wallet extends Component{
  state={
    'amount':null,
    data:{}
  }

  componentDidMount(){
    this.WalletFetchHandler()
  this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.WalletFetchHandler();
        }
      );
    }


  WalletFetchHandler = async() =>{
    let token   = await AsyncStorage.getItem('token')
    let res     = await axios.get("http://100.25.15.160/ewallet/detail/",{
      headers:{
        "Authorization":token
      }
    })
    this.setState({data:res.data})
  }

  

  componentWillUnmount() {
      this.willFocusSubscription.remove();
  }



  addMoneyHandler =async()=>{
    if(this.state.amount>1){
        this.props.navigation.navigate('addMoney',{id:this.state.data.id,amount:this.state.amount})
       
    }else{
     await Toast.show('AMOUNT SHOULD BE GREATER THAN 1 DOLLAR')
  }
  }


  render(){
    if(false){
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
            <View style={{margin:10,alignItems:'center',justifyContent:"center"}}>
              <Button onPress={()=>{this.props.navigation.navigate('payMoney')}}
                      color="red"
                      style={{color:"orange",margin:5}}
                      title="Pay Money"/>
            </View>
            <View style={{height:250,padding:10,margin:15,backgroundColor:'#17baa1',elevation:2,borderRadius:5}}>
              <Text style={{fontSize:20,color:"#ffffff"}}>{this.state.data.wallet_id}</Text>
              <View style={{flexDirection:'row',alignItems:"center",justifyContent:"center"}}>
                <Icon style={{color:"leather",padding:12}}  
                                    size={100}name="ios-wallet" 
                                    onPress={()=>{this.props.navigation.goBack()}}/>
                <Text style={{fontSize:35}}>Wallet Money</Text>
              </View>
               <View style={{flexDirection:'row',alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:40,color:"#ffffff"}}> $ </Text>
                <Text style={{fontSize:40,color:"#ffffff"}}>{this.state.data.money}</Text>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:"#e0ffff",padding:10,margin:15,borderRadius:5}}>
              <Text>Add Money To Wallet</Text>
              <TextField
                      labelFontSize={15}
                      tintColor="orange"
                      baseColor="#17baa1"
                      label="Amount"
                      value={this.state.amount}
                      onChangeText={(value) =>{this.setState({amount:value})}}/>
               <Button onPress={this.addMoneyHandler}
                  color="orange"
                  style={{color:"orange"}}
                  title="Add Money"/>
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