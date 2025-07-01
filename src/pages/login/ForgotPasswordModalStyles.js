import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const ForgotPasswordModalStyles = StyleSheet.create({
  // Container principal do modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  
  modalContainer: {
    width: "100%",
    maxWidth: width > 400 ? 380 : width - 20,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(231, 112, 29, 0.3)",
      },
    }),
  },
  
  modalContent: {
    padding: 24,
    minHeight: 320,
    position: "relative",
  },
  
  // Decorative elements
  decorativeCircle1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    opacity: 0.5,
  },
  
  decorativeCircle2: {
    position: "absolute",
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    opacity: 0.7,
  },
  
  // Header do modal
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    position: "relative",
    zIndex: 10,
  },
  
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  
  modalSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: "300",
    letterSpacing: 0.2,
  },
  
  closeButton: {
    position: "absolute",
    top: -8,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Progress indicator
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginHorizontal: 4,
  },
  
  progressDotActive: {
    backgroundColor: "#fff",
    transform: [{ scale: 1.1 }],
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  
  progressLine: {
    width: 30,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginHorizontal: 6,
  },
  
  progressLineActive: {
    backgroundColor: "#fff",
  },
  
  // Containers dos steps
  stepContainer: {
    minHeight: 120,
    justifyContent: "flex-start",
    position: "relative",
    zIndex: 5,
  },
  
  stepDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 8,
    fontWeight: "400",
    letterSpacing: 0.1,
  },
  
  // Inputs
  inputContainer: {
    marginBottom: 16,
  },
  
  inputWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
    marginLeft: 4,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    padding: 14,
    paddingLeft: 18,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 48,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    fontWeight: "500",
  },
  
  inputFocus: {
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    shadowColor: "rgba(255, 255, 255, 0.2)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.01 }],
  },
  
  // Container para inputs de senha
  passwordContainer: {
    position: "relative",
    marginBottom: 14,
  },
  
  passwordInput: {
    paddingRight: 55,
    marginBottom: 0,
  },
  
  eyeIcon: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  
  // Botões
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minHeight: 50,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
    overflow: "hidden",
  },
  
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.15,
    elevation: 2,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
  
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  
  // Container para múltiplos botões
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  
  primaryButton: {
    flex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "rgba(255, 255, 255, 0.15)",
  },
  
  secondaryButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1.5,
  },
  
  secondaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.9,
    letterSpacing: 0.3,
  },
  
  // Mensagens de erro e sucesso
  messageContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  
  errorText: {
    color: "#FFE5E5",
    fontSize: 13,
    textAlign: "center",
    backgroundColor: "rgba(255, 69, 69, 0.2)",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 69, 69, 0.3)",
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  
  successText: {
    color: "#E5FFE5",
    fontSize: 13,
    textAlign: "center",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.3)",
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  
  // Loading indicator
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  loadingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  
  // Responsividade para telas menores
  ...(width < 350 && {
    modalContent: {
      padding: 20,
      minHeight: 300,
    },
    modalTitle: {
      fontSize: 20,
    },
    stepDescription: {
      fontSize: 13,
    },
    input: {
      padding: 12,
      fontSize: 14,
      minHeight: 44,
    },
    button: {
      padding: 14,
      minHeight: 46,
    },
    buttonText: {
      fontSize: 14,
    },
    iconContainer: {
      width: 55,
      height: 55,
      borderRadius: 27.5,
    },
  }),
  
  // Estilos para telas muito pequenas
  ...(width < 300 && {
    modalContainer: {
      maxWidth: width - 16,
    },
    modalContent: {
      padding: 16,
      minHeight: 280,
    },
    buttonContainer: {
      flexDirection: "column",
      gap: 10,
    },
    primaryButton: {
      flex: 1,
    },
    secondaryButton: {
      flex: 1,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  }),
});

// Estilos adicionais para animações
export const AnimationStyles = {
  // Efeito de pulsação para o ícone
  pulseAnimation: {
    transform: [{ scale: 1.1 }],
  },
  
  // Efeito de brilho para botões
  glowEffect: {
    shadowColor: "rgba(255, 255, 255, 0.4)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // Efeito de slide para transições
  slideLeft: {
    transform: [{ translateX: -30 }],
  },
  
  slideRight: {
    transform: [{ translateX: 30 }],
  },
  
  // Animação de entrada
  fadeInUp: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  
  fadeOutDown: {
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  
  // Efeito de shake para erros
  shake: {
    transform: [{ translateX: 8 }],
  },
  
  // Efeito de bounce para sucesso
  bounce: {
    transform: [{ scale: 1.03 }],
  },
};

// Cores do tema (mantendo as originais)
export const ThemeColors = {
  primary: "#E7701D",
  primaryLight: "#E9884A", 
  primaryDark: "#E1B082",
  white: "#FFFFFF",
  whiteTransparent: "rgba(255, 255, 255, 0.2)",
  whiteTransparentLight: "rgba(255, 255, 255, 0.1)",
  whiteTransparentMedium: "rgba(255, 255, 255, 0.15)",
  whiteTransparentDark: "rgba(255, 255, 255, 0.3)",
  error: "rgba(255, 69, 69, 0.2)",
  errorBorder: "rgba(255, 69, 69, 0.3)",
  success: "rgba(76, 175, 80, 0.2)",
  successBorder: "rgba(76, 175, 80, 0.3)",
  shadow: "rgba(0, 0, 0, 0.2)",
  shadowLight: "rgba(0, 0, 0, 0.1)",
  backdrop: "rgba(0, 0, 0, 0.75)",
  glass: "rgba(255, 255, 255, 0.12)",
};

export default ForgotPasswordModalStyles;