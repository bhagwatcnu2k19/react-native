import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from '../UI/Messages';
import Header from '../UI/Header';
import Spacer from '../UI/Spacer';

import {AsyncStorage} from 'react-native';


class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  _storeData = async (a,b) => {
    try {
      await AsyncStorage.setItem(a, b);
    } catch (error) {
      // Error saving data
    }
  };

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    this._storeData('logged_email',this.state.email)

    axios.post(`http://192.168.1.154:1880/api/v2/login/`,
    data = {
      email: this.state.email,
      password: this.state.password
    },
    // {headers: {token: 'd8bf9594-3ed6-41f7-a76c-f6c37aa7db41'}}
    )
      .then(res => {
        Alert.alert("Expense Created Successfully");
        this.setState({loading:false});
        Actions.expenses()
      }).catch(function (error) {
        Alert.alert(response.data.message)
        this.setState({loading:false});
        console.log(error)
        this.setState({loading:false});
      })
      .finally(function () {
      });

    return onFormSubmit(this.state)
      .then(() => setTimeout(() => Actions.pop(), 1000))
      .catch(() => {});
  }

  render() {
    const { loading, error, success } = this.props;
    const { email } = this.state;

    return (
      <Container>
        <Content>
          <View padder>
            <Header
              title="Welcome back"
              content="Please use your email and password to login."
            />
            {/* {error && <Messages message={error} />} */}
            {success && <Messages type="success" message={success} />}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                disabled={loading}
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                disabled={loading}
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit} disabled={loading}>
                <Text>{loading ? 'Loading' : 'Login' }</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
