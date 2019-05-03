import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import MenuButton from '../components/MenuButton';

export default class FileSelector extends React.Component {
  state = {
    image: null,
    loading: false,
  };

  async componentDidMount() {
    try {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    catch (e) {
      console.log(e);
    }
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);

  }
  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

  }
  handleBackPress = () => {
    this.props.navigation.navigate('Home');

    return true;
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Image
            source={require('../assets/images/loading.gif')}
            style={{ width: 150, height: 150 }}
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>


              <TouchableOpacity
                onPress={this._pickImage}>

                <Image
                  source={
                    require('../assets/images/folder.png')
                  }
                  style={styles.welcomeImage}
                />
              </TouchableOpacity>
              <Text>Select files</Text>
            </View>
            <View style={styles.welcomeContainer}>
              <TouchableOpacity
                onPress={this._takePhoto}>

                <Image
                  source={
                    require('../assets/images/camera.png')
                  }
                  style={styles.welcomeImage}
                />
              </TouchableOpacity>
            </View>






          </View>


        </View>
      );
    }
  }

  _fetch = async (image_obj) => {
    this.setState({ loading: true });
    let image_url = image_obj;

    image = image_url['base64'];
    console.log(image_url);

    await fetch('https://plantular.herokuapp.com/upload__from__mobile__app', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64: image,
      }),
    }).then((response) => {
      this.setState({ loading: false });
        let result = response.text();
        console.log(result);
        console.log(result['_55']);
        let name = result['_55'];
        if (name.charAt(0) == '<') {
          name = "Network Error";
        }
        
        this.props.navigation.navigate('RecogResult', { 'image': image_obj, 'name': name });



      })
      .then((responseJson) => {
        responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

      this.setState({ loading: false });
  }



  _takePhoto = async () => {
    let image_obj = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!image_obj.cancelled) {
      //this.props.navigation.navigate('RecogResult',{'image':image_obj})
      this._fetch()
    }
    else {
      this.props.navigation.navigate('File')
    }
  };

  _pickImage = async () => {
    image_obj = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!image_obj.cancelled) {
      // this.props.navigation.navigate('RecogResult',{'image':image_obj})
      this._fetch(image_obj)
    }
    else {
      this.props.navigation.navigate('File')
    }

  };

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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
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
