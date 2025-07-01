import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
import Footer from "../components/Footer";

export default function Adocao() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('adocao');
  const [animais, setAnimais] = useState([]);

  // Mock de dados - substitua pela sua API
  useEffect(() => {
    const animaisMock = [
      {
        id: 1,
        nome: "Rex",
        idade: "2 anos",
        sexo: "Macho",
        raca: "Vira-lata",
        descricao: "Brincalhão e muito carinhoso",
        imagem: require('../../../assets/pet1.png'),
        ong: "Abrigo São Francisco"
      },
      {
        id: 2,
        nome: "Mel",
        idade: "1 ano",
        sexo: "Fêmea",
        raca: "SRD",
        descricao: "Tranquila e gosta de colo",
        imagem: require('../../../assets/pet1.png'),
        ong: "Projeto Patinhas"
      }
    ];
    setAnimais(animaisMock);
  }, []);

  const handleAdocao = (animalId) => {
    Alert.alert(
      "Adotar Animal",
      "Você deseja iniciar o processo de adoção?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => navigation.navigate('FormularioAdocao', { animalId }) 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Animais Disponíveis</Text>
        </View>

        {/* Lista de animais */}
        <View style={styles.listaAnimais}>
          {animais.map(animal => (
            <View key={animal.id} style={styles.cardAnimal}>
              <Image source={animal.imagem} style={styles.imagemAnimal} />
              
              <View style={styles.infoAnimal}>
                <Text style={styles.nomeAnimal}>{animal.nome}</Text>
                <Text style={styles.detalhesAnimal}>
                  {animal.raca} • {animal.sexo} • {animal.idade}
                </Text>
                <Text style={styles.descricaoAnimal}>{animal.descricao}</Text>
                <Text style={styles.ongAnimal}>Responsável: {animal.ong}</Text>
                
                {/* Botão de adoção */}
                <Pressable
                  style={styles.botaoAdotar}
                  onPress={() => handleAdocao(animal.id)}
                >
                  <Text style={styles.textoBotaoAdotar}>Quero Adotar</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}