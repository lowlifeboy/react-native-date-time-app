import React from 'react';
import Header from './components/Header';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const weekDays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

class LoginScreen extends React.Component {
  state = {
    adminLogin: 'admin',
    adminPassword: '12345',
    enteredLogin: '',
    enteredPassword: '',
    userLogined: false,
    isHidePasswordText: true,
    wrongLoginOrPass: false,
  };

  componentDidMount() {
    AsyncStorage.getItem('userLogined')
      ? AsyncStorage.getItem('userLogined')
          .then(value => {
            JSON.parse(value) === true &&
              AsyncStorage.getItem('enteredLogin').then(value => {
                this.props.navigation.navigate('Dashboard', JSON.parse(value));
              });
          })
          .done()
      : null;
  }

  handleLogin = text => {
    this.setState({ enteredLogin: text });
  };
  handlePassword = text => {
    this.setState({ enteredPassword: text });
  };

  login = () => {
    this.state.adminLogin === this.state.enteredLogin &&
    this.state.adminPassword === this.state.enteredPassword
      ? (this.props.navigation.navigate('Dashboard', this.state.enteredLogin),
        AsyncStorage.setItem('userLogined', JSON.stringify(true))
          .then(() => {
            this.setState({ userLogined: true });
          })
          .done(),
        AsyncStorage.setItem('enteredLogin', JSON.stringify(this.state.enteredLogin))
          .then(() => {
            this.setState({ enteredLogin: this.state.enteredLogin });
          })
          .done())
      : this.setState({ wrongLoginOrPass: true });
  };

  render() {
    const {
      container,
      appName,
      input,
      passwordBlock,
      showHidePasswordButton,
      showHidePasswordButtonText,
      submitButton,
      submitButtonText,
      error,
    } = styles;

    return (
      <View style={container}>
        <Text style={appName}>Date and Time</Text>
        <TextInput
          style={this.state.wrongLoginOrPass === false ? input : error}
          underlineColorAndroid="transparent"
          placeholder="Login"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleLogin}
        />
        <View style={passwordBlock}>
          <TextInput
            style={this.state.wrongLoginOrPass === false ? input : error}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="black"
            autoCapitalize="none"
            secureTextEntry={this.state.isHidePasswordText}
            onChangeText={this.handlePassword}
          />
          <TouchableOpacity
            style={showHidePasswordButton}
            onPress={() => this.setState({ isHidePasswordText: !this.state.isHidePasswordText })}
          >
            <Text style={showHidePasswordButtonText}>
              {this.state.isHidePasswordText === true ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class DashboardScreen extends React.Component {
  state = {
    headerTitle: `Hello, ${this.props.navigation.state.params}`,
    timePassed: false,
    weekDay: '',
    time: '',
  };

  componentDidMount() {
    this.getWeekDay();
    this.getTime();
  }

  getWeekDay = () => {
    const weekDayNumber = new Date().getDay();
    this.setState({ weekDay: weekDays[weekDayNumber] });
  };

  getTime = () => {
    this.setState({ timePassed: true });
    const date = new Date();
    const hours = date.getHours(); //Current Hours
    const min = date.getMinutes(); //Current Minutes
    const sec = date.getSeconds(); //Current Seconds
    const time =
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (min < 10 ? '0' + min : min) +
      ':' +
      (sec < 10 ? '0' + sec : sec);
    this.setState({ time });

    setTimeout(() => {
      this.getTime();
    }, 1000);
  };

  logout = () => {
    AsyncStorage.removeItem('enteredLogin');
    AsyncStorage.removeItem('userLogined');
    this.props.navigation.goBack();
  };

  render() {
    const { headerTitle } = this.state;
    const { dashboardContent, weekDay } = styles;

    return (
      <View>
        <Header title={headerTitle} onPressBack={() => this.logout()} />
        <View style={dashboardContent}>
          <Text style={weekDay}>{this.state.weekDay}</Text>
          <Text>{this.state.time}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  appName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  passwordBlock: {
    position: 'relative',
  },
  showHidePasswordButton: {
    color: 'white',
    margin: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  showHidePasswordButtonText: {
    lineHeight: 40,
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'black',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
  },
  error: {
    borderColor: 'red',
    color: 'red',

    margin: 15,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  dashboardContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDay: {
    fontSize: 24,
    marginBottom: 20,
  },
});

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Dashboard: DashboardScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
