import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./style";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Parte1() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [especiesData, setEspeciesData] = useState([]);
  const [racasData, setRacasData] = useState([]);
  const [portesData, setPortesData] = useState([]);
  const [pelagensData, setPelagensData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [bio, setBio] = useState("");
  const [porte, setPorte] = useState("");
  const [pelagem, setPelagem] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemType, setImagemType] = useState(null);
  const [imagemName, setImagemName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [racasPaginadas, setRacasPaginadas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const racasPorPagina = 20;


  const [searchTerm, setSearchTerm] = useState('');
const [selectedRaceId, setSelectedRaceId] = useState(null);

// Filtre as raças baseado na busca
const filteredRaces = racasData.filter(raca => 
  raca.nomeRaca.toLowerCase().includes(searchTerm.toLowerCase())
);

// Use as raças filtradas para paginação
const paginatedFilteredRaces = filteredRaces.slice(
  (paginaAtual - 1) * racasPorPagina,
  paginaAtual * racasPorPagina
);

const totalPages = Math.ceil(filteredRaces.length / racasPorPagina);



const handleConfirmSelection = () => {
  if (selectedRaceId) {
    setRaca(selectedRaceId);
    setModalVisible(false);
    setSelectedRaceId(null);
    setSearchTerm('');
    setPaginaAtual(1);
  }
};

// Função para cancelar
const handleCancelSelection = () => {
  setModalVisible(false);
  setSelectedRaceId(null);
  setSearchTerm('');
  setPaginaAtual(1);
};


  const parte2 = () => {
    navigation.navigate("Parte2");
  };

  const voltar = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [especies, portes, pelagens, status] = await Promise.all([
          axios.get("http://localhost:8000/api/especies"),
          axios.get("http://localhost:8000/api/portes"),
          axios.get("http://localhost:8000/api/pelagens"),
          axios.get("http://localhost:8000/api/status-animais"),
        ]);

        setEspeciesData(especies.data);
        setPortesData(portes.data);
        setPelagensData(pelagens.data);
        setStatusData(status.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados necessários");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChangeEspecie = async (itemValue) => {
    setEspecie(itemValue);
    setRaca("");
    setPaginaAtual(1);

    if (itemValue) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/racas-por-especie?idEspecie=${itemValue}`
        );
        setRacasData(res.data);
        setRacasPaginadas(res.data.slice(0, racasPorPagina));
      } catch (err) {
        console.error("Erro ao buscar raças:", err);
      }
    } else {
      setRacasData([]);
      setRacasPaginadas([]);
    }
  };
  useEffect(() => {
    const start = (paginaAtual - 1) * racasPorPagina;
    const end = start + racasPorPagina;
    setRacasPaginadas(racasData.slice(start, end));
  }, [paginaAtual, racasData]);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permissão necessária",
          "É necessário permitir acesso à galeria de fotos"
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImagem(asset.uri);
        setImagemType(asset.type === "image" ? "image/jpeg" : asset.type);
        setImagemName(asset.fileName || asset.uri.split("/").pop());
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const handleSubmit = async () => {
    if (
      !nome ||
      !idade ||
      !bio ||
      !especie ||
      !raca ||
      !porte ||
      !pelagem ||
      !imagem
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos e selecione uma imagem!"
      );
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();

      formData.append("nomeAnimal", nome);
      formData.append("idadeAnimal", idade);
      formData.append("bioAnimal", bio);
      formData.append("idEspecie", especie);
      formData.append("idRaca", raca);
      formData.append("idPorte", porte);
      formData.append("idPelagemAnimal", pelagem);

      const blob = await (await fetch(imagem)).blob();
      formData.append("imgPrincipal", blob, "foto.jpg");

      const response = await fetch("http://localhost:8000/api/animais", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem("idAnimal", data.data.idAnimal.toString());
        Alert.alert("Sucesso", "Animal cadastrado com sucesso!", [
          { text: "OK", onPress: parte2 },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o animal");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }

    navigation.navigate("Parte2");
  };

  const isFormValid =
    nome && idade && bio && especie && raca && porte && pelagem && imagem;

  return (
    <>
      <StatusBar backgroundColor="#1e293b" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header Profissional */}
        <View style={styles.header}>
          <Pressable
            onPress={voltar}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressedBack,
            ]}
          >
            <Icon name="arrow-left" size={20} color="#ffffff" />
          </Pressable>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Cadastrar Pet</Text>
            <Text style={styles.headerSubtitle}>Etapa 1 de 3</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "33%" }]} />
          </View>
          <Text style={styles.progressText}>33% concluído</Text>
        </View>

        {/* Corpo do Formulário */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <View style={styles.welcomeSection}>
              <Icon name="heart" size={24} color="#dc2626" />
              <Text style={styles.title}>Vamos encontrar seu pet!</Text>
              <Text style={styles.subtitle}>
                Preencha as informações abaixo para nos ajudar a identificar seu
                animal
              </Text>
            </View>

            {/* Upload de Foto */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Icon name="camera" size={16} color="#374151" /> Foto do Pet
              </Text>
              <Text style={styles.sectionDescription}>
                Adicione uma foto clara e recente do seu pet
              </Text>

              <Pressable
                onPress={pickImage}
                style={({ pressed }) => [
                  styles.imageUploadContainer,
                  pressed && styles.pressedUpload,
                  imagem && styles.imageUploaded,
                ]}
              >
                {imagem ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: imagem }}
                      style={styles.previewImage}
                    />
                    <View style={styles.imageOverlay}>
                      <Icon name="edit" size={16} color="#ffffff" />
                      <Text style={styles.changePhotoText}>Alterar foto</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <View style={styles.uploadIcon}>
                      <Icon name="camera" size={32} color="#9ca3af" />
                    </View>
                    <Text style={styles.uploadTitle}>Adicionar foto</Text>
                    <Text style={styles.uploadSubtitle}>
                      Toque para selecionar da galeria
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>

            {/* Informações Básicas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Icon name="info-circle" size={16} color="#374151" />{" "}
                Informações Básicas
              </Text>

              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Nome do Pet *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Rex, Mimi, Bolinha..."
                    placeholderTextColor="#9ca3af"
                    value={nome}
                    onChangeText={setNome}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Idade Aproximada *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 2 anos, 6 meses..."
                    placeholderTextColor="#9ca3af"
                    value={idade}
                    onChangeText={setIdade}
                  />
                </View>
              </View>
            </View>

            {/* Características Físicas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Icon name="paw" size={16} color="#374151" /> Características
                Físicas
              </Text>

              <View style={styles.selectGroup}>
                <View style={styles.selectRow}>
                  <View style={styles.selectContainer}>
                    <Text style={styles.inputLabel}>Espécie *</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={especie}
                        onValueChange={handleChangeEspecie}
                        style={styles.picker}
                        mode="dropdown"
                      >
                        <Picker.Item label="Selecione a espécie" value="" />
                        {especiesData.map((item) => (
                          <Picker.Item
                            key={item.idEspecie}
                            label={item.nomeEspecie}
                            value={item.idEspecie}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.selectContainer}>
                    <Text style={styles.inputLabel}>Raça *</Text>
                    <Pressable
                      onPress={() => setModalVisible(true)}
                      style={styles.customPicker}
                    >
                      <Text style={styles.customPickerText}>
                        {racasData.find((r) => r.idRaca === raca)?.nomeRaca ||
                          "Selecionar raça"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.selectRow}>
                  <View style={styles.selectContainer}>
                    <Text style={styles.inputLabel}>Porte *</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={porte}
                        onValueChange={(itemValue) => setPorte(itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                      >
                        <Picker.Item label="Selecione o porte" value="" />
                        {portesData.map((item) => (
                          <Picker.Item
                            key={item.idPorte}
                            label={item.nomePorte}
                            value={item.idPorte}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.selectContainer}>
                    <Text style={styles.inputLabel}>Pelagem *</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={pelagem}
                        onValueChange={(itemValue) => setPelagem(itemValue)}
                        style={styles.picker}
                        mode="dropdown"
                      >
                        <Picker.Item label="Selecione a pelagem" value="" />
                        {pelagensData.map((item) => (
                          <Picker.Item
                            key={item.idPelagemAnimal}
                            label={item.pelagemAnimal}
                            value={item.idPelagemAnimal}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Descrição */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                <Icon name="edit" size={16} color="#374151" /> Descrição
              </Text>
              <Text style={styles.sectionDescription}>
                Descreva características marcantes, comportamento ou outras
                informações importantes
              </Text>

              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ex: Muito carinhoso, tem uma mancha branca na testa, costuma latir muito..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  maxLength={300}
                  value={bio}
                  onChangeText={setBio}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>
                  {bio.length}/300 caracteres
                </Text>
              </View>
            </View>
            <Modal 
  visible={modalVisible} 
  animationType="fade" 
  transparent={true}
  statusBarTranslucent={true}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {/* Header */}
      <View style={styles.modalHeader}>
        <View>
          <Text style={styles.modalTitle}>Selecionar Raça</Text>
          <Text style={styles.modalSubtitle}>
            {filteredRaces.length} raças disponíveis
          </Text>
        </View>
        <Pressable 
          onPress={handleCancelSelection}
          style={styles.closeButton}
        >
          <Icon name="times" size={16} color="#64748b" />
        </Pressable>
      </View>

      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar raça..."
          placeholderTextColor="#9ca3af"
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            setPaginaAtual(1); // Reset para primeira página ao buscar
          }}
        />
      </View>

      {/* Lista de Raças */}
      <View style={styles.modalContent}>
        {paginatedFilteredRaces.length > 0 ? (
          <FlatList
            data={paginatedFilteredRaces}
            keyExtractor={(item) => item.idRaca.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedRaceId(item.idRaca)}
                style={({ pressed }) => [
                  styles.raceItem,
                  pressed && styles.raceItemPressed,
                  selectedRaceId === item.idRaca && styles.raceItemSelected,
                ]}
              >
                <Text style={[
                  styles.raceItemText,
                  selectedRaceId === item.idRaca && styles.raceItemTextSelected,
                ]}>
                  {item.nomeRaca}
                </Text>
                {selectedRaceId === item.idRaca && (
                  <View style={styles.selectedIcon}>
                    <Icon name="check" size={16} color="#1e40af" />
                  </View>
                )}
              </Pressable>
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Icon name="search" size={24} color="#9ca3af" />
            </View>
            <Text style={styles.emptyStateTitle}>
              {searchTerm ? 'Nenhuma raça encontrada' : 'Selecione uma espécie primeiro'}
            </Text>
            <Text style={styles.emptyStateText}>
              {searchTerm 
                ? `Não encontramos raças com "${searchTerm}"`
                : 'Escolha uma espécie para ver as raças disponíveis'
              }
            </Text>
          </View>
        )}
      </View>

      {/* Paginação - só mostra se houver raças */}
      {paginatedFilteredRaces.length > 0 && totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <Pressable
            onPress={() => setPaginaAtual(prev => Math.max(1, prev - 1))}
            disabled={paginaAtual === 1}
            style={[
              styles.paginationButton,
              paginaAtual === 1 && styles.paginationButtonDisabled
            ]}
          >
            <Icon name="chevron-left" size={12} color="#ffffff" />
            <Text style={styles.paginationButtonText}>Anterior</Text>
          </Pressable>

          <View style={styles.paginationInfo}>
            <Text style={styles.paginationPage}>
              Página {paginaAtual} de {totalPages}
            </Text>
            <Text style={styles.paginationTotal}>
              {filteredRaces.length} raças
            </Text>
          </View>

          <Pressable
            onPress={() => setPaginaAtual(prev => Math.min(totalPages, prev + 1))}
            disabled={paginaAtual >= totalPages}
            style={[
              styles.paginationButton,
              paginaAtual >= totalPages && styles.paginationButtonDisabled
            ]}
          >
            <Text style={styles.paginationButtonText}>Próxima</Text>
            <Icon name="chevron-right" size={12} color="#ffffff" />
          </Pressable>
        </View>
      )}

      {/* Footer com botões */}
      <View style={styles.modalFooter}>
        <Pressable
          onPress={handleCancelSelection}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>

        <Pressable
          onPress={handleConfirmSelection}
          disabled={!selectedRaceId}
          style={[
            styles.confirmButton,
            !selectedRaceId && styles.confirmButtonDisabled
          ]}
        >
          <Text style={styles.confirmButtonText}>
            {selectedRaceId ? 'Confirmar Seleção' : 'Selecione uma Raça'}
          </Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

            {/* Botão de Continuar */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.continueButton,
                  pressed && styles.pressedButton,
                  !isFormValid && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Continuar</Text>
                    <Icon name="arrow-right" size={16} color="#ffffff" />
                  </>
                )}
              </Pressable>

              <Text style={styles.helpText}>
                <Icon name="info-circle" size={12} color="#6b7280" /> Todos os
                campos marcados com * são obrigatórios
              </Text>
            </View>
          </View>
        </ScrollView>

        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
