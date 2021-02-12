import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Button , ActivityIndicator,StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';



export default class ProductContentCategoryList extends Component{

	deleteContent = async() =>{
		await axios.delete("http://100.25.15.160/product/contentcategory/RUD/"+this.props.data.id)
		this.props.fun()
	}

	render(){
		var data  = this.props.data
		return(
					<TouchableOpacity  onPress={()=>{this.props.navigation.navigate('productContent',{url:data.content,id:data.id})}}
							style={styles.contentViewStyle}>
						<View style={{margin:3}}>
							<MaterialCommunityIcons  onPress={()=>{this.props.navigation.navigate('productContentCategoryEdit',{id:data.id})}}
							name='pencil' color="black" size={30} />
							
						</View>
						<View  style={{flex:1}}>
							<Text style={{fontSize:17,color:"#17baa1",fontStyle:"italic"}}>{data.category_name}</Text>
							
						</View>
						<View  style={{margin:3}}>
							<Icon  onPress={this.deleteContent}
								name='ios-trash' color="red" size={30} />
						</View>
					</TouchableOpacity>
				)
	}
}


const styles = {
	contentViewStyle:{
			flex:1,
			flexDirection:"row",
			margin:10,
			backgroundColor:"#ffffff",
			justifyContent:"space-between",
			alignItems:"center",
			padding:10,
			elevation:3
		},
}