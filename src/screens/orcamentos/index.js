import React, { useEffect, useState } from "react";
import { 
    Text, 
    ToastAndroid, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    ScrollView, 
    View, 
    Modal,
    Alert,
    Keyboard
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';

import ExecuteQuery from '../../sql';
import estilos from './style';
import Select from '../../components/select';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';


export default () => {

    
    const navigation = useNavigation()

    const [listAllMateriais, setListAllMateriais] = useState([])
    const [listUtilmaterial, setListUtilMaterial] = useState([])
    const [listUtilServico, setListUtilServico] = useState([])
    const [matSelected, setMatSelected] = useState(0)
    const [nOrcamento, setNOrcamento] = useState('')
    const [data, setData] = useState('')
    const [cliente, setCliente] = useState('')
    const [listCliente, setListCliente] = useState([])
    const [embarcacao, setEmbarcacao] = useState('')
    const [viewEmbarcacao, setViewEmbarcacao] = useState(false)
    const [listEmbarcacao, setListEmbarcacao] = useState([])
    const [insertMaterial, setInsertMaterial] = useState(false)
    const [insertServico, setInsertServico] = useState(false)
    const [qtMaterial, setQtMaterial] = useState()
    const [vlMaterial, setVlMaterial] = useState()
    const [vlMatTot, setVlMatTot] = useState()
    const [servico, setServico] = useState('')
    const [qtServico, setQtServico] = useState('')
    const [vlServico, setVlServico] = useState('')
    const [vlServTot, setVlServTot] = useState('')
    const [vlTotal, setVlTotal] = useState()
    const [vlTotalBR, setVlTotalBR] = useState()
    const [prazoEntMat, setPrazoEntMat] = useState('')
    const [prazoEntrega, setPrazoEntrega] = useState('')
    const [idServ, setIdServ] = useState(1)
    const [erro, setErro] = useState(0)

    useEffect(() => {
        selectCliente()
        selectNOrcamento()
    },[])

    useEffect(() => {
        calcTotal()
    },[qtMaterial, vlMaterial, qtServico, vlServico])

    useEffect(() => {
        if(data.length >= 10) {
            Keyboard.dismiss()
        }
    },[data])

    async function selectCliente() {
        setListCliente([])
        let selectQuery = await ExecuteQuery('SELECT * from clientes')
        let temp = []
        for(let i = 0; i < selectQuery.rows.length; i++){
            temp.push(selectQuery.rows.item(i))
        }
        setListCliente([...temp])
    }

    async function selectNOrcamento() {
        setNOrcamento('')
        let selectQuery = await ExecuteQuery('SELECT * FROM dadosGerais')
        setNOrcamento(selectQuery.rows.item(0).norcamento)
    }

    async function selectEmbarcacao(id) {
        setListEmbarcacao('')
        let selectQuery = await ExecuteQuery('SELECT * FROM embarcacoes WHERE cliente = ?',[id])
        let temp = []
        for(let i = 0;i < selectQuery.rows.length; i++){
            temp.push(selectQuery.rows.item(i))
        }
        setListEmbarcacao([...temp])
    }

    async function selectAllMateriais() {
        setListAllMateriais([])
        let selectQuery = await ExecuteQuery('SELECT * FROM materiais')
        let temp = []
        for(let i = 0; i < selectQuery.rows.length; i++){
            temp.push(selectQuery.rows.item(i))
        }
        setListAllMateriais([...temp])
    }
    
    function limparModais() {
        setQtMaterial('')
        setQtServico('')
        setVlMaterial('')
        setVlServico('')
        setServico('')
        setPrazoEntMat('')
    }

    function calcTotal() {

        let totMat = 0
        let totServ = 0
        var totGeral = 0

        for(let i = 0; i < listUtilmaterial.length; i++) {
            totMat += listUtilmaterial[i].qtde * listUtilmaterial[i].valor.replace('.','').replace(',','.')
        }
        setVlMatTot(totMat.toFixed(2))
        
        for(let x = 0; x < listUtilServico.length; x++) {
            totServ += listUtilServico[x].qtde * listUtilServico[x].valor.replace('.','').replace(',','.')
        }

        setVlServTot(totServ.toFixed(2))

        totGeral = (totMat + totServ)
        setVlTotal(totGeral)
        let total = convertPadrao(String(totGeral.toFixed(2)).replace('.',','))
        setVlTotalBR(total)
    }
    
    async function InsertOrcamento() {
        
        const insertOrcamento = await ExecuteQuery('INSERT INTO orcamentos (nOrcamento, cliente, embarcacao, vlTotal, data, prazoEntrega, vlMatTot, vlServTot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nOrcamento, cliente, embarcacao, vlTotal, data, prazoEntrega, vlMatTot, vlServTot])

        if(insertOrcamento.rowsAffected == 1) {
            for(let i = 0; i < listUtilmaterial.length; i++){
                const valorMat = listUtilmaterial[i].valor.replace('.','').replace(',','.')
                var matUtil = await ExecuteQuery('INSERT INTO matUtilizados (idOrcamento, idMaterial, qtdeMaterial, vlMaterial, prazoEntrega) VALUES (?, ?, ?, ?, ?)',[insertOrcamento.insertId, listUtilmaterial[i].id, listUtilmaterial[i].qtde, valorMat, listUtilmaterial[i].prazo])
              
                if(matUtil.rowsAffected != 1) {
                    setErro(1)
                }
            }
            if(erro == 0){
                for(let x = 0; x < listUtilServico.length; x++) {
                    const valorServ = listUtilServico[x].valor.replace('.','').replace(',','.')
                    var serv = await ExecuteQuery('INSERT INTO ServUtilizados (idOrcamento, descricao, qtdeServico, vlServico) VALUES (?, ?, ?, ?)',[insertOrcamento.insertId, listUtilServico[x].descricao, listUtilServico[x].qtde, valorServ])
                    
                    if(serv.rowsAffected != 1) {
                        setErro(2)
                    }
                }
                if(erro != 2){
                    const result = await ExecuteQuery('UPDATE dadosGerais SET norcamento = ?', [+nOrcamento + 1])
                    if(result.rowsAffected ==1){
                        ToastAndroid.show('Orçamento salvo com sucesso!',ToastAndroid.LONG)
                    }else {
                        setErro(3)
                    }
                }
            }
            
        }
        if(erro != 0) {
            const finaly = await ExecuteQuery('DELETE FROM ServUtilizados WHERE idOrcamento = ?; DELETE FROM matUtilizados WHERE idOrcamento = ?; DELETE FROM orcamentos WHERE id = ?', [insertOrcamento, insertOrcamento, insertOrcamento])
            ToastAndroid.show('Erro ao salvar Orçamento!', ToastAndroid.LONG)

            if(finaly.rowsAffected == 0){
                Alert.alert('ERRO FATAL', 'Ocorreu um erro fatal ao tentar salvar o Orçamento')
            }
        }
    }
    
    async function salvar() {
        await InsertOrcamento()
        navigation.goBack()
    }

    function addMaterial() {
        
        if(vlMaterial <= 0 || qtMaterial <= 0 || matSelected < 1) {
            Alert.alert('Informação', 'Todos os campos são obrigatórios!')
        }else {
            const mat = listAllMateriais?.filter((mat) => mat.id == matSelected)
            const matDescAll = [
                {
                    id: mat[0].id,
                    descricao: mat[0].descricao,
                    modelo: mat[0].modelo,
                    marca: mat[0].marca,
                    qtde:qtMaterial,
                    valor: vlMaterial,
                    prazo: prazoEntMat
                }
            ]
            setListUtilMaterial([...listUtilmaterial,...matDescAll])
            setInsertMaterial(false)
            limparModais()
        }
    }

    function addServico() {
        if(vlServico <= 0 || qtServico <= 0 || servico.length < 1) {
            Alert.alert('Informação', 'Todos os campos são obrigatórios!')
        }else {
            const servicoAll = [
                {
                    id: idServ,
                    descricao: servico,
                    qtde: qtServico,
                    valor: vlServico
                }
            ]
            setIdServ((idServ)+1)
            setListUtilServico([...listUtilServico,...servicoAll])
            setInsertServico(false)
            limparModais()
        }
    }

    function convertPadrao(valor) {
        if(valor.length <= 6) {
            return `${valor.substring(0,valor.length -3)},${valor.substring(valor.length -2)}`
        }else {
            return `${valor.substring(0,valor.length -6)}.${valor.substring(valor.length -6,valor.length -3)},${valor.substring(valor.length -2)}`
        }
    }

    return(
        <KeyboardAvoidingView>
        <ScrollView>
        <View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={insertMaterial}
            >
                <View style={estilos.modal}>
                   <View style={estilos.containerTitleSelect}>
                        <TouchableOpacity 
                            onPress={() => {setInsertMaterial(false)}}
                        >
                            <Icon 
                                name="chevron-left" 
                                size={20} 
                                color={'#000'}
                                style={{marginTop: 10, margin: 5}}
                            />
                        </TouchableOpacity>
                        <Text style={[estilos.txtTitleMaterial, {width: '85%', textAlign: 'center'}]}>Materiais</Text>
                    </View>
                    <View style={estilos.containerDados}>
                        <Select 
                            options={listAllMateriais} 
                            onChangeSelect={(id) => {
                                setMatSelected(id)
                            }} 
                            text='Selecione um material'
                            style={{width: '20%'}}
                        /> 
                        <TextInput  
                            value={qtMaterial}
                            onChangeText={setQtMaterial}
                            placeholder='Qtde'
                            keyboardType="numeric"
                            style={estilos.inputModal}
                        />
                        <MaskInput 
                            style={estilos.inputModal}
                            placeholder='Valor Unitário'
                            keyboardType="numeric"
                            value={vlMaterial}
                            onChangeText={(masked, unmasked) => {
                                setVlMaterial(masked.substring(3, masked.length))}
                                // setVlMaterial(`${unmasked.substring(0,unmasked.length -2)}.${unmasked.substring(unmasked.length -2, unmasked.length )}`)}
                            }
                            mask = {Masks.BRL_CURRENCY}
                        />
                        <TextInput 
                            value={prazoEntMat}
                            onChangeText={setPrazoEntMat}
                            placeholder='Prazo Entrega em Dias'
                            keyboardType="numeric"
                            style={estilos.inputModal}
                        />
                        <TouchableOpacity 
                            style={estilos.btnModal}
                            onPress={() => {
                                addMaterial()
                            }}
                        >
                            <Text style={estilos.txtBtn}>Inserir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType='slide'
                transparent={true}
                visible={insertServico}
            >
                <View style={estilos.modal}>
                   <View style={estilos.containerTitleSelect}>
                        <TouchableOpacity 
                            onPress={() => {setInsertServico(false)}}
                        >
                            <Icon 
                                name="chevron-left" 
                                size={20} 
                                color={'#000'}
                                style={{marginTop: 10, margin: 5}}
                            />
                        </TouchableOpacity>
                        <Text style={[estilos.txtTitleMaterial, {width: '85%', textAlign: 'center'}]}>Serviços</Text>
                    </View>
                    <View style={estilos.containerDados}>
                      
                        <TextInput 
                            value={servico}
                            onChangeText={setServico}
                            placeholder='Descrição do Serviço'
                            style={estilos.inputModal}
                        />
                        <TextInput 
                            value={qtServico}
                            onChangeText={setQtServico}
                            placeholder='Qtde'
                            keyboardType="numeric"
                            style={estilos.inputModal}
                        />
                        <MaskInput 
                            style={estilos.inputModal}
                            placeholder='Valor Unitário'
                            keyboardType="numeric"
                            value={vlServico}
                            onChangeText={(masked, unmasked) => {
                                setVlServico(masked.substring(3,masked.length))}
                                // setVlServico(`${unmasked.substring(0,unmasked.length -2)}.${unmasked.substring(unmasked.length -2, unmasked.length )}`)}
                            }
                            mask = {Masks.BRL_CURRENCY}
                        />
                        <TouchableOpacity 
                            style={estilos.btnModal}
                            onPress={addServico}
                        >
                            <Text style={estilos.txtBtn}>Inserir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View
                style={estilos.container}
                behavior='padding'
            >
                <Text style={estilos.title}>Gerar Orçamento</Text>
                <View style={{flexDirection: 'row'}}>
                    
                    <View style={{flexDirection: 'column', width: '45%', alignItems: 'center'}}>
                        <Text style={estilos.label}>Numero do Orçamento</Text>
                        <TextInput
                            style={estilos.inputtop}
                            placeholder="numero Orçamento"
                            value={nOrcamento}
                            onChangeText={setNOrcamento}
                        />
                    </View>
                    <View style={{flexDirection: 'column', width: '40%', alignItems: 'center'}}>
                        <Text style={estilos.label}>Data do Orçamento</Text>
                        <MaskInput 
                            style={estilos.inputtop}
                            placeholder='Data'
                            keyboardType="numeric"
                            value={data}
                            onChangeText={(masked, unmasked) => {setData(masked)}}
                            mask = {Masks.DATE_DDMMYYYY}
                        />
                    </View>
                </View>
                <View style={{width: '90%', marginTop: 5}}>
                <Text style={estilos.label}>Cliente</Text>
                <Select 
                    options={listCliente} 
                    onChangeSelect={(id) => {
                        setCliente(id)
                        if(id == 0){
                            setViewEmbarcacao(false)
                        }else {
                            selectEmbarcacao(id)
                            setViewEmbarcacao(true)
                        }
                    }} 
                    text='Selecione um cliente'
                /> 
                </View>
                {viewEmbarcacao && 
                <View style={{width: '90%', marginTop: 15}}>
                <Text style={estilos.label}>Embarcação</Text>
                <Select 
                    options={listEmbarcacao} 
                    onChangeSelect={(id) => {
                        setEmbarcacao(id)
                    }} 
                    text='Selecione uma embarcação'
                /> 
                </View>}
                <View style={estilos.containerMaterial}>
                    <View style={estilos.titleMaterial}>
                        <Text style={estilos.txtTitleMaterial}>Materiais</Text>
                        <Icon 
                            name="plus-square" 
                            size={40} 
                            color={'#0a0'}
                            onPress={() => {
                                selectAllMateriais()
                                setInsertMaterial(true)
                            }}
                        />
                    </View>
                    <View style={{width: '95%'}}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                        {listUtilmaterial?.map((item) => {
                            return(
                                <View key={item.id} style={estilos.itemMaterial}>
                                    <Text style={[estilos.txtItemMaterial, {width: '45%'}]}>{item.descricao} {item.modelo} {item.marca}</Text>
                                    <Text style={estilos.txtItemMaterial}>Qtde {item.qtde}</Text>
                                    <Text style={estilos.txtItemMaterial}>Valor R$ {item.valor}</Text>
                                </View>
                            )
                        })}
                        </ScrollView>
                    </View>
                </View>

                <View style={estilos.containerMaterial}>
                    <View style={estilos.titleMaterial}>
                        <Text style={estilos.txtTitleMaterial}>Serviços</Text>
                        <Icon 
                            name="plus-square" 
                            size={40} 
                            color={'#0a0'}
                            onPress={() => {
                                setInsertServico(true)
                            }}
                        />
                    </View>
                    <View style={{width: '95%'}}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                        {listUtilServico?.map((item) => {
                            return(
                                <View key={item.id} style={estilos.itemMaterial}>
                                    <Text style={[estilos.txtItemMaterial, {width: '45%'}]}>{item.descricao}</Text>
                                    <Text style={estilos.txtItemMaterial}>Qtde {item.qtde}</Text>
                                    <Text style={estilos.txtItemMaterial}>Valor R$ {item.valor}</Text>
                                </View>
                            )
                        })}
                        </ScrollView>
                    </View>
                </View>
                <Text style={[estilos.label, {marginTop: 12}]}>Prazo de Entrega do Serviço</Text>
                <TextInput
                    style={estilos.inputtop}
                    keyboardType="numeric"
                    placeholder="Prazo de Entrega em Dias"
                    value={prazoEntrega}
                    onChangeText={setPrazoEntrega}
                />
                <TouchableOpacity 
                    style={[estilos.containerTotal, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}
                    onPress={calcTotal}
                >
                    <Text style={estilos.total}>TOTAL: R$ {vlTotalBR}</Text>
                    <Icon 
                        name="refresh" 
                        size={20} 
                        color={'#000'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={estilos.btn}
                    onPress={() => {salvar()}}>
                    <Text style={estilos.txtBtn}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}