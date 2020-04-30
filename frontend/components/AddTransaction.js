import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Entry } from './Entry';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: this.props.navigation.state.params.username,
      errors: "",
      list: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);


  }
  componentDidMount() {
    console.log('component', 'http://172.17.74.185:4000/api/app/users/' + this.state.username);

    fetch('http://172.17.74.185:4000/api/app/users/' + this.state.username).then((data) => (data.json())).then((data) => {
      console.log('component', data.data);
      this.setState({ list: data.data })
    });
  }

  render() {
    var data2 = this.state.list;
    console.log('data2', data2);
    var obj = {};
    var uniq = [];
    for (var index = 0; index < data2.length; index++) {
      if (data2[index].amount != 0) {
        var name = data2[index].username;
        console.log(name, data2[index]);
        if (!obj[name] && name.length != 0) {
          obj[name] = 0;
          uniq.push(name);
        }
        obj[name] += data2[index].amount;
        console.log("dpk", obj[name], data2[index].amount);
      }
    }
    console.log('total', obj);
    var str = ""; var arr = [];
    var j = 0;
    // arr = 
    for (var i = 0; i < uniq.length; i++) {
      var x_data = { data2: data2, uniq: uniq, i: i, obj: obj, hide: true };
      arr.push(<Entry key={uniq[i]} data={x_data} />)
      // var name = uniq[i];
      // var temp = data2.map((item, index) => {
      //     if (item.username == uniq[i]) {
      //         return <Entry key={j} item={item} />
      //     }
      //     else {
      //         return <Text key={j+1}></Text>;
      //     }
      // });
      // if (obj[name] > 0)
      //     arr.push(<View key={j+2}><Button onPress={this.handleClick} title={name + " ows you " + obj[name].toString()} ></Button><Text >{temp}</Text></View>);
      // else
      //     arr.push(<View key={j+5}><Button onPress={this.handleClick}  title={"you owe " + name + " " + obj[name].toString()} ></Button><Text >{temp}</Text></View>);

      // if (obj[name] > 0)
      //     arr.push(<View key={j+2}><Button onPress={this.handleClick} key={j+3} title={name + " ows you " + obj[name].toString()} ></Button><Text key={j+4}>{temp}</Text></View>);
      // else
      //     arr.push(<View key={j+5}><Button onPress={this.handleClick} key={j+6} title={"you owe " + name + " " + obj[name].toString()} ></Button><Text key={j+7}>{temp}</Text></View>);
      j += 9;
    }

    return (
      <View>{arr}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: "red"
  }
});