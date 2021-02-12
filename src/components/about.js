import React from 'react';
import {View , Text ,Image ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


var logo = require('./assets/icon.png')


export default class Aboutus extends React.Component{

	render(){
		return(
				<View style={{flex:1}}>
					<View style={{justifyContent:"center",padding:10}}>
						<Icon onPress={()=>{this.props.navigation.goBack()}}
							name='md-arrow-back' size={30}/>
					</View>
					<View>
						<View style={{alignItems:"center"}}>
							<Image style={styles.imgStyle}source={logo}/>
						</View>
						<View style={{alignItems:"center",justifyContent:'center',marginTop:90,margin:5}}>
							<Text style={{fontSize:12}}>
								EZSwiftShops is a NYC based platform that is created to provide the people easy access to grocery stores and restaurants from our neighborhood as well as abroad.
							</Text>
						</View>
						<View style={{alignItems:"center",justifyContent:'center',marginTop:20,margin:5}}>
							<Text style={{fontSize:12}}>
								EZSwiftShops gives you the cashier less experience just like modern day toll booths. Our app makes your phone your cashier and you never have to wait in line for checkout. Swift and EZ! When in store, simply show your digital barcode as you exit.
							</Text>
						</View>
						<View style={{alignItems:'center',marginTop:160}}>
							<Text style={{color:'grey'}}>Developed by LEANVIA</Text>
						</View>
					</View>
				</View>
			)
	}
}

const styles ={
	imgStyle:{
		height:180,
		width:180
	}
}