import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button, List, ListItem, H3
} from 'native-base';
import { Actions } from 'react-native-router-flux';
// import Loading from '../native/components/UI/Loading';
// import Error from '../native/components/UI/Error';
import Header from '../native/components/UI/Header';
import Spacer from '../native/components/UI/Spacer';
// import console = require('console');

class SingleExpense extends Component {
    state = {
        error: null,
        loading: false,
    }
    exp = this.props.expenses;
    componentDidMount = () => this.fetchData();
    fetchData = () => {
        return;
    };
    users = this.exp.users.map(item => (
        <ListItem key={item.id} rightIcon={{ style: { opacity: 0 } }}>
          <Text>Id :- {item.id + '\n'}
          Owes :- {item.owe + '\n'}
          Lent :- {item.lend}</Text>
        </ListItem>
      ));
    render = () => {
        return (
            <Container>
              <Content padder>
                <Image source={{ uri: 'https://s23991.pcdn.co/wp-content/uploads/2010/12/seared-foie-gras-recipe.jpg' }} style={{ height: 300, width: null, flex: 1 }} />
        
                <Spacer size={25} />
                <H3>Description :- {this.exp.description}</H3>
                <Text>
                  Category - 
                  {' '}
                  {this.exp.categories.id}
                </Text>
                <Spacer size={15} />
        
                <Card>
                  <CardItem header bordered>
                    <Text>About this expense</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>Total amount :- {this.exp.total_amount}</Text>
                    </Body>
                  </CardItem>
                </Card>
        
                <Card>
                  <CardItem header bordered>
                    <Text>Users</Text>
                  </CardItem>
                  <CardItem>
                    <Content>
                      <List>{this.users}</List>
                    </Content>
                  </CardItem>
                </Card>
        
                <Spacer size={20} />
              </Content>
            </Container>
        );
  }
}

export default SingleExpense;
