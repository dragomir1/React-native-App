import { Navigation } from 'react-native-navigation';
// import icons to use for tabs on anroid apps. the tabs dont work the same as they do for ios
import Icon from 'react-native-vector-icons/Ionicons';




const startTabs = () => {
  Promise.all([
    // we are registering a new icon here..if you want to add more icons, you fetch it here.
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('ios-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesomePlaces.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "awesomePlaces.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        }
      ],
      drawer: {
        left: {
          screen: "awesomePlaces.SideDrawerScreen",
        }
      },
      tabsStyle: {
        tabBarSelectedButtonColor: "#009933"
      }


    });
  })



};


export default startTabs;
