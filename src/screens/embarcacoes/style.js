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
        paddingHorizontal: 10
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
        marginTop: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#000'
    },

    containerSelect: {
        justifyContent: 'space-between',
        width: '90%'
    },

    icon: {
        color: '#0a0',
        position: 'absolute',
        right: 5
    }

})
export default estilos;