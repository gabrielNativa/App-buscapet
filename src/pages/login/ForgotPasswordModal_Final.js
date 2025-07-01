// ForgotPasswordModal.js - Versão Premium com Design Profissional
import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  Animated,
  Easing,
  Alert,
  ActivityIndicator,
  Pressable,
  Vibration,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import ForgotPasswordModalStyles, { ThemeColors, AnimationStyles } from './ForgotPasswordModalStyles';

const ForgotPasswordModal = ({ visible, onClose }) => {
  // Estados
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(null);

  // Animações
  const modalScale = useRef(new Animated.Value(0.3)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;
  const iconPulse = useRef(new Animated.Value(1)).current;
  const shimmerAnimation = useRef(new Animated.Value(-1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  // Configuração da API - ALTERE AQUI PARA SUA URL
  const API_BASE_URL = "http://localhost:8000/api";

  // Efeito de animação quando o modal abre/fecha
  useEffect(() => {
    if (visible) {
      // Animação de entrada do modal
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          friction: 6,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Animação contínua de rotação do ícone
      Animated.loop(
        Animated.timing(iconRotation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Animação de pulsação do ícone
      Animated.loop(
        Animated.sequence([
          Animated.timing(iconPulse, {
            toValue: 1.15,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(iconPulse, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animação de shimmer nos botões
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      modalScale.setValue(0.3);
      modalOpacity.setValue(0);
      fadeAnimation.setValue(0);
      resetModal();
    }
  }, [visible]);

  // Efeito de transição entre steps
  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: step === 1 ? 0 : 1,
      friction: 8,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [step]);

  // Animação de erro (shake)
  const triggerShakeAnimation = () => {
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 100, 50, 100]);
    }
    
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Função para resetar o modal
  const resetModal = () => {
    setStep(1);
    setEmail("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFocusedInput(null);
    setButtonPressed(null);
  };

  // Validação de e-mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de senha
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Função para enviar código de redefinição
  const sendResetCode = async () => {
    if (!email) {
      setErrorMessage("Por favor, digite seu e-mail.");
      triggerShakeAnimation();
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, digite um e-mail válido.");
      triggerShakeAnimation();
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/enviar-codigo`, {
        email: email,
      });

      setSuccessMessage("Código enviado para seu e-mail!");
      setTimeout(() => {
        setStep(2);
        setSuccessMessage("");
      }, 1800);
    } catch (error) {
      console.error("Erro ao enviar código:", error);
      
      let errorMsg = "Erro ao enviar código de redefinição";
      if (error.response?.status === 422) {
        errorMsg = "E-mail não encontrado em nossa base de dados";
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message.includes("Network Error")) {
        errorMsg = "Erro de conexão com o servidor";
      }
      
      setErrorMessage(errorMsg);
      triggerShakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  // Função para redefinir senha
  const resetPassword = async () => {
    if (!code || !password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      triggerShakeAnimation();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      triggerShakeAnimation();
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      triggerShakeAnimation();
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/redefinir-senha`, {
        email: email,
        code: code,
        password: password,
        password_confirmation: confirmPassword,
      });

      setSuccessMessage("Senha redefinida com sucesso!");
      setTimeout(() => {
        onClose();
        Alert.alert("Sucesso", "Sua senha foi redefinida com sucesso! Faça login com sua nova senha.");
      }, 1800);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      
      let errorMsg = "Erro ao redefinir senha";
      if (error.response?.status === 422) {
        errorMsg = "Código inválido ou expirado";
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message.includes("Network Error")) {
        errorMsg = "Erro de conexão com o servidor";
      }
      
      setErrorMessage(errorMsg);
      triggerShakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  // Função para voltar ao step anterior
  const goBack = () => {
    setStep(1);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Rotação do ícone
  const rotate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Animação do shimmer
  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  // Componente Progress Indicator
  const ProgressIndicator = ({ currentStep }) => (
    <View style={ForgotPasswordModalStyles.progressContainer}>
      <View style={[
        ForgotPasswordModalStyles.progressDot,
        currentStep >= 1 && ForgotPasswordModalStyles.progressDotActive,
      ]} />
      <View style={[
        ForgotPasswordModalStyles.progressLine,
        currentStep >= 2 && ForgotPasswordModalStyles.progressLineActive,
      ]} />
      <View style={[
        ForgotPasswordModalStyles.progressDot,
        currentStep >= 2 && ForgotPasswordModalStyles.progressDotActive,
      ]} />
    </View>
  );

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={ForgotPasswordModalStyles.modalBackground}>
        <Animated.View
          style={[
            ForgotPasswordModalStyles.modalContainer,
            {
              transform: [
                { scale: modalScale },
                { translateX: shakeAnimation }
              ],
              opacity: modalOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={[ThemeColors.primary, ThemeColors.primaryLight, ThemeColors.primaryDark]}
            style={ForgotPasswordModalStyles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Elementos decorativos */}
            <View style={ForgotPasswordModalStyles.decorativeCircle1} />
            <View style={ForgotPasswordModalStyles.decorativeCircle2} />

            {/* Header do Modal */}
            <Animated.View 
              style={[
                ForgotPasswordModalStyles.modalHeader,
                { opacity: fadeAnimation }
              ]}
            >
              <Pressable onPress={onClose} style={ForgotPasswordModalStyles.closeButton}>
                <Icon name="times" size={20} color={ThemeColors.white} />
              </Pressable>

              <Animated.View 
                style={[
                  ForgotPasswordModalStyles.iconContainer,
                  {
                    transform: [
                      { rotate },
                      { scale: iconPulse }
                    ]
                  }
                ]}
              >
                <Icon name="key" size={32} color={ThemeColors.white} />
              </Animated.View>

              <Text style={ForgotPasswordModalStyles.modalTitle}>
                {step === 1 ? "Recuperar Senha" : "Nova Senha"}
              </Text>
              
              <Text style={ForgotPasswordModalStyles.modalSubtitle}>
                {step === 1 
                  ? "Vamos ajudar você a recuperar sua conta"
                  : "Defina uma nova senha segura"
                }
              </Text>
            </Animated.View>

            {/* Progress Indicator */}
            <Animated.View style={{ opacity: fadeAnimation }}>
              <ProgressIndicator currentStep={step} />
            </Animated.View>

            {/* Conteúdo do Step 1 - Email */}
            {step === 1 && (
              <Animated.View
                style={[
                  ForgotPasswordModalStyles.stepContainer,
                  {
                    opacity: fadeAnimation,
                    transform: [
                      {
                        translateX: slideAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -400],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={ForgotPasswordModalStyles.stepDescription}>
                  Digite seu e-mail para receber o código de recuperação da sua senha.
                </Text>

                <View style={ForgotPasswordModalStyles.inputContainer}>
                  <View style={ForgotPasswordModalStyles.inputWrapper}>
                    <Text style={ForgotPasswordModalStyles.inputLabel}>E-mail</Text>
                    <TextInput
                      style={[
                        ForgotPasswordModalStyles.input,
                        focusedInput === "email" && ForgotPasswordModalStyles.inputFocus,
                      ]}
                      placeholder="seu@email.com"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setErrorMessage("");
                      }}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {errorMessage ? (
                  <Animated.View 
                    style={[ForgotPasswordModalStyles.messageContainer]}
                    entering="fadeInUp"
                  >
                    <Text style={ForgotPasswordModalStyles.errorText}>
                      <Icon name="exclamation-triangle" size={14} color="#FFE5E5" /> {errorMessage}
                    </Text>
                  </Animated.View>
                ) : null}

                {successMessage ? (
                  <Animated.View 
                    style={[ForgotPasswordModalStyles.messageContainer]}
                    entering="fadeInUp"
                  >
                    <Text style={ForgotPasswordModalStyles.successText}>
                      <Icon name="check-circle" size={14} color="#E5FFE5" /> {successMessage}
                    </Text>
                  </Animated.View>
                ) : null}

                <Pressable
                  style={[
                    ForgotPasswordModalStyles.button,
                    loading && ForgotPasswordModalStyles.buttonDisabled,
                    buttonPressed === 'send' && ForgotPasswordModalStyles.buttonPressed,
                  ]}
                  onPress={sendResetCode}
                  onPressIn={() => setButtonPressed('send')}
                  onPressOut={() => setButtonPressed(null)}
                  disabled={loading}
                >
                  <Animated.View
                    style={[
                      ForgotPasswordModalStyles.buttonShimmer,
                      {
                        transform: [{ translateX: shimmerTranslate }],
                      }
                    ]}
                  />
                  
                  {loading ? (
                    <View style={ForgotPasswordModalStyles.loadingContainer}>
                      <ActivityIndicator size="small" color={ThemeColors.white} />
                      <Text style={ForgotPasswordModalStyles.loadingText}>Enviando...</Text>
                    </View>
                  ) : (
                    <Text style={ForgotPasswordModalStyles.buttonText}>
                      <Icon name="paper-plane" size={16} color={ThemeColors.white} /> Enviar Código
                    </Text>
                  )}
                </Pressable>
              </Animated.View>
            )}

            {/* Conteúdo do Step 2 - Código e Nova Senha */}
            {step === 2 && (
              <Animated.View
                style={[
                  ForgotPasswordModalStyles.stepContainer,
                  {
                    opacity: fadeAnimation,
                    transform: [
                      {
                        translateX: slideAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [400, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={ForgotPasswordModalStyles.stepDescription}>
                  Digite o código enviado para <Text style={{ fontWeight: 'bold' }}>{email}</Text> e defina uma nova senha.
                </Text>

                <View style={ForgotPasswordModalStyles.inputContainer}>
                  <View style={ForgotPasswordModalStyles.inputWrapper}>
                    <Text style={ForgotPasswordModalStyles.inputLabel}>Código de Verificação</Text>
                    <TextInput
                      style={[
                        ForgotPasswordModalStyles.input,
                        focusedInput === "code" && ForgotPasswordModalStyles.inputFocus,
                        { textAlign: 'center', fontSize: 20, letterSpacing: 4, fontWeight: 'bold' }
                      ]}
                      placeholder="000000"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      value={code}
                      onChangeText={(text) => {
                        setCode(text.toUpperCase().replace(/[^A-Z0-9]/g, ''));
                        setErrorMessage("");
                      }}
                      onFocus={() => setFocusedInput("code")}
                      onBlur={() => setFocusedInput(null)}
                      maxLength={6}
                      autoCapitalize="characters"
                      keyboardType="default"
                    />
                  </View>

                  <View style={ForgotPasswordModalStyles.inputWrapper}>
                    <Text style={ForgotPasswordModalStyles.inputLabel}>Nova Senha</Text>
                    <View style={ForgotPasswordModalStyles.passwordContainer}>
                      <TextInput
                        style={[
                          ForgotPasswordModalStyles.input,
                          ForgotPasswordModalStyles.passwordInput,
                          focusedInput === "password" && ForgotPasswordModalStyles.inputFocus,
                        ]}
                        placeholder="Mínimo 6 caracteres"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          setErrorMessage("");
                        }}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={ForgotPasswordModalStyles.eyeIcon}
                      >
                        <Icon
                          name={showPassword ? "eye-slash" : "eye"}
                          size={18}
                          color={ThemeColors.white}
                        />
                      </Pressable>
                    </View>
                  </View>

                  <View style={ForgotPasswordModalStyles.inputWrapper}>
                    <Text style={ForgotPasswordModalStyles.inputLabel}>Confirmar Nova Senha</Text>
                    <View style={ForgotPasswordModalStyles.passwordContainer}>
                      <TextInput
                        style={[
                          ForgotPasswordModalStyles.input,
                          ForgotPasswordModalStyles.passwordInput,
                          focusedInput === "confirmPassword" && ForgotPasswordModalStyles.inputFocus,
                        ]}
                        placeholder="Digite novamente a senha"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(text) => {
                          setConfirmPassword(text);
                          setErrorMessage("");
                        }}
                        onFocus={() => setFocusedInput("confirmPassword")}
                        onBlur={() => setFocusedInput(null)}
                      />
                      <Pressable
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={ForgotPasswordModalStyles.eyeIcon}
                      >
                        <Icon
                          name={showConfirmPassword ? "eye-slash" : "eye"}
                          size={18}
                          color={ThemeColors.white}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>

                {errorMessage ? (
                  <Animated.View 
                    style={[ForgotPasswordModalStyles.messageContainer]}
                    entering="fadeInUp"
                  >
                    <Text style={ForgotPasswordModalStyles.errorText}>
                      <Icon name="exclamation-triangle" size={14} color="#FFE5E5" /> {errorMessage}
                    </Text>
                  </Animated.View>
                ) : null}

                {successMessage ? (
                  <Animated.View 
                    style={[ForgotPasswordModalStyles.messageContainer]}
                    entering="fadeInUp"
                  >
                    <Text style={ForgotPasswordModalStyles.successText}>
                      <Icon name="check-circle" size={14} color="#E5FFE5" /> {successMessage}
                    </Text>
                  </Animated.View>
                ) : null}

                <View style={ForgotPasswordModalStyles.buttonContainer}>
                  <Pressable
                    style={[
                      ForgotPasswordModalStyles.button, 
                      ForgotPasswordModalStyles.secondaryButton,
                      buttonPressed === 'back' && ForgotPasswordModalStyles.buttonPressed,
                    ]}
                    onPress={goBack}
                    onPressIn={() => setButtonPressed('back')}
                    onPressOut={() => setButtonPressed(null)}
                  >
                    <Text style={ForgotPasswordModalStyles.secondaryButtonText}>
                      <Icon name="arrow-left" size={14} color={ThemeColors.white} /> Voltar
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      ForgotPasswordModalStyles.button,
                      ForgotPasswordModalStyles.primaryButton,
                      loading && ForgotPasswordModalStyles.buttonDisabled,
                      buttonPressed === 'reset' && ForgotPasswordModalStyles.buttonPressed,
                    ]}
                    onPress={resetPassword}
                    onPressIn={() => setButtonPressed('reset')}
                    onPressOut={() => setButtonPressed(null)}
                    disabled={loading}
                  >
                    <Animated.View
                      style={[
                        ForgotPasswordModalStyles.buttonShimmer,
                        {
                          transform: [{ translateX: shimmerTranslate }],
                        }
                      ]}
                    />
                    
                    {loading ? (
                      <View style={ForgotPasswordModalStyles.loadingContainer}>
                        <ActivityIndicator size="small" color={ThemeColors.white} />
                        <Text style={ForgotPasswordModalStyles.loadingText}>Salvando...</Text>
                      </View>
                    ) : (
                      <Text style={ForgotPasswordModalStyles.buttonText}>
                        <Icon name="shield-alt" size={16} color={ThemeColors.white} /> Redefinir
                      </Text>
                    )}
                  </Pressable>
                </View>
              </Animated.View>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;