import React from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export class Password extends React.Component {
    constructor(props) {
      super(props);
      this.state = { username: this.props.navigation.state.params.username, password: '', confirm: '' };
      this.errors = "";
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
      var state = this.state;
      console.log(state);
      if (state.password == "" || state.confirm == "") {
        this.setState({ errors: "None of the fields must be empty" });
      }
      else if (state.password != state.confirm) {
        this.setState({ errors: "Passwords do not match" });
      }
      else {
        fetch('http://172.17.74.185:4000/api/app/password/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
        }).then((result) => {
          console.log(result.status);
          if (result.status > 400) {
            this.setState({ errors: "Problem updating password. Please try again later" });
          }
          else {
            this.setState({ errors: "Password updated successfully" });
          }
        });
      }
    }
    render() {
      return <View style={styles.container}>
        <Text style={styles.errors}>{this.state.errors}</Text>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              underlineColorAndroid='transparent'/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Conform New Password"
              secureTextEntry={true}
              onChangeText={(confirm) => this.setState({ confirm })}
              value={this.state.confirm}
              underlineColorAndroid='transparent'/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>Change Password</Text>
        </TouchableHighlight>
      </View>
      // return (
      //   <View style={{ padding: 10 }}>
      //     <TextInput
      //       style={{ height: 40 }}
      //       placeholder="Username"
      //       onChangeText={(username) => this.setState({ username })}
      //       value={this.state.username}
      //     />
      //     <TextInput
      //       style={{ height: 40 }}
      //       placeholder="Password"
      //       secureTextEntry={true}
      //       onChangeText={(password) => this.setState({ password })}
      //       value={this.state.password}
      //     />
      //     <TextInput
      //       style={{ height: 40 }}
      //       placeholder="Confirm password"
      //       secureTextEntry={true}
      //       onChangeText={(confirm) => this.setState({ confirm })}
      //       value={this.state.confirm}
      //     />
      //     <Text style={styles.error}>
      //       {this.state.errors}
      //     </Text>
      //     <Button
      //       onPress={this.handleSubmit}
      //       title="Register"
      //     />
      //     <Button
      //       onPress={() => this.props.navigation.navigate('Login')}
      //       title="Log In"
      //     />
      //   </View>
      // );
    }
  }

  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    },
    errors:{
      color:"red",
      marginBottom:40
    }
  });