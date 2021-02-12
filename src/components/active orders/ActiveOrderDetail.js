import React from 'react';
import axios from 'axios';
import { View ,ScrollView, Text ,TouchableOpacity, Button , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import Toast from 'react-native-simple-toast';
import ListActiveOrderItems from './activeOrderProductListItem'


  




class  ActiveOrderDetail extends React.Component{


	state={
		data:{},
		customer:{},
		shipping:{},
		cart:{},
		product:[],
		delivery:{},
		token:"",
		loading:true

	}


	componentDidMount(){
	    this.getTokenhandler()
	  }

	  async getTokenhandler(){
	      var self= this;
	      let token = await AsyncStorage.getItem('token')
	      this.setState({token:token})
	      const {data1} 	=	this.props.navigation.state.params;
		  let res   = await  axios.get(data1.order_detail,{
				headers:{Authorization:token}
			})
	      this.setState({data:res.data})
	      this.setState({customer:res.data.customer})
	      this.setState({shipping:res.data.shipping_address})
	      this.setState({cart:res.data.cart})
	      this.setState({product:res.data.cart.product})
	      this.setState({delivery:res.data.delivery_person})
	      this.setState({loading:false})
	    }


	reloadFun =()=>{
		this.setState({loading:true})
		this.getTokenhandler()
		
	}


	productMapHandler(){
		// const {data} 	=	this.props.navigation.state.params;
		var data = this.state.product
		return this.state.product.map((t,key)=>{
			return(
				<ListActiveOrderItems data={t} key={key}/>

				)
		}
		)
	}
	
	orderReadyHandler = async() =>{
		this.setState({loading:true})
		let res    =	await axios.get(this.state.data.click_order_ready,{
			headers:{
				Authorization:this.state.token
			}
		})
		this.reloadFun()
		this.setState({loading:false})
		Toast.show(res.data.message)
	}

	orderShipHandler = async() =>{
		this.setState({loading:true})
		// console.warn(this.state.data)
		let res    =	await axios.get(this.state.data.ship_order,{
			headers:{
				Authorization:this.state.token
			}
		})
		this.reloadFun()
		this.setState({loading:false})
		Toast.show(res.data.message)
	}

	appointAHandler = async() =>{
		this.setState({loading:true})
		let res    =	await axios.get(this.state.data.click_appoint_collector,{
			headers:{
				Authorization:this.state.token
			}
		})
		this.reloadFun()
		this.setState({loading:false})
		Toast.show(res.data.message)
	}


	_handlePress = () => {
    Linking.openURL(`tel:${this.state.delivery.contact_number}`);
  };

  _handlePress2 = () => {
    Linking.openURL(`tel:${this.state.shipping.phone_number}`);
  };

   _handlePress3 = () => {
    Linking.openURL(`tel:${this.state.shipping.alternate_phone_number}`);
  };

 
	render(){
		
	if(this.state.loading){
			return (
            <View style={styles.container}>
            	<View style={styles.container1}>	
						<Icon style={{color:"#fff",padding:12}}  
	                         			size={30}name="md-arrow-back" 
	                         			onPress={()=>{this.props.navigation.goBack()}}/>
	                        
					</View>
            	<View style={styles.activityStyle}>
	                <ActivityIndicator size="large" color="#17baa1" />
	                <StatusBar barStyle="default" />
                </View>
            </View>
        )
		}
		else if(this.state.delivery!==null){
			return(
				<View style={{flex:1,backgroundColor:"#fff"}}>
					<View style={styles.container1}>	
						<Icon style={{color:"#fff",padding:12}}  
	                         			size={30}name="md-arrow-back" 
	                         			onPress={()=>{this.props.navigation.goBack()}}/>
	                        
					</View>
				<ScrollView style={{backgroundColor:"#eee"}}>
					<View style={{backgroundColor:"#fff",margin:10,elevation:3}}>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order ID:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_id}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order Status:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_status}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Ordered Date:</Text>
									<Text style={styles.textStyle2} >{this.state.data.ordered_date}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Type:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_status}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Schedule:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_schedule}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order Ready At:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_preparation_time}</Text>
							
						</ListItem>
					</View>
					<View style={{backgroundColor:"#fff",margin:10,elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
								<Text style={{fontSize:25,color:"#17baa1"}}>Customer Details</Text>
							</View>
							<View>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Customer Name:</Text>
									<Text style={styles.textStyle2} >{this.state.shipping.name}</Text>
							
								</ListItem>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Shipping Address:</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_1},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_2},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.city},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.state},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.zip_code}</Text>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Contact Customer:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress2}>
										<MaterialCommunityIcons name="phone" size={25}/>
										<Text style={styles.textStyle2}>{this.state.shipping.phone_number}</Text>
									</TouchableOpacity>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress3}>
										{this.state.shipping.alternate_phone_number ?<MaterialCommunityIcons name="phone" size={25}/>: null }
										{this.state.shipping.alternate_phone_number ?<Text style={styles.textStyle2}>{this.state.shipping.alternate_phone_number}</Text>:null}
									</TouchableOpacity>
								</ListItem>
								</View>

						</View>
						<View style={{backgroundColor:"#fff",margin:10,elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic",}}>
								<Text style={{fontSize:25,margin:5,color:"#17baa1"}}>Delivery Person Details</Text>
								<Image  style={styles.imgStyle2} source={{uri:this.state.delivery.person_photo}}/>
							</View>
							<View>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Name:</Text>
									<Text style={styles.textStyle2} >{this.state.delivery.first_name} {this.state.delivery.last_name}</Text>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Contact:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress}>
										<MaterialCommunityIcons name="phone" size={25}/>
										<Text style={styles.textStyle2}>{this.state.delivery.contact_number}</Text>
									</TouchableOpacity>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Vehicle Number:</Text>
										<Text style={styles.textStyle2}>{this.state.delivery.vehicle_number}</Text>
								</ListItem>
								</View>

						</View>
						<View style={{backgroundColor:"#fff",padding:10,margin:10,elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
						    	<Text style={{fontSize:25,color:"#17baa1"}}>Order Details</Text>
						    </View>
							{this.productMapHandler()}
							<View style={{alignItems:'center'}}>
									<Text style={styles.SummaryStyle}> Order Summary</Text>
										<ListItem>
											<Text>Total Items : {this.state.cart.total_items}</Text>
										</ListItem>
							</View>
						</View>
						<View style={{padding:10}}>
								{this.state.data.shipped==false ? 
									<Button style={{color:"#255"}} color="#255" onPress={this.orderShipHandler} title="Ship Order"  /> :null}
						</View>
						<View style={{padding:10}}>
								{this.state.data.appoint_collector==false ? 
									<Button style={{color:"#255"}} color="#255" onPress={this.orderShipHandler} title="Appoint A Collector"  /> :null}
						</View>
					</ScrollView>
				</View>
						
				
				)
			}else
			{
			return(
				<View style={{flex:1,backgroundColor:"#fff"}}>
					<View style={styles.container1}>	
						<Icon style={{color:"#fff",padding:12}}  
	                         			size={30}name="md-arrow-back" 
	                         			onPress={()=>{this.props.navigation.goBack()}}/>
	                        
					</View>
				<ScrollView style={{backgroundColor:"#eee"}}>
					<View style={{backgroundColor:"#fff",margin:10,elevation:3,}}>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order ID:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_id}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order Status:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_status}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Type:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_status}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Ordered Date:</Text>
									<Text style={styles.textStyle2} >{this.state.data.ordered_date}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Schedule:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_schedule}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order Ready At:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_preparation_time}</Text>
							
						</ListItem>
					</View>
					<View style={{backgroundColor:"#fff",margin:10,elevation:3,}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
								<Text style={{fontSize:25,color:"#17baa1"}}>Customer Details</Text>
							</View>
							<View>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Customer Name:</Text>
									<Text style={styles.textStyle2} >{this.state.shipping.name}</Text>
									
								</ListItem>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Shipping Address:</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_1},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_2},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.city},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.state},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.zip_code}</Text>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Contact Customer:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress2}>
										<MaterialCommunityIcons name="phone" size={25}/>
										<Text style={styles.textStyle2}>{this.state.shipping.phone_number}</Text>
									</TouchableOpacity>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress3}>
										{this.state.shipping.alternate_phone_number ?<MaterialCommunityIcons name="phone" size={25}/>: null }
										{this.state.shipping.alternate_phone_number ?<Text style={styles.textStyle2}>{this.state.shipping.alternate_phone_number}</Text>:null}
									</TouchableOpacity>
								</ListItem>
								</View>

						</View>
						<View style={{backgroundColor:"#fff",padding:10,margin:10,elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
						    	<Text style={{fontSize:25,color:"#17baa1"}}>Order Details</Text>
						    </View>
							{this.productMapHandler()}
							<View style={{alignItems:'center'}}>
									<Text style={styles.SummaryStyle}> Order Summary</Text>
										<ListItem>
											<Text>Total Items : {this.state.cart.total_items}</Text>
										</ListItem>
							</View>
						</View>
						<View style={{padding:10}}>
								{this.state.data.order_ready==false ? 
									<Button style={{color:"#255"}} color="#255" onPress={this.orderReadyHandler} title="order ready"  /> :null}
						</View>
						<View style={{padding:10}}>
								{this.state.data.order_ready==true ? 
									<Button style={{color:"#255"}} color="#255" onPress={this.orderShipHandler} title="Ship Order"  /> :null}
						</View>
						<View style={{padding:10}}>
								{this.state.data.appoint_collector==false ? 
									<Button style={{color:"#255"}} color="#255" onPress={this.appointAHandler} title="Appoint A Collector"  /> :null}
						</View>
					</ScrollView>
				</View>
						
				
				)
			}
	}
}

export default ActiveOrderDetail;



const styles = {
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
		backgroundColor:"#eee",
		borderColor:"#17baa1",
		flex:1,
		alignItems: 'center',
        justifyContent: 'center',


	},
	activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
	container:{
		backgroundColor:'#eee',
		flex:1,
		borderColor:"#eee",
		


},
imgStyle:{
	height:100,
	width:100,
	borderWidth:2,
	borderColor:"#fff"

},
imgStyle2:{
	height:300,
	width:300,
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
	textStyle1:{
		fontSize:20,
		color:"#17baa1"
	},
	textStyle2:{
		fontSize:15,
		color:"orange"
	}
}



