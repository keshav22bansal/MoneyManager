import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Passbook } from './Passbook';
import { Camera } from './Camera';
import {KeyboardAvoidingView} from 'react-native';

export class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', errors: '' };

  }
  
  render() {
    return <KeyboardAvoidingView behaviour="height" style={styles.container} enabled>
      <Text style={styles.heading}>
        Add Transactions
      </Text>
      <Passbook username={this.props.navigation.state.params.username} />
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('AddTransaction', { username: this.props.navigation.state.params.username })}>
        <Text style={styles.loginText}>Transaction Records</Text>
      </TouchableHighlight>
    </KeyboardAvoidingView>
    // return (
    //   <View style={{ padding: 10 }}>

    //     <Text style={styles.error}>
    //       Welcome {this.props.navigation.state.params.user.username}
    //     </Text>
    //     <Passbook username={this.props.navigation.state.params.user.username}/>
    //     <Button
    //     title="Records"
    //     onPress={() => this.props.navigation.navigate('AddTransaction',{username:this.props.navigation.state.params.user.username})}
    //     />
    //     <Button
    //       onPress={this.handleLogOut}
    //       title="Logout"
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
  heading: {
    fontSize: 40,
    color: "#000000",
    marginBottom: 10
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
    marginBottom: 2,
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
  }
});