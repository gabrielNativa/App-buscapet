import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View, Image, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./style";
import { TextInput } from "react-native-web";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Footer from "../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Header from "../components/Header";

export default function Pesquisar() {
  const navigation = useNavigation();
    const [loginModalVisible, setLoginModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState('pesquisar');
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState(['']);
  const [popularSearches, setPopularSearches] = useState(['Animais para adoção']);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [petModalVisible, setPetModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);

  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem('recentSearches');
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Erro ao carregar pesquisas recentes:', error);
      }
    };
    
    loadRecentSearches();
  }, []);

const saveRecentSearch = async (searchTerm) => {
  try {
    // Garante que searchTerm é uma string válida
    const term = typeof searchTerm === 'string' ? searchTerm.trim() : String(searchTerm || '').trim();
    if (!term) return;

    // Filtra valores inválidos e duplicados
    const updatedSearches = [
      term,
      ...recentSearches
        .filter(item => typeof item === 'string')
        .filter(item => item.toLowerCase() !== term.toLowerCase())
    ].slice(0, 5);

    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  } catch (error) {
    console.error('Erro ao salvar pesquisa recente:', error);
  }
};
const handleSearch = async (text = searchText) => {
    const token = await AsyncStorage.getItem('userToken');

  if(!token){
    setLoginModalVisible(true);
    return;
  }
  // Verificação robusta do parâmetro de entrada
  let searchTerm;
  
  if (typeof text === 'string') {
    searchTerm = text.trim().toLowerCase();
  } else if (text && typeof text === 'object' && text.nativeEvent) {
    // Caso seja um evento (como do onSubmitEditing)
    searchTerm = searchText.trim().toLowerCase();
  } else {
    searchTerm = String(text || '').trim().toLowerCase();
  }

  console.log('Termo de pesquisa processado:', searchTerm);

  if (!searchTerm) return;

  try {
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      navigation.navigate('Login');
      return;
    }

    const response = await axios.get(`http://localhost:8000/api/animais/pesquisar`,  {
      params: { search: searchTerm },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
   

    if (response.data.success) {
      const petsData = response.data.data || [];
          
      const mappedPets = response.data.data.map(animal => {
        // Corrigindo o tratamento das imagens adicionais
        const additionalImages = (animal.imagens_adicionais || []).map(img => {
          // Se já é uma URL completa (começa com http), usa diretamente
          if (typeof img === 'string' && img.startsWith('http')) {
            return { uri: img };
          }
          // Se é apenas o nome do arquivo, constrói a URL completa
          if (typeof img === 'string') {
            return { uri: `http://localhost:8000/${img}` };
          }
          return img;
        }).filter(Boolean); // Remove valores nulos/undefined
      
        return {
          id: animal.id || animal.idAnimal,
          name: animal.nome || animal.nomeAnimal || 'Nome não informado',
          age: animal.idade || animal.idadeAnimal || 'Idade não informada',
          bio: animal.bio || animal.bioAnimal || 'Descrição não disponível',
          image: animal.imagem_principal 
            ? { uri: animal.imagem_principal.startsWith('http') 
                ? animal.imagem_principal 
                : `http://localhost:8000/${animal.imagem_principal}` }
            : require("./../../../assets/cao.png"),
          additionalImages: additionalImages,
          especie: animal.especie?.nomeEspecie || animal.nomeEspecie || 'Não especificado',
          raca: animal.raca?.nomeRaca || animal.nomeRaca || 'Raça não informada',
          porte: animal.porte?.nomePorte || 'Porte não informado',
          pelagem: animal.pelagem?.pelagemAnimal || 'Pelagem não informada',
          status: animal.status?.statusAnimal || 'Status não informado',
          location: animal.ong 
          ? `${animal.ong.lograOng || 'Cidade não informada'}, ${animal.ong.ufOng || ''}`
          : 'Localização não informada',
        ongName: animal.ong?.nomeOng || 'ONG não informada',
        ongContact: animal.ong?.telOng || 'Contato não disponível'
        };
      });

      setSearchResults(mappedPets);
      await saveRecentSearch(searchTerm);
      
      if (mappedPets.length === 0) {
        setError(`Nenhum resultado encontrado para "${searchTerm}"`);
      }
    }
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    setError('Erro na pesquisa. Tente novamente.');
    setSearchResults([]);
  } finally {
    setIsLoading(false);
  }
};

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setError(null);
    setShowSuggestions(true);
  };

  
  

  

  const openPetModal = (pet) => {
    // Garante que additionalImages é um array
    const additionalImages = Array.isArray(pet.additionalImages) 
      ? pet.additionalImages 
      : [];
    
    // Cria um array com todas as imagens (principal + adicionais)
    const allImages = [
      pet.image,
      ...additionalImages
    ].filter(img => img && img.uri); // Remove valores nulos ou sem URI
  
    setSelectedPet({
      ...pet,
      image: allImages[0] || pet.image, // Garante que pelo menos a principal está definida
      additionalImages: allImages
    });
    setPetModalVisible(true);
  };


const handleSuggestionPress = async (suggestion) => {
  if (typeof suggestion !== 'string') return;
  
  const cleanSuggestion = suggestion.trim();
  if (!cleanSuggestion) return;

  setSearchText(cleanSuggestion);
  await handleSearch(cleanSuggestion);
};

useEffect(() => {
  console.log('Valor atual de searchText:', searchText, typeof searchText);
}, [searchText]);
  return (
    
    <View style={{ flex: 1 }}>
       
      <StatusBar style="auto" />
      
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <Header onMenuPress={toggleMenu} />
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#153A90" style={styles.searchIcon} />
          <TextInput 
              style={styles.searchInput} 
              placeholder="Faça sua busca..."
              placeholderTextColor="#153A90"
              value={typeof searchText === 'string' ? searchText : ''}
              onChangeText={(text) => {
                if (typeof text === 'string') {
                  setSearchText(text);
                  setShowSuggestions(text.length === 0);
                }
              }}
              onSubmitEditing={() => handleSearch(searchText)}
              returnKeyType="search"
              onFocus={() => setShowSuggestions(searchText.length === 0)}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Icon name="times" size={16} color="#153A90" />
              </TouchableOpacity>
            )}
          </View>
        <TouchableOpacity 
            onPress={() => handleSearch(searchText)} // Passa explicitamente o searchText
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Sugestões (aparece quando não há texto e não há resultados) */}
        {showSuggestions && searchResults.length === 0 && (
          <View style={styles.suggestionsContainer}>
            {/* Pesquisas recentes */}
            {recentSearches.length > 0 && (
              <View style={styles.suggestionSection}>
                <Text style={styles.suggestionSectionTitle}>Pesquisas recentes</Text>
                <View style={styles.suggestionsList}>
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity 
                      key={`recent-${index}`} 
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionPress(search)}
                    >
                      <Icon name="clock" size={16} color="#153A90" style={styles.suggestionIcon} />
                      <Text style={styles.suggestionText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

           
          </View>
        )}

        {/* Resultados */}
        {searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resultados da pesquisa</Text>
            <View style={styles.resultsContainer}>
              {searchResults.map((pet) => (
                <TouchableOpacity 
                  key={pet.id} 
                  style={styles.petResultCard}
                  onPress={() => openPetModal(pet)}
                >
                  <Image 
                    source={pet.image} 
                    style={styles.petResultImage}
                    defaultSource={require("./../../../assets/cao.png")}
                  />
                  <View style={styles.petResultInfo}>
                    <Text style={styles.petResultName}>{pet.name}</Text>
                    <Text style={styles.petResultDetails}>{pet.raca} • {pet.age}</Text>
                    <Text style={styles.petResultLocation}>{pet.location}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Loading */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#153A90" />
          </View>
        )}

        {/* Mensagem de erro */}
        {error && !isLoading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>


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
      
      {/* Modal de Detalhes do Pet */}
      <Modal animationType="slide" transparent={true} visible={petModalVisible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.headerModal}>
              <Pressable onPress={() => setPetModalVisible(false)}>
                <Image 
                  style={styles.closeIcon} 
                  source={require("./../../../assets/voltar.png")} 
                />
              </Pressable>
              <Text style={styles.title}>DETALHES DO PET</Text>
              <View style={{width: 24}} />
            </View>

            <ScrollView style={styles.modalScroll}>
              {/* Imagem principal */}
              <Image 
  source={selectedPet?.image} 
  style={styles.modalPetImage}
  resizeMode="cover"
  defaultSource={require("./../../../assets/cao.png")}
/>

{/* Miniaturas das imagens - só aparece se tiver mais de uma imagem */}
{selectedPet?.additionalImages?.length > 1 && (
  <ScrollView 
    horizontal 
    style={styles.additionalImagesContainer}
    showsHorizontalScrollIndicator={false}
  >
    {selectedPet.additionalImages.map((img, index) => (
      <Pressable 
        key={index} 
        onPress={() => {
          // Atualiza a imagem principal para a clicada
          setSelectedPet({
            ...selectedPet,
            image: img
          });
        }}
      >
        <Image
          source={img}
          style={[
            styles.additionalImage,
            selectedPet.image?.uri === img?.uri && styles.selectedAdditionalImage
          ]}
          defaultSource={require("./../../../assets/cao.png")}
        />
      </Pressable>
    ))}
  </ScrollView>
)}

              <View style={styles.content}>
                {/* Seção de Informações Básicas */}
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>INFORMAÇÕES</Text>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nome:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.name}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Espécie:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.especie}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Raça:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.raca}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Idade:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.age}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Porte:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.porte}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Pelagem:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.pelagem}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Cidade:</Text>
                    <Text style={styles.infoValue}>{selectedPet?.location}</Text>
                  </View>
                </View>

                {/* Seção Bio */}
                {selectedPet?.bio && (
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>SOBRE</Text>
                    <Text style={styles.bioText}>{selectedPet.bio}</Text>
                  </View>
                )}

                {/* Seção ONG */}
                {selectedPet?.ongName && (
                  <View style={[styles.infoSection, styles.ongContainer]}>
                    <Text style={styles.ongTitle}>INFORMAÇÕES DA ONG</Text>
                    
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>ONG:</Text>
                      <Text style={styles.infoValue}>{selectedPet.ongName}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Contato:</Text>
                      <Text style={styles.infoValue}>{selectedPet.ongContact}</Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}