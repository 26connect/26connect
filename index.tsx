import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent appelle AppRegistry.registerComponent('main', () => App);
// Cela assure que l'environnement est correctement configuré que ce soit sur Expo Go, 
// un build natif ou sur le Web.
registerRootComponent(App);
