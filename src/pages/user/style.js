import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 60, 
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#153A90",
  },
  iconss:{
    color:"#153A90"
  },
  navIcon: {
    fontSize: 20,
    color: "#fff",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  profileHeader: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#153A90",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    color: "#e0e0e0",
    fontSize: 14,
    marginBottom: 10,
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
containerLo: {
  flex: 1,
  backgroundColor: '#fff',
},
mainContent: {
  flex: 1,  // Isso faz ocupar todo o espaço entre Header e Footer
  justifyContent: 'center',
},
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  optionIcon: {
    width: 24,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  optionArrow: {
    fontSize: 20,
    color: "#ccc",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    color: "#222",
    borderWidth: 1,
    borderColor: "#cadae4",
    marginBottom: 6,
  },
  preferenceItem: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#cadae4",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22
  },
  saveButton: {
    backgroundColor: "#153A90",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 18,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  securityContainer: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#cadae4",
    overflow: "hidden"
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ededed"
  },
  securityText: {
    fontSize: 16,
    color: "#222"
  },
  passwordSection: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: "#cadae4",
    marginBottom: 22
  },
  passwordButton: {
    backgroundColor: "#153A90",
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10
  },
  passwordButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
   centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 25,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: '80%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#333',
  textAlign: 'center',
},
modalText: {
  fontSize: 16,
  marginBottom: 20,
  textAlign: 'center',
  color: '#555',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  borderRadius: 10,
  padding: 12,
  elevation: 2,
  width: '48%',
  alignItems: 'center',
},
cancelButton: {
  backgroundColor: '#f1f1f1',
},
deleteButton: {
  backgroundColor: '#e74c3c',
},
cancelButtonText: {
  color: '#333',
  fontWeight: 'bold',
},
deleteButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
});