import React from 'react';
import {View ,Text } from "react-native";
import Barcode from '../barcode/Barcode';



export default class ProductBarcode extends React.Component{



	render(){
		const {code} = this.props.navigation.state.params
		return(
			<View style={{elevation:3,alignItems:"center",justifyContent:"center",flex:1,backgroundColor:"#dcdcdc"}}>
					<Barcode
						style={{}}
						value={code}
					        options={{ format: 'CODE128', background: '#ffffff' }}
								      />
			 </View>

			)
	}
}

