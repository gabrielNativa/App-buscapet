import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, StyleSheet, Modal, Text, TextInput, StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ onMenuPress }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [denunciaModalVisible, setDenunciaModalVisible] = useState(false);
    const [adocaoModalVisible, setAdocaoModalVisible] = useState(false);
    const [denunciaText, setDenunciaText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    
    const navigation = useNavigation();
        
    // Verifica o status de login ao carregar o componente
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const name = await AsyncStorage.getItem('userName');
            setIsLoggedIn(!!token);
            if (name) setUserName(name);
        };
        
        checkLoginStatus();
        
        const unsubscribe = navigation.addListener('focus', () => {
            checkLoginStatus();
        });
        
        return unsubscribe;
    }, [navigation]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateToRegister = () => {
        navigation.navigate('Parte1');
        setMenuVisible(false);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.multiRemove([
                'userToken',
                'userName',
                'userId'
            ]);

            setIsLoggedIn(false);
            setUserName('');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout');
        } finally {
            setMenuVisible(false);
        }
    };

    const navigateToLogin = () => {
        setMenuVisible(false);
        navigation.navigate('Login');
    };

    const navigateToRegisterUser = () => {
        setMenuVisible(false);
        navigation.navigate('Cadastro');
    };

    const denunciaOptions = [
        {
            id: 1,
            title: "Disque Denúncia Animal",
            description: "Ligue para 0800 600 6428",
            icon: "phone",
            type: "phone"
        },
        {
            id: 2,
            title: "Delegacia do Meio Ambiente",
            description: "Contato local da sua cidade",
            icon: "building",
            type: "contact"
        },
        {
            id: 3,
            title: "Formulário Online",
            description: "Preencha os detalhes da denúncia",
            icon: "clipboard-list",
            type: "form"
        }
    ];

    const adocaoSteps = [
        {
            id: 1,
            title: "Encontre seu Pet",
            description: "Navegue pela nossa seção de adoção e encontre o animal ideal para você",
            icon: "search"
        },
        {
            id: 2,
            title: "Entre em Contato",
            description: "Converse com o responsável pelo animal através do nosso chat",
            icon: "comments"
        },
        {
            id: 3,
            title: "Conheça o Animal",
            description: "Agende uma visita para conhecer o animal pessoalmente",
            icon: "heart"
        },
        {
            id: 4,
            title: "Finalize a Adoção",
            description: "Assine o termo de adoção e leve seu novo amigo para casa",
            icon: "file-signature"
        }
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmitDenuncia = () => {
        console.log("Denúncia enviada:", denunciaText);
        setDenunciaModalVisible(false);
        setDenunciaText('');
        setSelectedOption(null);
        setMenuVisible(false);
        alert("Denúncia registrada com sucesso!");
    };

    return (
        <>
            <StatusBar backgroundColor="#1a365d" barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                            <Text style={styles.busca}>BUSCA<Text style={styles.pets}>PET</Text></Text>
                    </View>
                    
                    <View style={styles.rightSection}>
                        {isLoggedIn && (
                            <View style={styles.userInfo}>
                                <Text style={styles.userGreeting}>Olá,</Text>
                                <Text style={styles.userName}>{userName || 'Usuário'}</Text>
                            </View>
                        )}
                        
                        <Pressable 
                            style={styles.menuButton}
                            onPress={toggleMenu}
                            android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: true }}
                        >
                            <Icon name="bars" size={20} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>

                {/* Modal do Menu */}
                <Modal visible={menuVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Menu Principal</Text>
                                <Pressable 
                                    style={styles.closeModalButton}
                                    onPress={toggleMenu}
                                >
                                    <Icon name="times" size={18} color="#64748b" />
                                </Pressable>
                            </View>
                            
                            <View style={styles.modalContent}>
                              
                                {/* Seção de Adoção */}
                                <View style={styles.menuSection}>
                                    <View style={styles.sectionHeader}>
                                        <Icon name="heart" size={16} color="#dc2626" />
                                        <Text style={styles.sectionTitle}>Adoção de Animais</Text>
                                    </View>
                                    <Pressable 
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setAdocaoModalVisible(true);
                                            setMenuVisible(false);
                                        }}
                                    >
                                        <Text style={styles.menuItemText}>Como Adotar</Text>
                                        <Icon name="chevron-right" size={12} color="#94a3b8" />
                                    </Pressable>
                                </View>

                                {/* Seção de Denúncia */}
                                <View style={styles.menuSection}>
                                    <View style={styles.sectionHeader}>
                                        <Icon name="shield-alt" size={16} color="#ea580c" />
                                        <Text style={styles.sectionTitle}>Proteção Animal</Text>
                                    </View>
                                    <Pressable 
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setDenunciaModalVisible(true);
                                            setMenuVisible(false);
                                        }}
                                    >
                                        <Text style={styles.menuItemText}>Denunciar Maus-Tratos</Text>
                                        <Icon name="chevron-right" size={12} color="#94a3b8" />
                                    </Pressable>
                                </View>

                               
                            </View>

                            {/* Seção de Autenticação */}
                            <View style={styles.authSection}>
                                {isLoggedIn ? (
                                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                                        <Icon name="sign-out-alt" size={18} color="#dc2626" />
                                        <Text style={styles.logoutText}>Sair da Conta</Text>
                                    </Pressable>
                                ) : (
                                    <View style={styles.authButtons}>
                                        <Pressable style={styles.loginButton} onPress={navigateToLogin}>
                                            <Icon name="sign-in-alt" size={16} color="#ffffff" />
                                            <Text style={styles.loginButtonText}>Entrar</Text>
                                        </Pressable>
                                        <Pressable style={styles.registerButton} onPress={navigateToRegisterUser}>
                                            <Icon name="user-plus" size={16} color="#2563eb" />
                                            <Text style={styles.registerButtonText}>Criar Conta</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Modal de Denúncia */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={denunciaModalVisible}
                    onRequestClose={() => setDenunciaModalVisible(false)}
                >
                    <View style={styles.denunciaModalOverlay}>
                        <View style={styles.denunciaModalContainer}>
                            <View style={styles.denunciaHeader}>
                                <Icon name="shield-alt" size={24} color="#dc2626" />
                                <Text style={styles.denunciaTitle}>Denunciar Maus-Tratos</Text>
                                <Pressable 
                                    onPress={() => setDenunciaModalVisible(false)}
                                    style={styles.closeButton}
                                >
                                    <Icon name="times" size={18} color="#64748b" />
                                </Pressable>
                            </View>
                            
                            <View style={styles.denunciaContent}>
                                {!selectedOption ? (
                                    <>
                                        <Text style={styles.denunciaSubtitle}>
                                            Escolha uma das opções abaixo para fazer sua denúncia:
                                        </Text>
                                        {denunciaOptions.map((option) => (
                                            <Pressable 
                                                key={option.id}
                                                style={styles.denunciaOption}
                                                onPress={() => handleOptionSelect(option)}
                                            >
                                                <View style={styles.optionIcon}>
                                                    <Icon name={option.icon} size={20} color="#2563eb" />
                                                </View>
                                                <View style={styles.optionContent}>
                                                    <Text style={styles.optionTitle}>{option.title}</Text>
                                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                                </View>
                                                <Icon name="chevron-right" size={16} color="#94a3b8" />
                                            </Pressable>
                                        ))}
                                    </>
                                ) : (
                                    <View style={styles.selectedOptionContainer}>
                                        <View style={styles.selectedOptionHeader}>
                                            <Pressable
                                                style={styles.backButton}
                                                onPress={() => setSelectedOption(null)}
                                            >
                                                <Icon name="arrow-left" size={16} color="#2563eb" />
                                                <Text style={styles.backButtonText}>Voltar</Text>
                                            </Pressable>
                                        </View>
                                        
                                        <Text style={styles.selectedOptionTitle}>
                                            {selectedOption.title}
                                        </Text>
                                        
                                        {selectedOption.type === 'form' ? (
                                            <View style={styles.formContainer}>
                                                <Text style={styles.formLabel}>
                                                    Descreva a situação com detalhes:
                                                </Text>
                                                <TextInput
                                                    style={styles.formInput}
                                                    multiline
                                                    numberOfLines={6}
                                                    placeholder="Local, situação observada, data/hora, etc..."
                                                    value={denunciaText}
                                                    onChangeText={setDenunciaText}
                                                    textAlignVertical="top"
                                                />
                                                <Pressable 
                                                    style={[styles.submitButton, !denunciaText.trim() && styles.submitButtonDisabled]}
                                                    onPress={handleSubmitDenuncia}
                                                    disabled={!denunciaText.trim()}
                                                >
                                                    <Icon name="paper-plane" size={16} color="#ffffff" />
                                                    <Text style={styles.submitButtonText}>Enviar Denúncia</Text>
                                                </Pressable>
                                            </View>
                                        ) : (
                                            <View style={styles.contactInfo}>
                                                <Text style={styles.contactText}>
                                                    {selectedOption.description}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Modal de Como Adotar */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={adocaoModalVisible}
                    onRequestClose={() => setAdocaoModalVisible(false)}
                >
                    <View style={styles.denunciaModalOverlay}>
                        <View style={styles.denunciaModalContainer}>
                            <View style={[styles.denunciaHeader, { backgroundColor: '#fef2f2' }]}>
                                <Icon name="heart" size={24} color="#dc2626" />
                                <Text style={styles.denunciaTitle}>Como Adotar um Pet</Text>
                                <Pressable 
                                    onPress={() => setAdocaoModalVisible(false)}
                                    style={styles.closeButton}
                                >
                                    <Icon name="times" size={18} color="#64748b" />
                                </Pressable>
                            </View>
                            
                            <View style={styles.denunciaContent}>
                                <Text style={styles.denunciaSubtitle}>
                                    Siga estes passos para adotar seu novo amigo:
                                </Text>
                                {adocaoSteps.map((step) => (
                                    <View 
                                        key={step.id}
                                        style={[styles.denunciaOption, { backgroundColor: '#fff8f8' }]}
                                    >
                                        <View style={[styles.optionIcon, { backgroundColor: '#fef2f2' }]}>
                                            <Icon name={step.icon} size={20} color="#dc2626" />
                                        </View>
                                        <View style={styles.optionContent}>
                                            <Text style={styles.optionTitle}>{step.title}</Text>
                                            <Text style={styles.optionDescription}>{step.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#153A90',
        paddingVertical: 16,
        paddingHorizontal: 20,
        height: 80,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    logoContainer: {
        flex: 1,
    },
    logo: {
        width: 140,
        height: 45,
        resizeMode: 'contain',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    userInfo: {
        alignItems: 'flex-end',
    },
    userGreeting: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '400',
    },
    userName: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
    },
    menuButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
        paddingBottom: 34, // Safe area
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
    },
    closeModalButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    menuSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    menuItemText: {
        fontSize: 15,
        color: '#475569',
        fontWeight: '500',
    },

    // Auth Section
    authSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    authButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    loginButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#2563eb',
        borderRadius: 12,
        gap: 8,
    },
    loginButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
    registerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2563eb',
        gap: 8,
    },
    registerButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2563eb',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#fef2f2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fecaca',
        gap: 8,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#dc2626',
    },

    // Denúncia Modal Styles
    denunciaModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    denunciaModalContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: '100%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    denunciaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#fef2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#fecaca',
        gap: 12,
    },
    denunciaTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#dc2626',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    denunciaContent: {
        padding: 24,
    },
    denunciaSubtitle: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 20,
        lineHeight: 22,
    },
    denunciaOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
        gap: 12,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: 13,
        color: '#64748b',
    },

    // Selected Option Styles
    selectedOptionContainer: {
        flex: 1,
    },
    selectedOptionHeader: {
        marginBottom: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#eff6ff',
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563eb',
    },
    selectedOptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    formContainer: {
        flex: 1,
    },
    formLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        padding: 16,
        fontSize: 15,
        color: '#374151',
        backgroundColor: '#f9fafb',
        marginBottom: 20,
        minHeight: 120,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc2626',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        elevation: 2,
        shadowColor: '#dc2626',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#9ca3af',
        elevation: 0,
        shadowOpacity: 0,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    contactInfo: {
        padding: 20,
        backgroundColor: '#f0f9ff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#bae6fd',
    },
    contactText: {
        fontSize: 16,
        color: '#0c4a6e',
        textAlign: 'center',
        fontWeight: '500',
    },
    busca:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        fontFamily:'monospace'
    },
    pets:{
        fontSize:20,
        color:'#E7701D',
        fontWeight:'bold',
       fontFamily:'monospace'

        
    }

});

export default Header;