import React from 'react';
import {Text , TouchableOpacity , View , Image , StyleSheet , Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem } from 'native-base';




const ListProductItem = (props)=>{
		return(
				<TouchableOpacity onPress={()=>props.navigation.navigate('productdetail',{url:props.data.url})}>
				<View style={styles.viewStyle}>
							<View style={styles.viewStyle2}>
								<View>
										<Image style={styles.imagStyle}
										source={{uri:props.data.product_image}}/>
								</View>
								<View style={{margin:20 ,flex:1,justifyContent:"center" }}>
									<View style={{flexDirection:"row"}}>
										
										<Text style={styles.textStyle}>{props.data.product_name}</Text>
									</View>
									<View style={{flexDirection:"row"}}>
										
										<Text style={styles.textStyle2}>Price: ${props.data.product_price}</Text>
									</View>
									<View  style={{flexDirection:"row"}}>
										
										<Text style={styles.textStyle3}>Stock: {props.data.quantity} units</Text>
									</View>
								</View>
							</View>

				</View>
				</TouchableOpacity>
			)
	}
 const styles = StyleSheet.create({
 	viewStyle:{
 		backgroundColor:'#fff',
		margin:10,
		padding:5,
		borderRadius:10,
		elevation:3

 	},
 	viewStyle2:{
 		// margin:10,
 		  // padding:10
 		  flexDirection:"row"

 	},
 	imagStyle:{
 		height:150,
 		width:170,
 		borderColor:"#eee",
 		borderRadius:10,
 		borderWidth:2,
 		backgroundColor:"#eee"
 	},
 	textStyle:{
 		// color:'#17baa1'
 		color:'#17baa1',
 		fontSize:15,
 		marginLeft:10,

 	},
 	textStyle2:{
 		color:'orange',
 		fontSize:15,
 		marginLeft:10

 	},
 	textStyle3:{
 		color:'grey',
 		fontSize:15,
 		marginLeft:10

 	}
 })



export default ListProductItem;