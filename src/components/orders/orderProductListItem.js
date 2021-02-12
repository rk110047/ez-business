import React from 'react';
import {View , Text ,Image } from 'react-native';
import {ListItem} from 'native-base';



export default class OrderProductListItem extends React.Component{


	productContentMapHandler(){

	   	return this.props.data.content.map((t,key)=>{
	   		return(
	   				<View key={key} style={{elevation:3,backgroundColor:"#fff",margin:5,alignItems:"center"}}>
	   					<Text style={{fontSize:15,color:"orange"}}>{t.content}</Text>
	   				</View>
	   			)
	   	})

	}



	render(){
		var data = this.props.data
		return(

			<View  style={styles.container}>
					<ListItem>
						<View>
							<Image style={styles.imgStyle}
							source={{uri:data.product.product_image}}/>
							
						</View>
						<View  style={{margin:5,flex:1}} >
							<Text style={{marginLeft:50}}>{data.product.product_name}</Text>
							<Text style={{marginLeft:50,color:"#17baa1",fontSize:15,fontWeight:"bold"}}>${data.price}</Text>
							<View style={{flexDirection:"row",marginLeft:50}}>
								<Text>Qty : {data.quantity}</Text>
				
							</View>
						</View>
					</ListItem>
					<View style={{elevation:2}}>
						<View style={{alignItems:"center"}}>
							{ (data.content.length>>0) ? <Text style={{color:"#17baa1",fontSize:17}}>Product Contents</Text> : null}
							</View>
						{this.productContentMapHandler()}
					</View>
				</View>


			)
	}
}

const styles = {

	container:{
		backgroundColor:'#e0ffff',
		margin:5,
		elevation:3,


},
imgStyle:{
	height:100,
	width:100,
	borderWidth:2,
	borderColor:"#eee"

},
}