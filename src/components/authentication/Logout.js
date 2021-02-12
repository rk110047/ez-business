import React from 'react';
import {ImageBackground ,View ,Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Speech from 'expo-speech';








class Logout extends React.Component{

	componentDidMount(){
		this.cartAPIhandler()
	}

	async cartAPIhandler(){
			Speech.speak("Are you sure you want to log out?")
			}
	

clearAll=()=>(
    AsyncStorage.removeItem('token'),
    AsyncStorage.clear(),
  	this.props.navigation.navigate('Auth')
)


	render(){
		const image = require('../assets/How-To-Make-Fruit-Salad-3.jpg');

		return(
			<View style={styles.container}>
				<ImageBackground source={image} style={styles.image}>
					<View style={styles.textStyle}>
							<Text style={{fontSize:20 ,color:"#fff"}}>
									Are you sure you want to log out?
								</Text>
						</View>
					<View  style={styles.buttonStyle}>
						<Button color="red" title="Logout" onPress={this.clearAll}/>
					</View>
					<View  style={styles.buttonStyle}>
						<Button color="#17baa1" title="Cancel" onPress={()=>this.props.navigation.goBack()}/>
					</View>
				</ImageBackground>
			</View>


			)
	}
}


const styles ={
	container:{
		 flex: 1,
    flexDirection: "column"
	},
	  image: {
	  	flex:1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textStyle:{
  	alignItems:"center",
  	color:"#eee"
  }
  ,
	buttonStyle:{
		// width:"100%",
		margin:20,
		// alignItems:"center",
		justifyContent:"center"
	}
}

export default Logout;