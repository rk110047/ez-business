import React from 'react';
import axios from 'axios';
import { View ,ScrollView, Text ,TouchableOpacity, Button , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
// import Toast from 'react-native-simple-toast';


  




class  ShippedOrderDetail extends React.Component{


	state={
		data:{},
		customer:{},
		shipping:{},
		cart:{},
		product:[],
		delivery:{},
		token:"",
		loading:false

	}

	createAndSavePDF = async (html) => {
      const name = this.state.name
      const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pdf Content</title>
                <style>
                    body {
                        font-size: 16px;
                        color: rgb(255, 196, 0);
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                   <div style="display: flex;flex-direction: row;">
                   <div style="margin-left:20px;width: 50% ">
                       <h1 style="font-size: 12px,font-weight:bold">${this.state.data.shop.shop_name}</h1>
                       <p style="font-size: 15px">Order: # ${this.state.data.order_id}</p>
                       <p style="font-size: 15px">Order placed on: ${this.state.data.ordered_date}</p>
                   </div>
                   <div style="margin-left:20px ;width: 50%">
                       <h1 style="font-size: 12px,font-weight:bold">${this.state.shipping.name}</h1>
                       <h1 style="font-size: 15px">${this.state.shipping.address_line_1},</h1>
                       <h1 style="font-size: 15px">${this.state.shipping.address_line_2} ,</h1>
                       <h1 style="font-size: 15px">${this.state.shipping.city} ,</h1>
                       <h1 style="font-size: 15px">${this.state.shipping.zip_code} ),</h1>
                       <h1 style="font-size: 15px">${this.state.shipping.phone_number} </h1>
                   </div>
               </div> 
               <div style="margin-left:20px;margin-top: 20px;border-style: solid;width: 30% ;padding: 10px">
                   <p style="font-size: 15px,font-weight:bold">Picked by:</p>
                   <h1 style="font-size: 12px">${this.state.delivery.first_name} ,</h1>
                   <h1 style="font-size: 12px">${this.state.delivery.contact_number} ,</h1>
                   <h1 style="font-size: 12px">${this.state.delivery.vehicle_number}</h1>
               </div>
               <div style="margin-left:20px;margin-top: 20px ;width: 50%">
                   <p style="font-size: 17px,font-weight:bold">${this.state.data.cart.total_items} item</p>
                   <hr style="height:2px;border-width:0;color:gray;background-color:gray">
               </div>
               <table class="table" style="margin-left:20px;margin-top: 20px ;width: 50%">
                   <tr>
                       <th>Qty</th>
                       <th>Description</th>
                       <th>Price</th>
                   </tr>
                   {%for i in obj1.all %}
                   <tr>
                       <th>{{ i.quantity}}</th>
                       <th>{{ i.product.product_name }}</th>
                       <th>{{ i.price}}</th>
                   </tr>
                   {% endfor %}
               </table>
               <div style="margin-left:20px;margin-top: 20px ;width: 50%;align-items: flex-end;">
                   <hr>
                   <p >Shipping Charges: ${this.state.data.shipping_total}</p>
                   <hr>
                   <p>Order Total: ${this.state.data.total}</p>
               </div>
            </body>
            </html>
        `;
      try {
        const { uri } = await Print.printToFileAsync({ 'html':htmlContent });
        if (Platform.OS === "ios") {
          await Sharing.shareAsync(uri);
        } else {
          const permission = await MediaLibrary.requestPermissionsAsync();
          if (permission.granted) {
            await MediaLibrary.createAssetAsync(uri);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };


	componentDidMount(){
	    this.getTokenhandler()
	  }

	  async getTokenhandler(){
	      var self= this;
	      let token = await AsyncStorage.getItem('token')
	      this.setState({token:token})
	      const {data} 	=	this.props.navigation.state.params;
	      this.setState({data:data})
	      this.setState({customer:data.customer})
	      this.setState({shipping:data.shipping_address})
	      this.setState({cart:data.cart})
	      this.setState({product:data.cart.product})
	      this.setState({delivery:data.delivery_person})
	    }

	
	productMapHandler(){
		// const {data} 	=	this.props.navigation.state.params;
		var data = this.state.product
		return this.state.product.map((t,key)=>{
			return(
				<View  key={key} style={styles.container}>
					<ListItem>
						<View>
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
	
	orderReadyHandler = async() =>{
		this.setState({loading:true})
		let res    =	await axios.get(this.state.data.click_order_ready,{
			headers:{
				Authorization:this.state.token
			}
		})
		this.setState({loading:false})
		// Toast.show(res.data.message)
	}

	orderShipHandler = async() =>{
		this.setState({loading:true})
		console.warn(this.state.data)
		let res    =	await axios.get(this.state.data.ship_order,{
			headers:{
				Authorization:this.state.token
			}
		})
		this.setState({loading:false})
		// Toast.show(res.data.message)
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
						<Icon style={{color:"black",padding:12}}  
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
									<Text style={styles.textStyle1} >Delivery Type:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_status}</Text>
							
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
						    	<Text style={{fontSize:25,color:"#17baa1"}}>Order Detail</Text>
						    </View>
							{this.productMapHandler()}
							<View style={{alignItems:'center'}}>
									<Text style={styles.SummaryStyle}> Order Summary</Text>
										<ListItem>
											<Text>Total Items : {this.state.cart.total_items}</Text>
										</ListItem>
										
							</View>
						</View>
						<Button title="print" color="blue" onPress={this.createAndSavePDF} />
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
									<Text style={styles.textStyle1} >Delivery Type:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_status}</Text>
							
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
						<View style={{backgroundColor:"#fff",padding:10,margin:10,elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
						    	<Text style={{fontSize:25,color:"#17baa1"}}>Order Detail</Text>
						    </View>
							{this.productMapHandler()}
							<View style={{alignItems:'center'}}>
									<Text style={styles.SummaryStyle}> Order Summary</Text>
										<ListItem>
											<Text>Total Items : {this.state.cart.total_items}</Text>
										</ListItem>
										
							</View>
						</View>
						<Button title="print" color="blue" onPress={this.createAndSavePDF} />
					</ScrollView>
				</View>
						
				
				)
			}
	}
}

export default ShippedOrderDetail;



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
		flex:1,
		borderColor:"#e0ffff",
		elevation:3
		


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



