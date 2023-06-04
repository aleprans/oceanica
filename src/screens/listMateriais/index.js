import React, { useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View, Modal, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';


import ExecuteQuery from '../../sql';
import estilo from './style';

export default () => {

    const navigation = useNavigation()
    const [dados, setDados] = useState([])
    const [visivel, setVisivel] = useState(false)
    const [selectItem, setSelectItem] = useState('')

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async ()=> {
          setDados([])
          await SelectDados()
        })
        return unsubscribe
    },[navigation])

    async function SelectDados() {
      setDados([])
        let selectQuery = await ExecuteQuery('SELECT * FROM materiais')
        let temp = []
        for(let i = 0; i < selectQuery.rows.length; i++){
            temp.push(selectQuery.rows.item(i))
        }
        setDados([...dados, ...temp])
    }

    function materiais(){
        navigation.navigate('Materiais', {id: 0})
    }

    function editItem(data){
        navigation.navigate('Materiais', {id: data.id})
    }

    async function deleteItem(data){
        const result = await ExecuteQuery('DELETE FROM materiais WHERE id = ?',[data.id])
        if (result.rowsAffected > 0){
            ToastAndroid.show('Material excluido com sucesso!', ToastAndroid.LONG)
        }else {
            ToastAndroid.show('Erro ao Excluir Material!', ToastAndroid.LONG)
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
                  <Text style={estilo.conteudo}>Confirma exclusão do Material?</Text>
                  <View style={estilo.viewBtnModal}>
                    <TouchableOpacity
                      style={estilo.btnModal}
                      onPress={()=>{
                        deleteItem(selectItem)
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
              <View style={estilo.item1} >
                <View>
                  <Text style={estilo.label}>Descrição</Text>
                  <Text style={estilo.listData}>{data.descricao}</Text>
                </View>
              </View>
              <View style={estilo.item1}>
                <View>
                  <Text style={estilo.label}>Marca</Text>
                  <Text style={estilo.listData}>{data.marca}</Text>
                </View>
                <View>
                  <Text style={estilo.label}>Modelo</Text>
                  <Text style={estilo.listData}>{data.modelo}</Text>
                </View>
              </View>
          </TouchableOpacity>
        )
    }
    
    return(
        <View style={estilo.container}>
            <Text style={estilo.title}>MATERIAIS</Text>
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
             ListEmptyComponent={<Text style={estilo.alert}>Nenhum Matrial Encontrado</Text>}
            />
            <TouchableOpacity
                style={estilo.btn}
                onPress={materiais}
            >
            <Text style={estilo.textBtn}>Adicionar Material</Text>
          </TouchableOpacity>
        </View>
    )
}