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
import { AddTransaction } from './AddTransaction';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Entry } from './Entry';
export class Passbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            list: [],
            errors: "",
            other: "",
            amount: 0,
            sign: +1,
            hide: true,
            obj: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        // this.handleClick = this.handleClick.bind(this);


    }

    render() {
       
        return <View style={styles.container}>
            <Text style={styles.errors}>{this.state.errors}</Text>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    placeholder="Username of  party"
                    onChangeText={(other) => this.setState({ other })}
                    value={this.state.other} />
            </View>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} />
                <TextInput style={styles.inputs}
                    underlineColorAndroid='transparent'
                    placeholder="Amount"
                    onChangeText={(amount) => this.setState({ amount: Number.parseInt(amount), amountString: amount })}
                    value={this.state.amountString} />
            </View>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} />
                <TextInput style={styles.inputs}
                    placeholder="Payed or borrowed"
                    onChangeText={(choice) => { choice == "Payed" ? this.setState({ sign: 1 }) : this.setState({ sign: -1 }); this.setState({ choice: choice }); }}
                    value={this.state.choice} />
            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
                <Text style={styles.loginText}>Add transaction</Text>
            </TouchableHighlight>
        </View>
      
    }
    // handleClick(){
    //     this.setState({hide:!this.state.hide});
    // }
    handleSubmit() {
        var obj = this.state;
        console.log('Thisobject', obj);
        fetch('http://172.17.74.185:4000/api/app/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((result) => {

            if (result.status == 402) {
                this.setState({ errors: "Username entered is not found" });
            }
            else {

                this.setState({ errors: "Transaction Updated successfully" }, function () {
                });
            }
        }).catch();
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
        marginBottom: 6    
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
