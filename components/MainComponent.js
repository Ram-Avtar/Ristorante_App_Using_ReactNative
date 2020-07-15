import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

export const MenuNavi = createAppContainer(MenuNavigator);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

export const HomeNavi = createAppContainer(HomeNavigator);

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavi,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavi,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});
export const MainNavi = createAppContainer(MainNavigator);


class Main extends Component {
  constructor(props) {
    super(props);
   this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

 onDishSelect(dishId) {
      this.setState({selectedDish: dishId})
  }

  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <MainNavi />
        </View>
    );
  }
}
  

export default Main;