import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Root from './navigators/Root';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Root />
      </NativeBaseProvider>
    </Provider>
  );
}

export default registerRootComponent(App);
