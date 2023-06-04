import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import estilos from './style';

 const Select = ({options, onChangeSelect, text}) => {

    const [txt, setTxt] = useState(text)
    const [modalVisivel, setModalVisivel] = useState(false)
    const [selected, setSelected] = useState('')
    const [color, setColor] = useState('#aaa')

    useEffect(() => {
        if(selected == ''){
            setColor("#aaa")
        }else {
            setColor('#000')
        }
    },[selected])
    
    function renderOption(item){
        return(
            <TouchableOpacity 
                style={estilos.txtSelect}
                onPress={() => {
                    onChangeSelect(item.id)
                    setTxt(item.nome ?? item.descricao+' '+ item.modelo+' '+item.marca)
                    setModalVisivel(false)
                    setSelected(item.id)
                }}
            >
           <Text>{item.nome ?? item.descricao}  {item.modelo ?? item.telefone}  {item.marca}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{width: '100%'}}>
            <TouchableOpacity 
                style={estilos.container}
                onPress={() => {setModalVisivel(true)}}
            >
                <Text style={{color: color, fontSize: 18}} numberOfLines={1}>{txt}</Text>
                <Icon name="chevron-down" size={16}/>
            </TouchableOpacity>
            <Modal 
                animationType='fade' 
                visible={modalVisivel} 
                onRequestClose={() => setModalVisivel(false)}
            >
                <SafeAreaView>
                    <View style={estilos.header}>
                        <TouchableOpacity
                            onPress={() => {setModalVisivel(false)}}>
                            <Icon name="chevron-left" size={18} color={'#000'} />
                        </TouchableOpacity>
                        <Text style={estilos.modalTitle}>{text}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisivel(false)
                                setSelected('')
                                onChangeSelect(0)
                                setTxt(text)
                            }}
                        >
                            <Text style={estilos.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options ?? []}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => renderOption(item)}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    )
    
}


export default Select

