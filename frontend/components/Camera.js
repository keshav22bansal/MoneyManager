import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight, TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Dimensions } from "react-native";
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Upload pic',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library'
}
export class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      username: this.props.username
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    fetch('http://172.17.74.185:4000/api/app/avatar/' + this.state.username,{method:"GET"}).then((result) => result.json()).then((result)=> {
      if (result.status == 402) {

      }
      else {
        this.setState({ avatar: {uri:result.avatar} });
      }
    });
  }
  myfun = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }

      else {
        let source = { uri: response.uri };
        this.setState({ avatar: source });
        fetch('http://172.17.74.185:4000/api/app/avatar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username:this.state.username,avatar:source.uri})
        }).then((result) => {
          if (result.status == 402) {
          }
          else {
          }
        }).catch();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Image source={this.state.avatar}
          style={{ width: 200, height: 200, margin: 1 }} />
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.myfun}>
          <Text style={{ color: '#fff' }}>Change Image</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  errors: {
    color: "red",
    marginBottom: 4
  },
  lent: {
    height: 10,
    // width:Dimensions.get('window').width,
    width: 100,
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    color: 'green'
  },
  borrow: {
    height: 10,
    width: 100,
    flexDirection: "row",
    flex: 1,
    color: 'red',
  }
});