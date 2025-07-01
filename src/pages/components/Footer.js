import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Footer = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    setActiveTab(screen);
    switch(screen) {
      case 'home':
        navigation.navigate('Home');
        break;
        case 'pesquisar':
        navigation.navigate('Pesquisar');
        break;
      case 'campanha':
        navigation.navigate('Campanha');
        break;

      case 'perfil':
        navigation.navigate('User');
        break;
      default:
        navigation.navigate('Home');
    }
  };
  

  return (
    <View style={styles.footer}>
      <Pressable 
        style={[styles.button, activeTab === 'home' && styles.activeButton]}
        onPress={() => navigateTo('home')}
      >
        <Icon name="home" size={20} color={activeTab === 'home' ? '#153A90' : '#888'} />
        <Text style={[styles.text, activeTab === 'home' && styles.activeText]}>Início</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, activeTab === 'pesquisar' && styles.activeButton]}
        onPress={() => navigateTo('pesquisar')}
      >
        <Icon name="search" size={20} color={activeTab === 'pesquisar' ? '#153A90' : '#888'} />
        <Text style={[styles.text, activeTab === 'pesquisar' && styles.activeText]}>Pesquisar</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, activeTab === 'campanha' && styles.activeButton]}
        onPress={() => navigateTo('campanha')}
      >
        <Icon name="newspaper" size={20} color={activeTab === 'campanha' ? '#153A90' : '#888'} />
        <Text style={[styles.text, activeTab === 'campanha' && styles.activeText]}>Postagens</Text>
      </Pressable>

     
      <Pressable 
        style={[styles.button, activeTab === 'perfil' && styles.activeButton]}
        onPress={() => navigateTo('perfil')}
      >
        <Icon name="user" size={20} color={activeTab === 'perfil' ? '#153A90' : '#888'} />
        <Text style={[styles.text, activeTab === 'perfil' && styles.activeText]}>Perfil</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Altura fixa
    elevation: 15,
    zIndex: 1000,
    shadowColor: "#153A90",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderTopWidth: 1,
    borderTopColor: "#E0D9C0",
},
  button: {
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
    fontWeight: "500",
     fontFamily:'monospace'
  },
  activeText: {
    color: "#153A90",
  },
  activeButton: {
    // Estilo adicional se quiser destacar o botão ativo
  },
});

export default Footer;