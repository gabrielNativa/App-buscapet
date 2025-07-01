import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  StyleSheet,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "./style";


export default function Parte3() {
    const navigation = useNavigation();
    const [photos, setPhotos] = useState([null, null, null, null]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissão para acessar suas fotos!');
            }
        })();
    }, []);
    
    useEffect(() => {
        const loadData = async () => {
            try {   
                const idUserString = await AsyncStorage.getItem('userId');
                const idUser = idUserString ? parseInt(idUserString, 10) : null;
                const idAnimalString = await AsyncStorage.getItem('idAnimal');
                const idAnimal = idAnimalString ? parseInt(idAnimalString, 10) : null;
                const token = await AsyncStorage.getItem('userToken');

                if (idUser && idAnimal && token) {
                    setUserData({ idUser });
                    setAnimal({ idAnimal });
                    setToken(token);
                } else {
                    Alert.alert('Erro', 'Não foi possível carregar os dados do usuário ou do pet.');
                }
            } catch (error) {
                console.error('Erro ao carregar dados do AsyncStorage:', error);
            }
        };

        loadData();
    }, []);

    const voltar = () => {
        navigation.navigate('Parte2');
    };

    const uriToBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const handleAddPhoto = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const newPhotos = [...photos];
            newPhotos[index] = {
                uri: asset.uri,
                name: `photo_${index}.jpg`,
                type: 'image/jpeg',
            };
            setPhotos(newPhotos);
        }
    };

    const handleSubmit = async () => {
        if (!userData || !animal || !token) {
            Alert.alert('Erro', 'Dados do usuário ou token não disponíveis.');
            return;
        }

        const { idUser } = userData;
        const { idAnimal } = animal;

        const formData = new FormData();

        formData.append('idUser', idUser.toString());
        formData.append('idAnimal', idAnimal.toString());

        // Logs para depuração:
        console.log("Dados que serão enviados:");
        console.log("idUser:", idUser);
        console.log("idAnimal:", idAnimal);

        // Adiciona imagens se existirem
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            if (photo) {
                let file;

                if (Platform.OS === 'web') {
                    const blob = await uriToBlob(photo.uri);
                    file = {
                        uri: photo.uri,
                        name: photo.name || `image${i + 1}.jpg`,
                        type: photo.type || 'image/jpeg',
                    };
                    formData.append(`img${i + 1}Animal`, blob, file.name);
                } else {
                    file = {
                        uri: photo.uri,
                        name: photo.name || `image${i + 1}.jpg`,
                        type: photo.type || 'image/jpeg',
                    };
                    formData.append(`img${i + 1}Animal`, file);
                }
            }
        }

        // Verificando todas as entradas do FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        try {
            setIsSubmitting(true);

            const response = await fetch('http://localhost:8000/api/posts-animais-perdidos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    // Não defina 'Content-Type' com FormData
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Post criado com sucesso:', data);
                Alert.alert('Sucesso', 'Pet cadastrado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.navigate("Home") }
                ]);
            } else {
                console.error('Erro ao criar post:', data);
                console.log('Detalhes dos erros:', data.errors);
                Alert.alert('Erro', 'Não foi possível concluir o cadastro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro de rede ao enviar post:', error);
            Alert.alert('Erro', 'Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }

         navigation.navigate("Home");
    };

    const hasPhotos = photos.some(photo => photo !== null);
    
    return (
        <>
            <StatusBar backgroundColor="#1e293b" barStyle="light-content" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                        <Text style={styles.headerSubtitle}>Etapa 3 de 3</Text>
                    </View>

                    <View style={styles.headerSpacer} />
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '100%' }]} />
                    </View>
                    <Text style={styles.progressText}>100% concluído</Text>
                </View>

                {/* Corpo do Formulário */}
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        {/* Seção de Boas-vindas */}
                        <View style={styles.welcomeSection}>
                            <Icon name="camera" size={24} color="#dc2626" />
                            <Text style={styles.title}>Conte mais sobre seu pet!</Text>
                            <Text style={styles.subtitle}>
                                Adicione fotos recentes do seu pet para ajudar outras pessoas a identificá-lo facilmente
                            </Text>
                        </View>

                        {/* Seção de Fotos */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <Icon name="images" size={16} color="#374151" /> Adicione fotos do seu pet
                            </Text>
                            <Text style={styles.sectionDescription}>
                                Toque em cada quadrado para adicionar uma foto. Recomendamos pelo menos 2 fotos para melhor identificação
                            </Text>

                            <View style={styles.photosGrid}>
                                {[0, 1, 2, 3].map((index) => (
                                    <Pressable 
                                        key={index}
                                        style={({ pressed }) => [
                                            styles.photoButton,
                                            photos[index] && styles.photoButtonFilled,
                                            pressed && styles.photoButtonPressed,
                                        ]}
                                        onPress={() => handleAddPhoto(index)}
                                    >
                                        {photos[index] ? (
                                            <View style={styles.photoContainer}>
                                                <Image 
                                                    style={styles.photoImage}
                                                    source={{ uri: photos[index].uri }}
                                                    resizeMode="cover"
                                                />
                                                <View style={styles.photoOverlay}>
                                                    <Icon name="edit" size={12} color="#ffffff" />
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.addPhotoContent}>
                                                <Icon name="camera" size={20} color="#6b7280" />
                                                <Text style={styles.addPhotoText}>
                                                    Foto {index + 1}
                                                </Text>
                                            </View>
                                        )}
                                    </Pressable>
                                ))}
                            </View>

                            {hasPhotos && (
                                <View style={styles.photoCount}>
                                    <Icon name="check-circle" size={14} color="#10b981" />
                                    <Text style={styles.photoCountText}>
                                        {photos.filter(p => p !== null).length} foto(s) adicionada(s)
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Botões de Ação */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.continueButton,
                                    pressed && styles.pressedButton,
                                    isSubmitting && styles.buttonDisabled,
                                ]}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#ffffff" size="small" />
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>Concluir Cadastro</Text>
                                        <Icon name="check" size={16} color="#ffffff" />
                                    </>
                                )}
                            </Pressable>

                            <Text style={styles.helpText}>
                                <Icon name="info-circle" size={12} color="#6b7280" /> 
                                {' '}As fotos ajudam muito na identificação do seu pet
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Loading Overlay */}
                {isSubmitting && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#2563eb" />
                            <Text style={styles.loadingText}>Finalizando cadastro...</Text>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </>
    );
}

