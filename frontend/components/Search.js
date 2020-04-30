import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', avatar: null, errors: "", clicked: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        var state = this.state;
        this.setState({ clicked: true });
        console.log(state);
        if (state.username == "" || state.password == "") {
            this.setState({ errors: "Please enter a username" });
        }
        else {
            this.setState({ avatar: null });
            fetch('http://172.17.74.185:4000/api/app/avatar/' + this.state.username, { method: "GET" }).then((result) => result.json()).then((result) => {
                if (result.status >= 400) {
                    this.setState({ errors: "Username not found" });
                    alert("Error");                    
                }
                else{
                    this.setState({ avatar: { uri: result.avatar } });
                }
            });
        }
    }
    render() {
        var temp;
        if (this.state.avatar) {
            temp = <Image source={this.state.avatar} style={{ width: 200, height: 200, margin: 1 }} />;
        }
        else if (this.state.clicked && this.state.errors.length == 0) {
            temp = <Text>Username does not exist</Text>;
        }
        else if(this.state.clicked != false && this.state.errors.length!=0){
            temp = <Text>The user has not uploaded a profile picture yet</Text>;                        
        }
        else{
            temp = <Text></Text>;
        }
        return <View style={styles.container}>
            <Text style={styles.heading}>SEARCH FOR USERS</Text>
            <Text style={styles.errors}>{this.state.errors}</Text>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username })} />
            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
                <Text style={styles.loginText}>Search</Text>
            </TouchableHighlight>
            {temp}
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    heading: {
        fontSize: 40,
        color: "#000000",
        marginBottom: 10
    },
    inputContainer: {
        justifyContent: 'center',
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
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
        marginBottom: 20,
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
        marginBottom: 40
    }
});