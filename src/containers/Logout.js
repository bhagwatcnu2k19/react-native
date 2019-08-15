import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Container, Header, Content, Card, CardItem, Body, H3, Picker, Button, Label, Icon } from 'native-base';
import Spacer from '../native/components/UI/Spacer';
import { TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {
  FlatList, RefreshControl, Image,
} from 'react-native';

import {AsyncStorage} from 'react-native';

export default class Logout extends React.Component {
  state = {
    email:"",
    password:"",
    login_state : 'out'
  }

  logout = () => {
    console.log("entered here")
    this.state.email= ''
    this.state.login_state = 'out'
    AsyncStorage.setItem('login_state', 'out')
    Alert.alert('You have been logged out!')
  }



  componentDidMount() {
      console.log("entered here! pls do somethingggg!!!")
  }
  render () {
    return (
    <Container>
      <Content padder>
        <View style={{flex:1}}>
              <Content padder>
                <Header
                  title={`Hi!`}
                  content={`You are currently logged in!`}
                />
              </Content>

             
              <ListItem onPress={this.logout()} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
      </View>
      </Content>
    </Container>
    )
  }
}
