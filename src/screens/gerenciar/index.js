import { Image, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import logo from '../../assets/logo.png';
import estilo from './style';

export default () => {

    const navigation = useNavigation();

    function screenCliente() {
        navigation.navigate('ListClientes')
    }
    
    function screenEmbarcacao() {
        navigation.navigate('ListEmbarcacoes')
    }
 
    function screenMateriais() {
        navigation.navigate('ListMateriais')
    }
    
    function screenDados() {
        navigation.navigate('DadosGerais')
    }

    return(
        <ScrollView>
        <SafeAreaView style={estilo.container}>
            <Image source={logo} style={estilo.img}/>
            <Text style={estilo.title}>Gerênciamento do Sistema</Text>
                       
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenDados}
            >
                <Text style={estilo.text}>Dados Gerais</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenCliente}
            >
                <Text style={estilo.text}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenEmbarcacao}
            >
                <Text style={estilo.text}>Embarcacões</Text>
            </TouchableOpacity>
                     
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenMateriais}
            >
                <Text style={estilo.text}>Materiais</Text>
            </TouchableOpacity>

        </SafeAreaView>
        </ScrollView>
    )
}