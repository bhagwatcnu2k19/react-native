import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from '../UI/Header';


import {AsyncStorage, Alert} from 'react-native';
  

  export default class Profile extends React.Component {

    state = {
      email:'',
      login_state: 'out'
    }

    componentDidMount () {

      // console.log(this.state.login_state)
      // AsyncStorage.getItem('login_state').then(res =>{
      //   if(res !== 'out'){
      //     console.log(res)
      //     this.setState({login_state:'in'})
      //     console.log("User is logged in")
      //   }

      // })
    
      // AsyncStorage.getItem('token').then(res =>{
      //   if(res != null){
      //     console.log(res)
      //   }
      // })
    }

    componentDidUpdate (){
      // Alert.alert("View has been updated")

    }

    logout = () => {
      this.state.email= ''
      this.state.login_state = 'out'
      AsyncStorage.setItem('login_state', 'out')
      Alert.alert('You have been logged out!')
      this.state.login_state = 'out'
      Actions.profile()
      this.state.login_state = 'out'
    }
  
render = () => (
  <Container>
    <Content>
      <List>
            <View>
              <Content padder>
                <Header
                  title="Hi there,"
                  content="Please login to gain access"
                />
              </Content>

              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Login
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>
                    Sign Up
                  </Text>
                </Body>
              </ListItem>
            </View>
      </List>
    </Content>
  </Container>
);
}
// Profile.propTypes = {
//   member: PropTypes.shape({}),
//   logout: PropTypes.func.isRequired,
// };

// Profile.defaultProps = {
//   member: {},
// };

