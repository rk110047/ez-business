import React from 'react';
import {View,Text , TouchableOpacity ,StyleSheet , Button , ScrollView} from 'react-native';
import {Header ,Item ,  Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





export default class OrderHeader extends React.Component{

	refreshfun = () => {
		this.props.Fun()
	}

	render(){
		return(
			<Header style={styles.headerStyle}>
    				 <TouchableOpacity onPress={()=>{this.props.navigation.navigate("home")}}>
                         <MaterialCommunityIcons style={{color:"white",padding:12}}  
                         			size={25}name="arrow-left" 
                         			/>
                      </TouchableOpacity>
                         <TouchableOpacity  onPress={this.props.Fun}>
                         	<MaterialCommunityIcons style={{color:"white",padding:12}}  size={25}name="reload"/>
                         </TouchableOpacity>
                       
                
                </Header>
			)
	}
}

const styles = StyleSheet.create({
	headerStyle:{
		flexDirection:'row',
		backgroundColor:'black',
            justifyContent:"space-between"
		
      
		},
      viewStyle:{

      	backgroundColor:'orange',
      }




})