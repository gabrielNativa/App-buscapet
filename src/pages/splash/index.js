import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar, Image, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animações das patas (3 patas)
  const pawAnimations = useRef(
    Array.from({ length: 5 }, () => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
      translateY: new Animated.Value(20),
    }))
  ).current;

  useEffect(() => {
    // Sequência principal de animações
    Animated.sequence([
      // 1. Fade in geral
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // 2. Logo aparece
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // 3. Texto aparece
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação das patas em sequência
    setTimeout(() => {
      const pawSequence = pawAnimations.map((anim, index) =>
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.parallel([
            Animated.spring(anim.opacity, {
              toValue: 1,
              tension: 80,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.spring(anim.scale, {
              toValue: 1,
              tension: 80,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.spring(anim.translateY, {
              toValue: 0,
              tension: 80,
              friction: 6,
              useNativeDriver: true,
            }),
          ]),
        ])
      );

      Animated.parallel(pawSequence).start();

      // Pulsação suave das patas
      setTimeout(() => {
        const pawPulse = pawAnimations.map((anim) =>
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim.scale, {
                toValue: 1.2,
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
              }),
            ])
          )
        );

        Animated.parallel(pawPulse).start();
      }, 1000);
    }, 1500);

    // Animação da barra de progresso
    setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    }, 2000);

    // Navegar para a tela de Home após 4 segundos
    setTimeout(() => {
      navigation.navigate('Home');
      if (onFinish) onFinish();
    }, 4500);
  }, []);

  const PawPrint = ({ animValue, style }) => (
    <Animated.View
      style={[
        styles.pawContainer,
        style,
        {
          opacity: animValue.opacity,
          transform: [
            { scale: animValue.scale },
            { translateY: animValue.translateY },
          ],
        },
      ]}
    >
      <View style={styles.pawGlow} />
      <Image
        source={require('./../../../assets/pata.png')}
        style={styles.pawImage}
        resizeMode="contain"
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Background com gradiente azul */}
      <View style={styles.backgroundGradient} />
      
      {/* Partículas flutuantes laranjas */}
      <View style={styles.particlesContainer}>
        {[...Array(12)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
              }
            ]}
          />
        ))}
      </View>
      
      {/* Logo section */}
      <Animated.View style={[styles.logoSection, { opacity: fadeAnim }]}>
      <Animated.View
  style={[
    styles.logoContainer,
    {
      opacity: logoOpacity,
      transform: [{ scale: logoScale }],
    }
  ]}
>
  <Image
    source={require('./../../../assets/Logo busca1.png')}
    style={styles.logoImage}
    resizeMode="contain"
  />
</Animated.View>

        
        <Animated.View style={[styles.brandContainer, { opacity: textOpacity }]}>
          <Text style={styles.brandText}>Busca<Text style={styles.brandText1}>Pet</Text></Text>
          <Text style={styles.tagline}>Conectando corações e patas</Text>
        </Animated.View>

      </Animated.View>

      {/* Caminho de patas */}
      <Animated.View style={[styles.pawPath, { opacity: fadeAnim }]}>
        {pawAnimations.map((anim, index) => (
          <PawPrint key={index} animValue={anim} style={[styles.pawPosition]} />
        ))}
      </Animated.View>

      {/* Loading section */}
      <Animated.View style={[styles.loadingSection, { opacity: fadeAnim }]}>
        <Text style={styles.loadingText}>Preparando sua jornada...</Text>
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af', // Azul principal
    justifyContent: 'space-between',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1e3a8a', // Azul mais escuro para gradiente
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(249, 115, 22, 0.7)', // Laranja com transparência
    borderRadius: 3,
    top: '100%',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  logoImage: {
    width: 400,
    height: 400,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 0, 
  },
  brandText: {
    fontSize: 70,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2.5,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    marginBottom: 0, // Remove espaço extra embaixo do título
  },
  brandText1: {
    fontSize: 70,
    fontWeight: '900',
    color: '#E7701D',
    letterSpacing: 2.5,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    marginBottom: 0, // Remove espaço extra embaixo do título
  },
  
  tagline: {
    fontSize: 17,
    color: '#e2e8f0', // Cinza claro
    fontWeight: '600',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: 'rgba(249, 115, 22, 0.4)', // Sombra laranja suave
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  pawPath: {
    marginTop:10,
    position: 'absolute',
    bottom: height * 0.2,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pawPosition: {
    position: 'relative',
    width: 25,
    height: 25,
  },
  pawContainer: {
    width: 25,
    height: 25,
    position: 'relative',
  },
  pawGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
     // Glow laranja
    borderRadius: 27.5,
    top: -7.5,
    left: -7.5,
  },
  pawImage: {
    width: 40,
    height: 40,
    tintColor: '#f97316', // Laranja para as patas
  },
  loadingSection: {
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    color: '#cbd5e1', // Cinza claro azulado
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 18,
  },
  loadingBar: {
    width: 220,
    height: 4,
    backgroundColor: 'rgba(249, 115, 22, 0.25)', // Fundo laranja transparente
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#f97316', // Laranja sólido
    borderRadius: 2,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default SplashScreen;