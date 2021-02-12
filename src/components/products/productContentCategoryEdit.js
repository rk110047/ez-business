import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Button ,ScrollView, ActivityIndicator,StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
// import ProductContentCategoryList from './productContentCategoryList';



export default class ProductContentCategoryEdit extends Component{
	state={
		id:null,
		contentList:[],
		url:"",
		category_name: "",
	    requried: null,
		product_id:"",
		description:"",
		loading:true
	}

	componentDidMount(){
		this.contentFetchHandler()
	}

	contentFetchHandler = async() =>{
		let {id} 				=		this.props.navigation.state.params;
		let res 				=		await axios.get("http://100.25.15.160/product/contentcategory/RUD/"+id)
		this.setState({id:id})
		this.setState({category_name:res.data.category_name})
		this.setState({requried:res.data.requried})
		this.setState({product_id:res.data.Product}),
		this.setState({description:res.data.description}),
		this.setState({loading:false})	
	}

	reloadFun =()=>{
		this.setState({loading:true})
		this.contentFetchHandler()
		
	}

	addContent = async() =>{
		this.setState({loading:true})
		let res 		=	await axios.put("http://100.25.15.160/product/contentcategory/RUD/"+this.state.id,{
			    "category_name": this.state.category_name,
			    "requried":this.state.requried,
			    "Product": this.state.product_id,
			    "description":this.state.description,
			})
		this.props.navigation.goBack()
		this.setState({loading:false})
	}

	deleteContent = () =>{
		this.setState({loading:true})
		axios.delete(this.state.product_id)
		this.reloadFun()
		this.setState({loading:false})
	}

	listMapHandler = () => {

		return this.state.contentList.map((t,key)=>{
			return(
					<ProductContentCategoryList navigation={this.props.navigation}  data={t} fun={this.reloadFun}/>
				)
		})
	}
	render(){
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
			<View style={{backgroundColor:"#eee"}}>
				<View style={{backgroundColor:"black"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
						<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>		
				</View>
				<ScrollView>
				<View style={styles.contentAddStyle}>
						<View style={styles.viewStyle}>
							<TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Category name"
					            value={this.state.category_name}
					            onChangeText={(value) =>{this.setState({category_name:value})}}/>
					      </View>
					      <View style={styles.viewStyle}>
							<TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="Requried Contents"
					            value={this.state.requried}
					            onChangeText={(value) =>{this.setState({requried:value})}}/>
					      </View>
					      <View style={styles.viewStyle}>
							<TextField
					            labelFontSize={15}
					            tintColor="orange"
					            baseColor="#17baa1"
					            label="description"
					            value={this.state.description}
					            onChangeText={(value) =>{this.setState({description:value})}}/>
					      </View>
					      <View style={{width:"80%"}}>
					          <Button color="pink" onPress={this.addContent} title="save"/>
					      </View>
				</View>

				</ScrollView>

			</View>


			)
		}
	}
}


const styles = {
	contentViewStyle:{
			flexDirection:"row",
			margin:10,
			backgroundColor:"#fff",
			height:30,
			justifyContent:"space-between",
			alignItems:"center",
			padding:10
		},
		contentAddStyle:{
			margin:10,
			backgroundColor:"#fff",
			justifyContent:"center",
			alignItems:"center",
			borderWidth:1,
			borderRadius:5,
			borderColor:"grey",
			padding:10,
			elevation:3
		},
		viewStyle:{
		backgroundColor:"#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width:"80%",
		backgroundColor:"#fff",
		margin:10
	},
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
}