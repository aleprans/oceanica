import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    container: {
        // width: '100%',
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        // margin: 0,
        borderRadius: 15,
        fontSize: 18,
        borderWidth: 3,
        borderColor: '#ff0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingBottom: 12,
    },

    modalTitle: {
        fontSize: 20,
        color: '#555',
    },

    modalCancel:{
       fontSize: 14,
       color: '#f00',
    },

    txtSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ff0',
        borderBottomWidth: 3,
        padding: 10
    },

    selectTxt: {
        fontSize: 18,
        color: '#000'
    }
})

export default estilos;