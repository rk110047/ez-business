import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Button , Image , ActivityIndicator,StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';



export default class ProductImagesList extends Component{

	deleteContent = async() =>{
		await axios.delete("http://100.25.15.160/product/images/RUD/"+this.props.data.id)
		this.props.fun()
	}

	render(){
		var data  = this.props.data
		return(
					<View  style={styles.contentViewStyle}>
						<Image style={styles.imgStyle} source={{uri:data.image}}/>
						<TouchableOpacity onPress={this.deleteContent}
							style={{width:350,marginTop:5,borderRadius:2,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"red"}}>
							<Text style={{fontSize:20,color:"#fff"}}>Delete</Text>
							<Icon  onPress={this.deleteContent}
								name='ios-trash' color="#fff" size={30} />
						</TouchableOpacity>
					</View>
				)
	}
}


const styles = {
	contentViewStyle:{
			margin:10,
			backgroundColor:"#fff",
			justifyContent:"space-between",
			alignItems:"center",
			padding:10
		},
		imgStyle:{ 
		    width: 350, 
		    height: 200,
		    backgroundColor:"#fff",
		    borderRadius:5,

		     },
}