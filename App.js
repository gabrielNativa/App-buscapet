import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/home';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import Confirmacao from './src/pages/confirmacao';
import User from './src/pages/user';
import Parte1 from './src/pages/cadanimal/parte1';
import Parte2 from './src/pages/cadanimal/parte2';
import Parte3 from './src/pages/cadanimal/parte3';
import SplashScreen from './src/pages/splash';
import Campanha from './src/pages/campanha';
import Pesquisar from './src/pages/pesquisa';
import PetDetails from './src/pages/pesquisa/PetDetails';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>



        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        
        <Stack.Screen name="PetDetails" component={PetDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Pesquisar" component={Pesquisar} options={{ headerShown: false }} />
       
        
        <Stack.Screen name="Campanha" component={Campanha} options={{ headerShown: false }} />
        <Stack.Screen name="Confirmacao" component={Confirmacao} options={{ headerShown: false }} />

        <Stack.Screen name="Parte1" component={Parte1} options={{ headerShown: false }} />
        <Stack.Screen name="Parte2" component={Parte2} options={{ headerShown: false }} />
        <Stack.Screen name="Parte3" component={Parte3} options={{ headerShown: false }} />

        <Stack.Screen name="User" component={User} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


