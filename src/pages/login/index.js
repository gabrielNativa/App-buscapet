import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { Pressable } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import VerificationModal from "../components/VerificationModal";
import ForgotPasswordModal from "./ForgotPasswordModal_Final";
// Componente de partícula animada
const AnimatedParticle = ({ size, duration, startPosition, endPosition }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPosition.x, endPosition.x],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPosition.y, endPosition.y],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0.7, 0],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
          opacity,
        },
      ]}
    />
  );
};

// Componente de fundo animado
const AnimatedBackground = () => {
  const particles = [];
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 400;
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  for (let i = 0; i < 20; i++) {
    const size = Math.random() * 8 + 2;
    const duration = Math.random() * 10000 + 5000;
    const startX = Math.random() * windowWidth;
    const startY = Math.random() * windowHeight;
    const endX = Math.random() * windowWidth;
    const endY = Math.random() * windowHeight;

    particles.push(
      <AnimatedParticle
        key={i}
        size={size}
        duration={duration}
        startPosition={{ x: startX, y: startY }}
        endPosition={{ x: endX, y: endY }}
      />
    );
  }

  return (
    <View style={styles.particleContainer}>
      {particles}
      <LinearGradient
        colors={["#f0f8ff", "#e6f0ff", "#d9e6ff"]}
        style={styles.backgroundAnimation}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false); // State for modal visibility
  const [userEmailForVerification, setUserEmailForVerification] = useState(""); // State to hold email for verification
  const [showBlockedModal, setShowBlockedModal] = useState(false); // Estado para o modal de bloqueio

const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);


 const handleForgotPassword = () => {
    setForgotPasswordModalVisible(true);
  };

  // NOVA: Função para fechar o modal de esqueci a senha
  const handleCloseForgotPasswordModal = () => {
    setForgotPasswordModalVisible(false);
  };
  // Animações
  const logoScale = useRef(new Animated.Value(1)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;
  const buttonGlowPosition = useRef(new Animated.Value(-50)).current;
  const linkUnderlineWidth = useRef({
    forgot: new Animated.Value(0),
    register: new Animated.Value(0),
  }).current;

  //Animações para o modal de bloqueio
  const modalScale = useRef(new Animated.Value(0.5)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const warningIconRotation = useRef(new Animated.Value(0)).current;

  // Efeito de pulsação do logo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Efeito de rotação suave do ícone
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconRotation, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iconRotation, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Efeito de brilho no botão
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonGlowPosition, {
          toValue: 250,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonGlowPosition, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    // Efeito de rotação para o ícone de aviso
    Animated.loop(
      Animated.sequence([
        Animated.timing(warningIconRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(warningIconRotation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Verifica se o usuário já está logado ao carregar a tela
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.navigate("Home");
      }
    };
    checkLogin();
  }, []);
  useEffect(() => {
    if (showBlockedModal) {
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      modalScale.setValue(0.5);
      modalOpacity.setValue(0);
    }
  }, [showBlockedModal]);
  const cadastro = () => {
    navigation.navigate("Cadastro");
  };

  const login = async () => {
    if (!email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        emailUser: email,
        senhaUser: senha,
      });

      // Extração dos dados baseada na estrutura da resposta
      const token = response.data.token;
      const userId = response.data.user.idUser;
      const userEmail = response.data.user.emailUser;
      const userName = response.data.user.nomeUser;

      if (!token || !userId) {
        throw new Error("Dados essenciais não recebidos na resposta");
      }

      // Armazenamento dos dados
      await AsyncStorage.multiSet([
        ["userToken", token],
        ["userId", userId.toString()],
        ["userEmail", userEmail],
        ["userName", userName || ""],
      ]);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro detalhado:", error);

      let errorMessage = "Erro durante o login";

      if (error.response?.status === 401) {
        errorMessage = "E-mail ou senha incorretos";
      } else if (error.response?.status === 403) {
        // Verifica se a mensagem é sobre conta não verificada
        if (error.response.data.message.includes("não verificado")) {
          errorMessage = error.response.data.message;
          // Não mostra o modal de bloqueio para contas não verificadas
        } else {
          // Caso contrário, é um bloqueio real
          errorMessage = error.response.data.message;
          setShowBlockedModal(true);
        }
      } else if (error.message.includes("Network Error")) {
        errorMessage = "Erro de conexão com o servidor";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/verificar", {
        email: userEmailForVerification,
        code: code,
      });
      Alert.alert("Sucesso", "Seu e-mail foi verificado com sucesso!");
      setVerificationModalVisible(false); // Close the modal
      setErrorMessage(""); // Clear the error message on successful verification
      // Optionally, try to log in again or navigate to home
      login(); // Re-attempt login after successful verification
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      Alert.alert("Erro", "Código de verificação inválido ou expirado.");
      throw error; // Re-throw to be caught by the modal's error handling
    } finally {
      setLoading(false);
    }
  };

  const reenviarEmailVerificacao = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/send-verification",
        {
          email: email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      Alert.alert("Verificação", "Um novo código foi enviado para seu e-mail.");
    } catch (err) {
      console.error("Erro ao reenviar verificação:", err);
      Alert.alert("Erro", "Não foi possível reenviar o código de verificação.");
    } finally {
      setLoading(false);
    }
  };

  // Animações para os links
  const handleLinkHover = (link, isHovering) => {
    Animated.timing(linkUnderlineWidth[link], {
      toValue: isHovering ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  // Rotação do ícone
  const rotate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  // Rotação do ícone de aviso
  const warningRotate = warningIconRotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["-5deg", "0deg", "5deg"],
  });

  return (
    <View style={styles.container}>
      {/* Fundo animado com partículas e gradiente */}
      <AnimatedBackground />

      {/* Modal de carregamento */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#E7701D" />
            <Text style={styles.modalText}>Autenticando...</Text>
          </View>
        </View>
      </Modal>

      {/* Modal de usuário bloqueado (estilizado) */}

      <Modal
        transparent={true}
        animationType="fade"
        visible={showBlockedModal}
        onRequestClose={() => setShowBlockedModal(false)}
      >
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: modalScale }],
                opacity: modalOpacity,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.warningIconContainer,
                { transform: [{ rotate: warningRotate }] },
              ]}
            >
              <Icon name="exclamation-triangle" size={40} color="#E7701D" />
            </Animated.View>

            <Text style={styles.modalTitle}>Acesso Restrito</Text>

            <Text style={styles.modalMessage}>
              {errorMessage ||
                "Sua conta está temporariamente suspensa devido a múltiplas tentativas de login incorretas ou violação de nossos termos de serviço."}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => setShowBlockedModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </Pressable>

          </Animated.View>
        </View>
      </Modal>
  {/* NOVO: Modal de esqueci a senha */}
      <ForgotPasswordModal
        visible={forgotPasswordModalVisible}
        onClose={handleCloseForgotPasswordModal}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Faça seu login para prosseguir</Text>
        <Animated.Image
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
          source={require("./../../../assets/logo 3.png")}
        />
      </View>

      <LinearGradient
        colors={["#E7701D", "#E9884A", "#E1B082"]}
        style={styles.formContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>LOGIN</Text>
          <Animated.Image
            style={[styles.icon, { transform: [{ rotate }] }]}
            source={require("./../../../assets/pata.png")}
          />
        </View>

        <View style={styles.inputContainer}>
         
          <Text style={styles.inputLabel}>E-mail:</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "email" && styles.inputFocus,
            ]}
            placeholder="Digite seu E-mail..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />

          <Text style={styles.inputLabel}>Senha:</Text>

          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                focusedInput === "senha" && styles.inputFocus,
                { paddingRight: 40 }, // espaço para o ícone
              ]}
              placeholder="Digite sua Senha..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErrorMessage("");
              }}
              onFocus={() => setFocusedInput("senha")}
              onBlur={() => setFocusedInput(null)}
            />

            <Pressable
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={{
                position: "absolute",
                right: 10,
                top: "25%",
                transform: [{ translateY: -10 }], // centraliza verticalmente
                padding: 5,
              }}
            >
              <Icon
                name={mostrarSenha ? "eye-slash" : "eye"}
                size={20}
                color="#fff"
              />
            </Pressable>
          </View>

          <Pressable style={styles.btl} onPress={login} disabled={loading}>
            <Animated.View
              style={[
                styles.buttonGlow,
                { transform: [{ translateX: buttonGlowPosition }] },
              ]}
            />
            <Text style={styles.buttonText}>
              {loading ? "Aguarde..." : "Logar"}
            </Text>
          </Pressable>


          <View style={styles.errodesgramado}>
            {errorMessage &&
            !showBlockedModal &&
            !errorMessage.includes("Sua conta foi bloqueada") ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}



          </View>

        </View>
      </LinearGradient>

      {errorMessage?.includes("Seu e-mail ainda não foi verificado.") &&
            !showBlockedModal && (
              <Pressable
                onPress={() => {
                  setUserEmailForVerification(email);
                  setVerificationModalVisible(true);
                }}
              >
                <Text style={styles.resendText}>Verificar e-mail agora</Text>
              </Pressable>
            )}
      <View style={styles.rg}>
         <Pressable
              onPress={handleForgotPassword} // NOVA função
              onPressIn={() => handleLinkHover("forgot", true)}
              onPressOut={() => handleLinkHover("forgot", false)}
              style={styles.linkContainer}
            >
          <Text style={styles.linkText}>
            Esqueceu a senha?
            <Animated.View
              style={[
                styles.linkUnderline,
                {
                  width: linkUnderlineWidth.forgot.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </Text>
        </Pressable>

        <Pressable
          onPress={cadastro}
          onMouseEnter={() => handleLinkHover("register", true)}
          onMouseLeave={() => handleLinkHover("register", false)}
        >
          <Text style={styles.linkText}>
            Cadastre-se
            <Animated.View
              style={[
                styles.linkUnderline,
                {
                  width: linkUnderlineWidth.register.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </Text>
        </Pressable>
      </View>

      {/* Verification Modal */}
      <VerificationModal
        visible={verificationModalVisible}
        onClose={() => setVerificationModalVisible(false)}
        onVerify={handleVerifyCode}
        email={userEmailForVerification}
      />
    </View>
  );
}
