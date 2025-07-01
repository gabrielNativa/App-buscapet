import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ScrollView,
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  StyleSheet,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import styles from "./style";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Parte2() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [details, setDetails] = useState('');

    const voltar = () => {
        navigation.navigate('Parte1');
    };

    const handleDateChange = (text) => {
        let formatted = text.replace(/\D/g, '');
        if (formatted.length > 2) formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
        if (formatted.length > 5) formatted = formatted.slice(0, 5) + '/' + formatted.slice(5, 9);
        setDate(formatted);
    };

    const handleTimeChange = (text) => {
        let formatted = text.replace(/\D/g, '');
        if (formatted.length > 2) formatted = formatted.slice(0, 2) + ':' + formatted.slice(2, 4);
        setTime(formatted);
    };

    const formatDateToISO = (brDate) => {
        const [day, month, year] = brDate.split('/');
        return `${year}-${month}-${day}`;
    };

    const salvarHistorico = async () => {
        console.log("Tentando salvar histórico");
        console.log("Data:", date, "Hora:", time, "Detalhes:", details);
    
        if (!date || !time || !details) {
            Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
            return;
        }
    
        setLoading(true);
    
        try {
            const token = await AsyncStorage.getItem('token');
            const idAnimal = await AsyncStorage.getItem('idAnimal');
            console.log("Token:", token);
            console.log("ID do Animal:", idAnimal);
    
            const response = await axios.post(
                'http://localhost:8000/api/historico',
                {
                    dataHistoricoAnimal: formatDateToISO(date),
                    horaHistoricoAnimal: time,
                    detalhesHistoricoAnimal: details,
                    idAnimal: parseInt(idAnimal),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                }
            );
    
            console.log("Resposta da API:", response.data);
    
            if (response.data.success) {
                Alert.alert('Sucesso', 'Histórico salvo com sucesso!', [
                    { text: 'OK', onPress: () => navigation.navigate('Parte3') }
                ]);
            } else {
                Alert.alert('Erro', response.data.message || 'Erro ao salvar histórico.');
            }
        } catch (error) {
            console.error("Erro ao salvar histórico:", error.response?.data || error.message);
            Alert.alert('Erro', 'Não foi possível salvar o histórico. Tente novamente.');
        } finally {
            setLoading(false);
        }

        navigation.navigate("Parte3");
    };

    const isFormValid = date && time && details;
    
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
                        <Text style={styles.headerSubtitle}>Etapa 2 de 3</Text>
                    </View>

                    <View style={styles.headerSpacer} />
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '66%' }]} />
                    </View>
                    <Text style={styles.progressText}>66% concluído</Text>
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
                            <Icon name="clock" size={24} color="#dc2626" />
                            <Text style={styles.title}>Detalhes do Desaparecimento</Text>
                            <Text style={styles.subtitle}>
                                Essas informações nos ajudarão a entender melhor o caso e aumentar as chances de encontrar seu pet
                            </Text>
                        </View>

                        {/* Seção de Data e Hora */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <Icon name="calendar-alt" size={16} color="#374151" /> Quando aconteceu?
                            </Text>
                            <Text style={styles.sectionDescription}>
                                Informe a data e horário aproximado do desaparecimento
                            </Text>

                            <View style={styles.inputRow}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Data *</Text>
                                    <View style={styles.inputWithIcon}>
                                        <Icon name="calendar" size={16} color="#6b7280" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.inputWithPadding}
                                            placeholder="dd/mm/aaaa"
                                            placeholderTextColor="#9ca3af"
                                            value={date}
                                            onChangeText={handleDateChange}
                                            keyboardType="numeric"
                                            maxLength={10}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Horário *</Text>
                                    <View style={styles.inputWithIcon}>
                                        <Icon name="clock" size={16} color="#6b7280" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.inputWithPadding}
                                            placeholder="hh:mm"
                                            placeholderTextColor="#9ca3af"
                                            value={time}
                                            onChangeText={handleTimeChange}
                                            keyboardType="numeric"
                                            maxLength={5}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Seção de Detalhes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <Icon name="file-alt" size={16} color="#374151" /> Como foi o desaparecimento?
                            </Text>
                            <Text style={styles.sectionDescription}>
                                Descreva as circunstâncias do desaparecimento, local, comportamento do pet, e qualquer detalhe que possa ser útil
                            </Text>

                            <View style={styles.textAreaContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="Ex: Saiu de casa pela manhã e não voltou. Costuma passear na praça próxima. Estava usando coleira vermelha..."
                                    placeholderTextColor="#9ca3af"
                                    multiline
                                    numberOfLines={6}
                                    maxLength={500}
                                    value={details}
                                    onChangeText={setDetails}
                                    textAlignVertical="top"
                                />
                                <Text style={styles.charCount}>{details.length}/500 caracteres</Text>
                            </View>
                        </View>

                        {/* Botões de Ação */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.continueButton,
                                    pressed && styles.pressedButton,
                                    !isFormValid && styles.buttonDisabled,
                                ]}
                                onPress={salvarHistorico}
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
                                <Icon name="info-circle" size={12} color="#6b7280" /> 
                                {' '}Todos os campos marcados com * são obrigatórios
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Loading Overlay */}
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#2563eb" />
                            <Text style={styles.loadingText}>Salvando histórico...</Text>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </>
    );
}

