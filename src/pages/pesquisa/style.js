import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#153A90',
  },
  
  searchContainer: {
    padding: 15,
    paddingTop: 5,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  searchIcon: {
    marginRight: 10,
  },
  
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#e7701d',
    paddingVertical: 0,
  
    outlineWidth: 0,
  },
  
  clearButton: {
    padding: 5,
  },
  
  searchButton: {
    backgroundColor: '#e7701d',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  section: {
    padding: 15,
    paddingTop: 5,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#153A90',
    marginBottom: 10,
    fontFamily:'monospace'
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    elevation: 1,
   
  },
  
  tagIcon: {
    marginRight: 5,
  },
  
  tagText: {
    color: '#e7701d',
    fontSize: 14,
     fontFamily:'monospace'
  },
  
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  category: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  categoryIcon: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  
  categoryText: {
    color: '#e7701d',
    fontSize: 14,
    textAlign: 'center',
     fontFamily:'monospace'
  },

  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#e7701d',
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffeeee',
    margin: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#ff3333',
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 10,
  },

  petResultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  petResultInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  petResultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  petResultDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  petResultLocation: {
    fontSize: 12,
    color: '#e7701d',
    marginTop: 4,
  },
  suggestionsContainer: {
    padding: 15,
  },
  suggestionSection: {
    marginBottom: 20,
  },
  suggestionSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#153A90',
    marginBottom: 10,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#153A90',
  },
  suggestionIcon: {
    marginRight: 5,
  },
  suggestionText: {
    color: '#153A90',
    fontSize: 14,
  },
  // Adicione estes estilos ao seu StyleSheet.create()
searchContainer: {
  flexDirection: 'row',
  padding: 15,
  alignItems: 'center',
},
searchBar: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 25,
  paddingHorizontal: 15,
  height: 50,
  borderWidth: 1,
  borderColor: '#153A90',
},
searchInput: {
  flex: 1,
  height: '100%',
  marginLeft: 10,
  color: '#153A90',
  outlineWidth: 0
},
searchIcon: {
  marginRight: 5,
},
clearButton: {
  padding: 5,
},
searchButton: {
  marginLeft: 10,
  backgroundColor: '#153A90',
  borderRadius: 25,
  paddingVertical: 12,
  paddingHorizontal: 20,
},
searchButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},

section: {
  paddingHorizontal: 15,
  marginBottom: 20,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#153A90',
  marginBottom: 15,
},
resultsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
petResultCard: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 10,
  marginBottom: 15,
  overflow: 'hidden',
  elevation: 3,
  borderWidth:2,
  borderColor:"lightgray",
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 5},
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
petResultImage: {
  width: '100%',
  height: 120,
  resizeMode: 'cover',
},
petResultInfo: {
  padding: 10,
},
petResultName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 5,
},
petResultDetails: {
  fontSize: 12,
  color: '#666',
  marginBottom: 3,
},
petResultLocation: {
  fontSize: 11,
  color: '#888',
  fontStyle: 'italic',
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
errorContainer: {
  padding: 20,
  alignItems: 'center',
},
errorText: {
  color: '#e7701d',
  fontSize: 16,
  textAlign: 'center',
},
// Estilos do modal (copiados do seu componente Home)
overlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  justifyContent: "center",
  alignItems: "center",
},
imgmodal:{
  width:350,
  height: 250
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
additionalImagesContainer: {
  flexDirection: 'row',
  paddingVertical: 10,
  paddingHorizontal: 5,
  backgroundColor: '#f8f8f8',
},
additionalImage: {
  width: 60,
  height: 60,
  borderRadius: 5,
  marginHorizontal: 5,
  borderWidth: 1,
  borderColor: '#ddd',
},
selectedAdditionalImage: {
  borderColor: '#E7701D',
  borderWidth: 2,
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
  fontSize: 14,
  fontWeight: "600",
  color: "#555",
},
infoValue: {
  flex: 1,
  fontSize: 14,
  color: "#333",
},
bioText: {
  fontSize: 14,
  color: "#444",
  lineHeight: 20,
  textAlign: "justify",
},
ongContainer: {
  backgroundColor: "#f0f7ff",
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
additionalImagesContainer: {
  flexDirection: 'row',
  marginVertical: 10,
  paddingHorizontal: 10,
},
additionalImage: {
  width: 60,
  height: 60,
  borderRadius: 8,
  marginRight: 10,
  borderWidth: 1,
  borderColor: '#ddd',
},
selectedAdditionalImage: {
  borderColor: '#e7701d',
  borderWidth: 2,
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
   loginModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  secondaryButtonText: {
    color: '#FF6B6B',
  },
   secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    marginTop: 10,
  },
});