import React from 'react';
import {ScrollView , Image , ImageBackground , Picker ,View , Text , StyleSheet, Button ,TouchableOpacity ,ActivityIndicator , StatusBar , TextInput} from 'react-native';
import axios from 'axios';
import { ListItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import * as Speech from 'expo-speech';
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Barcode from '../barcode/Barcode';




export default class ProductDetail extends React.Component{
	state={
		"data":{},
		"shop_name":{},
		"product_code": "",
    	"product_name": "",
    	"product_price": null,
    	"product_image": null,
    	"quantity": null,
    	"description": "",
    	"active": false,
    	"Aisle_number": "",
	    "Shelf_number": "",
	    "Shelf_side": "",
    	"Category": 1,
    	"Contents":"",
    	"product_id":"",
        "token":'',
        "loading":true
	}


	componentDidMount(){
		this.getObject();
		this.getPermissionAsync();
		  }

	getPermissionAsync = async () => {
		    if (Constants.platform.ios) {
		      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		      if (status !== 'granted') {
		        alert('Sorry, we need camera roll permissions to make this work!');
		      }
		    }
		    const token = await AsyncStorage.getItem('token');
		    this.setState({token:token})
		  };


	_pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ product_image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

	async getObject(){
		const { url } = this.props.navigation.state.params;
		var self= this;
		let res = await axios.get(url);
		self.setState({data:res.data,
						shop_name:res.data.shop_name,
						"product_code": res.data.product_code,
				    	"product_name": res.data.product_name,
				    	"product_price": res.data.product_price,
				    	"product_image": res.data.product_image,
				    	"quantity":res.data.quantity,
				    	"description":res.data.description,
				    	"active":res.data.active ,
				    	"Category": res.data.Category,
				    	"Contents":res.data.contents,
				    	"product_id":res.data.product_id,
				    	"Aisle_number":res.data.Aisle_number,
				    	"Shelf_number":res.data.Shelf_number,
				    	"Shelf_side":res.data.Shelf_side})
		console.log(res.data)
		let token = await AsyncStorage.getItem('token');
		self.setState({token:token});
		this.setState({loading:false})
	}

	productEditHandler = async() => {
     this.setState({loading:true})
      var self = this;
      let image_name = this.state.product_image.split('/').pop();
      let photo = {
        uri: this.state.product_image,
        name: image_name, 
        type: 'image/jpg'};
      let newData     =   new FormData()
      newData.append("product_image",photo)
      newData.append("product_name",this.state.product_name)
      newData.append("product_code",this.state.product_code)
      newData.append("product_price",this.state.product_price)
      newData.append("quantity",this.state.quantity)
      newData.append("description",this.state.description)
      newData.append("Category",this.state.Category)
      newData.append("active",this.state.active)
      newData.append("Aisle_number",this.state.Aisle_number)
      newData.append("Shelf_number",this.state.Shelf_number)
      newData.append("Shelf_side",this.state.Shelf_side)
      console.log(newData)
      const url = this.state.data.edit
      console.log(url)
      let response = await fetch(url, {
         method: 'PUT',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
           'Authorization':this.state.token
         },
         body: newData
       });
      this.setState({loading:false})
      console.log(response.data)
        };


     deleteProductHandler = async() =>{
     	this.setState({loading:true})
     	let res = await axios.delete(this.state.data.delete,
     		{ headers:{
     			Authorization:this.state.token
     		}})
     	this.props.navigation.navigate('index')
     }
	
	render(){
		var code =  parseInt(this.state.product_code)
		var data = this.props.data
		if(this.state.loading){
			return (
				<View  style={{flex:1}}>
					<View style={{backgroundColor:"black",justifyContent:"space-between",flexDirection:"row"}}>
							<TouchableOpacity  onPress={()=>this.props.navigation.goBack()}>
							<Icon style={{color:"white" ,padding:12}}  size={25} name="md-arrow-back"/>
							</TouchableOpacity>
						</View>
					
		            <View style={styles.activitycontainer}>
		            	<View style={styles.activityStyle}>
			                <ActivityIndicator size="large" color="#17baa1" />
			                <StatusBar barStyle="default" />
		                </View>
		            </View>
		          </View>
        )
		}
		else{
		return(
			
				<View style={{flex:1}}>
					<View style={{backgroundColor:"black",justifyContent:"space-between",flexDirection:"row"}}>

							<TouchableOpacity  onPress={()=>this.props.navigation.goBack()}>
							<Icon style={{color:"white" ,padding:12}}  size={25} name="md-arrow-back"/>
							</TouchableOpacity>
							<TouchableOpacity  onPress={this.productEditHandler}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="check"/>
							</TouchableOpacity>
						</View>
					<ScrollView>  

					<View style={styles.container}>
							<TouchableOpacity style={{}}   onPress={this._pickImage}>
								<ImageBackground  style={styles.imgStyle} source={{uri:this.state.product_image}}>
									<MaterialCommunityIcons name="pencil" color="black" style={{alignItems:"flex-end"}} size={35} />
								</ImageBackground>
							</TouchableOpacity>
				<View style={styles.viewStyle}>
					<TextField
			            labelFontSize={15}
			            tintColor="orange"
			            baseColor="#17baa1"
			            label="Product name"
			            value={this.state.product_name}
			            onChangeText={(value) =>{this.setState({product_name:value})}}/>
			      </View>

		           
			      <View style={styles.viewStyle}>
		            <TextField
		            labelFontSize={15}
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Product BarCode"
		            value={this.state.product_code} 
		            onChangeText={(value) =>{this.setState({product_code:value})}}/>
		           </View>

		            
		          <View style={styles.viewStyle}>
		            <TextField
		            labelFontSize={15}
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Price"
		            value={this.state.product_price} 
		            onChangeText={(value) =>{this.setState({product_price:value})}}/>
		           </View>

		       	<View style={styles.viewStyle}>
		            <TextField
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Quantity"
		            value={this.state.quantity}
		            onChangeText={(value) =>{this.setState({quantity:value})}}/>
		         </View>


		        <View style={styles.viewStyle}>
		            <TextField
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="description"
		            value={this.state.description}
		            onChangeText={(value) =>{this.setState({description:value})}}/>
		        </View>

		        <View style={styles.viewStyle}>
		        <TextField
                tintColor="orange"
                baseColor="#17baa1"
                label="Aisle Number"
                value={this.state.Aisle_number}
                onChangeText={(value) =>{this.setState({Aisle_number:value})}}/>
                </View>

                <View style={styles.viewStyle}>
                 <TextField
                tintColor="orange"
                baseColor="#17baa1"
                label="Shelf Number"
                value={this.state.Shelf_number}
                onChangeText={(value) =>{this.setState({Shelf_number:value})}}/>
  				</View>


                 <ListItem style={styles.pickerContainer}>
                <View style={styles.pickerContainer}>
                    <Text style={{color:"#17baa1",fontSize:18}}>
                      Shelf Side
                    </Text>
                    <Picker
                      selectedValue={this.state.Shelf_side}
                      style={{width:300,backgroundColor:"#black" ,color:"orange"}}
                      onValueChange={(itemValue, itemIndex) => this.setState({Shelf_side:itemValue})}
                    >
                      <Picker.Item label="Left" value="Left" />
                      <Picker.Item label="Right" value="Right" />
                    </Picker>
                  </View>
                  </ListItem>

							
								<TouchableOpacity style={styles.buttonStyle}>
									<Button 
									color="red"
									onPress={this.deleteProductHandler}
									title= "Delete Product" /> 
								</TouchableOpacity>
								<TouchableOpacity style={styles.buttonStyle}>
									<Button 
									color="#F4B400"
									onPress={()=>{this.props.navigation.navigate('productContentCategory',{url:this.state.data.content_category,product_id:this.state.product_id})}}
									title= "Product Content Categories" /> 
								</TouchableOpacity>
								<TouchableOpacity style={styles.buttonStyle}>
									<Button 
									color="green"
									onPress={()=>{this.props.navigation.navigate('productImages',{url:this.state.Contents,product_id:this.state.product_id})}}
									title= "Product Images" /> 
								</TouchableOpacity>
								<TouchableOpacity style={styles.buttonStyle}>
									<Button 
									color="blue"
									onPress={()=>{this.props.navigation.navigate('productTaxes',{product_id:this.state.product_id})}}
									title= "Product Taxes" /> 
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{this.props.navigation.navigate("productBarcode",{code:code})}}
									style={{margin:50,elevation:3}}>
									<Barcode
								        value={code}
								        options={{ format: 'CODE128', background: '#ffffff' }}
								      />
								 </TouchableOpacity>
							
					</View>
			</ScrollView>
		</View>

			)
		}
	}
};



const styles=StyleSheet.create({
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
	mainContainer:{
		// padding:5
	},
	container:{
		justifyContent:'center',
		alignItems:'center',
		padding:5,
		// borderWidth:2,
		// borderColor:"#eee",
		margin:10,
		backgroundColor:"#eee"
	},
	imgStyle:{
		height:300,
		width:330,
		borderWidth:1,
		borderRadius:3,
		borderColor:"rgb(204, 204, 204)",
	},
	nameStyle:{
		borderWidth:1,
          borderRadius:3,
          borderColor:"rgb(204, 204, 204)",
          backgroundColor:"#fff",
          padding:5
	},
	nameStyle2:{
		height:100,
		borderWidth:1,
          borderRadius:3,
          borderColor:"rgb(204, 204, 204)",
          backgroundColor:"#fff",
          padding:5
	},
	priceStyle:{
		color:'grey',
		fontSize:20

	},
	shopStyle:{
		fontSize:40
	},
	buttonStyle:{
		color:"#17baa1",
		width:"100%",
		borderWidth:2,
		borderColor:"#eee",
		marginBottom:30
	},
	viewStyle:{
		backgroundColor:"#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width:"100%",
		margin:10
	}
})