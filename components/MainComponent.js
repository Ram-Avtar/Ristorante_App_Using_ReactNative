import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
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
        defaultNavigationOptions: {
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
    defaultNavigationOptions: ({ navigation }) => ({
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


const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

export const ContactNavi = createAppContainer(ContactNavigator);


const AboutNavigator = createStackNavigator({
    About: { screen: About }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

export const AboutNavi = createAppContainer(AboutNavigator);




const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavi,
        defaultNavigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
       About: 
      { screen: AboutNavi,
        defaultNavigationOptions: {
          title: 'About',
          drawerLabel: 'About Us'
        },
      },
    Menu: 
      { screen: MenuNavi,
        defaultNavigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      },
      Contact: 
      { screen: ContactNavi,
        defaultNavigationOptions: {
          title: 'Contact',
          drawerLabel: ''
        }, 
      },
       
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