import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    padding: 16
  },
  header: {
    marginBottom: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  listaAnimais: {
    marginBottom: 20
  },
  cardAnimal: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3
  },
  imagemAnimal: {
    width: '100%',
    height: 200
  },
  infoAnimal: {
    padding: 15
  },
  nomeAnimal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  detalhesAnimal: {
    color: '#666',
    marginBottom: 8
  },
  descricaoAnimal: {
    marginBottom: 10,
    lineHeight: 20
  },
  ongAnimal: {
    fontStyle: 'italic',
    color: '#E7701D',
    marginBottom: 15
  },
  botaoAdotar: {
    backgroundColor: '#E7701D',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  textoBotaoAdotar: {
    color: 'white',
    fontWeight: 'bold'
  }
});