import React, { useEffect, useState } from "react";
import { Text, ToastAndroid, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';

import ExecuteQuery from '../../sql';
import estilos from './style';
import { useNavigation } from '@react-navigation/native';


export default ({route}) => {

    const navigation = useNavigation()

    const id = route.params.id
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if ( id > 0) {
            selectCliente(id);
        }
    }, []);

    const selectCliente = async(id) => {
        const result = await ExecuteQuery('SELECT * from clientes WHERE id = ?',[id])
        setNome(result.rows.item(0).nome)
        setEndereco(result.rows.item(0).endereco)
        setTelefone(result.rows.item(0).telefone)
        setEmail(result.rows.item(0).email)
    }

    function Limpar(){
        setNome('')
        setEndereco('')
        setTelefone('')
        setEmail('')
    }

    function salvar() {
        if(id > 0) {
            UpdateCliente()
        }else {
            InsertCliente()
        }
        navigation.goBack()
    }

    async function InsertCliente() {
        const result = await ExecuteQuery(
        'INSERT INTO clientes (nome, endereco, telefone, email) VALUES (?, ?, ?, ?)', [nome, endereco, telefone, email])
        if(result.rowsAffected != 0){
            ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
            Limpar()
        }else {
            ToastAndroid.show('Erro ao Salvar daddos!', ToastAndroid.LONG)
        }
    }
    
    async function UpdateCliente() {
        const result = await ExecuteQuery(
        'UPDATE clientes SET nome = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?', [nome, endereco, telefone, email, id])
        if(result.rowsAffected != 0){
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
            <Text style={estilos.title}>Cadastro de Clientes</Text>
            <TextInput
                style={estilos.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={estilos.input}
                placeholder="Endereço"
                value={endereco}
                onChangeText={setEndereco}
            />

            <MaskInput 
                style={estilos.input}
                placeholder='Telefone'
                keyboardType="numeric"
                value={telefone}
                onChangeText={(masked, unmasked) => {setTelefone(masked)}}
                mask = {Masks.BRL_PHONE}
            />
            
            <TextInput
                style={estilos.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity
                style={estilos.btn}
                onPress={salvar}>
                <Text style={estilos.txtBtn}>Salvar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}