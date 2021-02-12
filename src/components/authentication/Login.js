import React from 'react';
import {Image ,Text ,View , TextInput , Button , TouchableOpacity , StyleSheet , ScrollView , ActivityIndicator , StatusBar} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';




export default class Login extends React.Component{
	state = {
		username:"",
		password:"",
		loading:false
	}

	usernameChangeHandler = value => {
						this.setState({
							username:value
						})
						};

	passwordChangeHandler = value => {
						this.setState({
							password:value
						})
					}
						

	loginUserHandler = async() =>{
		this.setState({loading:true})
		var self = this;
		let res =await axios.post("http://100.25.15.160/auth/login/token/",{
			username : self.state.username,
			password : self.state.password
			})

		if (res.data.token) {
				  try {
						await AsyncStorage.setItem('token',"Token "+res.data.token)
						// alert(res.data.token)
						return(this.props.navigation.navigate('App'))
								 }catch (e) {
						    // saving error
						  }
				} else {
				  this.setState({loading:false})
				  Toast.show(res.data.data.message)
				}
			}
		
		


			

	render(){
		if(this.state.loading){
			return (
            <View style={styles.activitycontainer}>
            	<View style={styles.activityStyle}>
	                <ActivityIndicator size="large" color="#17baa1" />
	                <StatusBar barStyle="default" />
                </View>
            </View>
        )
		}
		else{
		return(
				<View style={styles.viewStyle}>
					<Animatable.View animation="fadeInDownBig" style={styles.headerStyle}>
						<Text style={styles.headerTextStyle}>Welcome !</Text>
					</Animatable.View>
					<Animatable.View animation="fadeInUpBig" style={styles.footerStyle} >
					    <Text style={styles.textStyle}>Sign In</Text>
						<TextInput  style={styles.textInput1}
						onChangeText = {this.usernameChangeHandler}
						placeholder="username"
						autoCaptlize={null}
	                    value={this.state.username}/>
						<TextInput  secureTextEntry={true}
						style={styles.textInput2} 
						onChangeText = {this.passwordChangeHandler}
						placeholder="password"
	                    value={this.state.password}/>
						<TouchableOpacity style={styles.buttonStyle}>
							<Button onPress={this.loginUserHandler}
							color="orange" title="Sign In"/>
						</TouchableOpacity>
						
					</Animatable.View>

				</View>

			)
		}
	}
};



const styles = StyleSheet.create({
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
	viewStyle:{
		flex:1,
		backgroundColor:'#17baa1'
		
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             width:"100%",
	},
	headerTextStyle:{
		color:'#fff',
		fontSize:40,
		marginRight:150
	},
	headerStyle:{
			flex:1, 
			backgroundColor:"#17baa1",
			alignItems: 'center',
            justifyContent: 'center',
		},
	footerStyle:{
		flex:1, 
		alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30
	},
	imageStyle:{
		height:200,
		width:200
	},
	textStyle:{
		color:"orange",
		fontWeight:"bold",
		fontSize:20
	},
	textInput1:{
		margin:10,
        width:"90%",
        height:40,
        borderColor:'#17baa1',
        color:"orange",
        backgroundColor:"#fff",
        borderWidth:2,
        borderRadius:5,
        padding:10

	},
	textInput2:{
		margin:10,
        width:"90%",
        height:40,
        borderColor:'#17baa1',
        color:"orange",
        backgroundColor:"#fff",
        borderWidth:2,
        borderRadius:5,
        padding:10

	},
	buttonStyle:{
		margin:10,
        width:"90%",
        height:50

	}

})