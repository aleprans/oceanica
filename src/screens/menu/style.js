import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    btn: {
        backgroundColor: '#ff9',
        height: 50,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 2,
        marginVertical: 15
    },

    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },

    img: {
        width: 250,
        height: 100,
        marginVertical: '15%'
    }
})

export default estilos;