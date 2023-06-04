import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from '../screens/menu';
import ListOrcamentos from '../screens/listOrcamentos';
import Orcamentos from '../screens/orcamentos';
import Clientes from '../screens/clientes';
import ListClientes from '../screens/listClientes';
import Embarcacoes from '../screens/embarcacoes';
import ListEmbarcacoes from '../screens/listEmbarcacoes';
import Materiais from '../screens/materiais';
import ListMateriais from '../screens/listMateriais';
import Gerenciar from '../screens/gerenciar';
import DadosGerais from '../screens/dadosGerais';

const Stack = createNativeStackNavigator();

export default () => {
    return(
        <Stack.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Menu' component={Menu} />
            <Stack.Screen name='ListOrcamentos' component={ListOrcamentos} />
            <Stack.Screen name='Orcamentos' component={Orcamentos} />
            <Stack.Screen name='Gerenciar' component={Gerenciar} />
            <Stack.Screen name='Clientes' component={Clientes} />
            <Stack.Screen name='ListClientes' component={ListClientes} />
            <Stack.Screen name='ListEmbarcacoes' component={ListEmbarcacoes} />
            <Stack.Screen name='ListMateriais' component={ListMateriais} />
            <Stack.Screen name='Embarcacoes' component={Embarcacoes} />
            <Stack.Screen name='Materiais' component={Materiais} />
            <Stack.Screen name='DadosGerais' component={DadosGerais} />
        </Stack.Navigator>
    )
}