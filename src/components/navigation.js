import ProductList from './products/product';
import ProductDetail from './products/ProductDetail';
import Login from './authentication/Login';
import AuthLoadingScreen from './authentication/LoadingScreen';
import Logout from './authentication/Logout';
import AddProduct from './products/AddProduct';
import React , {Component} from 'react';
import {View , Text} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ShopProfile from './shop/Profile';
import ProfileEdit from './shop/ProfileEdit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './index';
import Orders from './orders/OrdersForDelivery';
import ActiveOrders from './active orders/ActiveOrdersForDelivery';
import ShippedOrders from './shipped orders/ShippedOrdersForDelivery';
import ShippedOrderDetail from './shipped orders/ShippedOrderDetail';
import ActiveOrderDetail from './active orders/ActiveOrderDetail';
import CreateShop from './superuser/createUser';
import CreateShopProfile from './superuser/createdUserShopProfileCreate';
import SuperUser from './superuser/superUser';
import SHOPS from './superuser/shops/shopList';
import ShopDetail from './superuser/shops/shopsDetail';
import CreateCategory from './superuser/createCategory';
import CreateShopCategory from './superuser/shopCategory';
import ProductContent from './products/productContent';
import AddProductImages from './products/addProductImages';
import DeliveryUserCreate from './superuser/delivery/deliveryUserCreate';
import CreateDeliveryProfile from './superuser/delivery/deliveryUserProfileCreate';
import DeliveryUsers from './superuser/delivery/deliveryUserList';
import DeliveryProfileRUD from './superuser/delivery/deliveryUserProfile';
import ProductContentCategory from './products/productContentCategory';
import ProductContentCategoryEdit from './products/productContentCategoryEdit'
import ProductBarcode from './products/productBarcode';
import ProductTaxes from './products/productTaxes';
import CollectorUserCreate from './superuser/collector/collectorUserCreate';
import CreateCollectorProfile from './superuser/collector/collectorUserProfileCreate';
import CollectorUsers from './superuser/collector/collectorUserList';
import CollectorProfileRUD from './superuser/collector/collectorUserProfile';
import Wallet from './wallet/walletHome';
import AddMoney from './wallet/addMoney';
import PayMoney from './wallet/payMoney';
import Aboutus from './about';





const HomeStack = createStackNavigator(
  {
    index: { screen: ProductList },
    productdetail: { screen: ProductDetail },
    productContent: { screen: ProductContent },
    productTaxes:{screen:ProductTaxes},
    productContentCategory:{screen:ProductContentCategory},
    productContentCategoryEdit:{screen:ProductContentCategoryEdit},
    productImages: { screen: AddProductImages },
    productBarcode:{screen:ProductBarcode}
  },
  {
    initialRouteName: 'index',
    header: null,
    headerMode: 'none'
  },
)

const AccountStack = createStackNavigator(
  {
    profile: { screen: ShopProfile },
    edit:{screen:ProfileEdit},
    superuser:{screen:SuperUser},
    shops:{screen:SHOPS},
    shopdetail:{screen:ShopDetail},
    createShop:{screen:CreateShop},
    createShopProfile:{screen:CreateShopProfile},
    createcategory:{screen:CreateCategory},
    createShopCategory:{screen:CreateShopCategory},
    createDeliveryUser:{screen:DeliveryUserCreate},
    createDeliveryProfile:{screen:CreateDeliveryProfile},
    deliveryUsers:{screen:DeliveryUsers},
    deliveryUserProfileRUD:{screen:DeliveryProfileRUD},
    createCollectorUser:{screen:CollectorUserCreate},
    createCollectorProfile:{screen:CreateCollectorProfile},
    collectorUsers:{screen:CollectorUsers},
    collectorUserProfileRUD:{screen:CollectorProfileRUD}
  },
  {
    initialRouteName: 'profile',
    header: null,
    headerMode: 'none'
  },
)

const ShippedStack = createStackNavigator(
  {
    shipped: { screen: ShippedOrders },
    shippedDetail:{screen:ShippedOrderDetail}
  },
  {
    initialRouteName: 'shipped',
    header: null,
    headerMode: 'none'
  },
)

const ActiveStack = createStackNavigator(
  {
    active: { screen: ActiveOrders },
    activeDetail:{screen:ActiveOrderDetail}
  },
  {
    initialRouteName: 'active',
    header: null,
    headerMode: 'none'
  },
)

const walletStack = createStackNavigator(
  {
    wallet :{screen: Wallet},
    addMoney: { screen: AddMoney },
    payMoney:{screen:PayMoney}
  },
  {
    initialRouteName: 'wallet',
    header: null,
    headerMode: 'none'
  },
)
const TabStack = createBottomTabNavigator({
  home:{
        screen: Home, 
        navigationOptions: {
            tabBarLabel: 'Home', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-home" color="#fff" 
                		style={{}} size={25} />
            )
        }
    },
     Orders:{
        screen: Orders, 
        navigationOptions: {
            tabBarLabel: 'Orders', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="truck" color="#fff" 
                    style={{}} size={25} />
            )
        }
    },

    "Active Orders":{
        screen: ActiveStack, 
        navigationOptions: {
            tabBarLabel: 'Active Orders', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="clock" color="#fff" 
                    style={{}} size={25} />
            )
        }
    },

    add:{
        screen: AddProduct, 
        navigationOptions: {
            tabBarLabel: 'Create', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-add" color="#fff" 
                        style={{}} size={25} />
            )
        }
    },

   

},

{
	header: null,
  headerMode: 'none',
  tabBarOptions:{
        activeBackgroundColor:'orange',
        inactiveBackgroundColor:'#17baa1',
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
                }
},
);


const Drawer = createDrawerNavigator({

  Home: {
      screen: TabStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="home" size={25} color={tintColor} />
      }
    },

"Active Orders":{
      screen: ActiveStack,
      navigationOptions: {
        drawerLabel: 'Active Orders',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="clock" size={25} color={tintColor} />
      }
    },

  "Shipped Orders":{
      screen: ShippedStack,
      navigationOptions: {
        drawerLabel: 'Dispatched Orders',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="check" size={25} color={tintColor} />
      }
    },

  Products:{
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: 'Products',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="basket" size={25} color={tintColor} />
      }
    },
  "Create Product": {
      screen: AddProduct,
      navigationOptions: {
        drawerLabel: 'Create Product',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="plus" size={25} color={tintColor} />
      }
    },

  "Profile":{
      screen: AccountStack,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="account" size={25} color={tintColor} />
      }
    },
 "Wallet":{
      screen: walletStack,
      navigationOptions: {
        drawerLabel: 'Wallet',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="wallet" size={25} color={tintColor} />
      }
    },
 
  Logout:{
      screen: Logout,
      navigationOptions: {
        drawerLabel: 'Logout',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="logout" size={25} color={tintColor} />
      }
    },
    "About Us":{
      screen: Aboutus,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="information" size={25} color={tintColor} />
      }
    },


}, {
  initialRouteName: 'Home',
   style: {
        backgroundColor: '#17baa1',
        fontSize:25,
      },
  contentOptions: {
    inactiveTintColor:"#fff",
    activeTintColor: '#fff',
    activeBackgroundColor:"orange"

  },
});

const MainSwitch = createSwitchNavigator(
	{
    	AppStart:AuthLoadingScreen, 
        App: Drawer, 
        Auth: Login
    }, 
    {
        initialRouteName: 'AppStart'
    }
	)

export default createAppContainer(MainSwitch);

