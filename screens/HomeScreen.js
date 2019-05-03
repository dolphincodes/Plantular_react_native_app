
import React from 'react';
import { Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, BackHandler,
} from 'react-native';
import MenuButton from '../components/MenuButton';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  async componentDidMount() {
    try { BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    //console.log('add home') 
  }
    catch (e) {
      console.log(e);
    }
  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    //console.log('remove home')
  }
  handleBackPress = () => {
    this.props.navigation.goBack()
    return true;
  }
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            
          <Image
                source={
                  require('../assets/images/logo.png')
                }
                style={styles.welcomeImage}
              />


            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('File')}>
              <Text style={styles.button}>Recommendation</Text>
              
            </TouchableOpacity>

          </View>




        </ScrollView>


      </View>
    );
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#00ffff',
    borderWidth: 1.5,
    borderRadius: 20,
    color: '#00ffff',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
});
