import React from 'react';
import {View , Text , Button , TextInput , TouchableOpacity , ActivityIndicator , AsyncStorage , ScrollView , Image , ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';


var backgroundImage = require("../assets/Screenshot_20200703-173531.png")


export default class CreateShopCategory extends React.Component{

	state={
		image:null,
		category_name:"",
		loading:false
	}


	componentDidMount() {
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
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };


	createCategory = async() =>{
		this.setState({loading:true})
		let res = await axios.post("http://100.25.15.160/shops/shopcat/LC/",
		{
			category_name:this.state.category_name
		})
		Toast.show(res.data.category_name+" created" )
		this.setState({loading:false})
	}

	createCategoryHandler = async() => {
     this.setState({loading:true})
      var self = this;
      let photo = {
        uri: this.state.image,
        name: 'yourname.jpg', 
        type: 'image/jpg'};
      let newData     =   new FormData()
      newData.append("image",photo)
      newData.append("category_name",this.state.category_name)
      console.log(newData)
      let response = await fetch("http://100.25.15.160/shops/shopcat/LC/", {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
           'Authorization':this.state.token
         },
         body: newData
       });
      Toast.show(this.state.category_name+" created" )
      this.setState({loading:false})
        };

	render(){
		let { image } = this.state;
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
			<View>
				<View style={{backgroundColor:"black",flexDirection:"row",alignItems:"center"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>
						<Text style={{fontSize:25,color:"#fff"}}> Create Shop Category</Text>
				</View>
				<ScrollView>
				<View style={styles.viewStyle}>

				<Text style={styles.tetxStyle}>Category Image</Text>
              <TouchableOpacity onPress={this._pickImage}style={{width:325,borderRadius:2,borderColor:"rgb(204, 204, 204)",borderWidth:1}} >
                <ImageBackground source={backgroundImage} style={styles.imgStyle} >
                  {image && <Image source={{ uri: image }} style={styles.imgStyle} />}
                </ImageBackground>
              </TouchableOpacity>

				<TextField
						            labelFontSize={15}
						            tintColor="orange"
						            baseColor="#17baa1"
						            label="Category Name"
						            value={this.state.username}
						            onChangeText={(value) =>{this.setState({category_name:value})}}/>

				</View>
				<View style={{alignItems:"center"}}>

				<TouchableOpacity style={styles.buttonStyle} >
			                    <Button  
			                    	onPress ={this.createCategoryHandler}
			                    	color="orange"
								 title="Create"/>
								 </TouchableOpacity>
				</View>
				</ScrollView>
			</View>
			)
		}
	}
}

const styles={tetxStyle:{
          fontSize:15,
          color:"#17baa1",
          margin:5
        },
	buttonStyle:{
		color:"orange",
        width:"90%",
        height:40, 
        justifyContent:"center"
	},
	viewStyle:{
		// backgroundColor:"#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width:"90%",
		padding:10,
		margin:10,

	},imgStyle:{ 
    width: 323, 
    height: 320,
    backgroundColor:"#fff",
    borderRadius:2,

     },
}