import React, { useEffect, useState } from "react";
import { Text, ToastAndroid, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';

import ExecuteQuery from '../../sql';
import estilos from './style';
import { useNavigation } from '@react-navigation/native';


export default ({route}) => {

    const navigation = useNavigation()

    const id = route.params.id
    const [marca, setMarca] = useState('')
    const [descricao, setDescricao] = useState('')
    const [modelo, setModelo] = useState('')
    
    useEffect(() => {
        if ( id > 0) {
            selectMateriais(id);
        }
    }, []);

    const selectMateriais = async(id) => {
        const result = await ExecuteQuery('SELECT * from materiais WHERE id = ?',[id])
        setMarca(result.rows.item(0).marca)
        setDescricao(result.rows.item(0).descricao)
        setModelo(result.rows.item(0).modelo)
    }

    function Limpar(){
        setMarca('')
        setDescricao('')
        setModelo('')
    }

    function salvar() {
        if(id > 0) {
            UpdateMateriais()
        }else {
            InsertMateriais()
        }
        navigation.goBack()
    }

    async function InsertMateriais() {
        const result = await ExecuteQuery(
        'INSERT INTO materiais (marca, descricao, modelo) VALUES (?, ?, ?)', [marca, descricao, modelo])
        if(result.rowsAffected != 0){
            ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
            Limpar()
        }else {
            ToastAndroid.show('Erro ao Salvar daddos!', ToastAndroid.LONG)
        }
    }
    
    async function UpdateMateriais() {
        const result = await ExecuteQuery(
        'UPDATE materiais SET marca = ?, descricao = ?, modelo = ? WHERE id = ?', [marca, descricao, modelo, id])
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
            <Text style={estilos.title}>Cadastro de Materiais</Text>
            <TextInput
                style={estilos.input}
                placeholder="Descricao"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TextInput
                style={estilos.input}
                placeholder="Marca"
                value={marca}
                onChangeText={setMarca}
            />
            <TextInput
                style={estilos.input}
                placeholder="Modelo"
                value={modelo}
                onChangeText={setModelo}
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