import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },


  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.8)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  
  listItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#ff0',
    borderWidth: 3
  },
  
  item1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },

  listData: {
    width: 140,
    fontSize: 14,
    color: '#000',
    overflow: 'hidden',
    marginEnd: 30,
    marginBottom: 10
  },

  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#000',
  },

  btn: {
    width: '90%',
    height: 50,
    backgroundColor: '#ffd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#000'
  },

  textBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10,
    color: '#ff0',
},


  alert: {
    color: '#ff0',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50%'
  },

  modal: {
    width: '80%',
    padding: 10,
    marginTop: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 15,
    borderColor: '#ff9',
    borderStyle: 'solid',
    borderWidth: 10
  },

  btnModal: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 2
  },

  tituloModal: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  
  title: {
    fontFamily: 'Genos-Bold',
    fontSize: 50,
    color: '#ff0',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10
  },

  conteudo: {
    marginHorizontal: 10,
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  viewBtnModal: {
    flexDirection: 'row',
  },

  viewPDF: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  viewCabPDF: {
    flexDirection: 'row', 
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#ccc'
  },

  textPDF: {
    width: '90%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff0',
    textShadowColor: '#000',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10

  },

  viewLoading: {
    width: '100%',
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  indicator: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    position: 'relative'
  },

  textIndicator: {
    fontSize: 20, 
    marginBottom: 50
  }
})

export default estilos;