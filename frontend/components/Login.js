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
export class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { username: '', password: ''};
      this.errors = "";
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
      var state = this.state;
      console.log(state);
      if (state.username == "" || state.password == "" ) {
        this.setState({ errors: "None of the fields must be empty" });
      }
      else {
        fetch('http://172.17.74.185:4000/api/app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
        }).then((result) => {
          console.log(result.status);
          if (result.status == 402) {
            this.setState({ errors: "Password or username does not match" });
          }
          else {
            this.setState({ errors: "Login successully" });
            this.props.navigation.navigate('Profile',{user:this.state});
          }
        });
      }
    }
    render() {
      return <View style={styles.container}>
        <Text style={styles.errors}>{this.state.errors}</Text>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              underlineColorAndroid='transparent'/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer,styles.loginButton]} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.loginText}>Sign Up</Text>
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
      //     <Text style={styles.error}>
      //       {this.state.errors}
      //     </Text>
      //     <Button
      //       onPress={this.handleSubmit}
      //       title="Login"
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