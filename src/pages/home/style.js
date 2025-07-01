import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Estilos gerais
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60
  },
  scrollContent: {
    paddingBottom: 20, // Espaço para o footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  infoIcon: {
    width: 30,
    height: 30,
  },

  // Categorias
  categ: {
    alignItems: 'center',
    marginTop: 5,
  },
  categg: {
    color: '#E7701D',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  // Carrossel
  carouselContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselImage: {
    width: '90%',
    height: 180,
    borderWidth: 2,
    borderColor: '#153A90',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#E7701D',
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Cards de navegação
  navigationCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    gap: 20,
    padding: 13,
    marginVertical: 10,
    alignSelf: 'center',
  },
  navCard: {
    alignItems: 'center',
  },
  cardIcon: {
    width: 70,
    height: 70,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  adoptionCard: {
    backgroundColor: "#153A90",
    borderWidth: 2,
    borderColor: "#153A90",
  },
  
petStatus: {
  marginTop: 5,
  fontSize: 12,
  color: '#FF3B30',
  fontWeight: 'bold'
},
  cardTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#153A90',
    fontFamily: 'monospace'
  },
  inactiveCard: {
    opacity: 0.6,
  },

  // Banner
  sectionBanner: {
    width: '90%',
    backgroundColor: '#E7701D',
    paddingVertical: 12,
    borderRadius: 15,
    marginVertical: 15,
    alignSelf: 'center',
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  // Cards de animais
  petsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
// No seu arquivo de estilos, atualize a seção de cards de animais:
petCard: {
  width: '45%',
  backgroundColor: 'white',
  borderRadius: 15,
  padding: 0, // Removemos o padding geral para melhor controle
  marginVertical: 8,
  elevation: 3,
  borderWidth:2,
  borderColor:"lightgray",
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 5},
  shadowOpacity: 0.3,
  shadowRadius: 4,
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative', // Para elementos absolutos internos
},
petImage: {
  width: '100%',
  height: 150,
  borderRadius: 0, // Removemos para combinar com o container
  resizeMode: 'cover',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
petInfoContainer: {
  width: '100%',
  padding: 12,
  backgroundColor: 'white',
},
petName: {
  fontSize: 18,
  fontWeight: '700',
  color: '#153A90',
  marginBottom: 5,
  textAlign: 'left',
  fontWeight: 'bold',
    fontFamily: 'monospace',
},
petDetails: {
  fontSize: 12,
  color: '#666',
  marginTop: 3,
  textAlign: 'left',
  lineHeight: 16,
},
petStatus: {
  fontSize: 11,
  fontWeight: '600',
  color: '#E7701D',
  marginTop: 8,
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},
// Adicione esses novos estilos:
petGenderIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(255,255,255,0.8)',
  borderRadius: 12,
  padding: 5,
},
petAgeBadge: {
  position: 'absolute',
  bottom: 10,
  left: 10,
  backgroundColor: 'rgba(21, 58, 144, 0.8)',
  borderRadius: 10,
  paddingHorizontal: 8,
  paddingVertical: 3,
},
petAgeText: {
  color: 'white',
  fontSize: 10,
  fontWeight: 'bold',
},
petLocation: {
  fontSize: 11,
  color: '#888',
  marginTop: 5,
  fontStyle: 'italic',
},
petDivider: {
  height: 1,
  backgroundColor: '#f0f0f0',
  marginVertical: 8,
  width: '100%',
},

  // Modal de detalhes do pet
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#153A90",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  modalScroll: {
    flex: 1,
    width: '100%',
  },
  modalPetImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  content: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E7701D",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    color: "black",
    fontFamily :  'monospace'
  },
  bioText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    textAlign: "justify",
  },
  ongContainer: {
    backgroundColor: "rgba(98, 162, 235, 0.61)",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  ongTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#153A90",
    marginBottom: 5,
  },
 
  actionButton: {
    backgroundColor: "#E7701D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Outros estilos
  bottomSpacer: {
    height: 20,
  },
  loadingContentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
},
loadingAnimationContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
},
loadingAnimation: {
    width: '100%',
    height: '100%',
},
loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#153A90',
    textAlign: 'center',
    marginTop: 10,
},
loadingDots: {
    color: '#E7701D', // Cor diferente para os pontinhos
},
progressBarBackground: {
    height: 4,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 25,
    overflow: 'hidden',
},
progressBarFill: {
    height: '100%',
    width: '30%', // Isso pode ser animado para crescer
    backgroundColor: '#E7701D',
    borderRadius: 2,
},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fullscreenCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(243, 235, 235, 0.2)',
    borderRadius: 20,
    padding: 10,
  },
  fullscreenCloseText: {
    color: 'white',
    fontSize: 24,
  },
 
  loginModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:350

  },
  
  loginModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginModalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginModalButton: {
    backgroundColor: '#153A90',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginVertical: 10,
  paddingHorizontal: 20,
},
filterButton: {
  paddingVertical: 8,
  paddingHorizontal: 15,
  marginHorizontal: 5,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#153A90',
  backgroundColor: 'white',
},
activeFilter: {
  backgroundColor: '#153A90',
},
filterText: {
  color: '#153A90',
  fontWeight: '500',
},
activeFilterText: {
  color: 'white',
},
  loginModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  speciesModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  speciesOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  speciesOption: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedSpecies: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF0F0',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  // Modal de Login
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#FF6B6B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  modalContent: {
    width: '100%', // Garante que o conteúdo não tenha margens
  },
  preferenceSection: {
  marginBottom: 20,
  width: '100%',
},
sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
porteOptions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
porteOption: {
  padding: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ddd',
  width: '30%',
  alignItems: 'center',
},
selectedPorte: {
  backgroundColor: '#FF6B6B',
  borderColor: '#FF6B6B',
},
// No seu arquivo de estilos (styles.js)
infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 8,
},
infoLabel: {
  fontWeight: 'bold',
  color: '#555',
  flex: 1,
},
infoValue: {
  flex: 2,
  textAlign: 'right',
  color: '#333',
},

modalPetImage: {
  width: '100%',
  height: 300,
  borderRadius: 10,
  marginBottom: 15,
},
additionalImagesContainer: {
  marginVertical: 15,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
imageThumbnailContainer: {
  marginRight: 10,
},
additionalImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ddd',
},
selectedAdditionalImage: {
  borderColor: '#FF3B30',
  borderWidth: 2,
},
dateTimeText: {
  fontSize: 14,
  color: '#555',
  fontStyle: 'italic'
},
floatingButton: {
  position: 'absolute',
  bottom: 80,
  right: 20,
  backgroundColor: '#153A90',
  width: 50,
  height: 50,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  zIndex: 999,
},
imgmodal:{
  width:350,
  height: 250
}
});