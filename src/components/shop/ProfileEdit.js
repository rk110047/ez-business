import React from 'react';
import {View , Text , Button , TextInput , TouchableOpacity , ActivityIndicator , AsyncStorage , ScrollView , Image , ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';



export default class Profile extends React.Component{

	state={
    "shop_name": "",
    "address_line_1": "",
    "address_line_2": "",
    "town_city": "",
    "country": "",
    "shop_image": null,
    "contact": "",
    "email_address": "",
    "timming": "",
    "shop_details": "",
    "active": false,
    "edit":"",
    "delivery_charges":"",
    "token":"",
    "loading":true,
    "personal_pickup_limit":""
	}

	componentDidMount(){
		this.apiCallHandler()
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
		        this.setState({ shop_image: result.uri });
		      }
		    } catch (E) {
		      console.log(E);
		    }
		  };


	async apiCallHandler(){
		const token 	= await AsyncStorage.getItem('token');
		let res 		= await axios.get("http://100.25.15.160/shops/detail/",
						{
							headers:{
								Authorization:token
							}
						})
		this.setState({shop_name:res.data.shop_name})
		this.setState({address_line_1:res.data.address_line_1})
		this.setState({address_line_2:res.data.address_line_2})
		this.setState({town_city:res.data.town_city})
		this.setState({country:res.data.country})
		this.setState({shop_image:res.data.shop_image})
		this.setState({contact:res.data.contact})
		this.setState({email_address:res.data.email_address})
		this.setState({timming:res.data.timming})
		this.setState({shop_details:res.data.shop_details})
		this.setState({active:res.data.active})
		this.setState({delivery_charges:res.data.delivery_charges})
		this.setState({personal_pickup_limit:res.data.personal_pickup_limit})
		this.setState({edit:res.data.edit})
		this.setState({token:token})
		this.setState({loading:false})
		console.log(res.data)

	}

	profileEditHandler = async() => {
     this.setState({loading:true})
      var self = this;
      let image_name = this.state.shop_image.split('/').pop();
      let photo = {
        uri: this.state.shop_image,
        name: image_name, 
        type: 'image/jpg'};
      let newData     =   new FormData()
      newData.append("shop_image",photo)
      newData.append("shop_name",this.state.shop_name)
      newData.append("address_line_1",this.state.address_line_1)
      newData.append("address_line_2",this.state.address_line_2)
      newData.append("town_city",this.state.town_city)
      newData.append("country",this.state.country)
      newData.append("contact",this.state.contact)
      newData.append("email_address",this.state.email_address)
      newData.append("timming",this.state.timming)
      newData.append("delivery_charges",this.state.delivery_charges)
      newData.append("shop_details",this.state.shop_details)
      newData.append("personal_pickup_limit",this.state.personal_pickup_limit)
      newData.append("active",this.state.active)
      console.log(newData)
      const url = this.state.edit
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



	render(){
		if(this.state.loading){
			return(
				<View style={{flex:1}}>
					<View style={{backgroundColor:"black",justifyContent:"space-between",flexDirection:"row"}}>

							<TouchableOpacity  onPress={()=>this.props.navigation.goBack()}>
							<Icon style={{color:"white" ,padding:12}}  size={25} name="md-arrow-back"/>
							</TouchableOpacity>
						</View>
					<View style={{flex:1,alignItems:"center",justifyContent:'center',padding:30,borderRadius:5,backgroundColor:"#eee"}}>
						<ActivityIndicator size="large" color="#17baa1"/>
					</View>
				</View>
				)

		}else{
		return(
			<View style={{flex:1}}>
				<View style={{backgroundColor:"black",justifyContent:"space-between",flexDirection:"row"}}>

							<TouchableOpacity  onPress={()=>this.props.navigation.goBack()}>
							<Icon style={{color:"white" ,padding:12}}  size={25} name="md-arrow-back"/>
							</TouchableOpacity>
							<TouchableOpacity  onPress={this.profileEditHandler}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="check"/>
							</TouchableOpacity>
						</View>
			<ScrollView>
				<View style={styles.container}>
							<TouchableOpacity style={{}}   onPress={this._pickImage}>
								<ImageBackground  style={styles.imgStyle} source={{uri:this.state.shop_image}}>
									<MaterialCommunityIcons name="pencil" color="black" style={{alignItems:"flex-end"}} size={35} />
								</ImageBackground>
							</TouchableOpacity>

					<View style={{alignItems:"center",flexDirection:"row",marginLeft:10}}>
						<RadioButton
								size={35}
					            status ={this.state.active ? 'checked':'unchecked'}
					            onPress ={() =>{
					            	if(this.state.active===true){
					            		this.setState({active:false})
					            	}else{
					            		this.setState({active:true})
					             	}
					            }}
					            />
					    <Text style={{fontSize:20,color:"orange"}}> Active </Text>
				    </View>

					<View style={styles.viewStyle}>
						<TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Shop name"
					            value={this.state.shop_name}
					            onChangeText={(value) =>{this.setState({shop_name:value})}}/>
				    </View>
				    <View style={styles.viewStyle}>

					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Address line 1"
					            value={this.state.address_line_1}
					            onChangeText={(value) =>{this.setState({address_line_1:value})}}/>

					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Address line 2"
					            value={this.state.address_line_2}
					            onChangeText={(value) =>{this.setState({address_line_2:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="City"
					            value={this.state.town_city}
					            onChangeText={(value) =>{this.setState({town_city:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Country"
					            value={this.state.country}
					            onChangeText={(value) =>{this.setState({country:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Contact"
					            value={this.state.contact}
					            onChangeText={(value) =>{this.setState({contact:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Email"
					            value={this.state.email_address}
					            onChangeText={(value) =>{this.setState({email_address:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Shop Timming"
					            value={this.state.timming}
					            onChangeText={(value) =>{this.setState({timming:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Delivery Charges"
					            value={this.state.delivery_charges}
					            onChangeText={(value) =>{this.setState({delivery_charges:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Shop Detail"
					            value={this.state.shop_details}
					            onChangeText={(value) =>{this.setState({shop_details:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Physical Shopping Limit"
					            value={this.state.personal_pickup_limit}
					            onChangeText={(value) =>{this.setState({personal_pickup_limit:value})}}/>
					</View>
				</View>
			</ScrollView>
		</View>
			)
	}
	}


}


const styles={
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
	viewStyle:{
		backgroundColor:"#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width:"100%",
		margin:10
	}
}