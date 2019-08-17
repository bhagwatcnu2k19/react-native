import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import ExpenseContainer from '../../containers/AllExpenses'
import SingleExpenseContainer from '../../containers/SingleExpense'
import AddExpenseContainer from '../../containers/AddExpense'
import BalanceContainer from '../../containers/AllBalances'

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/User/SignUp';

// import LoginContainer from '../../containers/Login';
import LoginContainer from '../../containers/Newlogin';
import LoginComponent from '../components/User/Login';
import LogoutContainer from '../../containers/Logout';

import LexContainer from '../../containers/LexChatbot';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/User/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/User/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/User/Profile';


console.disableYellowBox = true;


import {AsyncStorage} from 'react-native';


_storeData = async (a,b) => {
  try {
    await AsyncStorage.setItem(a, b);
  } catch (error) {
    // Error saving data
  }
};


_storeData('connection', '192.168.137.217:1880/')

AsyncStorage.getItem('connection').then(res =>{
  if(res != null){
    console.log(res)
  }
})

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="expenses"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="expenses" component={ExpenseContainer} />
        </Stack>

        <Stack
          key="LexChatbot"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="LexChatbot" component={LexContainer} />
        </Stack>

        <Stack
          key="balances"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="balances" component={BalanceContainer} />
        </Stack>

        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />

          <Scene
            back
            key="logout"
            title="LOGOUT"
            {...DefaultProps.navbarProps}
            component={LogoutContainer}
            // Layout={LoginComponent}
          />

          {/* <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          /> */}
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="expense"
      title="Single Expense"
      {...DefaultProps.navbarProps}
      component={SingleExpenseContainer}
    />

    <Scene
      back
      clone
      key="addExpense"
      title="Add Expense"
      {...DefaultProps.navbarProps}
      component={AddExpenseContainer}
    />

  </Stack>
);

export default Index;
