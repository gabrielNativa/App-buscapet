import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable, StyleSheet, ScrollView, Modal, TouchableOpacity, TextInput, Switch, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from "../components/Footer";
import * as ImagePicker from 'expo-image-picker';
// Definindo o componente OptionItem antes de ser usado
const OptionItem = ({ icon, label, onPress }) => (
  <Pressable onPress={onPress} style={styles.optionItem}>
    <View style={styles.optionIcon}>{icon}</View>
    <Text style={styles.optionLabel}>{label}</Text>
    <Text style={styles.optionArrow}>›</Text>
  </Pressable>
);

// Definindo o componente ActivityCard 
const ActivityCard = ({ icon, label }) => (
  <View style={styles.card}>
    <Icon name={icon} size={30} color="#2d60f3" />
    <Text style={styles.cardText}>{label}</Text>
  </View>
);



export default function User() {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('perfil');
  const [imageError, setImageError] = useState(false); // Novo estado para controlar erro de imagem
  const MAX_SIZE_MB = 5; // Limite de 5MB
  const [fotoPerfil, setFotoPerfil] = useState(null);
  // Adicione isso com os outros estados
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);

  const [userData, setUserData] = useState({

    name: '',
    email: '',
    phone: '',
    imgUser: null,
  });

  const [stats, setStats] = useState({
    comments: 0,
    likedCampaigns: 0,
    adoptedPets: 0,
    lostPets: 0
  });
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    imgUser: null,

  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

const deleteAccount = async () => {
  try {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    const response = await axios.delete(`http://localhost:8000/api/usuario/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.success) {
      // Limpa todos os dados armazenados, caso você use outros além de token e ID
      await AsyncStorage.clear();

      Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso");

      // Redefine o stack de navegação, enviando para tela de login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  } catch (error) {
    Alert.alert("Erro", error.response?.data?.message || "Não foi possível excluir a conta");
  } finally {
    setIsLoading(false);
    setConfirmDeleteModalVisible(false);
  }
};

  const handlePasswordChange = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
        return;
      }

      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      const response = await axios.put(`http://localhost:8000/api/usuario/${userId}/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        Alert.alert("Sucesso", "Senha alterada com sucesso");
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.message || "Não foi possível alterar a senha");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');

    // Formato (XX) XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  };

  const fetchUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      const response = await axios.get(`http://localhost:8000/api/dash`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;
      console.log(response.data.totalLikes);

      setStats(prev => ({
        ...prev,
        totalLikes: data.totalLikes ?? 0,
        totalComents: data.totalComents ?? 0,
        lostPets: data.lostPets ?? 0,
        reelsPost: data.reelsPost ?? 0,
      }));

    } catch (error) {
      console.log(error.response?.data);
      console.error("Erro ao buscar estatísticas do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserStats(); // << ADICIONE ESTA LINHA
  }, []);

  const voltar = () => {
    navigation.goBack();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão negada", "É necessário permitir acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      if (result.assets?.[0]?.uri) {
        setProfileImage(result.assets[0].uri);
      }
    }
  };

  const toggleNotification = (value) => {
    setHasNotification(value);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        navigation.navigate('Login');
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Dados completos do usuário:", response.data);

      const user = response.data.user;

      // Definir a URL da imagem corretamente
      let imageUrl = null;
      if (user.imgUser) {
        imageUrl = user.imgUser;
      }

      setUserData({
        name: user.nome || '',
        email: user.email || '',
        phone: user.tel || '',
        imgUser: imageUrl
      });

      setEditData({
        name: user.nome || '',
        email: user.email || '',
        phone: formatPhone(user.tel) || ''
      });

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        Alert.alert("Erro", "Usuário não autenticado");
        setIsLoading(false);
        return;
      }

      // Remove tudo que não for número do telefone
      const cleanedPhone = editData.phone.replace(/\D/g, '');

      // Cria um formData para envio multipart
      const formData = new FormData();

      formData.append('nomeUser', editData.name);
      formData.append('emailUser', editData.email);
      formData.append('telUser', cleanedPhone);

      if (profileImage) {
        try {
          // Para React Native Web, precisamos converter a imagem em Blob
          const response = await fetch(profileImage);
          const blob = await response.blob();

          // Determinar a extensão baseada no tipo MIME
          let extension = 'jpg';
          if (blob.type.includes('png')) extension = 'png';
          else if (blob.type.includes('jpeg') || blob.type.includes('jpg')) extension = 'jpg';
          else if (blob.type.includes('gif')) extension = 'gif';

          const fileName = `profile_${userId}_${Date.now()}.${extension}`;

          // Anexar o arquivo ao FormData
          formData.append('imgUser', blob, fileName);

          console.log('Imagem preparada:', {
            size: blob.size,
            type: blob.type,
            fileName: fileName
          });
        } catch (imageError) {
          console.error('Erro ao processar imagem:', imageError);
          Alert.alert("Erro", "Não foi possível processar a imagem selecionada");
          setIsLoading(false);
          return;
        }
      }

      console.log('Enviando dados:', {
        nomeUser: editData.name,
        emailUser: editData.email,
        telUser: cleanedPhone,
        hasImage: !!profileImage
      });

      // Debug: Verificar conteúdo do formData
      for (let [key, value] of formData.entries()) {
        console.log(`FormData ${key}:`, value);
      }

      // Envia para o backend
      const response = await axios.post(
        `http://localhost:8000/api/usuario/${userId}?_method=PUT`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          // Adicionar timeout
          timeout: 30000,
        }
      );

      console.log('Resposta do servidor:', response.data);

      if (response.data.success) {
        // Atualiza os dados locais
        setUserData({
          name: editData.name,
          email: editData.email,
          phone: formatPhone(cleanedPhone),
          imgUser: response.data.data.img_url || profileImage || userData.imgUser,
        });

        // Limpa a imagem temporária
        setProfileImage(null);

        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        setProfileModalVisible(false);

        // Recarrega os dados do usuário
        await fetchUserData();
      } else {
        Alert.alert("Erro", response.data.message || "Não foi possível atualizar os dados.");
      }
    } catch (error) {
      console.error("Erro completo:", error);
      console.error("Erro ao atualizar:", error.response?.data || error.message);

      if (error.response?.data?.errors) {
        // Erro de validação - mostrar detalhes
        console.log("Erros de validação:", error.response.data.errors);
        const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
        Alert.alert("Erro de Validação", errorMessages);
      } else if (error.response?.status === 422) {
        Alert.alert("Erro de Validação", "Dados inválidos. Verifique os campos preenchidos.");
      } else {
        Alert.alert("Erro", error.response?.data?.message || "Não foi possível salvar as alterações");
      }
    } finally {
      setIsLoading(false);
    }
  };




  if (isLoading) {
    return (
      <View style={styles.containerLo}>


        {/* Área de conteúdo principal que vai ocupar o espaço entre Header e Footer */}
        <View style={styles.mainContent}>
          <View style={styles.loadingContentArea}>
            <View style={styles.loadingAnimationContainer}>
              <Image
                source={require("./../../../assets/pataLoad.gif")}
                style={styles.loadingAnimation}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.loadingText}>Carregando perfil...</Text>
          </View>
        </View>

        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Pressable onPress={voltar}>
            <Text style={styles.navIcon}>←</Text>
          </Pressable>
          <Text style={styles.navTitle}>Perfil</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Profile */}
        <View style={styles.profileHeader}>
          {/* aq so fica a foto q foi alterada ela nao e pra ser um botao de alterar */}
          <Image
            style={styles.profileImage}
            source={
              userData.imgUser
                ? { uri: userData.imgUser }
                : require("./../../../assets/user.png")
            }
          />

          <Text style={styles.name}>{userData.name || 'Nome não disponível'}</Text>
          <Text style={styles.role}>{userData.email || 'E-mail não cadastrado'}</Text>
        </View>

        {/* Conta */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações da Conta</Text>

          <OptionItem
            icon={<Ionicons name="settings-outline" size={20} color="#333" />}
            label="Configurações"
            onPress={() => setProfileModalVisible(true)}
          />

        </View>

        {/* Atividade */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Atividade do Usuário</Text>
          <View style={styles.cardGrid}>
            <ActivityCard icon="comment" label={`Comentários Feitos (${stats.totalComents ?? 0})`} />
            <ActivityCard icon="heart" label={`Campanhas curtidas (${stats.totalLikes ?? 0})`} />
            <ActivityCard icon="video" label={`Animais adotados (${stats.reelsPost ?? 0})`} />
            <ActivityCard icon="search" label={`Animais perdidos (${stats.lostPets ?? 0})`} />
          </View>
        </View>


        {/* Profile Modal */}
        <Modal animationType="slide" transparent={false} visible={profileModalVisible}>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 60, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee", paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)} style={{ marginRight: 15 }}>
                <Ionicons name="arrow-back" size={28} color="#222" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600", color: "#336b89" }}>Configurações da Conta</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ marginTop: 25, marginHorizontal: 18 }}>
                <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10, color: "#336b89" }}>Informações Pessoais</Text>
                <View style={{
                  backgroundColor: "#fafafa",
                  borderRadius: 14,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: "#cadae4",
                  marginBottom: 22
                }}>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>

                    {/* aq e onde faz a alteracao da foto */}
                    <TouchableOpacity onPress={handleProfileImage} style={{ marginRight: 12 }}>
                      {profileImage ? (
                        <Image source={{ uri: profileImage }} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#e0e0e0" }} />
                      ) : (
                        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#e0e0e0", alignItems: "center", justifyContent: "center" }}>
                          <Ionicons name="person" size={32} color="#bdbdbd" />
                        </View>
                      )}
                      <View style={{
                        position: "absolute", bottom: 0, right: 0, backgroundColor: "#007AFF",
                        borderRadius: 9, padding: 2
                      }}>
                        <Ionicons name="camera" size={14} color="#fff" />
                      </View>
                    </TouchableOpacity>
                    {/*e ela acaba aq*/}

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>Nome</Text>
                      <TextInput
                        style={styles.input}
                        value={editData.name}
                        onChangeText={text => handleEditChange("name", text)}
                        placeholder={userData.name || "Digite seu nome"}
                      />
                    </View>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>E-mail</Text>
                    <TextInput
                      style={styles.input}
                      value={editData.email}
                      onChangeText={text => handleEditChange("email", text)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="E-mail"
                    />
                  </View>
                  <View>
                    <Text style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>Telefone</Text>
                    <TextInput
                      style={styles.input}
                      value={editData.phone}
                      onChangeText={text => handleEditChange("phone", text)}
                      keyboardType="phone-pad"
                      placeholder="Telefone"
                    />
                  </View>
                </View>
              </View>

              {/* Preferências */}
              <View style={{ marginHorizontal: 18 }}>
                <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10, color: "#336b89" }}>Preferências</Text>
                <View style={styles.preferenceItem}>
                  <Text style={{ fontSize: 16 }}>Notificações</Text>
                  <Switch
                    value={hasNotification}
                    onValueChange={toggleNotification}
                    trackColor={{ false: "#ccc", true: "#007AFF" }}
                    thumbColor={hasNotification ? "#fff" : "#fff"}
                  />
                </View>
              </View>

              {/* Botão de Salvar */}
              <TouchableOpacity
                style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
                onPress={saveUserData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                )}
              </TouchableOpacity>

              {/* Segurança */}
              <View style={{ marginHorizontal: 18, marginBottom: 30 }}>
                <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10, color: "#336b89" }}>Segurança</Text>
                <View style={styles.securityContainer}>
                  <View style={{ marginTop: 20, marginHorizontal: 18 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10, color: "#336b89" }}>Alterar Senha</Text>
                    <View style={styles.passwordSection}>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Senha atual"
                        value={passwordData.currentPassword}
                        onChangeText={(text) => setPasswordData({ ...passwordData, currentPassword: text })}
                      />
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Nova senha"
                        value={passwordData.newPassword}
                        onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
                      />
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Confirmar nova senha"
                        value={passwordData.confirmPassword}
                        onChangeText={(text) => setPasswordData({ ...passwordData, confirmPassword: text })}
                      />

                      <TouchableOpacity
                        style={styles.passwordButton}
                        onPress={handlePasswordChange}
                        disabled={isLoading}
                      >
                        <Text style={styles.passwordButtonText}>Alterar Senha</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                 
                  <TouchableOpacity
                    style={styles.securityItem}
                    onPress={() => setConfirmDeleteModalVisible(true)}
                  >
                    <Text style={[styles.securityText, { color: 'red' }]}>Excluir conta</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* Modal de confirmação para excluir conta */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmDeleteModalVisible}
          onRequestClose={() => setConfirmDeleteModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Confirmar exclusão</Text>
              <Text style={styles.modalText}>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setConfirmDeleteModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={deleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.deleteButtonText}>Excluir conta</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


      </ScrollView>
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

