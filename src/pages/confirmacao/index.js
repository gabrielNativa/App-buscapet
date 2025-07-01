import React, { useRef, useState } from 'react';
import { Text, View, Image, TextInput, ScrollView, Pressable } from 'react-native';
import { ImageBackground } from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Confirmacao() {
    const navigation = useNavigation();
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [code, setCode] = useState(['', '', '', '']);

    const handleChange = (text, index) => {
        if (text.length > 1) return;
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <ImageBackground
            source={require('./../../../assets/fundo.png')}
            resizeMode="cover"
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Confirme seu E-mail</Text>
                <Image
                    style={styles.logo}
                    source={require('./../../../assets/logo2.png')}
                />
            </View>

            <LinearGradient colors={['#E7701D', '#E1B082', '#E1B082']} style={styles.formContainer} start={{ x: -1, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Verificação de conta</Text>
                    <Image
                        style={styles.icon}
                        source={require('./../../../assets/pata.png')}
                    />
                </View>
                <View style={styles.tv}>
                    <Text style={styles.tt}>Por favor, digite o código de 4 dígitos enviado para o seu e-mail.</Text>
                </View>
                <View style={styles.inputV}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={inputRefs[index]}
                            style={styles.cubo}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                                    inputRefs[index - 1].current.focus();
                                }
                            }}
                        />
                    ))}
                </View>
                <View style={styles.re}>
                    <Text style={styles.cod}>Reenvie o Código</Text>
                </View>
                <View style={styles.re}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.bt}>Verificar</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}