import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
  TouchableOpacity,
  Platform,
  PanResponder,
  Animated,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { Share } from 'react-native';
import * as Haptics from "expo-haptics";
const { width, height } = Dimensions.get("window");

const VideoContext = createContext();
const screenWidth = Dimensions.get("window").width;
const tabIndicatorWidth = (screenWidth - 120) / 2;
// Mova estas configurações para fora do componente
const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 500,
};

// Configuração para o modal de tela cheia
const fullScreenViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

const createViewabilityConfigCallbackPairs = (onViewableItemsChanged) => [
  {
    viewabilityConfig,
    onViewableItemsChanged,
  },
];

const createFullScreenViewabilityConfigCallbackPairs = (
  onViewableItemsChanged
) => [
    {
      viewabilityConfig: fullScreenViewabilityConfig,
      onViewableItemsChanged,
    },
  ];

const VideoProvider = ({ children }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const videoRefs = useRef(new Map());

  const registerVideo = (id, ref) => {
    videoRefs.current.set(id, ref);
  };

  const unregisterVideo = (id) => {
    videoRefs.current.delete(id);
  };

  const pauseAllExcept = async (exceptId) => {
    console.log(`Pausing all except ${exceptId}`);
    try {
      for (const [id, ref] of videoRefs.current.entries()) {
        if (id !== exceptId && ref) {
          console.log(`Pausing video ${id}`);
          if (Platform.OS === "web") {
            ref.pause();
          } else {
            await ref.pauseAsync();
          }
        }
      }
      setCurrentPlayingId(exceptId);
    } catch (error) {
      console.error("Erro ao pausar vídeos:", error);
    }
  };
  function shuffleArray(array) {
    const newArray = [...array]; // copia para não alterar original
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <VideoContext.Provider
      value={{
        registerVideo,
        unregisterVideo,
        pauseAllExcept,
        currentPlayingId,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

function PostsInner() {
  const { pauseAllExcept } = useContext(VideoContext);
  // ip para api
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("campanha");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const staticReels = [];
  const [reels, setReels] = useState(staticReels);
  const [error, setError] = useState(null);
  const [showCampaigns, setShowCampaigns] = useState(true);
  const [createVideoModalVisible, setCreateVideoModalVisible] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [petName, setPetName] = useState("");
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [swipeAnim] = useState(new Animated.Value(0));
  const [ReelssearchResults, setReelsSearchResults] = useState([]);
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const [fullScreenVideoUri, setFullScreenVideoUri] = useState(null);
  const [showCampaignSearch, setShowCampaignSearch] = useState(false);
  const [showReelsSearch, setShowReelsSearch] = useState(false);
  const [campaignSearch, setCampaignSearch] = useState("");
  const [reelsSearch, setReelsSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [ReelsrecentSearches, setReelsRecentSearches] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reelsSearchRecent, setReelsSearchRecent] = useState([]);
  const [visibleReel, setVisibleReel] = useState(null);
  const reelsFlatListRef = useRef(null);

  // Função para salvar pesquisa recente
  const saveReelsRecentSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    const newSearch = {
      text: searchTerm,
      timestamp: new Date().toISOString(),
    };

    const updatedSearches = [
      newSearch,
      ...ReelsrecentSearches.filter((s) => s.text !== searchTerm),
    ].slice(0, 5);
    setReelsRecentSearches(updatedSearches);

    try {
      await AsyncStorage.setItem(
        "ReelsrecentSearches",
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error("Erro ao salvar pesquisa recente:", error);
    }
  };

  const clearReelsRecentSearches = () => {
    setReelsSearchRecent([]); // ou AsyncStorage.removeItem('reelsRecentSearches')
  };
  // Função para buscar categorias
  const fetchCategories = async () => {
    try {
      console.log("Iniciando busca de categorias...");
      const response = await axios.get(
        "http://localhost:8000/api/posts/categorias"
      );
      console.log("Resposta da API:", response.data);

      if (response.data?.success) {
        setCategories(response.data.data || []);
      } else {
        throw new Error(
          response.data?.message || "Erro ao carregar categorias"
        );
      }
    } catch (error) {
      console.error("Detalhes do erro ao buscar categorias:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    }
  };
  // Função para filtrar posts por categoria
  const filterPostsByCategory = async (categoriaId) => {
    if (!categoriaId) {
      fetchPosts();
      setSelectedCategory(null);
      setShowFiltersModal(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/posts/categorias/${categoriaId}`
      );

      if (response.data?.success) {
        setPosts(response.data.data);
        setSelectedCategory(categoriaId);
      } else {
        throw new Error(response.data.message || "Erro ao filtrar campanhas");
      }
    } catch (err) {
      console.error("Erro ao filtrar campanhas:", err);
      Alert.alert("Erro", "Não foi possível filtrar as campanhas");
      fetchPosts();
      setSelectedCategory(null);
    } finally {
      setLoading(false);
      setShowFiltersModal(false);
    }
  };

  // Carregar categorias quando o componente montar
  useEffect(() => {
    fetchCategories();
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      if (isTransitioning) return false;

      // Só permite arraste horizontal
      if (Math.abs(gestureState.dx) <= Math.abs(gestureState.dy)) {
        return false;
      }

      // Restrições de direção
      if (showCampaigns && gestureState.dx > 0) return false;
      if (!showCampaigns && gestureState.dx < 0) return false;

      return true;
    },

    onPanResponderMove: (_, gestureState) => {
      if (showCampaigns) {
        // Normaliza o valor entre 0 e -1 para a tela de campanhas
        const normalizedValue = Math.max(-1, gestureState.dx / screenWidth);
        swipeAnim.setValue(normalizedValue);
      } else {
        // Normaliza o valor entre 0 e 1 para a tela de reels
        const normalizedValue = Math.min(1, gestureState.dx / screenWidth);
        swipeAnim.setValue(normalizedValue);
      }
    },

    onPanResponderRelease: (_, gestureState) => {
      if (isTransitioning) return;

      const swipeThreshold = 0.2; // 20% da tela
      const swipeVelocity = 0.5; // Velocidade mínima

      const isSwipeValid =
        Math.abs(gestureState.dx) > screenWidth * swipeThreshold ||
        Math.abs(gestureState.vx) > swipeVelocity;

      if (isSwipeValid) {
        setIsTransitioning(true);

        const goingToReels = gestureState.dx < 0;
        const targetValue = goingToReels ? 1 : 0;

        // Animação simultânea do conteúdo e do indicador
        Animated.parallel([
          Animated.spring(swipeAnim, {
            toValue: targetValue,
            speed: 20,
            bounciness: 0,
            useNativeDriver: true,
          }),
          // Adicione aqui outras animações se necessário
        ]).start(async () => {
          if (goingToReels) {
            // AQUI: Remover a chamada de fetchReels se ela já for feita na montagem
            // await fetchReels(); // Mantenha isso se a busca não for feita na montagem ou for um refresh
          }
          setShowCampaigns(!goingToReels);
          setIsTransitioning(false);
        });
      } else {
        // Retorna à posição original
        Animated.spring(swipeAnim, {
          toValue: showCampaigns ? 0 : 1,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (!showReelsSearch && reelsSearch === "") {
      // Mantenha essa chamada se quiser que os reels sejam recarregados ao fechar a busca
      // fetchReels();
    }
  }, [showReelsSearch, reelsSearch]);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  //puxa os reels

  const fetchReels = async () => {
    try {
      // setLoading(true); // REMOVIDO: loading gerenciado no useEffect principal
      const token = await AsyncStorage.getItem("userToken"); // Pega o token para enviar na requisição
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get("http://localhost:8000/api/reels", {
        headers,
      });

      if (response.data?.success) {
        const reelsData = response.data.data || [];
        console.log("Reels recebidos da API:", reelsData); // Log para verificar se 'is_liked' está presente

        const sortedReels = reelsData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        if (sortedReels.length > 0) {
          const [newestReel, ...olderReels] = sortedReels;
          const shuffledOlderReels = shuffleArray([...olderReels]);
          setReels([newestReel, ...shuffledOlderReels]);
        } else {
          setReels([]);
        }
      } else {
        throw new Error(response.data?.message || "Erro ao carregar reels");
      }
    } catch (err) {
      console.error("Erro ao buscar reels:", err.response?.data || err.message);
      setError(err.message || "Falha ao carregar reels");
    } finally {
      // setLoading(false); // REMOVIDO: loading gerenciado no useEffect principal
    }
  };
  // Recarrega e embaralha os reels quando voltar para a tela
  useEffect(() => {
    if (navigation) {
      const unsubscribe = navigation.addListener("focus", () => {
        if (!showCampaigns) {
          // Mantido para refresh se a tela de reels já estava ativa ao retornar à tela de posts
          fetchReels();
        }
      });

      return unsubscribe;
    }
  }, [navigation, showCampaigns]);

  // puxa as Campanhas
  const fetchPosts = async () => {
    try {
      // setLoading(true); // REMOVIDO: loading gerenciado no useEffect principal
      const response = await axios.get("http://localhost:8000/api/posts");

      console.log("Dados completos da API:", response.data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Erro ao carregar posts");
      }
      const shuffledPosts = shuffleArray(response.data.data || []);
      setPosts(shuffledPosts);
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
      setError(err.message);
    } finally {
      // setLoading(false); // REMOVIDO: loading gerenciado no useEffect principal
    }
  };

  // NOVO useEffect para carregar ambos no montagem do componente
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true); // Ativa o carregamento para ambas as chamadas
      try {
        await Promise.all([fetchPosts(), fetchReels()]);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        setError("Falha ao carregar dados iniciais.");
      } finally {
        setLoading(false); // Desativa o carregamento após ambas as chamadas
      }
    };

    loadInitialData();
  }, []); // Executa apenas uma vez na montagem do componente

  // Função para selecionar vídeo da galeria
  const pickVideo = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permissão necessária",
          "É necessário permitir acesso à galeria para selecionar vídeos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
        console.log("Vídeo selecionado:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar vídeo:", error);
      Alert.alert("Erro", "Não foi possível selecionar o vídeo.");
    }
  };

  // Função para enviar o vídeo
  const handleSubmitVideo = async () => {
    setIsSubmitting(true);

    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      setLoginModalVisible(true);
      setIsSubmitting(false);
      return;
    }

    if (!videoUri) {
      Alert.alert("Selecione um vídeo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("pet_name", petName);

    let videoFileToUpload = null;
    let thumbnailFileToUpload = null;

    try {
      const videoResponse = await fetch(videoUri);
      const videoBlob = await videoResponse.blob();
      videoFileToUpload = new File([videoBlob], "video.mp4", {
        type: videoBlob.type || "video/mp4",
      });

      if (thumbnailUri) {
        const thumbnailResponse = await fetch(thumbnailUri);
        const thumbnailBlob = await thumbnailResponse.blob();
        thumbnailFileToUpload = new File([thumbnailBlob], "thumb.jpg", {
          type: thumbnailBlob.type || "image/jpeg",
        });
      }
    } catch (e) {
      console.error("Erro ao criar Blob/File para upload:", e);
      Alert.alert("Erro", "Não foi possível preparar o vídeo para envio.");
      setIsSubmitting(false);
      return;
    }

    formData.append("video", videoFileToUpload);
    if (thumbnailFileToUpload) {
      formData.append("thumbnail", thumbnailFileToUpload);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Sucesso", "Reel publicado com sucesso");
        setCreateVideoModalVisible(false);

        // Atualiza o estado local com o novo reel
        const newReel = response.data.reel;
        setReels((prevReels) => [newReel, ...prevReels]);

        // Muda para a aba de reels
        setShowCampaigns(false);

        await fetchReels();

        setTimeout(() => {
          if (reelsFlatListRef.current) {
            reelsFlatListRef.current.scrollToIndex({
              index: 0,
              animated: true,
            });
          }
        }, 500);
        // Reseta o formulário
        setVideoTitle("");
        setVideoDescription("");
        setPetName("");
        setVideoUri(null);
        setThumbnailUri(null);
      } else {
        Alert.alert("Erro", response.data.message || "Erro no envio");
      }
    } catch (err) {
      console.error("Erro ao enviar reel:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Falha ao enviar reel";
      const errors = err.response?.data?.errors;
      let detailedErrors = "";
      if (errors) {
        for (const field in errors) {
          detailedErrors += `\n${field}: ${errors[field].join(", ")}`;
        }
      }
      Alert.alert("Erro", errorMessage + detailedErrors);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleShowReels = () => {
    setShowCampaigns(false);
    // fetchReels(); // REMOVIDO: Não é mais necessário aqui
  };
  // Resetar o formulário ao fechar o modal
  const handleCloseCreateVideoModal = () => {
    setVideoTitle("");
    setVideoDescription("");
    setPetName("");
    setVideoUri(null);
    setThumbnailUri(null);
    setCreateVideoModalVisible(false);
  };

  //pra mostrar o reels

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 10,
    minimumViewTime: 100, // ou itemVisiblePercentThreshold
  }).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      console.log("Viewable items:", viewableItems);
      if (showReelsSearch || showFullScreenVideo) return;

      if (viewableItems.length > 0) {
        const visibleItem = viewableItems[0];
        if (visibleItem.isViewable && visibleItem.item) {
          const visibleId = visibleItem.item.id;
          setVisibleReel(visibleId);
          pauseAllExcept(visibleId);
          if (Platform.OS !== "web") {
            const videoRef = videoRefs.current.get(visibleId);
            if (videoRef) {
              videoRef.playAsync();
            }
          }
        }
      }
    },
    [showReelsSearch, showFullScreenVideo]
  );
  // 👈 Adicione como dependência
  const viewabilityConfigCallbackPairs = useRef(
    createViewabilityConfigCallbackPairs(onViewableItemsChanged)
  );

  useEffect(() => {
    if (showReelsSearch || showFullScreenVideo) {
      setVisibleReel(null);
    }
  }, [showReelsSearch, showFullScreenVideo]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchReels();
    } catch (error) {
      console.error("Erro ao atualizar reels:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const searchReels = async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get(
          `http://localhost:8000/api/reels/buscar-reels?termo=${encodeURIComponent(
            searchTerm
          )}`,
          { headers }
        );

        if (response.data?.success) {
          setReelsSearchResults(response.data.data || []);
        }
      } catch (err) {
        console.error("Erro ao buscar reels:", err);
      }
    } else {
      setReelsSearchResults([]);
    }
  };

  // Debounce function para evitar muitas requisições
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(reelsSearch, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchReels(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const onFullScreenViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedReelIndex(viewableItems[0].index);
    }
  }, []);

  const fullScreenViewabilityConfigCallbackPairs = useRef(
    createFullScreenViewabilityConfigCallbackPairs(
      onFullScreenViewableItemsChanged
    )
  );

  if (loading) {
    return (
      <View style={styles.containerLo}>
        <Header />
        <View style={styles.mainContent}>
          <View style={styles.loadingContentArea}>
            <Image
              source={require("./../../../assets/pataLoad.gif")}
              style={styles.loadingAnimation}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.loadingText}>
            {showCampaigns ? "Carregando campanhas..." : "Carregando reels..."}
          </Text>
        </View>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar posts: {error}</Text>
      </View>
    );
  }

  return (
    <VideoProvider>
      <View style={styles.container}>
        <Header />

        <View style={styles.tabNavigationContainer}>
          {/* Ícone da esquerda (Filtro ou Busca) */}
          <View style={styles.sideIconContainer}>
            {showCampaigns ? (
              <TouchableOpacity onPress={() => setShowFiltersModal(true)}>
                <Icon name="filter" size={22} color="#E7701D" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setShowReelsSearch(true);
                  setReelsSearch("");
                }}
              >
                <Icon name="search" size={22} color="#E7701D" />
              </TouchableOpacity>
            )}
          </View>

          {/* Abas com indicador */}
          <View style={styles.tabsWrapper}>
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => {
                setShowCampaigns(true);
                Animated.spring(swipeAnim, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  showCampaigns && styles.activeTabText,
                ]}
              >
                Campanhas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => {
                // Removido 'async'
                if (isTransitioning) return;
                setIsTransitioning(true);
                Animated.spring(swipeAnim, {
                  // Alterado para Animated.spring
                  toValue: 1,
                  speed: 20, // Ajuste para a sensação de velocidade
                  bounciness: 0, // Removido efeito de 'bounce' para transição mais direta
                  useNativeDriver: true,
                }).start(() => {
                  // Removido 'await fetchReels()'
                  setShowCampaigns(false);
                  setIsTransitioning(false);
                });
              }}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  !showCampaigns && styles.activeTabText,
                ]}
              >
                PetToks
              </Text>
            </TouchableOpacity>

            {/* Indicador animado */}
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  transform: [
                    {
                      translateX: swipeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-60, 60], // Ajustado para o novo layout centralizado
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* Ícone da direita (Busca) */}
          <View style={styles.sideIconContainer}>
            {!showCampaigns && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setCreateVideoModalVisible(true)}
              >
                <Icon name="plus" size={22} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateX: swipeAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {showCampaigns ? (
            <ScrollView
              style={styles.scrollView}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
            >
              <View style={styles.containerPosts}>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostItem
                      key={post.id}
                      post={post}
                      navigation={navigation}
                    />
                  ))
                ) : (
                  <View style={styles.noPostsContainer}>
                    <Text style={styles.noPostsText}>
                      Nenhuma campanha encontrada
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          ) : !showReelsSearch && !showFullScreenVideo ? (
            <FlatList
              ref={reelsFlatListRef}
              data={reels.filter((item) => item?.id)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <ReelItem
                  reel={{
                    id: item.id,
                    videoUrl: item.videoUrl || item.video_urlReels,
                    ...item,
                  }}
                  isVisible={index === selectedReelIndex}
                  navigation={navigation}
                  isModalOpen={showFullScreenVideo}
                />
              )}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              viewabilityConfigCallbackPairs={
                fullScreenViewabilityConfigCallbackPairs.current
              }
              getItemLayout={(data, index) => ({
                length: height,
                offset: height * index,
                index,
              })}
              initialScrollIndex={selectedReelIndex}
              onScrollToIndexFailed={() => { }}
              contentContainerStyle={{
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
                paddingBottom: 60,
              }}
              onMomentumScrollEnd={(event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const currentIndex = Math.round(offsetY / height);
                const visibleItem = reels[currentIndex];
                if (visibleItem?.id) {
                  pauseAllExcept(visibleItem.id);
                }
              }}
            />
          ) : null}
        </Animated.View>

        {/* Modal para criação de vídeo */}
        <Modal
          visible={createVideoModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleCloseCreateVideoModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.createVideoModalContent}>
              <View style={styles.createVideoModalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Icon
                    name="video"
                    size={24}
                    color="#fff"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.createVideoModalTitle}>
                    Criar Novo Reel
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={handleCloseCreateVideoModal}
                >
                  <Icon name="times" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.createVideoModalBody}>
                {/* Título */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    <Icon
                      name="heading"
                      size={16}
                      color="#2c2c2c"
                      style={{ marginRight: 8 }}
                    />
                    Título do Vídeo
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Digite um título para o vídeo"
                    value={videoTitle}
                    onChangeText={setVideoTitle}
                    maxLength={50}
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.charCount}>{videoTitle.length}/50</Text>
                </View>

                {/* Descrição */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    <Icon
                      name="align-left"
                      size={16}
                      color="#2c2c2c"
                      style={{ marginRight: 8 }}
                    />
                    Descrição
                  </Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    placeholder="Descreva o conteúdo do seu vídeo"
                    value={videoDescription}
                    onChangeText={setVideoDescription}
                    multiline
                    numberOfLines={4}
                    maxLength={200}
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.charCount}>
                    {videoDescription.length}/200
                  </Text>
                </View>

                {/* Nome do Pet */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    <Icon
                      name="paw"
                      size={16}
                      color="#2c2c2c"
                      style={{ marginRight: 8 }}
                    />
                    Nome do Pet
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Digite o nome do pet no vídeo"
                    value={petName}
                    onChangeText={setPetName}
                    maxLength={30}
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.charCount}>{petName.length}/30</Text>
                </View>

                {/* Upload de Vídeo */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    <Icon
                      name="film"
                      size={16}
                      color="#2c2c2c"
                      style={{ marginRight: 8 }}
                    />
                    Vídeo
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.uploadContainer,
                      videoUri && styles.uploadContainerWithPreview,
                    ]}
                    onPress={pickVideo}
                    activeOpacity={0.8}
                  >
                    {videoUri ? (
                      <>
                        {Platform.OS === "web" ? (
                          <video
                            src={videoUri}
                            style={styles.videoPreview}
                            controls
                          />
                        ) : (
                          <Video
                            source={{ uri: videoUri }}
                            style={styles.videoPreview}
                            useNativeControls
                            resizeMode="contain"
                          />
                        )}
                        <View style={styles.uploadOverlay}>
                          <TouchableOpacity
                            style={styles.changeButton}
                            onPress={pickVideo}
                          >
                            <Icon name="sync" size={16} color="#fff" />
                            <Text style={styles.changeButtonText}>
                              Trocar vídeo
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <Icon name="cloud-upload-alt" size={48} color="#ccc" />
                        <Text style={styles.uploadText}>
                          Toque para fazer upload do vídeo
                        </Text>
                        <Text style={styles.uploadSubtext}>
                          Formatos aceitos: MP4, MOV (máx. 60 segundos)
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                {/* Botão de Envio */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    (!videoTitle.trim() ||
                      !videoDescription.trim() ||
                      !videoUri ||
                      isSubmitting) &&
                    styles.submitButtonDisabled,
                  ]}
                  onPress={handleSubmitVideo}
                  disabled={
                    !videoTitle.trim() ||
                    !videoDescription.trim() ||
                    !videoUri ||
                    isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Icon name="cloud-upload-alt" size={20} color="#fff" />
                      <Text style={styles.submitButtonText}>Publicar Vídeo</Text>
                    </>
                  )}
                </TouchableOpacity>

              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal de login (reutilizado do componente PostItem) */}
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
                onPress={(e) => e.stopPropagation()}
              >
                <Text style={styles.loginModalTitle}>
                  Você precisa estar logado
                </Text>
                <Text style={styles.loginModalText}>
                  Para criar um PetTok, faça login na sua conta.
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

        {/* Modal de pesquisa */}
        <Modal
          visible={showReelsSearch}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            setShowReelsSearch(false);
            setReelsSearch("");
            setReelsSearchResults([]);
          }}
        >
          <View style={styles.searchModalContainer}>
            <View style={styles.searchHeader}>
              <TouchableOpacity
                onPress={() => {
                  setShowReelsSearch(false);
                  setReelsSearch("");
                  setReelsSearchResults([]);
                }}
                style={styles.backButton}
              >
                <Icon name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.reelsSearchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar reels..."
                  placeholderTextColor="#153A90"
                  value={reelsSearch}
                  onChangeText={(text) => {
                    setReelsSearch(text);
                    if (text.trim() === "") {
                      setReelsSearchResults([]);
                    }
                  }}
                  autoFocus={true}
                />
              </View>
              {reelsSearch ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setReelsSearch("");
                    setReelsSearchResults([]);
                  }}
                >
                  <Icon name="times" size={20} color="#fff" />
                </TouchableOpacity>
              ) : null}
            </View>

            <ScrollView style={styles.searchContentContainer}>
              {/* Pesquisas Recentes - Sempre visível */}
              {!reelsSearch && (
                <View style={styles.recentSearchesContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.recentSearchesTitle}>
                      <Icon
                        name="history"
                        size={18}
                        color="#153A90"
                        style={{ marginRight: 8 }}
                      />
                      Pesquisas Recentes
                    </Text>
                  </View>

                  {ReelsrecentSearches.length > 0 ? (
                    ReelsrecentSearches.map((search, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.recentSearchItem}
                        onPress={() => {
                          setReelsSearch(search.text);
                          saveReelsRecentSearch(search.text);
                        }}
                      >
                        <View style={styles.recentSearchContent}>
                          <View style={styles.searchIcon}>
                            <Icon name="search" size={14} color="#E7701D" />
                          </View>
                          <Text
                            style={styles.recentSearchText}
                            numberOfLines={1}
                          >
                            {search.text}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.deleteSearchButton}
                          onPress={() => {
                            const newSearches = ReelsrecentSearches.filter(
                              (_, i) => i !== index
                            );
                            setReelsRecentSearches(newSearches);
                            AsyncStorage.setItem(
                              "ReelsrecentSearches",
                              JSON.stringify(newSearches)
                            );
                          }}
                        >
                          <Icon
                            name="times"
                            size={16}
                            color="#999"
                            style={styles.deleteSearchIcon}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.noRecentSearches}>
                      <Icon
                        name="search"
                        size={40}
                        color="#E7701D"
                        style={{ opacity: 0.5 }}
                      />
                      <Text style={styles.noRecentSearchesText}>
                        Nenhuma pesquisa recente
                      </Text>
                    </View>
                  )}

                  {ReelsrecentSearches.length > 0 && (
                    <TouchableOpacity
                      style={styles.clearRecentButton}
                      onPress={clearReelsRecentSearches}
                    >
                      <Text style={styles.clearRecentText}>
                        Limpar histórico de pesquisa
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Resultados da Pesquisa */}
              {reelsSearch && (
                <FlatList
                  data={ReelssearchResults}
                  numColumns={3}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.thumbnailContainer}
                      onPress={() => {
                        setSelectedReelIndex(index);
                        setFullScreenVideoUri(
                          item.videoUrl ?? item.video_urlReels
                        );
                        setShowFullScreenVideo(true);
                        setShowReelsSearch(false);
                        saveReelsRecentSearch(reelsSearch);
                      }}
                    >
                      {Platform.OS === "web" ? (
                        <video
                          src={item.videoUrl ?? item.video_urlReels}
                          style={styles.thumbnailImage}
                          muted
                          playsInline
                          preload="metadata"
                          onLoadStart={(e) => {
                            if (e.target.readyState >= 1) {
                              e.target.currentTime = 1;
                            }
                          }}
                          onLoadedData={(e) => {
                            e.target.currentTime = 1;
                          }}
                          onMouseOver={(e) => {
                            if (e.target.readyState >= 3) {
                              e.target.play().catch(() => { });
                            }
                          }}
                          onMouseOut={(e) => {
                            e.target.pause();
                            e.target.currentTime = 1;
                          }}
                        />
                      ) : (
                        <Video
                          source={{ uri: item.videoUrl ?? item.video_urlReels }}
                          style={styles.thumbnailImage}
                          resizeMode="cover"
                          shouldPlay={false}
                          isMuted={true}
                          positionMillis={1000}
                        />
                      )}
                      <View style={styles.thumbnailOverlay}>
                        <View style={styles.thumbnailPlayIcon}>
                          <Icon name="play" size={24} color="#fff" />
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon
                            name="eye"
                            size={12}
                            color="#fff"
                            style={{ marginRight: 5 }}
                          />
                          <Text style={styles.thumbnailViews}>
                            {item.views
                              ? item.views > 1000
                                ? `${(item.views / 1000).toFixed(1)}K`
                                : item.views
                              : 0}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View style={styles.noResultsContainer}>
                      <Icon name="search" size={50} color="#E7701D" />
                      <Text style={styles.noResultsText}>
                        {reelsSearch.trim()
                          ? "Nenhum reel encontrado"
                          : "Digite algo para pesquisar"}
                      </Text>
                      <Text style={styles.noResultsSubtext}>
                        {reelsSearch.trim()
                          ? "Tente buscar com outras palavras"
                          : "Descubra vídeos incríveis de pets"}
                      </Text>
                    </View>
                  }
                  contentContainerStyle={styles.searchResultsGrid}
                />
              )}
            </ScrollView>
          </View>
        </Modal>

        {/* Modal para exibir o vídeo em tela cheia com navegação */}
        <Modal
          visible={showFullScreenVideo}
          animationType="fade"
          transparent={false}
          onRequestClose={() => setShowFullScreenVideo(false)}
        >
          <View
            style={[
              styles.fullScreenVideoContainer,
              { backgroundColor: "#000" },
            ]}
          >
            <TouchableOpacity
              style={[styles.closeFullScreenButton, { zIndex: 2 }]}
              onPress={() => {
                setShowFullScreenVideo(false);
                setShowReelsSearch(true);
                setSelectedReelIndex(0);
              }}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            <FlatList
              data={ReelssearchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <ReelItem
                  reel={{
                    id: item.id,
                    videoUrl: item.videoUrl || item.video_urlReels,
                    ...item,
                  }}
                  isVisible={index === selectedReelIndex}
                  navigation={navigation}
                />
              )}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              viewabilityConfigCallbackPairs={
                fullScreenViewabilityConfigCallbackPairs.current
              }
              getItemLayout={(data, index) => ({
                length: height,
                offset: height * index,
                index,
              })}
              initialScrollIndex={selectedReelIndex}
              onScrollToIndexFailed={() => { }}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            />
          </View>
        </Modal>

        {/* Modal de Filtros */}
        <Modal
          visible={showFiltersModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowFiltersModal(false)}
        >
          <View style={styles.filterModalOverlay}>
            <View style={styles.filterModalContent}>
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>Filtrar Campanhas</Text>
                <TouchableOpacity
                  style={styles.closeFilterButton}
                  onPress={() => setShowFiltersModal(false)}
                >
                  <Icon name="times" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.categoriesList}>
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    selectedCategory === null && styles.selectedCategoryItem,
                  ]}
                  onPress={() => {
                    setSelectedCategory(null);
                    setPosts([]); // Limpa os posts
                    fetchPosts(); // Busca todos os posts novamente
                    setShowFiltersModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === null && styles.selectedCategoryText,
                    ]}
                  >
                    Todas as campanhas
                  </Text>
                </TouchableOpacity>

                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category.id &&
                      styles.selectedCategoryItem,
                    ]}
                    onPress={() => filterPostsByCategory(category.id)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.id &&
                        styles.selectedCategoryText,
                      ]}
                    >
                      {category.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {isSubmitting && (
          <Modal transparent animationType="fade" visible>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>
                Publicando vídeo...
              </Text>
            </View>
          </Modal>
        )}
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </VideoProvider>
  );
}
const VideoFallback = ({ uri, style }) => {
  return (
    <View style={style}>
      <Text>Video não disponível</Text>
    </View>
  );
};
// Componente de reels
const ReelItem = ({ reel, isVisible, navigation, isModalOpen }) => {
  if (!reel || !reel.id) return null;
  const { idUser } = reel;
  const [userProfile, setUserProfile] = useState(null);
  const [isLiked, setIsLiked] = useState(reel.is_liked ?? false);
  const [likeCount, setLikeCount] = useState(reel.likes ?? 0);
  const [commentCount, setCommentCount] = useState(reel.comments ?? 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userReels, setUserReels] = useState([]);
  const [loadingUserContent, setLoadingUserContent] = useState(false);
  const videoRef = useRef(null);
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);

  const [activeTab, setActiveTab] = useState("pettoks");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const videoUri = reel.videoUrl ?? reel.video_urlReels ?? null;
  const { registerVideo, unregisterVideo, pauseAllExcept } =
    useContext(VideoContext);
  const [currentReelData, setCurrentReelData] = useState(null);
  const [fullScreenVideoUri, setFullScreenVideoUri] = useState(null);
  const [visibleReel, setVisibleReel] = useState(null);
  const [activeProfileTab, setActiveProfileTab] = useState("reels");
  useEffect(() => {
    if (videoRef.current) {
      registerVideo(reel.id, videoRef.current);
    }
    return () => unregisterVideo(reel.id);
  }, [reel.id]);

  useEffect(() => {
    const handleVideoVisibility = async () => {
      if (!videoRef.current) return;

      try {
        if (isVisible && !commentModalVisible && !isModalOpen) {
          console.log(`Playing video ${reel.id}`);
          await pauseAllExcept(reel.id);
          if (Platform.OS === "web") {
            await videoRef.current
              .play()
              .catch((e) => console.log("Play error:", e));
          } else {
            await videoRef.current.playAsync();
          }
          setIsPlaying(true);
        } else {
          console.log(`Pausing video ${reel.id}`);
          if (Platform.OS === "web") {
            videoRef.current.pause();
          } else {
            await videoRef.current.pauseAsync();
          }
          setIsPlaying(false);
        }
      } catch (error) {
        console.log("Video playback error:", error);
      }
    };

    handleVideoVisibility();
  }, [isVisible, commentModalVisible, isModalOpen, reel.id]);

  const handleShare = async () => {
  try {
    const videoUrl = reel.videoUrl ?? reel.video_urlReels;
    
    if (!videoUrl) {
      Alert.alert("Erro", "Não foi possível obter o link do vídeo");
      return;
    }

    const shareOptions = {
      message: `Confira este PetTok incrível: ${videoUrl}\n\n${description}\n\nCompartilhado via PetAdote`,
      url: videoUrl, // Para plataformas que suportam compartilhamento de URLs
      title: `PetTok: ${petName || userName}'s video`,
    };

    const result = await Share.share(shareOptions);

    if (result.action === Share.sharedAction) {
      // Opcional: registrar no analytics que o compartilhamento foi bem-sucedido
      console.log("Compartilhado com sucesso");
    } else if (result.action === Share.dismissedAction) {
      console.log("Compartilhamento cancelado");
    }
  } catch (error) {
    console.error("Erro ao compartilhar:", error);
    Alert.alert("Erro", "Não foi possível compartilhar o vídeo");
  }
};
  const fetchUserContent = async (userId) => {
    console.log(">>> Buscando dados do usuário ID:", userId);
    if (!userId) return;

    setLoadingUserContent(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [reelsResponse, postsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/reels/user/${userId}`, {
          headers,
        }),
        axios.get(`http://localhost:8000/api/posts/user/${userId}`, {
          headers,
        }),
      ]);

      setUserReels(reelsResponse.data?.data || []);
      setUserPosts(postsResponse.data?.data || []);
    } catch (error) {
      console.error("Erro ao buscar conteúdo do usuário:", error);
    } finally {
      setLoadingUserContent(false);
    }
  };

  // Modifique a função openProfileModal para buscar os dados do usuário
  const openProfileModal = async (userId) => {
    console.log("Abrindo perfil do usuário ID:", userId);

    if (!userId) {
      console.error("ID de usuário inválido:", userId);
      Alert.alert("Erro", "ID de usuário inválido");
      return;
    }

    setProfileModalVisible(true);
    setLoadingUserContent(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Buscar dados do usuário
      const userResponse = await axios.get(
        `http://localhost:8000/api/usuario/${userId}`,
        { headers }
      );
      console.log("Dados do usuário:", userResponse.data);

      if (userResponse.data?.success) {
        setUserProfile({
          id: userResponse.data.user.idUser,
          name: userResponse.data.user.nomeUser,
          avatar: userResponse.data.user.imgUser
            ? `http://localhost:8000/${userResponse.data.user.imgUser}`
            : require("../../../assets/user.png"),
        });
      }

      // Buscar reels do usuário
      const reelsResponse = await axios.get(
        `http://localhost:8000/api/reels/user/${userId}`,
        { headers }
      );
      console.log("Reels do usuário:", reelsResponse.data);

      // Processar os reels para garantir URLs completas
      const processedReels = (reelsResponse.data?.data || []).map((reel) => ({
        ...reel,
        id: reel.idReels || reel.id,
        videoUrl: reel.video_urlReels?.startsWith("http")
          ? reel.video_urlReels
          : reel.video_urlReels
            ? `http://localhost:8000/${reel.video_urlReels}`
            : null,
        thumbnailUrl: reel.thumbnail_urlReels?.startsWith("http")
          ? reel.thumbnail_urlReels
          : reel.thumbnail_urlReels
            ? `http://localhost:8000/${reel.thumbnail_urlReels}`
            : null,
      }));

      setUserReels(processedReels);
    } catch (error) {
      console.error("Erro detalhado:", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });

      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao carregar perfil"
      );
    } finally {
      setLoadingUserContent(false);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (!videoRef.current) return;

      if (isPlaying) {
        if (Platform.OS === "web") {
          videoRef.current.pause();
        } else {
          await videoRef.current.pauseAsync();
        }
        setIsPlaying(false);
      } else {
        await pauseAllExcept(reel.id);
        if (Platform.OS === "web") {
          await videoRef.current.play();
        } else {
          await videoRef.current.playAsync();
        }
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Erro ao alternar vídeo:", error);
    }
  };

  const handleLike = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      setLoginModalVisible(true); // Mostra modal de login específico do ReelItem
      return;
    }

    const previousLikedState = isLiked;
    const previousLikeCount = likeCount;
    // Atualização otimista
    setIsLiked(!isLiked);
    setLikeCount((prevCount) =>
      isLiked ? Math.max(0, prevCount - 1) : prevCount + 1
    );

    try {
      const response = await axios.post(
        `http://localhost:8000/api/reels/${reel.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Confirma com dados do backend
        setIsLiked(response.data.liked);
        setLikeCount(response.data.likes);
      } else {
        // Reverte em caso de falha lógica no backend
        setIsLiked(previousLikedState);
        setLikeCount(previousLikeCount);
        Alert.alert(
          "Erro",
          response.data.message || "Não foi possível curtir o reel."
        );
      }
    } catch (error) {
      // Reverte em caso de erro na requisição
      setIsLiked(previousLikedState);
      setLikeCount(previousLikeCount);
      console.error(
        "Erro ao curtir reel:",
        error.response?.data || error.message
      );
      // Verifica se é erro de autenticação (401)
      if (error.response?.status === 401) {
        setLoginModalVisible(true);
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao tentar curtir o reel.");
      }
    }
  };

  const fetchComments = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setLoadingComments(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reels/${reel.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const comments = response.data.comments || [];
        setCommentsList(comments);
        setCommentCount(comments.length); // ✅ Atualiza o contador com o número real
      } else {
        Alert.alert("Erro", "Não foi possível carregar os comentários.");
        setCommentsList([]);
      }
    } catch (error) {
      console.error(
        "Erro ao buscar comentários:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Ocorreu um erro ao buscar os comentários.");
      setCommentsList([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      setLoginModalVisible(true); // Mostra modal de login
      return;
    }
    if (!newComment.trim()) {
      Alert.alert("Comentário Vazio", "Digite algo para comentar.");
      return;
    }

    const commentToSend = newComment;
    setNewComment(""); // Limpa otimistamente

    try {
      const response = await axios.post(
        `http://localhost:8000/api/reels/${reel.id}/comment`,
        { comment: commentToSend }, // Envia o comentário no corpo
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Define Content-Type aqui
          },
        }
      );

      if (response.data.success && response.data.data) {
        // Adiciona o novo comentário no início da lista
        setCommentsList((prevComments) => [
          response.data.data,
          ...prevComments,
        ]);
        setCommentCount((prevCount) => prevCount + 1); // Atualiza a contagem
        // setNewComment(''); // Já limpou otimistamente
      } else {
        setNewComment(commentToSend); // Restaura o texto em caso de falha
        Alert.alert(
          "Erro",
          response.data.message || "Não foi possível enviar o comentário."
        );
      }
    } catch (error) {
      setNewComment(commentToSend); // Restaura o texto em caso de falha
      console.error(
        "Erro ao enviar comentário:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        setLoginModalVisible(true);
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao enviar o comentário.");
      }
    }
  };

  const openComments = () => {
    fetchComments(); // Busca os comentários ao abrir
    setCommentModalVisible(true);
  };

  // --- Dados do Reel ---
  const userName = reel.userName ?? "Usuário Anônimo";
  // Use a URL completa se a API retornar caminhos relativos
  const imgUser = reel.userAvatar
    ? reel.userAvatar.startsWith("http")
      ? reel.userAvatar
      : `http://localhost:8000/${reel.userAvatar}`
    : null; // Ajuste a URL base se necessário
  const petName = reel.petName ?? reel.pet_nomeReels ?? "";
  const description = reel.description ?? reel.descricaoReels ?? "";

  // --- Renderização ---
  return (
    <View style={[styles.reelCardContainer, { height }]}>
      <View style={styles.reelHeader}>
        <TouchableOpacity
          style={styles.userInfoContainer}
          onPress={() => {
            console.log("ID do usuário antes de abrir modal:", reel.idUser);
            openProfileModal(idUser);
          }}
          activeOpacity={0.7}
        >
          <Image
            source={
              imgUser ? { uri: imgUser } : require("../../../assets/user.png")
            }
            style={styles.userAvatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>{userName}</Text>
            {petName && <Text style={styles.petName}>🐾 {petName}</Text>}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        {" "}
        {/* Novo contêiner para centralizar o vídeo */}
        <TouchableOpacity
          style={styles.videoWrapper}
          activeOpacity={1}
          onPress={togglePlayPause}
        >
          {Platform.OS === "web" ? (
            <video
              ref={videoRef}
              src={videoUri}
              style={styles.videoPlayer}
              loop
              playsInline
              muted={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <Video
              ref={videoRef}
              source={{ uri: videoUri }}
              style={styles.videoPlayer}
              shouldPlay={false}
              isLooping={true}
              resizeMode="cover"
              isMuted={false}
              onPlaybackStatusUpdate={(status) => {
                setIsPlaying(status.isPlaying);
              }}
            />
          )}

          {!isPlaying && (
            <View style={styles.videoOverlay}>
              <View style={styles.playButton}>
                <Icon name="play" size={40} color="rgba(255, 255, 255, 0.7)" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.reelOverlayContent}>
        <View style={styles.reelDescription1}>
          {description && (
            <Text style={styles.reelDescription} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.reelFooter}>
          <View style={styles.interactionButtons2}>
            <TouchableOpacity
              style={styles.interactionButton2}
              onPress={handleLike}
            >
              <Icon
                name="paw"
                size={28}
                color={isLiked ? "#E7701D" : "#fff"}
                solid={isLiked}
              />
              <Text
                style={[
                  styles.interactionText2,
                  isLiked && styles.interactionTextActive2,
                ]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.interactionButton2}
              onPress={openComments} 
            >
              <Icon name="bone" size={28} color="#fff" solid />
              <Text style={styles.interactionText2}>{commentCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.interactionButton2} onPress={handleShare}>
              <Icon name="paper-plane" size={28} color="#fff" solid />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/** */}
      {/* --- Modal de Comentários --- */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
        transparent={true}
      >
        <Pressable
          style={commentStyles.modalOverlay}
          onPress={() => setCommentModalVisible(false)}
        >
          <Pressable
            style={commentStyles.commentModalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho (fixo) */}
            <View style={commentStyles.commentModalHeader}>
              <Text style={commentStyles.commentModalTitle}>
                Comentários ({commentCount})
              </Text>
              <TouchableOpacity
                onPress={() => setCommentModalVisible(false)}
                style={commentStyles.closeCommentModalButton}
              >
                <Icon name="times" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Área de comentários com ScrollView */}
            <ScrollView
              style={commentStyles.commentsScrollContainer}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              {loadingComments ? (
                <ActivityIndicator
                  size="large"
                  color="#E7701D"
                  style={{ flex: 1 }}
                />
              ) : commentsList.length === 0 ? (
                <View style={commentStyles.emptyCommentsContainer}>
                  <Icon
                    name="comment-slash"
                    size={40}
                    color="#E7701D"
                    style={{ opacity: 0.5 }}
                  />
                  <Text style={commentStyles.noCommentsText}>
                    Seja o primeiro a comentar!
                  </Text>
                </View>
              ) : (
                commentsList.map((item) => (
                  <View
                    key={
                      item.idComentario?.toString() ||
                      `comment-${item.idComentario}`
                    }
                    style={commentStyles.commentItem}
                  >
                    <Image
                      source={
                        item.imgUser
                          ? {
                            uri: item.imgUser.startsWith("http")
                              ? item.imgUser
                              : `http://localhost:8000/${item.imgUser}`,
                          }
                          : require("../../../assets/user.png")
                      }
                      style={commentStyles.commentUserAvatar}
                    />

                    <View style={commentStyles.commentRightContainer}>
                      <View style={commentStyles.commentContentRow}>
                        <View style={commentStyles.commentTextContainer}>
                          <Text style={commentStyles.commentUserName}>
                            {item.nomeUser || "Usuário"}
                          </Text>
                          <Text
                            style={commentStyles.commentText}
                            numberOfLines={5}
                          >
                            {item.texto}
                          </Text>
                        </View>
                      </View>

                      {item.created_at && (
                        <Text style={commentStyles.commentDate}>
                          {new Date(item.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </Text>
                      )}
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
            {/* Input de comentário (fixo na parte inferior) */}
            <View style={commentStyles.commentInputContainer}>
              <TextInput
                style={commentStyles.commentInput}
                placeholder="Adicione um comentário..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                style={[
                  commentStyles.sendCommentButton,
                  !newComment.trim() && commentStyles.sendCommentButtonDisabled,
                ]}
                onPress={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                <Icon name="paper-plane" size={20} color="#fff" solid />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      {/* Modal de Perfil do Usuário - Versão Profissional */}
      <Modal
        visible={profileModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredModal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Perfil</Text>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Icon name="times" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Foto do usuário */}
            <View style={styles.userInfo}>
              <Image
                source={
                  imgUser
                    ? { uri: imgUser }
                    : require("../../../assets/user.png")
                }
                style={styles.userAvatar1}
              />
              <Text style={styles.username}>{userName}</Text>
              <TouchableOpacity style={styles.messageButton}>
                <Icon name="envelope" size={16} color="#E7701D" />
                <Text style={styles.messageText}>Mensagem</Text>
              </TouchableOpacity>
            </View>

            {/* Abas (PetToks | Animais Perdidos) */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "pettoks" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("pettoks")}
              >
                <Icon
                  name="video"
                  size={18}
                  color={activeTab === "pettoks" ? "#E7701D" : "#666"}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "pettoks" && styles.activeTabText,
                  ]}
                >
                  PetToks
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conteúdo (Scroll com grid) */}
            <ScrollView contentContainerStyle={styles.gridContainer}>
              {activeTab === "pettoks" ? (
                userReels.length > 0 ? (
                  [...Array(Math.ceil(userReels.length / 3))].map(
                    (_, rowIndex) => (
                      <View key={rowIndex} style={styles.gridRow}>
                        {userReels
                          .slice(rowIndex * 3, rowIndex * 3 + 3)
                          .map((reel) => (
                            <TouchableOpacity
                              key={reel.id}
                              style={styles.videoTile}
                              onPress={() => {
                                const videoUrl =
                                  reel.videoUrl ?? reel.video_urlReels;

                                setCurrentReelData({
                                  ...reel,
                                  videoUrl,
                                  userAvatar:
                                    userProfile?.avatar ??
                                    `http://localhost:8000/${reel.userAvatar || reel.imgUser
                                    }`,
                                  userName:
                                    userProfile?.name ??
                                    reel.userName ??
                                    reel.nomeUser ??
                                    "Usuário Anônimo",
                                  petName:
                                    reel.petName ?? reel.pet_nomeReels ?? "",
                                  description:
                                    reel.description ??
                                    reel.descricaoReels ??
                                    "",
                                  is_liked: reel.is_liked ?? false,
                                  likes: reel.likes ?? 0,
                                  comments: reel.comments ?? 0,
                                });

                                setFullScreenVideoUri(videoUrl);
                                setShowFullScreenVideo(true);
                              }}
                            >
                              {/* Player de vídeo em miniatura */}
                              <Video
                                source={{ uri: reel.videoUrl }}
                                style={styles.liveVideoThumbnail}
                                paused={true} // Pausado inicialmente
                                muted={true}
                                repeat={false}
                                resizeMode="cover"
                              />

                              {/* Overlay com play e views */}
                              <View style={styles.videoOverlay}>
                                <Icon name="play" size={16} color="#fff" />
                                <Text style={styles.viewCount}>
                                  {reel.views || 0}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          ))}
                      </View>
                    )
                  )
                ) : (
                  <View style={styles.emptyState}>
                    <Icon
                      name="video"
                      size={50}
                      color="#E7701D"
                      style={{ opacity: 0.5 }}
                    />
                    <Text style={styles.emptyText}>
                      Nenhum PetTok encontrado
                    </Text>
                  </View>
                )
              ) : (
                <View style={styles.emptyState}>
                  <Icon
                    name="paw"
                    size={50}
                    color="#E7701D"
                    style={{ opacity: 0.5 }}
                  />
                  <Text style={styles.emptyText}>Nenhum animal perdido</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {!isModalOpen && (
        <Modal
          visible={showFullScreenVideo}
          animationType="fade"
          transparent={false}
          onRequestClose={() => setShowFullScreenVideo(false)}
        >
          <View
            style={[
              styles.fullScreenVideoContainer,
              { backgroundColor: "#000" },
            ]}
          >
            <TouchableOpacity
              style={styles.closeFullScreenButton}
              onPress={() => setShowFullScreenVideo(false)}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

            {currentReelData && (
              <ReelItem
                reel={currentReelData}
                isVisible={true}
                navigation={navigation}
                isModalOpen={true}
              />
            )}
          </View>
        </Modal>
      )}

      {/* --- Modal de Login (Específico do ReelItem) --- */}
      <Modal visible={loginModalVisible} animationType="fade" transparent>
        <Pressable
          style={styles.modalOverlay} // Reutilize ou crie estilo
          onPress={() => setLoginModalVisible(false)}
        >
          <View style={styles.loginModal}>
            <Image
              style={styles.imgmodal}
              source={require("./../../../assets/logo2.png")}
            />
            <Pressable
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.loginModalTitle}>Login Necessário</Text>
              <Text style={styles.loginModalText}>
                Faça login para curtir ou comentar.
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
                onPress={() => setLoginModalVisible(false)} // Apenas fecha o modal local
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      {/* --- Fim Modal Login --- */}
    </View>
  );
};
//

// Container dos reels com estado vazio estilizado
const ReelsContainer = ({ reels, loading }) => {
  if (loading) {
    return (
      <View style={styles.reelsContainer}>
        <ActivityIndicator size="large" color="#E7701D" />
      </View>
    );
  }

  return (
    <View style={styles.reelsContainer}>
      {reels.length > 0 ? (
        reels.map((reel) => <ReelItem key={reel.id} reel={reel} />)
      ) : (
        <View style={styles.noReelsContainer}>
          <Icon
            name="video"
            size={64}
            color="#ccc"
            style={styles.noReelsIcon}
          />
          <Text style={styles.noReelsText}>
            <Text>Nenhum reel encontrado</Text>
          </Text>
          <Text style={styles.noReelsSubtext}>
            <Text>
              {" "}
              Seja o primeiro a compartilhar um momento especial do seu pet!
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

// Botão flutuante estilizado
const StyledFloatingButton = ({ onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.floatingButton, isPressed && styles.floatingButtonPressed]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
    >
      <Icon name="plus" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const PostItem = ({ post, navigation }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes || 0);
  const [commentCount, setCommentCount] = React.useState(
    post.comments_count || 0
  );
  const [commentText, setCommentText] = React.useState("");
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [loadingComments, setLoadingComments] = React.useState(false);
  const [isLikeLoading, setIsLikeLoading] = React.useState(false);
  const maxLength = 98;
  const description = post.description || "";
  const isLongDescription = description.length > maxLength;
  const displayedText = expanded
    ? description
    : description.slice(0, maxLength);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [selectedComment, setSelectedComment] = React.useState(null);
  const [reportReason, setReportReason] = React.useState("");
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  React.useEffect(() => {
    const getCurrentUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        console.log("ID do usuário logado do AsyncStorage:", id);
        if (id) {
          setCurrentUserId(id);
        }
      } catch (error) {
        console.error("Erro ao obter userId do AsyncStorage", error);
      }
    };
    getCurrentUserId();
  }, []);

  const handleReportComment = async (commentId) => {
    if (!currentUserId) {
      setLoginModalVisible(true);
      return;
    }
    setSelectedComment(commentId);
    setShowReportModal(true);
  };

  const showCommentOptions = (idComentario, open) => {
    setSelectedCommentId(idComentario); // salva o ID
    setModalVisible(open); // abre o modal
  };

  const submitReport = async () => {
    if (!reportReason.trim() || !selectedComment) return;

    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post.id}/denunciar`,
        {
          comentario_id: selectedComment,
          motivo: reportReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setShowReportModal(false);
        setReportReason("");
        setSelectedComment(null);
        setShowSuccessModal(true);
      } else {
        Alert.alert(
          "Erro",
          response.data.message || "Falha ao enviar denúncia"
        );
      }
    } catch (error) {
      console.error("Erro ao enviar denúncia:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao conectar com o servidor"
      );
    }
  };

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const response = await axios.get(
        `http://localhost:8000/api/posts/${post.id}/comments`
      );
      const comentarios = response.data.comments || response.data || [];
      setComments(comentarios);
      setCommentCount(comentarios.length);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
      Alert.alert("Erro", "Não foi possível carregar os comentários");
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    if (isLikeLoading) return;

    setIsLikeLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      setLoginModalVisible(true);
      setIsLikeLoading(false);
      return;
    }

    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      const response = await axios.post(
        `http://localhost:8000/api/posts/${post.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsLiked(response.data.liked);
        setLikeCount(response.data.likes);
      } else {
        setIsLiked(!newLikedState);
        setLikeCount((prev) => (newLikedState ? prev - 1 : prev + 1));
        Alert.alert(
          "Erro",
          response.data.message || "Falha ao realizar o like"
        );
      }
    } catch (error) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));

      if (error.response?.status === 401) {
        Alert.alert("Faça login para curtir");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", "Falha ao realizar o like");
      }
    } finally {
      setIsLikeLoading(false);
    }
  };

  const toggleComments = async () => {
    if (!showComments) {
      await loadComments();
    }
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      setLoginModalVisible(true);
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post.id}/comment`,
        { comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setCommentText("");
        setCommentCount((prev) => prev + 1);
        await loadComments();
        setShowComments(true);
      }
    } catch (error) {
      console.error("Erro ao comentar:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao enviar comentário"
      );
    }
  };

  const checkLikeStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setIsLiked(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/posts/${post.id}/check-like-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLiked(response.data.is_liked);
      setLikeCount(response.data.likes_count || post.likes || 0);
    } catch (error) {
      console.error("Erro ao verificar like:", error);
      if (error.response?.status !== 401) {
        Alert.alert("Erro", "Não foi possível verificar o status do like");
      }
    }
  };

  React.useEffect(() => {
    checkLikeStatus();
  }, [post.id]);

  return (
    <View style={styles.postItem}>
      {post.idOng && (
        <View style={styles.ongHeader}>
          {post.ong ? (
            <>
              {post.ong.fotoOng ? (
                <Image
                  source={{ uri: post.ong.fotoOng }}
                  style={styles.ongLogo}
                />
              ) : (
                <View style={styles.ongLogoPlaceholder}>
                  <Icon name="user" size={16} color="#666" />
                </View>
              )}
              <Text style={styles.ongName}>{post.ong.nomeOng}</Text>
            </>
          ) : (
            <Text style={styles.ongName}>ONG #{post.idOng}</Text>
          )}
        </View>
      )}

      <Text style={styles.postTitle}>{post.title}</Text>

      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="contain"
        />
      )}

      <Text style={styles.postDescription}>
        {displayedText}
        {!expanded && isLongDescription && "..."}
      </Text>

      {isLongDescription && (
        <Pressable
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandButtonText}>
            {expanded ? "Mostrar menos" : "Ver descrição completa"}
          </Text>
        </Pressable>
      )}

      <View style={styles.interactionContainer}>
        <View style={styles.lkCm}>
          <Pressable onPress={handleLike} style={styles.interactionButton}>
            <Icon
              name="thumbs-up"
              size={20}
              color={isLiked ? "#4267B2" : "#666"}
              solid={isLiked}
              style={isLikeLoading && { opacity: 0.5 }}
            />
            <Text style={styles.interactionText}>{likeCount}</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              const show = !showCommentInput;
              setShowCommentInput(show);
              setShowComments(show);
              if (show) {
                await loadComments();
              }
            }}
            style={styles.interactionButton}
          >
            <Icon name="comment" size={20} color="#666" />
            <Text style={styles.interactionText}>{commentCount}</Text>
          </Pressable>
        </View>

        <Text style={styles.postDate}>
          {new Date(post.created_at).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      {showComments && (
        <View style={[styles.commentsContainer, { maxHeight: 200 }]}>
          <ScrollView>
            {loadingComments ? (
              <ActivityIndicator size="small" color="#000" />
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.idComentario} style={styles.commentItem}>
                  <Image
                    source={
                      comment.imgUser
                        ? { uri: comment.imgUser }
                        : require("../../../assets/user.png")
                    }
                    style={styles.ongLogo}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.commentUser}>{comment.nomeUser}:</Text>
                    <Text style={styles.commentText}>
                      {comment.texto || comment.comment}
                    </Text>
                  </View>

                  <View style={styles.commentActionsContainer}>
                    {/* Ícone de denúncia para comentários de outros usuários */}
                    {currentUserId &&
                      Number(currentUserId) !== Number(comment.idUser) && (
                        <TouchableOpacity
                          onPress={() =>
                            handleReportComment(comment.idComentario)
                          }
                          style={styles.reportButton1}
                        >
                          <Icon name="flag" size={16} color="#999" />
                        </TouchableOpacity>
                      )}

                    {/* Três pontinhos apenas para comentários do usuário logado */}
                    {currentUserId &&
                      Number(currentUserId) === Number(comment.idUser) && (
                        <TouchableOpacity
                          onPress={() =>
                            showCommentOptions(comment.idComentario, true)
                          }
                          style={styles.commentOptionsButton}
                        >
                          <Icon name="ellipsis-v" size={16} color="#666" />
                        </TouchableOpacity>
                      )}
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noComments}>Nenhum comentário ainda</Text>
            )}
          </ScrollView>
        </View>
      )}

      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Adicione um comentário..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <Pressable
            style={styles.postButton}
            onPress={handleCommentSubmit}
            disabled={!commentText.trim()}
          >
            <Text
              style={[
                styles.postButtonText,
                !commentText.trim() && { opacity: 0.5 },
              ]}
            >
              Publicar
            </Text>
          </Pressable>
        </View>
      )}

      {/* Modal para denúncia */}
      <Modal
        visible={showReportModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reportModalContainer}>
            <Text style={styles.reportModalTitle}>Denunciar Comentário</Text>

            <Text style={styles.reportModalText}>
              Selecione o motivo da denúncia:
            </Text>

            <View style={styles.reportOptions}>
              {["Conteúdo ofensivo", "Spam", "Discurso de ódio", "Assédio"].map(
                (reason) => (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reportOption,
                      reportReason === reason && styles.selectedReportOption,
                    ]}
                    onPress={() => setReportReason(reason)}
                  >
                    <Text style={styles.reportOptionText}>{reason}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <View style={styles.reportButtons}>
              <TouchableOpacity
                style={[styles.reportButton, styles.cancelButton1]}
                onPress={() => setShowReportModal(false)}
              >
                <Text style={styles.reportButtonText1}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.reportButton, styles.submitButton]}
                onPress={submitReport}
                disabled={!reportReason}
              >
                <Text style={styles.reportButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de sucesso */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <Icon name="check-circle" size={48} color="green" />
            <Text style={styles.successModalText}>
              Denúncia enviada com sucesso!
            </Text>
            <Pressable
              style={styles.closeSuccessButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successModalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal para login */}
      <Modal
        visible={loginModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.loginModalContainer}>
            <Text style={styles.loginModalTitle}>
              Faça login para continuar
            </Text>
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                setLoginModalVisible(false);
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setLoginModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal para deletar comentario */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.commentModalOverlay}>
          <View style={styles.commentModalContainer}>
            <View style={styles.commentModalHeader}>
              <Text style={styles.commentModalTitle}>Excluir Comentário</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={20} color="#ADB5BD" />
              </TouchableOpacity>
            </View>

            <Text style={styles.commentModalText}>
              Esta ação não pode ser desfeita. Tem certeza que deseja excluir
              permanentemente este comentário?
            </Text>

            <View style={styles.commentModalButtons}>
              <TouchableOpacity
                style={[
                  styles.commentModalButton,
                  styles.commentModalCancelButton,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={[
                    styles.commentModalButtonText,
                    styles.commentModalCancelText,
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.commentModalButton,
                  styles.commentModalDeleteButton,
                ]}
                onPress={async () => {
                  if (!selectedCommentId) {
                    Alert.alert("Erro", "Comentário não selecionado");
                    return;
                  }

                  try {
                    const token = await AsyncStorage.getItem("userToken");

                    const response = await fetch(
                      `http://localhost:8000/api/comments/${selectedCommentId}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`, // ESSENCIAL
                        },
                      }
                    );

                    const text = await response.text();
                    let data;
                    try {
                      data = JSON.parse(text);
                    } catch {
                      console.error("Resposta inesperada:", text);
                      throw new Error("Erro inesperado do servidor");
                    }

                    if (response.ok) {
                      Alert.alert("Sucesso", data.message);
                      setModalVisible(false);
                      loadComments(); // recarrega os comentários se você tiver isso
                    } else {
                      Alert.alert("Erro", data.message || "Erro ao excluir");
                    }
                  } catch (error) {
                    console.error("Erro ao excluir:", error);
                    Alert.alert("Erro", "Falha ao se comunicar com o servidor");
                  }
                }}
              >
                <Text
                  style={[
                    styles.commentModalButtonText,
                    styles.commentModalDeleteText,
                  ]}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const commentStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  commentsScrollContainer: {
    flex: 1, // Ocupa todo o espaço entre cabeçalho e input
    marginVertical: 10, // Espaçamento
  },
  commentModalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    height: height * 0.7, // Altura fixa para o modal
    maxHeight: "80%", // Evita que o modal fique muito grande
  },
  commentModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
    marginBottom: 10,
  },
  commentModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeCommentModalButton: {
    padding: 5, // Área de toque maior
  },
  commentsList: {
    flex: 1, // Faz a lista ocupar o espaço disponível
  },
  commentItem: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  commentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#eee", // Cor de fundo enquanto carrega
  },
  commentTextContainer: {
    flex: 1,
  },
  commentUserName: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 2,
  },
  commentText: {
    color: "#555",
    fontSize: 14,
  },
  commentDate: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
  noCommentsText: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    marginTop: 5,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 80, // Limita altura do input multiline
    fontSize: 15,
  },
  sendCommentButton: {
    backgroundColor: "#E7701D",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendCommentButtonDisabled: {
    backgroundColor: "#FAD5BE", // Cor mais clara quando desabilitado
  },
});

export default function Posts() {
  return (
    <VideoProvider>
      <PostsInner />
    </VideoProvider>
  );
}
