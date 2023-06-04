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
        marginVertical: 20,
        textShadowColor: '#000',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10
    },

    label: {
        fontSize: 20,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 0,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },

    input: {
        width: '90%',
        height: 50,
        fontSize: 18,
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
        textShadowColor: '#ff0',
        textShadowOffset: {width: -3, height: 3},
        textShadowRadius: 10,
        color: '#000',
        fontWeight: 'bold',
    },

    
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: '#ff9',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#000'
    },

    bancario: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#bbb',
        padding: 10,
        margin: 5
    }

})
export default estilos;