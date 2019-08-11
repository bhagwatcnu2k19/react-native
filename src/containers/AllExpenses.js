import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button, Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from '../native/components/UI/Header';
import Spacer from '../native/components/UI/Spacer';
// import console = require('console');

class ExpenseListing extends Component {
    state = {
        error: null,
        loading: false,
    }

    onPress = item => Actions.expense({ expenses: item });

    componentDidMount = () => this.fetchData();
    

    fetchData = () => {
    this.setState({ loading: true });    
    axios.get(`http://192.168.1.154:1880/api/v2/expenses`,{headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}} )
    .then(res => {
        const expenses = res.data.data.expenses;
        this.setState({ expenses });
        console.log(JSON.stringify(expenses));
    });
  }
  render = () => {
    return (
      <Container>
        <Content padder>
          <Header
            title="All Expenses"
            content="All your expenses are listed here."
          />
  
          <FlatList
            numColumns={1}
            data={this.state.expenses}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => this.onPress(item)} style={{ flex: 1 }}>
                    <Image
                      source={{ uri: 'https://www.timeoutdubai.com/sites/default/files/tod/styles/full_img_sml/public/images/2018/02/25/best_food_in_dubai_base.jpg?itok=BFpOfSNf' }}
                      style={{
                        height: 300,
                        width: null,
                        flex: 1,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>
                      Description :- {item.description+'\n'}
                      Id :- {item.id}
                    </Text>
                    <Spacer size={15} />
                    <Button
                      block
                      bordered
                      small
                      onPress={() => this.onPress(item)}
                    >
                      <Text>
                        View Expense
                      </Text>
                    </Button>
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
        <TouchableOpacity onPress={() => Actions.addExpense()} 
        /* <TouchableOpacity onPress={() => Actions.cats()}  */

            style={{
                position: 'absolute', 
                right: 10,
                bottom: 10,
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:100,
                height:100,
                backgroundColor:'#fff',
                borderRadius:50,
                }}
 >
   <Icon name={"ios-add-circle"}  size={30} color="#01a699" />
 </TouchableOpacity>
      </Container>
    );
      
    
  }
}

export default ExpenseListing;