import React , {Component} from 'react';
import { Button, Picker, Image, View ,Text , TouchableOpacity , AsyncStorage ,ScrollView ,TextInput , ActivityIndicator ,ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import {ListItem} from 'native-base';
import Toast from 'react-native-simple-toast';


var backgroundImage = require("../assets/Screenshot_20200703-173531.png")
export default class AddProduct extends Component{
	state = {
    "product_code": "",
    "product_name": "",
    "product_price": null,
    "product_image": null,
    "quantity": null,
    "description": "",
    "active": true,
    "Aisle_number": "",
    "Shelf_number": "",
    "Shelf_side": "Empty",
    "Category": "",
    "loading" :false,
    "token":"",
    "data":[]
      };



	componentDidMount() {
	    this.getPermissionAsync();
      this.categoriesRetrieveHandler()
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
      


  categoriesRetrieveHandler = async()=>{
      let res = await axios.get("http://100.25.15.160/product/list/cat/")
      this.setState({data:res.data})
    }


    categoriesMapHandler = () =>{
      return this.state.data.map((i,key)=>{
        return(
            <Picker.Item label={i.category_name} value={i.id} key={key} />)
      })
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
        this.setState({ product_image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  productUploadHandler = async() => {
  	  this.setState({loading:true})
      let image_name = this.state.product_image.split('/').pop();
      let photo = {
        uri: this.state.product_image,
        name: image_name, 
        type: 'image/jpg'}; 
      let newData     =   new FormData()
      // newData.append("image",photo)
      newData.append("category_name",this.state.product_name)
      // newData.append("product_code",this.state.product_code)
      // newData.append("product_price",this.state.product_price)
      // newData.append("quantity",this.state.quantity)
      // newData.append("description",this.state.description)
      // newData.append("Category",this.state.Category)
      // newData.append("active",this.state.active)
      console.log(newData)
      // console.log(this.state.token)
      
      let response = await fetch("http://100.25.15.160/product/create/cat", {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
         },
         body: newData
       });
      this.setState({loading:false})
      console.warn(response.data)

        };

    imageUploadHandler = async() => {
     this.setState({loading:true})
      var self = this;
      let photo = {
        uri: this.state.product_image,
        name: 'yourname.jpg', 
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
      await fetch("http://100.25.15.160/product/create/", {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
           'Authorization':this.state.token
         },
         body: newData
       }).then(function(response) {
          return response.json();
        }).then(function(data) {
        Toast.show(data.message);
      })
      this.setState({loading:false})
      // this.props.navigation.navigate('Products')
        };




	render(){
		let { product_image } = this.state;
		if(this.state.loading){
			return(
					<View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
						<View style={{borderRadius:5,backgroundColor:"#eee",padding:30}}>
							<ActivityIndicator size="large" color="#17baa1"/>
						</View>
					</View>
				)
		}
		else{
		return(
			<View style={{flex:1}}>
				<View style={{backgroundColor:"black"}}>
							<TouchableOpacity  onPress={()=>this.props.navigation.goBack()}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
							</TouchableOpacity>
				</View>

				<ScrollView style={styles.mainContainer}>
			        <View style={styles.container}>
			        	<Text style={styles.tetxStyle}>Product image</Text>
			        <TouchableOpacity onPress={this._pickImage}style={{borderRadius:2,borderColor:"rgb(204, 204, 204)",borderWidth:1}} >
			        	<ImageBackground source={backgroundImage} style={styles.imgStyle} >
			        		{product_image && <Image source={{ uri: product_image }} style={styles.imgStyle} />}
			        	</ImageBackground>
			        </TouchableOpacity>
			        	

		            

		            <TextField
		            labelFontSize={15}
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Product name"
		            value={this.state.product_name}
		            onChangeText={(value) =>{this.setState({product_name:value})}}/>

		           

		            <TextField
		            labelFontSize={15}
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Product BarCode"
		            value={this.state.product_code} 
		            onChangeText={(value) =>{this.setState({product_code:value})}}/>

		            

		            <TextField
		            labelFontSize={15}
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Price"
		            value={this.state.product_price} 
		            onChangeText={(value) =>{this.setState({product_price:value})}}/>

		       
		            <TextField
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="Quantity"
		            value={this.state.quantity}
		            onChangeText={(value) =>{this.setState({quantity:value})}}/>


		            
		            <TextField
		            tintColor="orange"
		            baseColor="#17baa1"
		            label="description"
		            value={this.state.description}
		            onChangeText={(value) =>{this.setState({description:value})}}/>


                 <TextField
                tintColor="orange"
                baseColor="#17baa1"
                label="Aisle Number"
                value={this.state.Aisle_number}
                onChangeText={(value) =>{this.setState({Aisle_number:value})}}/>

                 <TextField
                tintColor="orange"
                baseColor="#17baa1"
                label="Shelf Number"
                value={this.state.Shelf_number}
                onChangeText={(value) =>{this.setState({Shelf_number:value})}}/>

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
                      <Picker.Item label="Empty" value="Empty" />
                      <Picker.Item label="Left" value="Left" />
                      <Picker.Item label="Right" value="Right" />
                    </Picker>
                  </View>
                  </ListItem>


                <ListItem style={styles.pickerContainer}>
                <View style={styles.pickerContainer}>
                    <Text style={{color:"#17baa1",fontSize:18}}>
                      Select Category
                    </Text>
                    <Picker
                      selectedValue={this.state.Category}
                      style={{width:300,backgroundColor:"#black" ,color:"orange"}}
                      onValueChange={(itemValue, itemIndex) => this.setState({Category:itemValue})}
                    >
                      {this.categoriesMapHandler()}
                    </Picker>
                  </View>
                  </ListItem>

		            <TouchableOpacity style={{marginTop:20}} >
		                <Button color="orange" title="create"
		                   onPress={this.imageUploadHandler}/>
		            </TouchableOpacity>
		          </View>
			        
		      	</ScrollView>
		      </View>

			)
		}
	}
}


const styles = {
	imgStyle:{ 
		width: 306, 
		height: 200,
		backgroundColor:"#fff",
		borderRadius:2,
    elevation:3

		 },
	mainContainer:{
          marginBottom:20,
          // alignItems:"center"
          backgroundColor:"#fff",
        },
    container:{
          borderWidth:1,
          margin:10,
          borderRadius:3,
          borderColor:"rgb(204, 204, 204)",
          backgroundColor:"rgb(245, 245, 245)",
          padding:15,
          elevation:3

        },
	tetxStyle:{
          fontSize:15,
          color:"#17baa1",
          margin:5
        },
    inputStyle:{
          borderWidth:1,
          borderRadius:3,
          borderColor:"rgb(204, 204, 204)",
          backgroundColor:"#fff",
          padding:5
        },
  pickerContainer:{
    

  }
}