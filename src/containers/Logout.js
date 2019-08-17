import React from 'react';
import {
  ListItem,
  Text,
  View, 
  Left
} from 'react-native';
import { Container, Header, Content, Body, Icon } from 'native-base';
import { Component } from 'react';
import {AsyncStorage, Alert} from 'react-native';

class Logout extends Component {
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

             
              {/* <ListItem onPress={this.logout()} icon>
                <Left>
                  <Icon name="power" />```````````````````````````````````````
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem> */}
      </View>
      </Content>
    </Container>
    )
  }
}

export default Logout;
