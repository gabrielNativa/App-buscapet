import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PetDetails({ route }) {
    const navigation = useNavigation();
    const pet = route?.params?.pet;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    if (!pet) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Pet não encontrado ou dados ausentes.</Text>
            </View>
        );
    }

    // Prepara todas as imagens (principal + adicionais)
    const allImages = [
        pet.image,
        ...(pet.additionalImages || [])
    ].filter(img => img);

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-left" size={20} color="#e7701d" />
                    <Text style={styles.backText}>Voltar</Text>
                </Pressable>
                <Text style={styles.title}>DETALHES DO PET</Text>
                <View style={{width: 20}} /> {/* Espaço para alinhamento */}
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Imagem principal */}
                <Image 
                    source={
                        typeof allImages[selectedImageIndex] === 'string' 
                            ? { uri: allImages[selectedImageIndex] } 
                            : allImages[selectedImageIndex]
                    } 
                    style={styles.mainImage}
                    resizeMode="cover"
                    defaultSource={require("./../../../assets/cao.png")}
                />
                
                {/* Miniaturas das imagens (se houver mais de uma) */}
                {allImages.length > 1 && (
                    <View style={styles.thumbnailsContainer}>
                        <ScrollView 
                            horizontal 
                            contentContainerStyle={styles.additionalImagesContainer}
                            showsHorizontalScrollIndicator={false}
                        >
                            {allImages.map((img, index) => (
                                <Pressable 
                                    key={index} 
                                    onPress={() => setSelectedImageIndex(index)}
                                    style={[
                                        styles.thumbnailWrapper,
                                        selectedImageIndex === index && styles.selectedThumbnail
                                    ]}
                                >
                                    <Image
                                        source={typeof img === 'string' ? { uri: img } : img}
                                        style={styles.additionalImage}
                                    />
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View style={styles.content}>
                    {/* Nome e informações básicas */}
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{pet.name}</Text>
                        <View style={styles.basicInfo}>
                            <Text style={styles.basicInfoText}>
                                <Icon name="paw" size={14} color="#e7701d" /> {pet.especie}
                            </Text>
                            <Text style={styles.basicInfoText}>
                                <Icon name="ruler-combined" size={14} color="#e7701d" /> {pet.porte}
                            </Text>
                            <Text style={styles.basicInfoText}>
                                <Icon name="calendar-alt" size={14} color="#e7701d" /> {pet.age}
                            </Text>
                        </View>
                    </View>

                    {/* Seção de Informações Detalhadas */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>INFORMAÇÕES</Text>
                        
                        <View style={styles.infoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Raça:</Text>
                                <Text style={styles.infoValue}>{pet.raca}</Text>
                            </View>
                            
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Pelagem:</Text>
                                <Text style={styles.infoValue}>{pet.pelagem}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Seção Bio */}
                    {pet.bio && (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>SOBRE</Text>
                            <Text style={styles.bioText}>{pet.bio}</Text>
                        </View>
                    )}

                    {/* Seção ONG */}
                    {pet.ongName && (
                        <View style={[styles.infoSection, styles.ongContainer]}>
                            <View style={styles.ongHeader}>
                                <Icon name="home" size={18} color="#e7701d" />
                                <Text style={styles.ongTitle}>INFORMAÇÕES DA ONG</Text>
                            </View>
                            
                            <View style={styles.ongInfoItem}>
                                <Text style={styles.ongInfoLabel}>ONG:</Text>
                                <Text style={styles.ongInfoValue}>{pet.ongName}</Text>
                            </View>
                            
                            <View style={styles.ongInfoItem}>
                                <Text style={styles.ongInfoLabel}>Contato:</Text>
                                <Text style={styles.ongInfoValue}>{pet.ongContact}</Text>
                            </View>
                            
                            <View style={styles.ongInfoItem}>
                                <Text style={styles.ongInfoLabel}>Localização:</Text>
                                <Text style={styles.ongInfoValue}>{pet.location}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 5,
        color: '#e7701d',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e7701d',
    },
    mainImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
    },
    thumbnailsContainer: {
        paddingVertical: 10,
    },
    additionalImagesContainer: {
        paddingHorizontal: 16,
    },
    thumbnailWrapper: {
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedThumbnail: {
        borderWidth: 2,
        borderColor: '#e7701d',
    },
    additionalImage: {
        width: 60,
        height: 60,
        borderRadius: 7,
    },
    content: {
        padding: 16,
    },
    nameContainer: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    basicInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    basicInfoText: {
        marginRight: 15,
        color: '#666',
        fontSize: 14,
    },
    infoSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e7701d',
        marginBottom: 15,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoItem: {
        width: '48%',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: '#777',
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    bioText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    ongContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
    },
    ongHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    ongTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e7701d',
        marginLeft: 8,
    },
    ongInfoItem: {
        marginBottom: 10,
    },
    ongInfoLabel: {
        fontSize: 14,
        color: '#777',
        fontWeight: 'bold',
    },
    ongInfoValue: {
        fontSize: 15,
        color: '#333',
        marginTop: 2,
    },
});