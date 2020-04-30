import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Entry} from './Entry';
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
            obj:{}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        

    }
    componentDidMount() {
        console.log('component','http://172.17.74.185:4000/api/app/users/' + this.state.username);

        fetch('http://172.17.74.185:4000/api/app/users/' + this.state.username).then((data) => (data.json())).then((data) => {
            console.log('component', data.data);
            this.setState({ list: data.data })
        });
    }
    
    render() {
        console.log('state',this.state);
        var data2 = this.state.list;
        console.log('data2', data2);
        var obj = {};
        var uniq = [];
        for (var index = 0; index < data2.length; index++) {
            var name = data2[index].username;
            console.log(name, data2[index]);
            if (!obj[name] && name.length != 0) {
                obj[name] = 0;
                uniq.push(name);
            }
            obj[name] += data2[index].amount;
            console.log("dpk", obj[name], data2[index].amount);
        }
        console.log('total',obj);
        var str = ""; var arr = [];
        var j =0;
        // arr = 
        // for (var i = 0; i < uniq.length; i++) {
        //     var x_data = {data2:data2,uniq:uniq,i:i,obj:obj,hide:false};
        //     arr.push(<Entry key={uniq[i]} data={x_data}/>)
            // var name = uniq[i];
            // var temp = data2.map((item, index) => {
            //     if (item.username == uniq[i]) {
            //         return <Entry key={j} item={item} />
            //     }
            //     else {
            //         return <Text key={j+1}></Text>;
            //     }
            // });
            // // if (obj[name] > 0)
            // //     arr.push(<View key={j+2}><Button onPress={this.handleClick} title={name + " ows you " + obj[name].toString()} ></Button><Text >{temp}</Text></View>);
            // // else
            // //     arr.push(<View key={j+5}><Button onPress={this.handleClick}  title={"you owe " + name + " " + obj[name].toString()} ></Button><Text >{temp}</Text></View>);
            
            // if (obj[name] > 0)
            //     arr.push(<View key={j+2}><Button onPress={this.handleClick} key={j+3} title={name + " ows you " + obj[name].toString()} ></Button><Text key={j+4}>{temp}</Text></View>);
            // else
            //     arr.push(<View key={j+5}><Button onPress={this.handleClick} key={j+6} title={"you owe " + name + " " + obj[name].toString()} ></Button><Text key={j+7}>{temp}</Text></View>);
            // j+=9;
        // }

        return (<View>
            <TextInput
                style={{ height: 40 }}
                placeholder="Username of party"
                onChangeText={(other) => this.setState({ other })}
                value={this.state.other}
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="Amount"
                onChangeText={(amount) => this.setState({ amount: Number.parseInt(amount), amountString: amount })}
                value={this.state.amountString}
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="Payed or borrowed"
                onChangeText={(choice) => { choice == "Payed" ? this.setState({ sign: 1 }) : this.setState({ sign: -1 }); this.setState({ choice: choice }); }}
                value={this.state.choice}
            />
             <Text style={styles.error}>
            {this.state.errors}
          </Text>
            <Button
            onPress={this.handleSubmit}
            title="Add Transaction"
          />
          <View>
            {uniq.map((item,index)=>{
            return <Entry key={item} data={{data2:data2,uniq:uniq,i:index,obj:obj,hide:false}} />;
            })}
         </View>
            </View>

        );
    }
    handleClick(){
        this.setState({hide:!this.state.hide});
    }
    handleSubmit() {
        // alert('Transact');
        var obj = this.state;
        // alert(obj.username);
        // alert(obj.other);
        console.log('Thisobject', obj);
        fetch('http://172.17.74.185:4000/api/app/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            console.log(result);
            console.log(result.status);
            // alert('HeyStat',result.status);
            if (result.status == 402) {
                this.setState({ errors: "Username entered is not found" });
            }
            else {
                
                this.setState({ errors: "Transaction Updated successfully" }, function () {
                    fetch('http://172.17.74.185:4000/api/app/users/' + this.state.username).then((data) => (data.json())).then((data) => {
                        console.log('component', data.data);
                        this.setState({ list: data.data })
                    });
                });
            }
        }).catch();
    }
}


const styles = StyleSheet.create({
    error: {
        color: "red"
    },
    show: {
        backgroundColor:"green",
        display: 'flex'
    },
    hide: {
        backgroundColor:"orange",

        display: 'none'
    }

});