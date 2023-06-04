import React, { useEffect, useState } from "react";
import { Text, ToastAndroid, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ExecuteQuery from '../../sql';
import estilos from './style';
import Select from '../../components/select';
import { useNavigation } from '@react-navigation/native';


export default ({route}) => {

    const navigation = useNavigation()

    const id = route.params.id
    const [nome, setNome] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [modelo, setModelo] = useState('')
    const [motorizacao, setMotorizacao] = useState('')
    const [allClientes, setAllClientes] = useState([])
    const [cliente, setCliente] = useState('')


    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async ()=> {
            selectAllClientes()
            if ( id > 0) {
                selectEmbarcacao(id);
            }
        })
        return unsubscribe
    },[navigation])

    const selectEmbarcacao = async(id) => {
        const result = await ExecuteQuery('SELECT * from embarcacoes WHERE id = ?',[id])
        setNome(result.rows.item(0).name)
        setResponsavel(result.rows.item(0).responsavel)
        setModelo(result.rows.item(0).modelo)
        setMotorizacao(result.rows.item(0).motorizacao)
    }

    const selectAllClientes = async() => {
        let selectQuery = await ExecuteQuery("SELECT id, nome, telefone FROM clientes");
        var temp = [];
        for (let i = 0; i < selectQuery.rows.length; ++i)
            temp.push(selectQuery.rows.item(i));
        setAllClientes(temp)
    }

    function Limpar(){
        setNome('')
        setResponsavel('')
        setModelo('')
        setMotorizacao('')
        setCliente('')
    }

    function salvar() {
        if(id > 0) {
            UpdateEmbarcacao()
        }else {
            InsertEmbarcacao()
        }
        navigation.navigate('ListEmbarcacoes')
    }

    async function InsertEmbarcacao() {
        const result = await ExecuteQuery(
        'INSERT INTO embarcacoes (cliente, nome, responsavel, modelo, motorizacao) VALUES (?, ?, ?, ?, ?)', [cliente, nome, responsavel, modelo, motorizacao])
        if(result.rowsAffected != 0){
            ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
            Limpar()
        }else {
            ToastAndroid.show('Erro ao Salvar daddos!', ToastAndroid.LONG)
        }
    }
    
    async function UpdateEmbarcacao() {
        const result = await ExecuteQuery(
        'UPDATE embarcacoes SET cliente = ?, nome = ?, responsavel = ?, modelo = ?, motorizacao = ? WHERE id = ?', [cliente, nome, responsavel, modelo, motorizacao, id])
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
            <Text style={estilos.title}>Cadastro de Embarcações</Text>
            <View style={estilos.containerSelect}>
                <Select 
                    options={allClientes} 
                    onChangeSelect={(id) => {
                    setCliente(id)
                    }} 
                    text='Selecione um Cliente' 
                />
            </View>
            <TextInput
                style={estilos.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={estilos.input}
                placeholder="Responsável"
                value={responsavel}
                onChangeText={setResponsavel}
            />

            <TextInput 
                style={estilos.input}
                placeholder='Modelo'
                value={modelo}
                onChangeText={setModelo}
            />
            
            <TextInput
                style={estilos.input}
                placeholder="Motorização"
                value={motorizacao}
                onChangeText={setMotorizacao}
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