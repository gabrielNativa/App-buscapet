import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
  Animated,
  Easing,
  ScrollView,
  Modal
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import VerificationModal from '../components/VerificationModal';

// Componente de partícula animada
const AnimatedParticle = ({ size, duration, startPosition, endPosition }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPosition.x, endPosition.x]
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPosition.y, endPosition.y]
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0.7, 0]
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
          opacity
        }
      ]}
    />
  );
};

// Componente de fundo animado
const AnimatedBackground = () => {
  const particles = [];
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

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
        colors={['#f0f8ff', '#e6f0ff', '#d9e6ff']}
        style={styles.backgroundAnimation}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

// Componente Stepper
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.stepperContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.stepIndicator,
              currentStep === index + 1 && styles.stepActive,
              currentStep > index + 1 && styles.stepCompleted
            ]}
          >
            {currentStep > index + 1 ? (
              <Icon name="check" style={styles.checkIcon} />
            ) : (
              <Text style={styles.stepText}>{index + 1}</Text>
            )}
          </View>

          {index < totalSteps - 1 && (
            <View
              style={[
                styles.stepConnector,
                currentStep > index + 1 && styles.stepConnectorCompleted,
                currentStep === index + 2 && styles.stepConnectorActive
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

// Componente Modal de Sucesso
const SuccessModal = ({ visible, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      // Reset animations when modal is hidden
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  // Animação para o ícone de sucesso
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Pequeno atraso para que a animação do checkmark comece após o modal aparecer
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(checkmarkScale, {
            toValue: 1.2,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(checkmarkScale, {
            toValue: 1,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ]).start();

        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start();
      }, 300);
    } else {
      // Reset animations
      checkmarkScale.setValue(0);
      checkmarkOpacity.setValue(0);
    }
  }, [visible]);

  // Animação para o texto
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Atraso maior para o texto aparecer após o checkmark
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();
      }, 500);
    } else {
      // Reset animations
      textTranslateY.setValue(20);
      textOpacity.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.successModalContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.successIconContainer}>
            <Animated.View
              style={[
                styles.successIconCircle,
                {
                  opacity: checkmarkOpacity,
                  transform: [{ scale: checkmarkScale }]
                }
              ]}
            >
              <Icon name="check" style={styles.successIcon} />
            </Animated.View>
          </View>

          <Animated.Text
            style={[
              styles.successTitle,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslateY }]
              }
            ]}
          >
            Cadastro Concluído!
          </Animated.Text>

          <Animated.Text
            style={[
              styles.successMessage,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslateY }]
              }
            ]}
          >
            Seu cadastro foi realizado com sucesso. Você será redirecionado para a tela de login.
          </Animated.Text>

          <Animated.View
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }]
            }}
          >
            <Pressable
              style={styles.successButton}
              onPress={onClose}
            >
              <Text style={styles.successButtonText}>Continuar</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function CadastroSteps() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const totalSteps = 3;
  const [nomeExistsError, setNomeExistsError] = useState(null);
  const [emailExistsError, setEmailExistsError] = useState(null);
  const [cpfExistsError, setCpfExistsError] = useState(null);
  const [telefoneExistsError, setTelefoneExistsError] = useState(null);

  const navigation = useNavigation();
  const debounceTimeout = useRef(null);

  const checkExistence = async (field, value, setErrorState) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!value || value.trim() === '') { // Limpa o erro se o input estiver vazio
      setErrorState(null);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/check-existence", {
          field: field,
          value: value
        });
        if (response.data.exists) {
          setErrorState(`Este ${field} já está em uso.`);
        } else {
          setErrorState(null);
        }
      } catch (error) {
        console.error(`Erro ao verificar ${field}:`, error.response?.data || error.message);
        setErrorState(`Erro ao verificar ${field}.`);
      }
    }, 500); // Debounce de 500ms
  };

  // Animações
  const logoScale = useRef(new Animated.Value(1)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;
  const buttonGlowPosition = useRef(new Animated.Value(-50)).current;
  const linkUnderlineWidth = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // Efeito de pulsação do logo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Efeito de rotação suave do ícone
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconRotation, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(iconRotation, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Efeito de brilho no botão
    Animated.loop(
      Animated.timing(buttonGlowPosition, {
        toValue: 250,
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ).start();
  }, []);

  // Animação ao mudar de etapa
  useEffect(() => {
    // Reset da animação
    slideAnimation.setValue(0);

    // Animar entrada da nova etapa
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start();
  }, [currentStep]);

  // Função para formatar CPF (000.000.000-00)
  const formatarCPF = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
    return formatted;
  };

  // Função para formatar Telefone ((00) 00000-0000)
  const formatarTelefone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
    return formatted;
  };

  // Atualiza o CPF com máscara
  const handleChangeCPF = (text) => {
    const formattedCPF = formatarCPF(text);
    setCpf(formattedCPF);
    if (errors.cpf) {
      setErrors(prev => ({ ...prev, cpf: null }));
    }

    // Verificar se o CPF já existe (apenas quando estiver completo)
    if (formattedCPF.length === 14) {
      checkExistence('cpf', formattedCPF.replace(/\D/g, ''), setCpfExistsError);
    } else {
      setCpfExistsError(null);
    }
  };

  // Atualiza o Telefone com máscara
  const handleChangeTelefone = (text) => {
    const formattedTelefone = formatarTelefone(text);
    setTelefone(formattedTelefone);
    if (errors.telefone) {
      setErrors(prev => ({ ...prev, telefone: null }));
    }

    // Verificar se o Telefone já existe (apenas quando estiver completo)
    if (formattedTelefone.length === 15) {
      checkExistence('telefone', formattedTelefone.replace(/\D/g, ''), setTelefoneExistsError);
    } else {
      setTelefoneExistsError(null);
    }
  };

  const login = () => {
    navigation.navigate('Login');
  };

  // Validação por etapa
  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!nome.trim()) {
          stepErrors.nome = "Nome é obrigatório";
          isValid = false;
        }
        if (!email.trim()) {
          stepErrors.email = "E-mail é obrigatório";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          stepErrors.email = "E-mail inválido";
          isValid = false;
        }
        break;
      case 2:
        if (!cpf.trim() || cpf.length < 14) {
          stepErrors.cpf = "CPF inválido";
          isValid = false;
        }
        if (!telefone.trim() || telefone.length < 14) {
          stepErrors.telefone = "Telefone inválido";
          isValid = false;
        }
        break;
      case 3:
        if (!senha.trim() || senha.length < 6) {
          stepErrors.senha = "Senha deve ter pelo menos 6 caracteres";
          isValid = false;
        }
        if (senha !== confirmarSenha) {
          stepErrors.confirmarSenha = "As senhas não coincidem";
          isValid = false;
        }
        break;
    }

    setErrors(stepErrors);
    return isValid;
  };

  // Avançar para próxima etapa
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSignup();
      }
    }
  };

  // Voltar para etapa anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Finalizar cadastro
  const finalizarCadastro = async () => {
    try {
      setLoading(true);

      const dadosUsuario = {
        nomeUser: nome,
        emailUser: email,
        senhaUser: senha,
        cpfUser: cpf,
        telUser: telefone,
      };

      const response = await axios.post("http://localhost:8000/api/usuario", dadosUsuario, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Usuário cadastrado:", response.data);

      // Mostrar modal de sucesso
      setSuccessModalVisible(true);

    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Fechar modal e redirecionar para login
  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);

    // Pequeno atraso antes de redirecionar para o login
    // para permitir que a animação de fechamento do modal termine
    setTimeout(() => {
      navigation.navigate("Login");
    }, 300);
  };

  // Animações para o link
  const handleLinkHover = (isHovering) => {
    Animated.timing(linkUnderlineWidth, {
      toValue: isHovering ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  };

  // Rotação do ícone
  const rotate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg']
  });

  // Animação de slide para as etapas
  const slideTranslate = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  const slideOpacity = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const handleSignup = async () => {
    try {
      setLoading(true);

      const dadosUsuario = {
        nomeUser: nome,
        emailUser: email,
        senhaUser: senha,
        cpfUser: cpf,
        telUser: telefone,
      };

      // Cadastrar usuário
      const response = await axios.post("http://localhost:8000/api/usuario", dadosUsuario, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Usuário cadastrado:", response.data);

      // Enviar código de verificação
      await axios.post("http://localhost:8000/api/send-verification", {
        email: email
      }, {
        headers: { "Content-Type": "application/json" },
      });

      setUserEmail(email);
      setVerificationModalVisible(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível cadastrar. Tente novamente.");
      console.error("Erro:", error.response?.data || error.message);
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      const response = await axios.post("http://localhost:8000/api/verificar", {
        code: code,
        email: userEmail
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.verified) {
        setVerificationModalVisible(false);
        setSuccessModalVisible(true);
      } else {
        throw new Error("Código inválido");
      }
    } catch (error) {
      throw error;
    }
  };

  // Renderização condicional das etapas
  const renderStepContent = () => {
    return (
      <Animated.View
        style={[
          styles.stepContent,
          {
            opacity: slideOpacity,
            transform: [{ translateY: slideTranslate }]
          }
        ]}
      >
        {currentStep === 1 && (
          <>
            <Text style={styles.stepTitle}>Dados Pessoais</Text>
            <Text style={styles.stepDescription}>Informe seus dados básicos para começar</Text>

            <Text style={styles.inputLabel}>Nome Completo:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'nome' && styles.inputFocus,
                (errors.nome || nomeExistsError) && { borderBottomColor: '#FF3333' } // Adicionado nomeExistsError
              ]}
              placeholder="Digite seu nome completo..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={nome}
              onChangeText={(text) => {
                setNome(text);
                if (errors.nome) {
                  setErrors(prev => ({ ...prev, nome: null }));
                }
                checkExistence('nome', text, setNomeExistsError); // Chamada para verificar existência
              }}
              onFocus={() => setFocusedInput('nome')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
            {nomeExistsError && <Text style={styles.errorText}>{nomeExistsError}</Text>} {/* Exibe o erro de existência */}


            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocus,
                (errors.email || emailExistsError) && { borderBottomColor: '#FF3333' } // Adicionado emailExistsError
              ]}
              placeholder="Digite seu e-mail..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: null }));
                }
                checkExistence('email', text, setEmailExistsError); // Chamada para verificar existência
              }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            {emailExistsError && <Text style={styles.errorText}>{emailExistsError}</Text>} {/* Exibe o erro de existência */}
          </>
        )}

        {currentStep === 2 && (
          <>
            <Text style={styles.stepTitle}>Dados de Contato</Text>
            <Text style={styles.stepDescription}>Informe seus documentos e contato</Text>

            <Text style={styles.inputLabel}>CPF:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'cpf' && styles.inputFocus,
                (errors.cpf || cpfExistsError) && { borderBottomColor: '#FF3333' }
              ]}
              placeholder="000.000.000-00"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="numeric"
              value={cpf}
              onChangeText={handleChangeCPF}
              maxLength={14}
              onFocus={() => setFocusedInput('cpf')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
            {cpfExistsError && <Text style={styles.errorText}>{cpfExistsError}</Text>}

            <Text style={styles.inputLabel}>Telefone:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'telefone' && styles.inputFocus,
                (errors.telefone || telefoneExistsError) && { borderBottomColor: '#FF3333' }
              ]}
              placeholder="(00) 00000-0000"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={handleChangeTelefone}
              maxLength={15}
              onFocus={() => setFocusedInput('telefone')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
            {telefoneExistsError && <Text style={styles.errorText}>{telefoneExistsError}</Text>}
          </>
        )}

        {currentStep === 3 && (
          <>
            <Text style={styles.stepTitle}>Segurança</Text>
            <Text style={styles.stepDescription}>Crie uma senha segura para sua conta</Text>

            <Text style={styles.inputLabel}>Senha:</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[
                  styles.input,
                  { paddingRight: 40 },
                  focusedInput === 'senha' && styles.inputFocus,
                  errors.senha && { borderBottomColor: '#FF3333' }
                ]}
                placeholder="Digite sua senha..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={(text) => {
                  setSenha(text);
                  if (errors.senha) {
                    setErrors(prev => ({ ...prev, senha: null }));
                  }
                }}
                onFocus={() => setFocusedInput('senha')}
                onBlur={() => setFocusedInput(null)}
              />
              <Pressable
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '25%',
                  transform: [{ translateY: -10 }],
                  padding: 5
                }}
              >
                <Icon
                  name={mostrarSenha ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <Text style={styles.inputLabel}>Confirmar Senha:</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[
                  styles.input,
                  { paddingRight: 40 },
                  focusedInput === 'confirmarSenha' && styles.inputFocus,
                  errors.confirmarSenha && { borderBottomColor: '#FF3333' }
                ]}
                placeholder="Confirme sua senha..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={(text) => {
                  setConfirmarSenha(text);
                  if (errors.confirmarSenha) {
                    setErrors(prev => ({ ...prev, confirmarSenha: null }));
                  }
                }}
                onFocus={() => setFocusedInput('confirmarSenha')}
                onBlur={() => setFocusedInput(null)}
              />
              <Pressable
                onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '25%',
                  transform: [{ translateY: -10 }],
                  padding: 5
                }}
              >
                <Icon
                  name={mostrarConfirmarSenha ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>
            {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
          </>
        )}

        <View style={styles.navigationButtons}>
          <Pressable
            style={[
              styles.navButton,
              currentStep === 1 && styles.navButtonDisabled
            ]}
            onPress={prevStep}
            disabled={currentStep === 1}
          >
            <Text style={styles.navButtonText}>Voltar</Text>
          </Pressable>

          <Pressable
            style={[
              styles.btl,
              { width: '40%' }
            ]}
            onPress={nextStep}
            disabled={loading}
          >
            <Animated.View
              style={[
                styles.buttonGlow,
                { transform: [{ translateX: buttonGlowPosition }] }
              ]}
            />
            <Text style={styles.buttonText}>
              {loading ? 'Aguarde...' : currentStep < totalSteps ? "Próximo" : "Finalizar"}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Fundo animado com partículas e gradiente */}
      <AnimatedBackground />

      <View style={styles.header}>
        <Animated.Image
          style={[
            styles.logo,
            { transform: [{ scale: logoScale }] }
          ]}
          source={require('./../../../assets/logo 3.png')}
        />
      </View>

      <LinearGradient
        colors={['#E7701D', '#E9884A', '#E1B082']}
        style={styles.formContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>CADASTRO</Text>
          <Animated.Image
            style={[
              styles.icon,
              { transform: [{ rotate }] }
            ]}
            source={require('./../../../assets/pata.png')}
          />
        </View>

        {/* Indicador de etapas */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Conteúdo da etapa atual */}
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>
      </LinearGradient>

      <View style={styles.rg}>
        <Pressable
          onPress={login}
          onMouseEnter={() => handleLinkHover(true)}
          onMouseLeave={() => handleLinkHover(false)}
        >
          <Text style={styles.linkText}>
            Já tem uma conta? Faça login
            <Animated.View
              style={[
                styles.linkUnderline,
                {
                  width: linkUnderlineWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]}
            />
          </Text>
        </Pressable>
      </View>

      <VerificationModal
        visible={verificationModalVisible}
        onClose={() => setVerificationModalVisible(false)}
        onVerify={handleVerifyCode}
        email={userEmail}
      />

      <SuccessModal
        visible={successModalVisible}
        onClose={handleCloseSuccessModal}
      />
    </View>
  );
}
