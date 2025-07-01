import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Espaço para o footer
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


  navigationCards: {
    flexDirection: 'row',
    justifyContent:  'space-around',
    width: '90%',
    gap:20,
    padding:13,

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
    backgroundColor: "#E7701D",
    borderWidth: 2,
    borderColor: "rgba(109, 75, 11, 0.84)",
  },
  lostPetsCard: {
    backgroundColor: "#E7701D",
  },
  cardTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#E7701D',
      fontFamily:'monospace'
  },
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
  petsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  petCard: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding:2,
    marginVertical: 10,
    elevation: 3,
    alignItems: 'center',
  },
  petImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  petDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  bottomSpacer: {
    height: 20,
  },

  //modal Menu
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    alignItems: 'center',
    paddingBottom: 20, // espaço extra no final
  },
    vModal: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
      justifyContent: "center",
      alignItems: "center",
    },
    modalViewMenu: {
      width: "85%",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    menuTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 15,
    },
    menuButton: {
      backgroundColor: "#e7701d",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 8,
    },
    menuButtonSecondary: {
      backgroundColor: "#6c757d",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 8,
    },
    menuText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    menuCategory: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#e7701d",
      marginTop: 10,
      marginBottom: 5,
    },
    menuItem: {
      fontSize: 16,
      color: "black",
      paddingVertical: 6,
    },
    menuLink: {
      fontSize: 16,
      color: "#dc3545", // Vermelho para destaque
      fontWeight: "bold",
      paddingVertical: 6,
    },
    buttonClose: {
      backgroundColor: "#dc3545",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 15,
    },
    textStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },

  



  // modal pet
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  content: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  ongContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  ongTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },

  categ:{
   alignItems:'center',
    marginTop:5,
    
  },
  categg:{
    color:'#153A90',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily:'monospace',

    
    
  
  },
  carouselContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  carouselImage: {
    width: '90%',
    height: 180,
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
});