import React from 'react';
import {View , Text , Button , TextInput , TouchableOpacity , ActivityIndicator , AsyncStorage , ScrollView , Image , ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class CreateShop extends React.Component{
	state = {
		username:"",
		email:"",
		password1:"",
		password2:"",
		loading:false

	}

	registerUser = async() =>{
		const token 	= await AsyncStorage.getItem('token');
		this.setState({loading:true})
		var self=this;
		let res = await axios.post("http://100.25.15.160/auth/special/register/",{
				username:self.state.username,
				email:self.state.email,
				password:self.state.password1,
				confirm_password:self.state.password2,
				role:"SHOPKEEPER"
			},
			{
						headers:{
							Authorization:token
						}
					}
			)
		console.log(res.data)
		if (res.data.token) {
				await AsyncStorage.setItem('shoptoken',"Token "+res.data.token)
				this.props.navigation.navigate('createShopProfile')
				} else {
				  this.setState({loading:false})
				  Toast.show(res.data.message,Toast.LONG)
				}
		
	} 

	render(){
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
		<View>
			<View style={{backgroundColor:"black",flexDirection:"row",alignItems:"center"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>
						<Text style={{fontSize:25,color:"#fff"}}> Create Shop</Text>
				</View>
			<View style={{alignItems:"center"}}>
				<View style={styles.viewStyle}>
				<TextField
						            labelFontSize={15}
						            tintColor="orange"
						            baseColor="#17baa1"
						            label="username"
						            value={this.state.username}
						            onChangeText={(value) =>{this.setState({username:value})}}/>

				</View>


				<View style={styles.viewStyle}>
				<TextField
						            labelFontSize={15}
						            tintColor="orange"
						            baseColor="#17baa1"
						            label="email"
						            value={this.state.email}
						            onChangeText={(value) =>{this.setState({email:value})}}/>

						            </View>


				<View style={styles.viewStyle}>
				<TextField
						            labelFontSize={15}
						            tintColor="orange"
						            baseColor="#17baa1"
						            label="password"
						            value={this.state.password1}
						            onChangeText={(value) =>{this.setState({password1:value})}}/>
						            </View>


	            <View style={styles.viewStyle}>
				<TextField
						            labelFontSize={15}
						            tintColor="orange"
						            baseColor="#17baa1"
						            label="Confirm Password"
						            value={this.state.password2}
						            onChangeText={(value) =>{this.setState({password2:value})}}/>
						            </View>



				<TouchableOpacity style={styles.buttonStyle} >
			                    <Button  
			                    	onPress ={this.registerUser}
			                    	color="orange"
								 title="Register"/>
								 </TouchableOpacity>
			</View>
		</View>
		)
	  }
	}
}


const styles={
	buttonStyle:{
		color:"orange",
        width:"90%",
        height:40, 
	},
	viewStyle:{
		// backgroundColor:"#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width:"90%",
		margin:10
	}
}