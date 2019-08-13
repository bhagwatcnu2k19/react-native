import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Container, Form, Item, Input, Content, Card, CardItem, Body, H3, Picker, Button, Label, Icon } from 'native-base';
import Spacer from '../native/components/UI/Spacer';
import { TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {
  FlatList, RefreshControl, Image,
} from 'react-native';

export default class AddExpense extends React.Component {
  state = {
    description: "adi",
    amount: 100,
    category_list : [],
    categories : {
      id: 1
    },
    new_id : 0,
    new_owe :0,
    new_lend:0,
    user_count : 0,
    added_users : [
    ],
    loading : false

  }

  handleChange = (name, val) => {
    console.log(name, val)
    this.setState({ [name]: val })
  }

  addNewUser = () => {
    this.state.added_users.push({"id":this.state.new_id, "owe":this.state.new_owe, "lend":this.state.new_lend})
    console.log(this.state.added_users)
    this.state.new_id=0
    this.state.new_owe=0
    this.state.new_lend=0
    this.componentDidMount()
    this.render()
  }

  submitExpense = () => {
    this.setState({loading:true})
    axios.post(`http://192.168.1.154:1880/api/v2/expenses/`,
    data = {
      description: this.state.description,
      total_amount: this.state.amount,
      categories: this.state.categories,
      users: this.state.added_users
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
      this.didFocusListener = this.props.navigation.addListener(
        'didFocus', () => {
          this.setState({'getData' : true, loading: true})
        },
      );
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
        

          <Form>
            <Item stackedLabel>
              <Label>User ID</Label>
              <Input
              value={this.new_id}
                onChangeText={v => this.handleChange('new_id', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Owe</Label>
              <Input
              value={this.new_owe}
                onChangeText={v => this.handleChange('new_owe', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Lend</Label>
              <Input
              value={this.new_lend}
                onChangeText={v => this.handleChange('new_lend', v)}
              />
            </Item>
            </Form>



         <CardItem >
           <Body>
                  <Spacer size={15} />
                  <Button
                    block
                   style={{backgroundColor: 'lightgray', flex:1}}
                    onPress={() => {this.addNewUser()}}
                  >
                    {/* <ActivityIndicator animating={this.state.loading} /> */}
                    <Text>{"Add User"}</Text>
                  </Button>
                  <Spacer size={5} />
                  </Body>
           </CardItem> 

          <FlatList
            numColumns={1}
            data={this.state.added_users}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                {/* <CardItem cardBody>
                  <TouchableOpacity onPress={() => this.onPress(item)} style={{ flex: 1 }}>
                  <Text>
                        Delete User
                      </Text>
                  </TouchableOpacity>
                </CardItem> */}

                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>
                      ID :- {item.id},
                      Email : {item.owe},
                      Amount : {item.lend}
                    </Text>
                    <Spacer size={15} />
                    {/* <Button
                      block
                      bordered
                      small
                      onPress={() => this.onPress(item)}
                    >
  
                    </Button> */}
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
            )}
            refreshControl={(
              <RefreshControl
              />
            )}
          />      

         <CardItem >
           <Body>
                  <Spacer size={15} />
                  <Button
                    block
                   style={{backgroundColor: 'lightgray', flex:1}}
                    onPress={() => {this.submitExpense()}}
                  >
                    {/* <ActivityIndicator animating={this.state.loading} /> */}
                    <Text>{"Add Expense"}</Text>
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
