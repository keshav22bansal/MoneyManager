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
import {ListItem} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Dimensions } from "react-native";

export class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // alert(this.state.hide);
        this.setState({ hide: !this.state.hide });
    }
    render() {
        var uniq = this.state.uniq;
        var data2 = this.state.data2;
        var i = this.state.i;
        var name = uniq[i];
        var j = i;
        var temp;
        if (this.state.hide) {
            temp = <Text></Text>;
        }
        else {
            temp = data2.map((item, index) => {
                if (item.username == name) {
                    if (item.amount > 0)
                        return <Text style={styles.lent}>You lent {name}  {item.amount} on {item.date.toString().substring(0, 10)+"\n"}</Text>
                    else
                        return <Text style={styles.borrow}>You borrowed from {name} {-item.amount} on {item.date.toString().substring(0, 10)+"\n"}</Text>
                }
                else {
                    return <Text></Text>;
                }
            });
        }
        if(this.state.obj[name]!=0)
        if (this.state.obj[name] > 0) {
            return <View><TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleClick}>
                <View style={styles.block}><Text style={styles.loginText}>{name + " ows you " + this.state.obj[name].toString()}</Text></View>
            </TouchableHighlight><Text>{temp}</Text></View>
        }
        // return <View><Button style={styles.lent} onPress={this.handleClick} title={name + " ows you " + this.state.obj[name].toString()} ></Button><Text>{temp}</Text></View>;
        else {
            return <View><TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleClick}>
                <View style={styles.block}><Text style={styles.loginText}>{"You owe " + name + " " + (-this.state.obj[name]).toString()}</Text></View>
            </TouchableHighlight><Text>{temp}</Text></View>
        }
        else return <Text></Text>
       
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
      marginBottom:0,
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
    },
    lent: {
        height:10,
        // width:Dimensions.get('window').width,
        width:100,
        fontSize:20,
        flexDirection:"row",
        flex:1,
        alignContent:"center",
        justifyContent:"center",
        color: 'green'
      },
      borrow: {
        fontSize:20,
        flexDirection:"row",
        flex:1,
        color: 'red',
      },
      block1:{
        width:"100%",
        height:50,
        backgroundColor:"orange",

    }
  });