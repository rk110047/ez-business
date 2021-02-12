import React from 'react';
import axios from 'axios';
import { View , Text ,TouchableOpacity , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';





class  ListActiveOrderItems extends React.Component{


	state={
		data:this.props.data,
		contents:this.props.data.content,
		token:"",
		loading:false

	}


	componentDidMount(){
	    this.getTokenhandler()
	  }


	  async getTokenhandler(){
	      var self= this;
	      let token = await AsyncStorage.getItem('token')
	      this.setState({token:token})
	    }

	   productContentMapHandler(){

	   	return this.state.contents.map((t,key)=>{
	   		return(
	   				<View key={key} style={{flex:1,backgroundColor:"#fff",margin:5,alignItems:"center",elevation:3}}>
	   					<Text style={{fontSize:15}}>{t.content}</Text>
	   				</View>
	   			)
	   	})

	}
	
	render(){
		var data = this.state.data
		return(
		<View style={styles.container}>
					<ListItem>
						<View>
							<Image style={styles.imgStyle}
							source={{uri:data.product.product_image}}/>
							
						</View>
						<View  style={{margin:5,flex:1}} >
							<Text style={{marginLeft:50}}>{data.product.product_name}</Text>
							<Text style={{marginLeft:50,color:"#17baa1",fontSize:15,fontWeight:"bold"}}>${data.product.product_price}</Text>
							<View style={{flexDirection:"row",marginLeft:50}}>
								<Text>Qty : {data.quantity}</Text>
				
							</View>
						</View>

					</ListItem>
					<View>
						<View style={{alignItems:"center"}}>
							<Text style={{color:"#17baa1",fontSize:17}}>product contents</Text>
							</View>
						{this.productContentMapHandler()}
					</View>
				</View>
		)
	}
}

export default ListActiveOrderItems;



const styles = {
	container:{
		backgroundColor:'#e0ffff',
		flex:1,
		margin:5,
		elevation:3
		

		


},
imgStyle:{
	height:100,
	width:100,
	borderWidth:2,
	borderColor:"#fff"

},
}



