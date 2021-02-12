import React from 'react';
import {View , Text , Button , TextInput , TouchableOpacity , ActivityIndicator , AsyncStorage , ScrollView , Image , ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class DeliveryProfileRUD extends React.Component{

	state={
    "first_name": "",
    "last_name": "",
    "person_photo": null,
    "contact_number": "",
    "address": "",
    "state": "",
    "city": "",
    "postal_code": "",
    "vehicle_number": "",
    "licence_number": "",
    "edit":"",
    "token":"",
    "loading":true
	}

	componentDidMount(){
		this.getObject()
		this.getPermissionAsync();
			  }

	getPermissionAsync = async () => {
		    if (Constants.platform.ios) {
			      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			      if (status !== 'granted') {
			        alert('Sorry, we need camera roll permissions to make this work!');
			      }
			    }
			    const token = await AsyncStorage.getItem('deliveryUserToken');
			    this.setState({token:token})
			    
			  };

	async getObject(){
		const { data } 	= 	this.props.navigation.state.params;
		let res  		= 	await axios.get("http://100.25.15.160/delivery/profile/RUD/"+data.id)
		this.setState({data:res.data})
		this.setState({first_name:res.data.first_name})
		this.setState({last_name:res.data.last_name})
		this.setState({person_photo:res.data.person_photo})
		this.setState({contact_number:res.data.contact_number})
		this.setState({address:res.data.address})
		this.setState({state:res.data.state})
		this.setState({city:res.data.city})
		this.setState({postal_code:res.data.postal_code})
		this.setState({vehicle_number:res.data.vehicle_number})
		this.setState({licence_number:res.data.licence_number})
		this.setState({loading:false})
	}


	_pickImage = async () => {
	    try {
	      let result = await ImagePicker.launchImageLibraryAsync({
		        mediaTypes: ImagePicker.MediaTypeOptions.All,
		        // allowsEditing: true,
		        // aspect: [4, 3],
		        // quality: 1,
		      });
		      if (!result.cancelled) {
		        this.setState({ person_photo: result.uri });
		      }
		    } catch (E) {
		      console.log(E);
		    }
		  };


	// async apiCallHandler(){
	// 	const token 	= await AsyncStorage.getItem('token');
	// 	let res 		= await axios.get("http://100.25.15.160/shops/detail/",
	// 					{
	// 						headers:{
	// 							Authorization:token
	// 						}
	// 					})
	// 	this.setState({shop_name:res.data.shop_name})
	// 	this.setState({address_line_1:res.data.address_line_1})
	// 	this.setState({address_line_2:res.data.address_line_2})
	// 	this.setState({town_city:res.data.town_city})
	// 	this.setState({country:res.data.country})
	// 	this.setState({shop_image:res.data.shop_image})
	// 	this.setState({contact:res.data.contact})
	// 	this.setState({email_address:res.data.email_address})
	// 	this.setState({timming:res.data.timming})
	// 	this.setState({shop_details:res.data.shop_details})
	// 	this.setState({active:res.data.active})
	// 	this.setState({edit:res.data.edit})
	// 	this.setState({token:token})
	// 	this.setState({loading:false})
	// 	console.log(res.data)

	// }

	profileCreateHandler = async() => {
     this.setState({loading:true})
      var self = this;
      let image_name = this.state.person_photo.split('/').pop();
      let photo = {
        uri: this.state.person_photo,
        name: image_name, 
        type: 'image/jpg'};
      let newData     =   new FormData()
      const { data } 	= 	this.props.navigation.state.params;
      newData.append("person_photo",photo)
      newData.append("first_name",this.state.first_name)
      newData.append("last_name",this.state.last_name)
      newData.append("contact_number",this.state.contact_number)
      newData.append("address",this.state.address)
      newData.append("state",this.state.state)
      newData.append("city",this.state.city)
      newData.append("postal_code",this.state.postal_code)
      newData.append("vehicle_number",this.state.vehicle_number)
      newData.append("licence_number",this.state.licence_number)
      console.log(newData)
      let response = await fetch("http://100.25.15.160/delivery/profile/RUD/"+this.state.data.id+"/", {
         method: 'PUT',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
           
         },
         body: newData
       });
      this.setState({loading:false})
      console.log(response.data)
        };

    deleteDeliveryProfileHandler = async() =>{
      	this.setState({loading:true})
      	await axios.delete("http://100.25.15.160/delivery/profile/RUD/"+this.state.data.id +"/")
      	this.props.navigation.navigate('deliveryUsers')
      	this.setState({loading:false})

      }



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
						<View style={{padding:30,borderRadius:5,backgroundColor:"#fff"}}>
							<ActivityIndicator size="large" color="#17baa1"/>
						</View>
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
							<TouchableOpacity  onPress={this.profileCreateHandler}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="check"/>
							</TouchableOpacity>
						</View>
			<ScrollView>
				<View style={styles.container}>
							<TouchableOpacity style={{}}   onPress={this._pickImage}>
								<ImageBackground  style={styles.imgStyle} source={{uri:this.state.person_photo}}>
									<MaterialCommunityIcons name="pencil" color="black" style={{alignItems:"flex-end"}} size={35} />
								</ImageBackground>
							</TouchableOpacity>

					<View style={styles.viewStyle}>
						<TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="First Name"
					            value={this.state.first_name}
					            onChangeText={(value) =>{this.setState({first_name:value})}}/>
				    </View>
				    <View style={styles.viewStyle}>

					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Last Name"
					            value={this.state.last_name}
					            onChangeText={(value) =>{this.setState({last_name:value})}}/>

					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Contact Number"
					            value={this.state.contact_number}
					            onChangeText={(value) =>{this.setState({contact_number:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Address"
					            value={this.state.address}
					            onChangeText={(value) =>{this.setState({address:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="State"
					            value={this.state.state}
					            onChangeText={(value) =>{this.setState({state:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="City"
					            value={this.state.city}
					            onChangeText={(value) =>{this.setState({city:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Postal Code"
					            value={this.state.postal_code}
					            onChangeText={(value) =>{this.setState({postal_code:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Vehicle Number"
					            value={this.state.vehicle_number}
					            onChangeText={(value) =>{this.setState({vehicle_number:value})}}/>
					</View>
					<View style={styles.viewStyle}>
					    <TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Licence Number"
					            value={this.state.licence_number}
					            onChangeText={(value) =>{this.setState({licence_number:value})}}/>
					</View>
				</View>
				<TouchableOpacity onPress={this.deleteDeliveryProfileHandler}
					style={{padding:10,margin:10,backgroundColor:"red",height:40,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
							<MaterialCommunityIcons name="delete" size={25} color="#fff"/>
							<Text style={{color:"#fff",fontSize:20}}>DELETE PROFILE</Text>
					</TouchableOpacity>
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