import React, { useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View, Modal, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';


import ExecuteQuery from '../../sql';
import estilo from './style';

export default () => {

    const navigation = useNavigation()
    const [dados, setDados] = useState([])
    const [visivel, setVisivel] = useState(false)
    const [slectItem, setSelectItem] = useState('')

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async ()=> {
          setDados([])
          await SelectDados()
        })
        return unsubscribe
    },[navigation])

    useEffect(() => {SelectDados()},[])

    async function SelectDados() {
        let selectQuery = await ExecuteQuery('SELECT * FROM clientes ORDER BY nome')
        let temp = []
        for(let i = 0; i < selectQuery.rows.length; i++){
            temp.push(selectQuery.rows.item(i))
        }
        setDados([...dados, ...temp])
    }

    function cliente(){
        navigation.navigate('Clientes', {id: 0})
    }

    function editItem(data){
        navigation.navigate('Clientes', {id: data.id})
    }

    async function deleteItem(data){
      const result = await ExecuteQuery('DELETE FROM clientes WHERE id = ?',[data.id])
      if (result.rowsAffected > 0){
          ToastAndroid.show('Cliente excluido com sucesso!', ToastAndroid.LONG)
      }else {
          ToastAndroid.show('Erro ao Excluir Cliente!', ToastAndroid.LONG)
      }
      setVisivel(false)
    }

    function ListItem({ data }){
        return(
          <TouchableOpacity
            style={estilo.listItem}
            onPress={()=>{editItem(data)}}
            onLongPress={()=>{
              setSelectItem(data)
              setVisivel(true)}}
          >
            <StatusBar
              hidden={true}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={visivel}
            >
              <View style={estilo.containerModal}>
                <View style={estilo.modal}>
                  <Text style={estilo.tituloModal}>Confirmação</Text>
                  <Text style={estilo.conteudo}>Confirma exclusão do cliente?</Text>
                  <View style={estilo.viewBtnModal}>
                    <TouchableOpacity
                      style={estilo.btnModal}
                      onPress={()=>{
                        deleteItem(slectItem)
                        navigation.goBack()
                      }}
                    >
                      <Text style={estilo.textBtn}>OK</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                      style={estilo.btnModal}
                      onPress={()=>{
                        setVisivel(false)
                      }}
                    >
                      <Text style={estilo.textBtn}>Cancelar</Text>
                    </TouchableOpacity>
    
                  </View>
                </View>
              </View>
            </Modal>
            <View style={estilo.item1}>
              <View>
                <Text style={estilo.label}>Nome</Text>
                <Text style={estilo.listData}>{data.nome}</Text>
              </View>
              <View>
                <Text style={estilo.label}>Endereço</Text>
                <Text style={estilo.listData}>{data.endereco}</Text>
              </View>
            </View>
            <View style={estilo.item1}>
                <View>
                    <Text style={estilo.label}>Telefone</Text>
                    <Text style={estilo.listData}>{data.telefone}</Text>
                </View>
                <View>
                    <Text style={estilo.label}>Email</Text>
                    <Text style={estilo.listData}>{data.email}</Text>
                </View>
            </View>
          </TouchableOpacity>
        )
    }
    
    return(
        <View style={estilo.container}>
            <Text style={estilo.title}>CLIENTES</Text>
            <FlatList
             maxToRenderPerBatch = {10}
             removeClippedSubviews={true}
             extraData={dados}
             style={{marginTop: 20, width: '100%'}}
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{marginHorizontal: 20}}
             data={dados}
             keyExtractor={ item => String(item.id)}
             renderItem={({ item }) => <ListItem data={item}/>}
             ListEmptyComponent={<Text style={estilo.alert}>Nenhum Cliente Encontrado</Text>}
            />
            <TouchableOpacity
                style={estilo.btn}
                onPress={cliente}
            >
            <Text style={estilo.textBtn}>Adicionar Cliente</Text>
          </TouchableOpacity>
        </View>
    )
}