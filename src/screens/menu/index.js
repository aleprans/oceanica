import React, { useEffect } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ExecuteQuery from '../../sql';
import logo from '../../assets/logo.png';
import estilo from './style';

export default () => {

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async ()=> {
            await createTableClientes()
            await createTableMaterias()
            await createTableEmbarcacoes()
            await createTableOrcamentos()
            await createTableDadosGerais()
            await createTableMateriasUtilizados()
            await createTableServicosUtilizados()
            await verification()
        })
        return unsubscribe
    },[navigation])

    const navigation = useNavigation();

    async function verification() {
        let norcamento = await ExecuteQuery("SELECT * FROM dadosGerais")
        if(norcamento.rows.length < 1)  {
            ExecuteQuery("INSERT INTO dadosGerais (norcamento, endereco, contato, email, pix, banco, agencia, conta ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[1, "", "", "", "", "", "", ""])
            Alert.alert('Inicialização','É necessário cadastrar os dados de sua Empresa antes de iniciar a utilização')
            navigation.navigate('DadosGerais')
        }  
    }
    
    async function createTableClientes() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS clientes"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" nome TEXT NOT NULL,"
        +" endereco TEXT,"
        +" telefone TEXT NOT NULL,"
        +" email TEXT NOT NULL)")
    }

    async function createTableEmbarcacoes() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS embarcacoes"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" cliente INTEGER NOT NULL, "
        +" nome TEXT NOT NULL, "
        +" responsavel TEXT, "
        +" modelo TEXT,"
        +" motorizacao TEXT)")
    }

    async function createTableDadosGerais() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS dadosGerais"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" endereco TEXT, "
        +" contato TEXT, "
        +" email TEXT,"
        +" pix TEXT,"
        +" agencia TEXT,"
        +" conta TEXT,"
        +" norcamento TEXT,"
        +" banco TEXT)")
    }
    
    async function createTableMaterias() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS materiais"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" marca TEXT NOT NULL, "
        +" descricao TEXT NOT NULL, "
        +" modelo TEXT NOT NULL)")
    }

    async function createTableMateriasUtilizados() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS matUtilizados"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" idOrcamento INTEGER NOT NULL,"
        +" idMaterial INTEGER NOT NULL,"
        +" qtdeMaterial INTEGER,"
        +" prazoEntrega TEXT,"
        +" vlMaterial REAL)")
    }

    async function createTableServicosUtilizados() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS ServUtilizados"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" idOrcamento INTEGER NOT NULL,"
        +" descricao TEXT NOT NULL,"
        +" qtdeServico INTEGER,"
        +" vlServico REAL)")
    }

    async function createTableOrcamentos() {
        ExecuteQuery("CREATE TABLE IF NOT EXISTS orcamentos"
        +" (id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" nOrcamento INTEGER,"
        +" cliente INTEGER,"
        +" embarcacao INTEGER,"
        +" data TEXT,"
        +" prazoEntrega TEXT,"
        +" vlMatTot REAL,"
        +" vlServTot REAL,"
        +" vlTotal REAL)")
    }

    function screenGerar() {
        navigation.navigate('ListOrcamentos')
    }
    
    function screenGerenciar() {
        navigation.navigate('Gerenciar')
    }

    return(
        <SafeAreaView style={estilo.container}>
            <Image source={logo} style={estilo.img}/>
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenGerar}
            >
                <Text style={estilo.text}>Orçamentos</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
                style={estilo.btn}
                onPress={screenGerenciar}
            >
                <Text style={estilo.text}>Cadastros</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}