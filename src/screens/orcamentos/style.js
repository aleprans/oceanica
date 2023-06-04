import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
        alignItems: 'center'
    },

    title: {
        width: '100%',
        height: 50,
        fontFamily: 'Genos-Bold',
        fontSize: 35,
        color: '#ff0',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20,
        textShadowColor: '#000',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10
    },

    input: {
        width: '90%',
        height: 50,
        fontSize: 18,
        marginVertical: 12,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 15,
        borderColor: '#ff0',
        borderStyle: 'solid',
        borderWidth: 3,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    
    inputtop: {
        width: '95%',
        height: 50,
        fontSize: 18,
        marginVertical: 12,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 15,
        borderColor: '#ff0',
        borderStyle: 'solid',
        borderWidth: 3,
        paddingHorizontal: 10,
        textAlign: 'center'
    },

    txtBtn: {
        fontSize: 25,
        textShadowColor: '#000',
        textShadowOffset: {width: -3, height: 3},
        textShadowRadius: 10,
        color: '#ff0',
        fontWeight: 'bold',
    },

    
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#ffd',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#000'
    },

    containerMaterial: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#ff0',
        borderRadius: 15
    },

    titleMaterial: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    txtTitleMaterial: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ff0',
        textShadowColor: '#000',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10
    },

    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(155,155,155,0.8)',
    },

    containerTitleSelect: {
        flexDirection: 'row',
        marginBottom: 10
    },

    listMaterial: {
        marginTop: 20,
        marginBottom: 20,
        width: 280,
        maxHeight: 100,
        borderWidth: 2,
        borderColor: '#ff0'
    },

    containerDados: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 30,
    },

    inputModal: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#ff0',
        backgroundColor: '#fff',
        color: '#000',
        marginTop: 15,
        paddingHorizontal: 10
    },

    btnModal: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffd',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#000'
    },

    label: {
        fontSize: 20,
        textAlign: 'center'
    },

    itemMaterial: {
        // backgroundColor: '#ffa',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 15
    },

    txtItemMaterial: {
        color: '#000',
        paddingBottom: 2
    },

    containerTotal: {
        width: '90%',
        backgroundColor: '#aaa',
        marginVertical: 20,
        padding: 10,
        borderRadius: 15
    },

    total: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    }
})
export default estilos;