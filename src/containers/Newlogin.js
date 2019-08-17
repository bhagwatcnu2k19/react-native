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

import {AsyncStorage} from 'react-native';

export default class Newlogin extends React.Component {
  state = {
    email:"",
    password:""
  }

  submitForm = () => {
    // console.log(name, val)
    axios.post(`http://192.168.1.154:1880/api/v2/accounts/login`,
    data = {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
          try {
            console.log("node red returned 201")
            console.log(response.data.data.token)
            AsyncStorage.setItem('logged_email', this.state.email)
            AsyncStorage.setItem('login_state', 'in')
            AsyncStorage.setItem('token', response.data.data.token)
            // Actions.pop()
            // Actions.profile()
            Actions.logout()
            
          } catch (error) {
            console.log("entered here shouldn't have");
            console.log(error);
            // Error saving data
          } 
      }).catch(function (error) {
        Alert.alert("Email or password invalid")
      })
      .finally(function () {
      });
    // this.setState({ email: val })
  }

  componentDidMount() {
    Actions.refresh();
  }
  render () {
    return (
    <Container>
      <Content padder>
        <View style={{flex:1}}>
        <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
              value={this.state.email}
                onChangeText={v => this.setState({email:v})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
              value={this.state.password}
                onChangeText={v => this.setState({password:v})}
              />
            </Item>
            </Form>

        <CardItem >
           <Body>
                  <Spacer size={15} />
                  <Button
                    block
                   style={{backgroundColor: 'lightgray', flex:1}}
                    onPress={() => {this.submitForm()}}
                  >
                    {/* <ActivityIndicator animating={this.state.loading} /> */}
                    <Text>{"Log in"}</Text>
                  </Button>
                  <Spacer size={5} />
                  </Body>
           </CardItem> 


      </View>
      </Content>
    </Container>
    )
  }
}
