import { Navigation } from 'react-native-navigation';
// import icons to use for tabs on anroid apps. the tabs dont work the same as they do for ios
import Icon from 'react-native-vector-icons/Ionicons';




const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-share-alt', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesomePlaces.FindPlaceScreen",
          label: "Find place",
          title: "Find place",
          icon: sources[0]
        },
        {
          screen: "awesomePlaces.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1]
        }
      ]
    });
  })



};


export default startTabs;
