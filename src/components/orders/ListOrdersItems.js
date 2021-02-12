import React from 'react';
import axios from 'axios';
import { View , Text ,TouchableOpacity , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';
import OrderProductListItem from "./orderProductListItem";




class  CartList extends React.Component{


	state={
		data:this.props.data,
		cart:this.props.data.cart,
		product:this.props.data.cart.product,
		order_preparation_time:"",
		token:"",
		loading:false,
		delivery_schedule:"No Schedule",
	    date:new Date(),
	    mode:'date',
	    show:false,
	    deliveryDate:""

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
		let res   = await axios.get(this.state.data.accept_order+"?order_preparation_time="+this.state.order_preparation_time,
		{
				headers:{Authorization:token}
			})
		this.setState({loading:false})
		Toast.show(res.data.message)
		this.props.fun()
	}

	RejectOrderHandler = async() =>{
		this.setState({loading:true})
		let token = await AsyncStorage.getItem('token')
		let res   = await  axios.get(this.state.data.cancel_order,{
				headers:{Authorization:token}
			})
		this.setState({loading:false})
		Toast.show(res.data.message)
		this.props.fun()
	}


	onChange = (event, selectedDate) => {
	    this.setState({show:false})
	    const currentDate = selectedDate || this.state.date;
	    this.setState({date:currentDate})
	    this.setState({order_preparation_time:`${currentDate.getHours()}:${currentDate.getMinutes()}`})
	    console.log(this.state.order_preparation_time);
	  };

	  showMode = (currentMode) => {
	    var self = this;
	    this.setState({show:true})
	    this.setState({mode:currentMode})
	    
	  };


	  showTimepicker(){
	    var self = this;
	    this.setState({show:true})
	    self.setState({mode:'time'})
	    console.log(this.state.mode)
	  };

	productMapHandler(){
		var data = this.state.product
		return this.state.product.map((t,key)=>{
			return(
				<OrderProductListItem data={t} key={key}/>

				)
		}
		)
	}

	render(){
		this.showTimepicker = this.showTimepicker.bind(this);
		
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
				<View style={{padding:5,margin:10,borderWidth:1,borderColor:"grey"}}>

					<View style={{flexDirection:"row",justifyContent:"space-between",padding:5}}>
						<TouchableOpacity onPress={this.AcceptOrderHandler} style={styles.buttonStyle}>
							<MaterialCommunityIcons color="#fff" name="check" size={25}/>
							<Text style={{fontSize:20,color:"#fff"}}>Accept</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.RejectOrderHandler} style={styles.buttonStyle2}>
							<MaterialCommunityIcons color="#fff" name="close" size={25}/>
							<Text style={{fontSize:20,color:"#fff"}}>Reject</Text>
						</TouchableOpacity>

					</View>

					<View style={{flex:1,backgroundColor:"#fff",margin:5,marginTop:10,elevation:3}}>
						<View style={{alignItems: 'center',justifyContent: 'center'}}>
							<Text style={{fontSize:25,color:"#17baa1"}}>Order Ready At</Text>
						</View>
					     <View style={{alignItems:"center",margin:5,flexDirection:"row",marginLeft:10}}>
						    <TouchableOpacity onPress={this.showTimepicker}
						    	style={styles.ScheduleStyle}>
						      <Text >{this.state.order_preparation_time}</Text>
						    </TouchableOpacity>
						      <MaterialCommunityIcons onPress={this.showTimepicker}
						      	name="clock" color="orange" size={25} />
					      </View>
					      
					</View>

					<View style={{backgroundColor:"#fff",margin:5,borderColor:"#eee",elevation:3}}>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order ID:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_id}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Ordered:</Text>
									<Text style={styles.textStyle2} >{this.state.data.ordered_date}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Schedule:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_schedule}</Text>
							
						</ListItem>

					</View>

					{this.productMapHandler()}

					<View style={{alignItems:'center'}}>
							<Text style={styles.SummaryStyle}> Order Summary</Text>
								<ListItem>
									<Text>Total Items : {this.state.cart.total_items}</Text>
								</ListItem>
								
						</View>
					
					{this.state.show && (
				        <DateTimePicker
				          testID="dateTimePicker"
				          value={this.state.date}
				          mode={this.state.mode}
				          is24Hour={true}
				          display="default"
				          onChange={this.onChange}
				        />)}
				</View>
				)
			}
	}
}

export default CartList;



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
		backgroundColor:'#eee',
		margin:5,
		elevation:3,
		borderColor:"#eee",
		borderWidth:2


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
	borderRadius:5,
	elevation:3
	},
buttonStyle2:{
	flexDirection:"row",
	backgroundColor:"red",
	alignItems:"center",
	padding:5,
	borderRadius:5,
	elevation:3
	},
	textStyle1:{
		fontSize:20,
		color:"#17baa1"
	},
	textStyle2:{
		fontSize:15,
		color:"orange"
	},
	ScheduleStyle:{
		backgroundColor:"#eee",
		width:"70%",
		height:30,
		alignItems:"center",
		justifyContent:"center",
		borderColor:"grey",
		borderWidth:1,
		margin:10,
		borderRadius:2,
		padding:5}
}



