import { StyleSheet } from 'react-native';

export default StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%',
    resizeMode:'contain',
    backgroundColor:'#fff'
  
  },
  header: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    width:'100%',
    height:'100%',
    resizeMode:'contain'
    

  },
  title: {
    marginTop: 200,
    color: '#153A90',
    fontSize: 20,
    fontWeight: 'bold',  // Maior destaque para o título
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20
  },
  formContainer: {
    flex: 2,
    backgroundColor: 'rgba(225, 176, 130, 1)',
    margin: 25,
    padding: 30, // Mais espaçamento para o conteúdo interno
    borderRadius: 38,
    width: '90%',
    marginBottom:150,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  formHeader: {
    flex: 1.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  tv:{
    flex: 1,
  },
  tt:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,  
},
inputV:{
flex: 1,
   justifyContent: 'space-between',
   flexDirection: 'row'
},
cubo:{
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    alignItems:'center',
    width: 55,
    height: 55,
    resizeMode: 'contain',
    backgroundColor: 'white',
    outlineWidth: 0,
    fontSize:35,
    textAlign:'center'
},
re:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
button:{
    borderWidth: 3,
    width: 120,
    height: 44,
    borderRadius: 50,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
   
},
bt:{
    color: 'white',
    fontWeight: 'bold',
},
cod:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'Underline'
}




  

})