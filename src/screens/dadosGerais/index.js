import React, { useEffect, useState } from "react";
import { View, Text, ToastAndroid, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, Alert } from 'react-native';

import ExecuteQuery from '../../sql';
import estilos from './style';
import { useNavigation } from '@react-navigation/native';


export default () => {
    
    useEffect(() => {
       selectDados() 
}   ,[])

    const navigation = useNavigation()

    const [nid, setNid] = useState()
    const [endereco, setEndereco] = useState('')
    const [contato, setContato] = useState('')
    const [email, setEmail] = useState('')
    const [banco, setBanco] = useState('')
    const [agencia, setAgencia] = useState('')
    const [conta, setConta] = useState('')
    const [dadosPix, setDadosPix] = useState('')
    const [norcamento, setN_orcamento] = useState('')

    async function selectDados() {
        const result = await ExecuteQuery('SELECT * from dadosGerais')
        if(result.rows.length == 1){
            setNid(result.rows.item(0).id)
            setEndereco(result.rows.item(0).endereco)
            setContato(result.rows.item(0).contato)
            setEmail(result.rows.item(0).email)
            setBanco(result.rows.item(0).banco)
            setAgencia(result.rows.item(0).agencia)
            setConta(result.rows.item(0).conta)
            setDadosPix(result.rows.item(0).pix)
            setN_orcamento(result.rows.item(0).norcamento)
        }
    }

    function Limpar(){
        setEndereco('')
        setContato('')
        setBanco('')
        setAgencia('')
        setConta('')
        setDadosPix('')
        setN_orcamento('')
        setEmail('')
    }

    function salvar() {
            UpdateDados()
            navigation.goBack()
    }

    function verification() {
        if(endereco == null || contato == null || banco == null || agencia == null || conta == null || dadosPix == null || email == null || endereco.length < 1 || contato.length < 1 || banco.length < 1 || agencia < 1 || conta < 1 || dadosPix.length < 1 || email.length < 1) {
            Alert.alert('Atenção', 'Todos os dados são obrigatórios')
        }else {
            salvar()
        }
    }

    async function UpdateDados() {
        const result = await ExecuteQuery(
            'UPDATE dadosGerais SET endereco = ?, contato = ?, banco = ? , agencia = ?, conta = ?, pix = ?, norcamento = ?, email = ? WHERE id = ?', [endereco, contato, banco, agencia, conta, dadosPix, norcamento, email, nid])
        if(result.rowsAffected == 1){
            ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
            Limpar()
        }else {
            ToastAndroid.show('Erro ao Salvar daddos!', ToastAndroid.LONG)
        }
    }

    return(
        <ScrollView>
        <KeyboardAvoidingView
            style={estilos.container}
            behavior='padding'
        >
            <StatusBar hidden={true} />
            <Text style={estilos.title}>Dados Gerais da Empresa</Text>

            <Text style={estilos.label}>Endereço</Text>
            <TextInput
                style={estilos.input}
                placeholder="ex: Rua oito, 23 - Centro - São Sebastião - SP"
                value={endereco}
                onChangeText={setEndereco}
            />

            <Text style={estilos.label}>Contato</Text>
            <TextInput
                style={estilos.input}
                placeholder="ex: Marcos"
                value={contato}
                onChangeText={setContato}
            />

            <Text style={estilos.label}>Email</Text>
            <TextInput 
                style={estilos.input}
                placeholder='ex: teste@teste.com.br'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            />
           
            <Text style={estilos.label}>Dados Bancários</Text>
             <View style={estilos.bancario}>
                <Text style={estilos.label}>Banco</Text>
                <TextInput
                    style={estilos.input}
                    placeholder="ex: Caixa "
                    value={banco}
                    onChangeText={setBanco}
                />
                <Text style={estilos.label}>Agencia</Text>
                <TextInput
                    style={estilos.input}
                    placeholder="ex: 123-4"
                    keyboardType="numeric"
                    value={agencia}
                    onChangeText={setAgencia}
                    autoCapitalize='none'
                />
                <Text style={estilos.label}>Conta</Text>
                <TextInput
                    style={estilos.input}
                    placeholder="ex: 1234-5"
                    keyboardType="numeric"
                    value={conta}
                    onChangeText={setConta}
                    autoCapitalize='none'
                />
            </View>
            <Text style={estilos.label}>Dados PIX</Text>
            <TextInput
                style={estilos.input}
                placeholder="ex: CPF: 123.456.789-00"
                value={dadosPix}
                onChangeText={setDadosPix}
            />
            
            <Text style={estilos.label}>Número do próximo orçamento</Text>
            <TextInput
                style={estilos.input}
                placeholder="ex: 1"
                keyboardType="numeric"
                value={norcamento}
                onChangeText={setN_orcamento}
            />
            <TouchableOpacity
                style={estilos.btn}
                onPress={() => verification()}>
                <Text style={estilos.txtBtn}>Salvar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}