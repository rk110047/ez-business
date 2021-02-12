import React , {Component} from 'react';
import {View , Text , TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class SuperUser extends Component{



	render(){

		return(
			<View>
				<View style={{backgroundColor:"black"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
						<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>		
				</View>

				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("createShop")}}>
					<View style={{backgroundColor:"orange",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>CREATE NEW SHOP</Text>	
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("shops")}}>
					<View style={{backgroundColor:"#17baa1",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>ALL SHOPS</Text>	
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("createcategory")}}>
					<View style={{backgroundColor:"orange",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>CREATE CATEGORY</Text>	
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("createDeliveryUser")}}>
					<View style={{backgroundColor:"#17baa1",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>CREATE DELIVERY PROFILE</Text>	
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("deliveryUsers")}}>
					<View style={{backgroundColor:"orange",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>ALL DELIVERY PROFILES</Text>	
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("createCollectorUser")}}>
					<View style={{backgroundColor:"#17baa1",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:22,color:"#fff"}}>CREATE COLLECTOR PROFILE</Text>	
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("collectorUsers")}}>
					<View style={{backgroundColor:"orange",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:25,color:"#fff"}}>ALL COLLECTOR PROFILES</Text>	
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate("createShopCategory")}}>
					<View style={{backgroundColor:"#17baa1",alignItems:"center",padding:10,margin:10}}>	
								<Text style={{fontSize:22,color:"#fff"}}>CREATE SHOP CATEGORY</Text>	
					</View>
				</TouchableOpacity>
			</View>


			)
	}
}