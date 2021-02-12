import React, { useState } from "react";
import { View, Text ,Picker, StyleSheet } from "react-native";
import axios from "axios";

class App extends React.Component{

    state={
      selectedValue:"",
      data:[]
    }
    componentDidMount(){
      this.categoriesRetrieveHandler()
    }


    categoriesRetrieveHandler = async()=>{
      let res = await axios.get("http://100.25.15.160/product/list/cat/")
      this.setState({data:res.data})
      console.warn(res.data)
    }

    categoriesMapHandler = () =>{
      return this.state.data.map((i,key)=>{
        return(
            <Picker.Item label={i.category_name} value={i.id} />)
      })
    }
  render(){
      return (
        <View style={styles.container}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}
          >
            {this.categoriesMapHandler()}
          </Picker>
          <Text>{this.state.selectedValue}</Text>
        </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default App;
