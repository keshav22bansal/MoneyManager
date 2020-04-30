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
import {Register} from './components/Register';
import {Login} from './components/Login';
import {Profile} from './components/Profile';
import {AddTransaction} from './components/AddTransaction';
import {Passbook} from './components/Passbook';
import {Search} from './components/Search';
import {Transaction} from './components/Transaction';
import {Password} from './components/Password';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>MONEY MANAGER</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer,styles.loginButton]} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}



const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Register: Register,
    Profile:Profile,
    AddTransaction:AddTransaction,
    Passbook:Passbook,
    Search:Search,
    Transaction:Transaction,
    Password:Password
  },
  {
    initialRouteName: 'Home'
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#130f40',
  },
  heading:{
    fontSize:40,
    color:"#ffffff",
    marginBottom:60
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#eb4d4b',
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
    backgroundColor: "#eb4d4b",
  },
  loginText: {
    color: 'white',
  },
  errors:{
    color:"red",
    marginBottom:40
  }
});
