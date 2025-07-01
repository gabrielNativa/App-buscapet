import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View, Image, ScrollView, Modal } from "react-native";
import styles from "./style";
import { useState,useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
const petsData = [
  {
    id: 1,
    name: "Jujuba",
    image: require("./../../../assets/gato.png"),
    gender: "Fêmea",
    age: "2 anos",
    location: "Guaianases, São Paulo"
  },
  {
    id: 2,
    name: "Nina",
    image: require("./../../../assets/pet2.png"),
    gender: "Fêmea",
    age: "1 ano",
    location: "Ferraz de Vasconcelos"
  },
  {
    id: 3,
    name: "Tico",
    image: require("./../../../assets/pet4.png"),
    gender: "Macho",
    age: "4 meses",
    location: "Guaianases, São Paulo"
  },
  {
    id: 4,
    name: "Negão",
    image: require("./../../../assets/pet5.png"),
    gender: "Macho",
    age: "3 anos",
    location: "Tiradentes, São Paulo"
  },
];

export default function Perdidos() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [petModalVisible, setPetModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
};
  
  const { width } = Dimensions.get('window');
  
  const carouselItems = [
    require("./../../../assets/carou.png"),
    require("./../../../assets/carou1.png"),
    require("./../../../assets/carou.png")
  ];
  const adocao = () => {
    navigation.navigate('Home');
  };


  return (
    <View style={styles.container}>
      {/* Conteúdo principal com ScrollView */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
      
        
        {/* Carrossel */}
        
 
      
   
        <Header onMenuPress={toggleMenu} />
        
        {/* Novo Carrossel */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            loop
            width={width}
            height={200}
            autoPlay={true}
            autoPlayInterval={2000} 
            
            data={carouselItems}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={item}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              </View>
            )}
          />
          
          {/* Indicadores */}
          <View style={styles.indicatorsContainer}>
            
            {carouselItems.map((_, index) => (
           <View 
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>

        </View>

     
 
  


        {/* Cards de navegação */}



        <View style={styles.categ}>

          <Text style={styles.categg}>Categorias</Text>

        </View>

        <View style={styles.navigationCards}>
          <Pressable style={styles.navCard}>
            <View style={[styles.cardIcon, styles.lostPetsCard] } onPress={adocao}>
              <Icon name="dog" size={30} color="white" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Adoção de</Text>
              <Text style={styles.cardText}>Animais</Text>
            </View>
          </Pressable>

          <Pressable style={styles.navCard} >
            <View style={[styles.cardIcon, styles.adoptionCard]}>
              <Icon name="cat" size={30} color="white" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Animais</Text>
              <Text style={styles.cardText}>Perdidos</Text>
            </View>
          </Pressable>
        </View>
        
        {/* Banner */}
        <View style={styles.sectionBanner}>
          <Text style={styles.bannerText}>Animais Perdidos</Text>
        </View>

        {/* Lista de animais */}
        <View style={styles.petsGrid}>
          {petsData.map((pet) => (
            <Pressable 
              key={pet.id} 
              style={styles.petCard}
              onPress={() => openPetModal(pet)}
            >
              <Image source={pet.image} style={styles.petImage} />
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petDetails}>{pet.gender}, {pet.age}</Text>
              <Text style={styles.petDetails}>{pet.location}</Text>
            </Pressable>
          ))}
        </View>

        {/* Espaço extra para evitar sobreposição com o Footer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal do Menu */}
     
 
      {/* Modal de Detalhes do Animal */}
      <Modal animationType="fade" transparent={true} visible={petModalVisible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Cabeçalho */}
            <View style={styles.headerModal}>
              <Pressable onPress={() => setPetModalVisible(false)}>
                <Image 
                  style={styles.closeIcon} 
                  source={require("./../../../assets/voltar.png")} 
                />
              </Pressable>
              <Text style={styles.title}>DETALHES DO ANIMAL</Text>
            </View>

            {/* Informações do Animal */}
            <View style={styles.content}>
              <Text style={styles.label}>Nome do Animal: {selectedPet?.name}</Text>
              <Text style={styles.label}>Idade: {selectedPet?.age}</Text>
              <Text style={styles.label}>Sexo: {selectedPet?.gender}</Text>
              <Text style={styles.label}>Localização: {selectedPet?.location}</Text>
            </View>

            {/* Informações da ONG */}
            <View style={styles.ongContainer}>
              <Text style={styles.ongTitle}>Dados da ONG</Text>
              <Text style={styles.label}>Nome: ONG Amigo dos Animais</Text>
              <Text style={styles.label}>E-mail: contato@ongamigos.com</Text>
              <Text style={styles.label}>Telefone: (11) 98765-4321</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};