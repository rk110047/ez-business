import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Image , ScrollView , ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';



export default class DeliveryUsers extends Component{

	state={
		shops:[],
		loading:true
	}


	componentDidMount(){
		this.shopsListHandler()
		this.willFocusSubscription = this.props.navigation.addListener(
		      'willFocus',
		      () => {
		        this.shopsListHandler();
		      }
		    );
		  }

	  componentWillUnmount =()=> {
	    this.willFocusSubscription.remove();
	  }

	shopsListHandler = async() =>{
		let res 	=	await	axios.get("http://100.25.15.160/delivery/profile/create/")
		this.setState({shops:res.data})
		this.setState({loading:false})
	}


	shopListMapHandller =()=>{
		return this.state.shops.map((i,key)=>{
			return (
				<TouchableOpacity key1={key} onPress={()=>{this.props.navigation.navigate('deliveryUserProfileRUD',{data:i})}}
					style={{backgroundColor:"#fff",flexDirection:"row",margin:10}}>
					<View key2={key} style={{backgroundColor:"#fff",margin:5}}>
						<Image  style={{height:100,width:100}} source={{uri:i.person_photo}} />
					</View>
					<View key3={key} style={{marginLeft:10,flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
						<Text style={{fontSize:25,color:"orange"}}>{i.first_name}</Text>
						<Text style={{fontSize:25,color:"orange"}}> {i.last_name}</Text>
					</View>
				</TouchableOpacity>
				)
		})
	}


	render(){
		if(this.state.loading){
			return(
					<View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
						<View style={{borderRadius:5,backgroundColor:"#fff",padding:30}}>
							<ActivityIndicator size="large" color="#17baa1"/>
						</View>
					</View>
				)
		}
		else{
		return(
		<View style={{flex:1}}>
			<View style={{backgroundColor:"black",flexDirection:"row",alignItems:"center"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>
						<Text style={{fontSize:25,color:"#fff"}}>Delivery Person</Text>
				</View>
		
			<ScrollView>
				{this.shopListMapHandller()}
			</ScrollView>

		</View>
			)
		}
	}
}