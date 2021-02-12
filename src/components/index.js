import React from 'react';
import {Text , View ,Image} from 'react-native';
import AppHeader from './products/header';

var image = require("./assets/hiclipart.com(9).png")

export default class Home extends React.Component{



	render(){
		return(
			<View style={{flex:1}}>
				<AppHeader   navigation={this.props.navigation}  />
				<View  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
					<Image style={{height:350,width:350}} source={image}/>
					
				</View>
			</View>

			)
	}
}