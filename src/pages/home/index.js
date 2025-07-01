import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import styles from "./style";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import PetModal from "../components/PetModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [petModalVisible, setPetModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdoption, setShowAdoption] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [adocaoPet, setAdocaoPet] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [petFilter, setPetFilter] = useState("all");
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width } = Dimensions.get("window");

  const [petsPerdidos, setPetsPerdidos] = useState([]);
  const [loadingLostPets, setLoadingLostPets] = useState(false);

  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  const carouselItems = [
      require("./../../../assets/carou3.jpeg"),
    require("./../../../assets/carou.png"),
    require("./../../../assets/carou2.jpeg"),
  
  ];

  const fetchLostAnimals = async () => {
    try {
      setLoadingLostPets(true);
      const response = await axios.get('http://localhost:8000/api/posts-animais-perdidos');

      console.log('Resposta completa da API:', JSON.stringify(response.data, null, 2));

      const postsData = response.data.data.data || [];
      processLostPetData(postsData);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoadingLostPets(false);
    }
  };

  const processLostPetData = (posts) => {
    if (!Array.isArray(posts)) {
      console.error('Dados inválidos:', posts);
      setPetsPerdidos([]);
      return;
    }

    const mappedPets = posts.map(post => {
      const animal = post.animal || {};
      const imagens = animal.imagens_animal || {}; // Note o nome do campo aqui
      const historico = animal.historico_animal?.[0] || {}; // E aqui

      const formatDateTime = (dateStr, timeStr) => {
        if (!dateStr) return 'Data não informada';

        try {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString('pt-BR');
          return timeStr
            ? `Desapareceu em ${formattedDate} às ${timeStr.substring(0, 5)}`
            : `Desapareceu em ${formattedDate}`;
        } catch {
          return 'Data não informada';
        }
      };
      // Imagem principal - usando o campo imgPrincipal_url que já vem completo
      const mainImage = animal.imgPrincipal_url
        ? { uri: animal.imgPrincipal_url }
        : require("./../../../assets/cao.png");

      // Imagens adicionais - usando os campos _url que já vem completos
      const additionalImages = [
        imagens.img1Animal_url ? { uri: imagens.img1Animal_url } : null,
        imagens.img2Animal_url ? { uri: imagens.img2Animal_url } : null,
        imagens.img3Animal_url ? { uri: imagens.img3Animal_url } : null,
        imagens.img4Animal_url ? { uri: imagens.img4Animal_url } : null
      ].filter(Boolean);

      return {
        id: post.idPostAnimalPerdido,
        idAnimal: animal.idAnimal,
        name: animal.nomeAnimal || 'Nome não informado',
        age: animal.idadeAnimal || 'Idade não informada',
        bio: animal.bioAnimal || 'Descrição não disponível',
        image: mainImage,
        additionalImages,
        especie: animal.especie?.nomeEspecie || 'Não especificado',
        raca: animal.raca?.nomeRaca || 'Raça não informada',
        porte: animal.porte?.nomePorte || 'Porte não informado',
        pelagem: animal.pelagem?.pelagemAnimal || 'Pelagem não informada',
        status: animal.status?.descStatusAnimal || 'Status não informado',
        location: post.localizacao || 'Localização não informada',
        // Formatação combinada de data e hora
        lostDateTime: historico.dataHistoricoAnimal
          ? (() => {
            try {
              const date = new Date(`${historico.dataHistoricoAnimal}T${historico.horaHistoricoAnimal || '00:00'}`);
              return `Desapareceu em ${date.toLocaleDateString('pt-BR')}${historico.horaHistoricoAnimal ? ` às ${historico.horaHistoricoAnimal.substring(0, 5)}` : ''}`;
            } catch {
              return 'Data do desaparecimento não informada';
            }
          })()
          : 'Data do desaparecimento não informada',
        // Formatação do telefone
        contact: post.usuario?.telUser
          ? (() => {
            const cleaned = post.usuario.telUser.replace(/\D/g, '');
            if (cleaned.length === 11) {
              return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            if (cleaned.length === 10) {
              return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            return post.usuario.telUser;
          })()
          : 'Contato não disponível',
        ownerName: post.usuario?.nomeUser || 'Responsável não informado',
        details: historico.detalhesHistoricoAnimal || 'Sem detalhes adicionais'
      };
    });

    setPetsPerdidos(mappedPets);
  };
  const fetchAnimals = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/animais-para-adocao"
      );
      processPetData(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      setError("Erro ao carregar animais. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchLostAnimals();
  }, [isLoggedIn]);

  const processPetData = (data) => {
    const mappedPets = data.map((animal) => ({
      id: animal.id,
      name: animal.nome || "Nome não informado",
      age: animal.idade || "Idade não informada",
      bio: animal.bio || "Descrição não disponível",
      image: animal.imagem_principal
        ? { uri: animal.imagem_principal }
        : require("./../../../assets/cao.png"),
      additionalImages: animal.imagens_adicionais || [],
      especie: animal.especie?.nomeEspecie || "Não especificado",
      raca: animal.raca?.nomeRaca || "Raça não informada",
      porte: animal.porte?.nomePorte || "Porte não informado",
      pelagem: animal.pelagem?.pelagemAnimal || "Pelagem não informada",
      status: animal.status?.statusAnimal || "Status não informado",
      location: animal.ong
        ? `${animal.ong.lograOng || "Cidade não informada"}, ${animal.ong.ufOng || ""
        }`
        : "Localização não informada",
      ongName: animal.ong?.nomeOng || "ONG não informada",
      ongContact: animal.ong?.telOng || "Contato não disponível",
    }));

    setAdocaoPet(mappedPets);
    setError(null);
  };

  const handlePetPress = (pet) => {
    if (!isLoggedIn) {
      setLoginModalVisible(true);
      return;
    }

    const allImages = [pet.image, ...(pet.additionalImages || [])].filter(
      (img) => img
    );
    setSelectedPet({ ...pet, additionalImages: allImages });
    setPetModalVisible(true);
  };

  const criaPet = () =>{
    if(!isLoggedIn){
      setLoginModalVisible(true);
      return ;
    }

    navigation.navigate('Parte1')
  }

  const modalLog = () =>{
    if(!isLoggedIn){
      setLoginModalVisible(true);
      return;
    }
  }

  useFocusEffect(
    useCallback(() => {
      const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token);
      };

      checkLoginStatus();
    }, [])
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openPetModal = (pet) => {
    if (!isLoggedIn) {
      setLoginModalVisible(true);
      return;
    }

    const allImages = [pet.image, ...(pet.additionalImages || [])].filter(
      (img) => img
    );
    setSelectedPet({ ...pet, additionalImages: allImages });
    setPetModalVisible(true);
  };
  const togglePetsSection = () => {
    setShowAdoption(!showAdoption);
  };

  if (isLoading || loadingLostPets) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContentArea}>
          <View style={styles.loadingAnimationContainer}>
            <Image
              source={require("./../../../assets/pataLoad.gif")}
              style={styles.loadingAnimation}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.loadingText}>Carregando pets...</Text>
        </View>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={() => setIsLoading(true)}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Não informado';


    const cleaned = phone.replace(/\D/g, '');


    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }


    return phone;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Header onMenuPress={toggleMenu} />

        {/* Carrossel */}
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
                  currentIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.categ}>
          <Text style={styles.categg}>Categorias</Text>
        </View>

        {/* Cards de navegação */}
        <View style={styles.navigationCards}>
          <Pressable
            style={styles.navCard}
            onPress={() => setShowAdoption(true)}
          >
            <View
              style={[
                styles.cardIcon,
                styles.adoptionCard,
                !showAdoption && styles.inactiveCard,
              ]}
            >
              <Icon name="dog" size={30} color="white" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Adoção de</Text>
              <Text style={styles.cardText}>Animais</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.navCard}
            onPress={() => setShowAdoption(false)}
          >
            <View
              style={[
                styles.cardIcon,
                styles.adoptionCard,
                showAdoption && styles.inactiveCard,
              ]}
            >
              <Icon name="cat" size={30} color="white" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Animais</Text>
              <Text style={styles.cardText}>Perdidos</Text>


            </View>
          </Pressable>

        </View>

        {/* Banner - Título muda conforme a seção */}
        <View style={styles.sectionBanner}>
          <Text style={styles.bannerText}>
            {showAdoption ? "Animais para Adoção" : "Animais Perdidos"}
          </Text>


        </View>




        <View style={styles.filterContainer}>
          <Pressable
            style={[
              styles.filterButton,
              petFilter === "all" && styles.activeFilter,
            ]}
            onPress={() => setPetFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                petFilter === "all" && styles.activeFilterText,
              ]}
            >
              Todos
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              petFilter === "dog" && styles.activeFilter,
            ]}
            onPress={() => setPetFilter("dog")}
          >
            <Text
              style={[
                styles.filterText,
                petFilter === "dog" && styles.activeFilterText,
              ]}
            >
              Cachorros
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              petFilter === "cat" && styles.activeFilter,
            ]}
            onPress={() => setPetFilter("cat")}
          >
            <Text
              style={[
                styles.filterText,
                petFilter === "cat" && styles.activeFilterText,
              ]}
            >
              Gatos
            </Text>
          </Pressable>


        </View>


        {/* Lista de animais - muda conforme a seção */}
        <View style={styles.petsGrid}>

          {(showAdoption ? adocaoPet : petsPerdidos)
            .filter((pet) => {
              if (petFilter === "all") return true;
              if (petFilter === "dog")
                return (
                  pet.especie?.toLowerCase().includes("cachorro") ||
                  pet.especie?.toLowerCase().includes("canino")
                );
              if (petFilter === "cat")
                return (
                  pet.especie?.toLowerCase().includes("gato") ||
                  pet.especie?.toLowerCase().includes("felino")
                );
              return true;
            })
            .map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onPress={() => handlePetPress(pet)}
                showAdoption={showAdoption}
              />
            ))}
        </View>

        {/* Espaço extra para evitar sobreposição com o Footer */}
      </ScrollView>

      {/* Modal de Detalhes do Animal */}
      <PetModal 
  visible={petModalVisible}
  onClose={() => setPetModalVisible(false)}
  selectedPet={selectedPet}
  showAdoption={showAdoption}
  setSelectedPet={setSelectedPet}
/>
      {/* Modal de Login */}
      <Modal visible={loginModalVisible} animationType="fade" transparent>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLoginModalVisible(false)}
        >
          <View style={styles.loginModal}>
            <Image
              style={styles.imgmodal}
              source={require("./../../../assets/logo 3.png")}
            />

            <Pressable
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()} // Impede que o toque no conteúdo feche o modal
            >
              <Text style={styles.loginModalTitle}>
                Você precisa estar logado
              </Text>
              <Text style={styles.loginModalText}>
                Para acessar esta funcionalidade, faça login na sua conta.
              </Text>

              <Pressable
                style={styles.loginModalButton}
                onPress={() => {
                  setLoginModalVisible(false);
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.loginModalButtonText}>Fazer Login</Text>
              </Pressable>

              <Pressable
                style={[styles.loginModalButton, styles.secondaryButton]}
                onPress={() => {
                  setLoginModalVisible(false);
                  navigation.navigate("Cadastro");
                }}
              >
                <Text style={styles.secondaryButtonText}>Criar Conta</Text>
              </Pressable>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {!showAdoption && (
        <Pressable
         onPress={() => criaPet()}
          style={styles.floatingButton}
        >
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
      )}

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const PetCard = ({ pet, onPress, showAdoption }) => {
  const shortDate = pet.lostDateTime?.replace('Desapareceu em ', '') || 'Data não informada';
  return (
    <Pressable style={styles.petCard} onPress={onPress}>
      <Image
        source={pet.image}
        style={styles.petImage}
        defaultSource={require("./../../../assets/cao.png")}
      />

      <View style={styles.petAgeBadge}>
        <Text style={styles.petAgeText}>{pet.age}</Text>
      </View>

      <View style={styles.petInfoContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <View style={styles.petDivider} />

        <Text style={styles.petDetails}>
          <Text style={{ fontWeight: "600" }}>Raça:</Text> {pet.raca}
        </Text>
        <Text style={styles.petDetails}>
          <Text style={{ fontWeight: "600" }}>Idade:</Text> {pet.age}
        </Text>

        {!showAdoption && (
          <>
            <Text style={styles.petDetails}>
              <Icon name="calendar-alt" size={12} /> {shortDate.split(' às ')[0]}
            </Text>
            <Text style={[styles.petStatus, { color: '#FF3B30' }]}>
              <Icon name="exclamation-circle" size={10} /> {pet.status}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};
