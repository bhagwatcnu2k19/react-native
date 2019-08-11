import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from '../native/components/UI/Header';
import Spacer from '../native/components/UI/Spacer';
// import console = require('console');

class BalanceListing extends Component {
    state = {
        error: null,
        loading: false,
    }

    onPress = item => {
        this.setState({ loading: true });    

        const headers = {
            'Content-Type': 'application/json',
            'token': 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'
          }
          
          axios.post(`http://192.168.1.154:1880/api/v2/settle`, {users:{id:item.id}}, {
              headers: headers
            })
            .then((response) => {
                console.log(response)
            })

            this.setState({ loading: true });    
            axios.get(`http://192.168.1.154:1880/api/v2/balances`,{headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}} )
            .then(res => {
                const balances = res.data.data.balances;
                this.setState({ balances });
            });

        }

    componentDidMount = () => this.fetchData();
    

    fetchData = () => {
    this.setState({ loading: true });    
    axios.get(`http://192.168.1.154:1880/api/v2/balances`,{headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}} )
    .then(res => {
        const balances = res.data.data.balances;
        this.setState({ balances });
        console.log(JSON.stringify(res));
    });

    this.setState({ loading: true });    
    axios.get(`http://192.168.1.154:1880/api/v2/profile`,{headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}} )
    .then(res => {
        const balances = res.data.data.outstanding_amount;
        this.setState({outstanding_amount:balances});
    });

  }

  render = () => {
    return (
      <Container>
        <Content padder>
          <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem>
                <Text>
                Your total outstanding amount is = {this.state.outstanding_amount}
            </Text>
                </CardItem>
          </Card>
 
  
          <FlatList
            numColumns={1}
            data={this.state.balances}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => this.onPress(item)} style={{ flex: 1 }}>
                  <Text>
                        Settle Up Balance
                      </Text>
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>
                      ID :- {item.id},
                      Email : {item.email},
                      Amount : {item.amount}
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
  
          <Spacer size={20} />
        </Content>
      </Container>
    );
      
    
  }
}

export default BalanceListing;