import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Container, Content, Card, CardItem, Body, H3, Picker, Button, Label, Icon } from 'native-base';
import Spacer from '../native/components/UI/Spacer';
import { TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class AddExpense extends React.Component {
  state = {
    description: "adi",
    amount: 100,
    category_list : [],
    categories : {
      id: 1
    },
    user_count : 0,
    user_list : [],
    users : [
      {
        "id":140,
        "owe":100,
        "lend":0
      },
      {
        "id":141,
        "owe":0,
        "lend":100
      }
    ],
    loading : false

  }
  submitExpense = () => {
    this.setState({loading:true})
    axios.post(`http://192.168.1.154:1880/api/v2/expenses/`,
    data = {
      description: this.state.description,
      total_amount: this.state.amount,
      categories: this.state.categories,
      users: this.state.users
    },
    {headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}}
    )
      .then(res => {
        Alert.alert("Expense Created Successfully");
        this.setState({loading:false});
        Actions.expenses()
      }).catch(function (error) {
        Alert.alert(response.data.error)
        this.setState({loading:false});
        console.log(error)
        this.setState({loading:false});
      })
      .finally(function () {
      });
  }

  componentDidMount() {
    Actions.refresh();
    axios.get(`http://192.168.1.154:1880/api/v2/categories/`, {headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}})
      .then(res => {
        category_list = res.data.data.categories;
        this.setState({category_list});
      })
      // axios.get(`http://192.168.1.154:1880/api/v2/users/`, {headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}})
      // .then(res => {
      //   user_list = res.data.data.users;
      //   this.setState({user_list: user_list});
      // })
  }
  render () {
    return (
    <Container>
      <Content padder>
        <View style={{flex:1}}>
        <Card style={{flex:1}}>
          <CardItem style={{flex:1}}>
            <Text>
            {'Enter Description'}
            </Text>
          </CardItem>

          <CardItem header bordered>
          <TextInput
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          style = {{borderColor: 'lightgray', borderWidth: 1, flex:1}}
          placeholder="Enter Description"
          
          />
          </CardItem>

          <CardItem style={{flex:1}}>
            <Text>
            {'Enter Amount'}
            </Text>
          </CardItem>

          <CardItem header bordered>
          <TextInput
          onChangeText={(amount) => this.setState({amount: Number(amount)})}
          value={this.state.amount===undefined?"":String(this.state.amount)}
          style = {{borderColor: 'lightgray', borderWidth: 1, flex:1}}
          placeholder="Enter Amount"
          keyboardType={'numeric'}
          />
          </CardItem>

            <CardItem style={{flex:1}}>
              <Text>
              {'Select Category'}
              </Text>
            </CardItem>

            <CardItem  style={{padding:1,flex:1}}>
            <Picker
              selectedValue={this.state.categories.id}
              mode='dropdown'
              style={{flex:1}}
              onValueChange={(item) => this.setState({categories:{id:item}})}
              >
              {this.state.category_list.map((category) => {
                 return (

                 <Picker.Item label={category.name} value={category.id} key={category.id} />
                 )
              })}
              </Picker>
          </CardItem>
        

          
          
         <CardItem >
           <Body>
                  <Spacer size={15} />
                  <Button
                    block
                   style={{backgroundColor: 'lightgray', flex:1}}
                   disabled={this.state.loading}
                    onPress={() => {this.submitExpense()}}
                  >
                    {/* <ActivityIndicator animating={this.state.loading} /> */}
                    <Text>{this.state.loading?"SAVED":"SAVE"}</Text>
                  </Button>
                  <Spacer size={5} />
                  </Body>
           </CardItem> 


        </Card>
        <Spacer size={20} />
      </View>
      </Content>
    </Container>
    )
  }
}
