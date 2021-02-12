import React from 'react';
import {View ,Text , TouchableOpacity , AsyncStorage , FlatList , ScrollView ,Button,ActivityIndicator,StatusBar} from 'react-native';
import axios from 'axios';
import ListProductItem from './ProductListItem';
import Appheader from './header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class ProductList extends React.Component{

	state={
		data:[],
		loading:true
		}


	componentDidMount(){
		this.callProductListItem()
	    this.willFocusSubscription = this.props.navigation.addListener(
	      'willFocus',
	      () => {
	        this.callProductListItem();
	      }
	    );
	  }

  componentWillUnmount =()=> {
    this.willFocusSubscription.remove();
  }

	async callProductListItem(){
		var self=this;
		const token 	= await AsyncStorage.getItem('token');
		let res = await axios.get("http://100.25.15.160/product/listofuser",
			{
						headers:{
							Authorization:token
						}
					})
        this.setState({data:res.data})
        this.setState({loading:false})
	}
	mapProduct(){
		return this.state.data.map((t,key)=>{ return(
      <ListProductItem data={t} key={key} navigation={this.props.navigation} />)})
	}
	render(){
		if(this.state.loading){
			return (
				<View  style={{flex:1}}>
					<View style={{backgroundColor:"black"}}>
							<TouchableOpacity  onPress={()=>this.props.navigation.navigate("home")}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
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
					<View style={{backgroundColor:"black"}}>
							<TouchableOpacity  onPress={()=>this.props.navigation.navigate("home")}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
							</TouchableOpacity>
				</View>
				<ScrollView >
					<View style={styles.scrollStyle}>
						{this.mapProduct()}
					</View>
					<View style={{backgroundColor:"blue"}}>
					</View>
				</ScrollView>
					
				</View>

				
			)
	 }
	}
}

const styles ={
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
	scrollStyle:{
		// flexDirection:'row',
		backgroundColor:'#eee'
	}
}
