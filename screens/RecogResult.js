
import React from 'react';
import { Text, View, BackHandler } from 'react-native';
import { Card, Image } from 'react-native-elements'
export default class RecogResult extends React.Component {
   
    
    
      async componentDidMount() {
        try{
          //BackHandler.EventEmitter.emitter.setMaxListeners();
          BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        
        
      }
      
        catch(e){
          console.log(e);
        }
      }
      
      async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        
      }
      handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
      }
      
  render() {
    
       
    return (
      <Card title="Result">
  
    
        <View  >
          <Image
            style= {{width:250, height:150}}
            resizeMode= "cover"
            source= {{ uri: this.props.navigation.state.params.image.uri }}
          />
          <Text >{this.props.navigation.state.params.name}</Text>
        </View>
      
  
</Card>
      
        
    );
    
  }
  
  


 
  
}