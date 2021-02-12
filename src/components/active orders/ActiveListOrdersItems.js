import React from 'react';
import axios from 'axios';
import { View , Text ,TouchableOpacity , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





class  ActiveList extends React.Component{


	state={
		data:this.props.data,
		cart:this.props.data.cart,
		product:this.props.data.cart.product,
		token:"",
		loading:false

	}


	componentDidMount(){
	    this.getTokenhandler()
	  }

	  async getTokenhandler(){
	      var self= this;
	      let token = await AsyncStorage.getItem('token')
	      this.setState({token:token})
	    }

	AcceptOrderHandler = async()=>{
		this.setState({loading:true})
		let token = await AsyncStorage.getItem('token')
		let res   = await axios.get(this.state.data.accept_order,{
				headers:{Authorization:token}
			})
		this.setState({loading:false})
		alert(res.data.message)
		this.props.fun()
	}

	RejectOrderHandler = async() =>{
		this.setState({loading:true})
		let token = await AsyncStorage.getItem('token')
		let res   = await  axios.get(this.state.data.cancel_order,{
				headers:{Authorization:token}
			})
		this.setState({loading:false})
		alert(res.data.message)
		this.props.fun()
	}

	productMapHandler(){
		var data = this.state.product
		return this.state.product.map((t,key)=>{
			return(
				<View key={key} style={styles.container}>
					<ListItem  >
						<View  style={{backgroundColor:"#fff"}}>
							<Image style={styles.imgStyle}
							source={{uri:t.product.product_image}}/>
							
						</View>
						<View key={key} style={{margin:5,flex:1}} >
							<Text style={{marginLeft:50}}>{t.product.product_name}</Text>
							<Text style={{marginLeft:50,color:"#17baa1",fontSize:15,fontWeight:"bold"}}>${t.product.product_price}</Text>
							<View style={{flexDirection:"row",marginLeft:50}}>
								<Text>Qty : {t.quantity}</Text>
				
							</View>
						</View>
					</ListItem>
				</View>

				)
		}
		)
	}

	render(){
		
	if(this.state.loading){
			return (
            <View style={styles.container}>
            	<View style={styles.activityStyle}>
	                <ActivityIndicator size="large" color="#17baa1" />
	                <StatusBar barStyle="default" />
                </View>
            </View>
        )
		}
		else{
			return(
				<TouchableOpacity style={{backgroundColor:"#eee"}} onPress={()=>{this.props.navigation.navigate('activeDetail',{data1:this.props.data})}}>
				<View style={{backgroundColor:"#fff",padding:10,margin:10,elevation:3}}>
					<View style={{flexDirection:"row",padding:10,justifyContent:"center"}}>
						<Text style={{textDecorationLine:"underline",fontSize:23,color:"#17baa1"}}>Order ID: </Text>
						<Text style={{color:"orange",fontSize:20}}>{this.state.data.order_id}</Text>
					</View>
					{this.productMapHandler()}
					<View style={{alignItems:'center'}}>
							<Text style={styles.SummaryStyle}> Order Summary</Text>
								<ListItem>
									<Text>Total Items :-{this.state.cart.total_items}</Text>
								</ListItem>
								
						</View>
				</View>
				</TouchableOpacity>
				)
			}
	}
}

export default ActiveList;



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
	container:{
		backgroundColor:'#e0ffff',
		margin:5,
		
		borderColor:"#e0ffff",
		borderWidth:2,
		elevation:3


},
imgStyle:{
	height:100,
	width:100,
	borderWidth:2,
	borderColor:"#eee"

},
SummaryStyle:{
		alignItems:"center", 
		color:"grey"},

buttonStyle:{
	flexDirection:"row",
	backgroundColor:"#17baa1",
	alignItems:"center",
	padding:5,
	borderRadius:5
	},
buttonStyle2:{
	flexDirection:"row",
	backgroundColor:"red",
	alignItems:"center",
	padding:5,
	borderRadius:5
	},
}



