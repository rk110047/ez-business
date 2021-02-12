import React ,{Component} from 'react';
import {View , Text , Image , Button , AsyncStorage ,ActivityIndicator , TouchableOpacity , ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from 'native-base';
import axios from 'axios';




export default class ShopProfile extends Component{

state = {
	data:{},
	loading:true,
	superuser:false
}


componentDidMount(){
	this.apiCallHandler()
}

async apiCallHandler(){
	const token 	= await AsyncStorage.getItem('token');
	let res 		= await axios.get("http://100.25.15.160/shops/detail/",
					{
						headers:{
							Authorization:token
						}
					})
	let res2        = await axios.get("http://100.25.15.160/auth/super-check/",
					{
						headers:{
							Authorization:token
						}
					})
	if(res2.data.status==200){
		this.setState({superuser:true})
	}   
	this.setState({data:res.data})
	this.setState({loading:false})

}


	render(){
		const data = this.state.data
		if(this.state.loading){
			return(
					<View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
						<View style={{borderRadius:5,backgroundColor:"#eee",padding:30}}>
							<ActivityIndicator size="large" color="#17baa1"/>
						</View>
					</View>
				)
		}
		else{
		return(
			<View style={{flex:1}}>
				<View style={{backgroundColor:"black"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
						<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>
				</View>
				<ScrollView>
				<View style={{alignItems:"flex-end",backgroundColor:"black"}}>
					<TouchableOpacity onPress={()=>{this.props.navigation.navigate("edit")}}>
						<MaterialCommunityIcons name="pencil" color="#fff" size={30}/>
					</TouchableOpacity>
				</View>
				<View style={{alignItems:"center",backgroundColor:"black"}}>
					<View style={{}}>
						<Image style={styles.imgStyle} source={{uri:data.shop_image}}/>
					</View>
				</View>
					<View style={{padding:5,alignItems:"center",backgroundColor:"black"}}>
						
						<View style={{alignSelf:"center"}}>
							<Text style={styles.textStyle}>{data.shop_name}</Text>
						</View>
					
					
					
						<View style={{alignItems:"center"}}>
							<Text style={styles.textStyle}>{data.email_address}</Text>
						</View>
					</View>

					
				<View style={{backgroundColor:"#fff",margin:7,elevation:3}}>
					<ListItem >
						<Text style={{fontSize:20,color:"#17baa1"}}>Address</Text>
					</ListItem >
					<View style={{padding:20,alignItems:"flex-end"}}>	
							<Text style={{fontSize:20,color:"orange"}}>{data.address_line_1},</Text>
							<Text style={{fontSize:20,color:"orange"}}>{data.address_line_2},</Text>
							<Text style={{fontSize:20,color:"orange"}}>{data.town_city}</Text>
					</View>
				</View>
				<View style={{alignItems:"center",padding:10,margin:5}}>	
					<TouchableOpacity onPress={()=>{this.props.navigation.navigate("superuser")}}>
					{this.state.superuser ?
							<Text style={{fontSize:25,color:"#17baa1"}}>Super User</Text> : null}
					</TouchableOpacity>
				</View>
				</ScrollView>
			</View>

			)
		}
	}
}



const styles = {
	imgStyle:{
		height:250,
		width:250,
		borderRadius:400/2,
		borderWidth:2,
		backgroundColor:"white",
		borderColor:"#fff"
	},
	textStyle:{
		color:"#fff",
		fontSize:20,
		marginLeft:10
	}
}