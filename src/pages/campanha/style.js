import { VideoPlayer } from 'expo-video';
import { StyleSheet, Dimensions, Platform } from 'react-native'; 
const tabIndicatorWidth = screenWidth / 2 - 60;
const screenWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window'); 
const primaryColor = '#E7701D'; // Laranja
const secondaryColor = '#153A90'; // Azul (Usado em Campanhas, NÃO MEXER)
const whiteColor = '#FFFFFF';
const blackColor = '#000000';
const grayLight = '#f0f0f0';
const grayMedium = '#aaa';
const grayDark = '#666';
const textPrimaryColor = '#333'; // Cor de texto principal (usado em ambos? Cuidado)
const textSecondaryColor = '#fff'; // Cor de texto secundária (branco, usado em Reels)
const shadowColor = 'rgba(0, 0, 0, 0.5)';

export default StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    containerLo: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    expandButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    expandButtonText: {
        color: '#3498db',
        fontSize: 12,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
        marginBottom:60
    },
    containerPosts: {
        flex: 1,
        padding: 5,
    },
    postItem: { 
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: 'black',
        borderWidth: 2,
        borderColor: "lightgray",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        paddingBottom: 12,
        marginBottom: 20,
        marginHorizontal: 16,
    },
    ongHeader: { 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    ongLogo: { 
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    ongLogoPlaceholder: { 
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    ongName: { 
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    postTitle: { 
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingBottom: 8,
        color: '#333',
    },
    postImage: { 
        width: '100%',
        height: 200,
        resizeMode: 'contain' 
    },
    postDescription: { 
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 12,
        paddingVertical: 8,
        lineHeight: 20,
    },
    postFooter: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 8,
    },
    commentIconButton: { 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    commentCountText: { 
        marginLeft: 4,
        color: '#666',
        fontSize: 14,
    },
    interactionContainer: { 
        flexDirection: 'row',
        alignItems:'center',
        marginHorizontal:15,
        justifyContent:'space-between'
    },
    lkCm:{ 
        flexDirection:'row',
        gap:16
    },
    
    interactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    interactionText: {
        fontSize: 12,
        color: '#666',
    },
    commentsContainer: { 
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        maxHeight: 200,
    },
    postDate: { 
        fontSize: 12,
        color: '#999',
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 200, 
    },
    noPostsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingContentArea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingAnimation: {
        width: 150,
        height: 150,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: secondaryColor, // Cor de Campanha
        textAlign: 'center',
        marginTop: 20,
    },
   
    commentUser: { 
        fontWeight: 'bold',
        marginRight: 5,
        color: '#262626',
    },
    commentText: { 
        flex: 1,
        color: '#262626',
    },
    commentInputContainer: { 
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        alignItems: 'center',
    },
    commentInput: { 
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginRight: 10,
        maxHeight: 50,
         outlineWidth: 0, 
    },
    postButton: { 
        padding: 8,
    },
    postButtonText: { 
        color: '#0095f6',
        fontWeight: 'bold',
    },
    noComments: { 
        textAlign: 'center',
        color: '#8e8e8e',
        paddingVertical: 10,
    },
     loginModal: { 
        backgroundColor: 'white',
        padding: 20,
        margin: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 350, 
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
        width: '100%', 
        alignItems: 'center',
        marginBottom: 10,
    },
    loginModalButtonText: { 
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: { 
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
    secondaryButton: { 
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF6B6B',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%', 
        alignItems: 'center',
    },
  
    modalContent: { 
        width: '100%',
        alignItems: 'center',
    },

    categ: { 
        alignItems: 'center',
        marginTop: 10,
    },
    categg: { 
        color: '#E7701D',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },

   
    navigationCards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        gap: 20,
        padding: 13,
        marginVertical: 15,
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
    campaignCard: {
        backgroundColor: secondaryColor, // Cor de Campanha
        borderWidth: 2,
        borderColor: secondaryColor,
    },
    reelsCard: { 
        backgroundColor: primaryColor,
        borderWidth: 2,
        borderColor: primaryColor,
    },
    cardTextContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: secondaryColor, 
        fontFamily: Platform.OS === 'ios' ? 'System' : 'monospace',
    },
   activeCard: {},
    inactiveCard: {
        opacity: 0.6,
    },

   
    sectionBanner: {
        
        width: '90%',
        height:80,
        backgroundColor: '#E7701D',
        paddingVertical: 12,
        borderRadius: 15,
        marginVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    contentContainer: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
    },

    titleContainer: {
        backgroundColor: '#E7701D',
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingTop: 20,
    },

    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        gap: 8,
    },

    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },

    indicatorActive: {
        backgroundColor: '#fff',
        width: 20,
    },

    swipeHint: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 4,
        marginBottom: 8,
    },

    // --- REELS STYLES --- //

  reelsContainer: {
        flex: 1,
        backgroundColor: blackColor,
        // width: '100%', // FlatList gerencia a largura
        // height: height, // FlatList gerencia a altura
    },

  reelCardContainer: { // Container de cada Reel individual na FlatList
        width: width,
        height: height, // Ocupa a tela toda
        backgroundColor: blackColor,
        position: 'relative',
        // Alinha conteúdo (descrição, botões) na parte inferior
    },
     videoContainer: {
    flex: 1, // Ocupa todo o espaço disponível entre cabeçalho e rodapé
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },

    videoWrapper: {
  width: '100%',
  height: '90%',
  justifyContent: 'center',
  alignItems: 'center',
},
    imgmodal:{
        width:350,
        height: 250
      },
    reelsContainer: {
        flex: 1,
        backgroundColor: blackColor,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

     reelHeader: { // Cabeçalho com info do usuário
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40, // Ajuste para safe area
        left: 15,
        right: 15,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
      userInfoContainer: { // Container da info do usuário
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop :80
    },
     userAvatar: { // Avatar do usuário no Reel
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: primaryColor,
    },
    userTextContainer: { // Container para nome e pet
        flexShrink: 1,
    },
 
    userName: { // Nome do usuário no Reel
        color: textSecondaryColor,
        fontWeight: 'bold',
        fontSize: 15,
        textShadowColor: shadowColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    petName: { // Nome do pet no Reel
        color: primaryColor,
        fontSize: 13,
        fontWeight: '500',
        textShadowColor: shadowColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    menuButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
    },

    reelDescription: { // Descrição do Reel
        flex: 1, // Ocupa espaço disponível à esquerda
        color: textSecondaryColor,
        fontSize: 18,
        lineHeight: 20,
        marginBottom: 10,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.1)', // Fundo sutil para legibilidade
        borderRadius: 8,
        textShadowColor: shadowColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        // Espaço antes dos botões
    },
     reelDescription1: { // Descrição do Reel
        flex: 1, // Ocupa espaço disponível à esquerda
        justifyContent: 'center',
        alignContent: 'flex-start',
        marginBottom: 150, 
        
        
       
        // Espaço antes dos botões
    },
  reelFooter: { // Container dos botões de interação (lateral direita)
        zIndex: 2,
        alignItems: 'center',
        bottom: 280,
        
        
    },
   
    interactionButtons2: {
        alignItems: 'center',
       gap: 10,
    },
  
    interactionButton2: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    interactionText2: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    interactionButtonActive2: {
        backgroundColor: 'rgba(231, 112, 29, 0.3)',
    },
    interactionTextActive: {
        color: '#E7701D',
    },
    bookmarkButton: { 
        alignItems: 'center',
    },

    durationBadge: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 1,
    },
    durationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    viewsBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    viewsText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },

    // --- botao voador--- //
    floatingButton: {
        position: 'absolute',
        bottom: 80, 
        right: 20,
        backgroundColor: '#E7701D',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 999,
    },
    floatingButtonPressed: { 
        backgroundColor: '#C7500D',
    },

    // --- Criar Reel Modal  --- //
    createVideoModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#E7701D',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    modalCloseButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    submitButton: {
        backgroundColor: '#E7701D',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 24,
        flexDirection: 'row',
        shadowColor: '#E7701D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 10,
        letterSpacing: 0.5,
    },
    modalHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createVideoModalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
        marginLeft: 10,
    },
    uploadContainer: {
        borderWidth: 2,
        borderColor: '#e1e5e9',
        borderStyle: 'dashed',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: 220,
    },
    uploadText: {
        fontSize: 16,
        color: '#666',
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    uploadSubtext: {
        fontSize: 13,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
        lineHeight: 18,
    },
    formGroup: {
        marginBottom: 24,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#2c2c2c',
        letterSpacing: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInput: {
        borderWidth: 2,
        borderColor: '#e1e5e9',
        borderRadius: 16,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
        color: '#2c2c2c',
        fontWeight: '400',
    },
    createVideoModalContent: {
        backgroundColor: '#FFFFFF',
        width: '92%',
        maxWidth: 520,
        maxHeight: '90%',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 20,
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7701D',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    changeButtonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    uploadOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },

    loadingIndicator: {
        marginRight: 10,
    },

    addButton: {
      
        backgroundColor: '#E7701D',
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    addButtonIcon: {
  
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    charCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },

    uploadOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        opacity: 0,
    },

    uploadContainerWithPreview: {
        borderStyle: 'solid',
        borderColor: '#E7701D',
        padding: 4,
        overflow: 'hidden',
        backgroundColor: '#000',
    },

    uploadContainer: {
        borderWidth: 2,
        borderColor: '#e1e5e9',
        borderStyle: 'dashed',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: 220,
        position: 'relative',
    },

    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(231, 112, 29, 0.9)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },

    changeButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
    },

    createVideoModalBody: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
        lineHeight: 22,
    },
    videoPreview: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 16,
    },
    submitButtonDisabled: {
        backgroundColor: '#cccccc',
        opacity: 0.6,
        shadowOpacity: 0,
        elevation: 0,
    },

    muteButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },

    videoContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        position: 'relative',
    },
     videoOverlay: { // Overlay para botão de play/pause
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    playButton: { // Botão de play centralizado
        padding: 20,
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    // Estilos para os botões de pesquisa
    searchButtonContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1000,
    },
    searchButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchButtonReels: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    searchButtonCampaigns: {
        backgroundColor: '#E7701D',
    },

    // Estilos para inputs de pesquisa
    campaignSearchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterButton: {
        position: 'absolute',
        top: 3,
        left:15,
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
       
        elevation: 5,
    },
   
    filterModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    filterModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 15,
        maxHeight: '80%',
    },
    filterModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeFilterButton: {
        padding: 5,
    },
    categoriesList: {
        paddingVertical: 10,
    },
    categoryItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedCategoryItem: {
        backgroundColor: '#E7701D20',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    selectedCategoryText: {
        color: '#E7701D',
        fontWeight: 'bold',
    },
    reelsSearchContainer: { // Container da barra de pesquisa
        padding: 15,
        backgroundColor: whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: grayLight,
    },
     reelsSearchInputContainer: { // Input de pesquisa
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: grayLight,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Ajuste de padding
    },
     reelsSearchIcon: { // Ícone de lupa
        marginRight: 10,
        color: grayDark,
    },
reelsSearchInput: { // Texto do input
        flex: 1,
        fontSize: 16,
        color: textPrimaryColor,
        outlineWidth: 0, // Para web
    },
    searchIcon: {
        marginRight: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },

    // Botão de pesquisa dos reels
    reelsSearchButton: {
        position: 'absolute',
        top: 3,
        right: 15,
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    commentUserAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUserName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
   
  
  
    commentSubmitButton: {
        padding: 8,
    },
   
    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    searchContainer: {
  position: 'absolute',
  top: 50,
  left: 0,
  right: 0,
  zIndex: 100,
  paddingTop: 15,
  paddingHorizontal: 15,
  paddingBottom: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
},
searchInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 25,
  paddingHorizontal: 15,
  height: 50,
},
searchInput: {
  flex: 1,
  color: '#153A90',
  fontSize: 16,
  marginLeft: 10,
  height: '100%',
},
clearButton: {
  padding: 5,
},
gridContainer: {
  padding: 10,
  gap: 10,
},

reelThumbnailWrapper: {
  flex: 1 / 3,
  aspectRatio: 9 / 16,
  padding: 4,
},
  clearSearchButton: { // Botão 'X' para limpar busca
        padding: 8, // Aumenta área de toque
    },

reelThumbnail: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
  backgroundColor: '#ccc',
},

fullScreenReelContainer: {
  flex: 1,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
},

reelsRecentSearchContainer: { // Container das pesquisas recentes
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: whiteColor,
    },
    reelsRecentSearchHeader: { // Cabeçalho das pesquisas recentes
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12, // Mais espaço abaixo
    },
     reelsRecentSearchTitle: { // Título "Recentes"
        fontSize: 16,
        fontWeight: 'bold',
        color: textPrimaryColor,
    },
     reelsClearButton: { // Botão "Limpar"
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    reelsClearButtonText: { // Texto "Limpar"
        fontSize: 13,
        color: primaryColor,
        fontWeight: '500',
    },
     reelsRecentSearchItem: { // Item individual de pesquisa recente
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14, // Mais espaço vertical
        borderBottomWidth: 1,
        borderBottomColor: grayLight,
    },
    reelsRecentSearchIcon: { // Ícone de relógio
        marginRight: 15,
        color: grayMedium,
    },
     reelsRecentSearchText: { // Texto da pesquisa recente
        fontSize: 15,
        color: textPrimaryColor,
    },
     reelsSearchResultsContainer: { // Container dos resultados da pesquisa
        flex: 1,
        backgroundColor: whiteColor,
    },
    reelsSearchResultItem: { // Item individual do resultado da pesquisa
        flexDirection: 'row',
        alignItems: 'center',
          justifyContent:'center',

        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: grayLight,
    },
     reelsSearchResultThumbnail: { // Miniatura do vídeo no resultado
        width: 55, // Miniatura um pouco menor
        height: 75, // Ajuste de proporção
        borderRadius: 8,
        marginRight: 15,
        backgroundColor: grayLight,
        overflow: 'hidden', // Garante que o vídeo não saia da borda
    },
    reelsSearchResultThumbnailVideo: { // Estilo para o <Video> dentro da miniatura
        width: '100%',
        height: '100%',
    },
     reelsSearchResultInfo: { // Informações (título, usuário) ao lado da miniatura
        flex: 1,
    },
    reelsSearchResultTitle: { // Título do Reel no resultado
        fontSize: 15,
        fontWeight: 'bold',
        color: textPrimaryColor,
        marginBottom: 4, // Espaço abaixo do título
    },
     reelsSearchResultUser: { // Nome do usuário no resultado
        fontSize: 13,
        color: grayDark,
    },
    reelsSearchNotFound: { // Mensagem de "Nenhum resultado"
        textAlign: 'center',
        marginTop: 40, // Mais espaço acima
        fontSize: 16, // Fonte maior
        color: grayDark,
        paddingHorizontal: 20,
    },
    noReelsContainer: { // Container para quando não há reels (feed principal)
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: blackColor,
    },
    noReelsIcon: {
        marginBottom: 15,
    },
    noReelsText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: grayMedium,
        textAlign: 'center',
        marginBottom: 5,
    },
    noReelsSubtext: {
        fontSize: 14,
        color: grayDark,
        textAlign: 'center',
    },
    fullScreenModal: { // O Modal em si
        flex: 1,
        backgroundColor: blackColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    fullScreenCloseButton: { // Botão 'X' para fechar o fullscreen
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 15,
        zIndex: 15, // Acima de outros elementos
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    // Reutilizar estilos de overlay, descrição e botões do ReelItem para consistência
    // Adicionar prefixo 'fullScreen' para evitar conflitos se necessário, mas idealmente reutilizar
    fullScreenOverlayContent: { // Container da descrição e botões no fullscreen
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 90 : 70,
        left: 15,
        right: 15,
        zIndex: 10, // Abaixo do botão de fechar
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    fullScreenDescription: { // Descrição no fullscreen (reutiliza reelDescription)
        flex: 1, 
        color: textSecondaryColor,
        fontSize: 14, 
        lineHeight: 20,
        marginBottom: 10, 
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 8,
        textShadowColor: shadowColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginRight: 10, 
    },
    fullScreenFooter: { // Container dos botões laterais no fullscreen (reutiliza reelFooter)
        zIndex: 10,
        alignItems: 'center', 
    },
    videoPlayer:{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',   
    },

searchResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Alinha as miniaturas à esquerda
    paddingHorizontal: 5, // Pequeno padding para as bordas
    paddingTop: 10,
  },
  thumbnailContainer: {
    width: Dimensions.get('window').width / 3 - 6, // 3 colunas com espaçamento
    height: Dimensions.get('window').width / 3 * 1.5, // Proporção de um reel, ajuste conforme necessário
    margin: 3,
    backgroundColor: '#000', // Fundo preto para os vídeos
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Garante que o conteúdo não vaze
    borderRadius: 5, // Bordas arredondadas
  },
  thumbnailVideo: {
    width: '100%',
    height: '100%',
  },
  noSearchResultsText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  // Estilos para o modal do vídeo completo
  fullScreenVideoModal: {
    flex: 1,
    backgroundColor: 'black',
  
  },
 fullScreenVideo: {
  width: '100%',
  aspectRatio: 9/16, // Proporção vertical (9:16) como no TikTok
  maxHeight: '100%',
  backgroundColor: '#000',
},
fullScreenVideoList: {
  width: '100%',
  height: '100%',
},
fullScreenVideoItem: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  justifyContent: 'center',
  alignItems: 'center',
},
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20, // Ajuste para iOS e Android
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

searchModalContainer: {
  flex: 1,
  backgroundColor: '#F5F5F5',
},

searchHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingTop: Platform.OS === 'ios' ? 50 : 20,
  paddingBottom: 15,
  backgroundColor: '#153A90',
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
},

backButton: {
  padding: 8,
  marginRight: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 20,
},

reelsSearchInputContainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 25,
  paddingHorizontal: 16,
  height: 40,
  marginRight: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},

searchInput: {
  flex: 1,
  color: '#333',
  fontSize: 16,
  paddingVertical: 8,
},

clearButton: {
  padding: 8,
},

recentSearchesContainer: {
  paddingTop: 20,
  paddingHorizontal: 16,
  backgroundColor: '#FFF',
  borderRadius: 20,
  margin: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
},

recentSearchesTitle: {
  color: '#153A90',
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 16,
  letterSpacing: 0.5,
  paddingHorizontal: 4,
},

recentSearchItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 4,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
  marginBottom: 4,
},

recentSearchContent: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F8F9FA',
  borderRadius: 12,
  padding: 10,
  marginRight: 10,
},

recentSearchText: {
  color: '#333',
  fontSize: 15,
  marginLeft: 12,
  flex: 1,
  fontWeight: '500',
},

clearRecentButton: {
  paddingVertical: 16,
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: '#F0F0F0',
  marginTop: 16,
  backgroundColor: '#FFF8F5',
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
},

clearRecentText: {
  color: '#E7701D',
  fontSize: 15,
  fontWeight: '600',
  letterSpacing: 0.3,
},

searchIcon: {
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E7701D15',
  borderRadius: 12,
  padding: 4,
},

deleteSearchButton: {
  padding: 8,
  borderRadius: 20,
  backgroundColor: '#F8F9FA',
},

deleteSearchIcon: {
  color: '#999',
},

noRecentSearches: {
  alignItems: 'center',
  padding: 20,
},

noRecentSearchesText: {
  color: '#666',
  fontSize: 15,
  textAlign: 'center',
  marginTop: 10,
},

searchResultsGrid: {
  padding: 2,
  backgroundColor: '#FFF',
},

thumbnailContainer: {
  width: '33.333%',
  aspectRatio: 0.5625,
  padding: 4,
  position: 'relative',
},

thumbnailImage: {
  width: '100%',
  height: '100%',
  backgroundColor: '#F5F5F5',
  borderRadius: 12,
},

thumbnailOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  justifyContent: 'space-between',
  padding: 8,
  borderRadius: 12,
},

thumbnailPlayIcon: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [{ translateX: -12 }, { translateY: -12 }],
  backgroundColor: 'rgba(231, 112, 29, 0.9)',
  borderRadius: 20,
  padding: 8,
},

thumbnailViews: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: '500',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 10,
},

noResultsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 100,
  backgroundColor: '#FFF',
  paddingHorizontal: 32,
},

noResultsText: {
  color: '#333',
  fontSize: 18,
  fontWeight: '600',
  marginTop: 24,
  textAlign: 'center',
},

noResultsSubtext: {
  color: '#666',
  fontSize: 14,
  marginTop: 8,
  textAlign: 'center',
  lineHeight: 20,
},

fullScreenVideoContainer: {
  flex: 1,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  
},

fullScreenContainer: {
  flex: 1,
  backgroundColor: "#000",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
},

closeFullScreenButton: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 44 : 16,
  left: 16,
  zIndex: 999,
  backgroundColor: 'rgba(231, 112, 29, 0.9)',
  borderRadius: 20,
  padding: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
},

reelOverlayContent: { // Container para descrição e botões laterais
  position: 'absolute',
  bottom: Platform.OS === 'ios' ? 90 : 70, // Ajuste para safe area / barra de navegação
  left: 15,
  right: 15,
  zIndex: 5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  
},
 tabNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
    paddingHorizontal: 10,
  },
  sideIconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minWidth: 100, // Garante largura mínima para centralização
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#E7701D',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 30,
    height: 3,
    backgroundColor: '#E7701D',
    borderRadius: 2,
    alignSelf: 'center',
  },




  reportButton: {
    padding: 8,
  },


  reportModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  reportModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  reportModalText: {
    marginBottom: 10,
  },
  reportOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedReportOption: {
    borderColor: '#E7701D',
    backgroundColor: '#FFF5EF',
  },
  reportOptionText: {
    fontSize: 14,
  },
  reportInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 80,
    marginBottom: 15,
  },
  reportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  reportButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#E7701D',
    marginHorizontal: 5,
  },
  cancelButton1: {
backgroundColor: '#153A90',  },
  cancelButtonText1: {
    color: '#333',
  },
  reportButtonText1:{
    color: '#fff',
  },
  closeSuccessButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#153A90',
  },
  
  disabledButton: {
    opacity: 0.5,
  },
   profileModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: height * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  profileModalHeader: {
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  closeProfileModalButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  profileAvatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileModalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#E7701D',
  },
  profileOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileModalUsername: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  profileModalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  profileStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  profileActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileActionButtonPrimary: {
    backgroundColor: '#E7701D',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowColor: '#E7701D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  profileActionButtonSecondary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E7701D',
  },
  profileActionButtonTextPrimary: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  profileActionButtonTextSecondary: {
    color: '#E7701D',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  profileTabs: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    backgroundColor: '#fafafa',
  },
  profileTab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  profileTabActive: {
    borderBottomColor: '#E7701D',
    backgroundColor: '#fff',
  },
  profileTabText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
  profileTabTextActive: {
    color: '#E7701D',
    fontWeight: '600',
  },
  profileContent: {
    flex: 1,
    paddingTop: 10,
  },
  profileContentItem: {
    width: (width - 40) / 3 - 4,
    height: (width - 40) / 3 - 4,
    margin: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  profileContentThumbnail: {
    width: '100%',
    height: '100%',
  },
  profileContentOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileLoadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
  profileEmptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  profileEmptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  profileEmptyText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  profileContentThumbnail: {
  width: '100%',
  height: 120,
  backgroundColor: '#eee'
},
videoPlaceholder: {
  width: '100%',
  height: '100%',
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  justifyContent: 'center',
  alignItems: 'center',
},
centeredModal: {
  backgroundColor: '#fff',
  borderRadius: 20,
  width: '90%',
  maxWidth: 400,
  maxHeight: '80%',
  overflow: 'hidden',
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},
closeButton: {
  padding: 5,
},
userInfo: {
  alignItems: 'center',
  padding: 20,
},
userAvatar1: {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: '#E7701D',
  marginBottom: 10,
},
username: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
messageButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF5EF',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
},
messageText: {
  color: '#E7701D',
  fontWeight: '600',
  marginLeft: 8,
},
gridContainer: {
  padding: 10,
},
gridRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 5,
},
reelTile: {
  width: '32%',
  aspectRatio: 0.8,
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
},

viewsBadge: {
  position: 'absolute',
  bottom: 5,
  left: 5,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.7)',
  borderRadius: 10,
  paddingHorizontal: 6,
  paddingVertical: 3,
},
viewsText: {
  color: '#fff',
  fontSize: 10,
  marginLeft: 4,
},
emptyState: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40,
},
emptyText: {
  marginTop: 10,
  color: '#666',
},
tabsContainer: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  marginBottom: 10,
},
tab: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 15,
},
activeTab: {
  borderBottomWidth: 2,
  borderBottomColor: '#E7701D',
},
tabText: {
  marginLeft: 8,
  color: '#666',
  fontWeight: '500',
},
activeTabText: {
  color: '#E7701D',
  fontWeight: 'bold',
},
liveVideoThumbnail: {
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  resizeMode:'contain'
},
videoTile: {
  width: '32%',
  aspectRatio: 0.8, // Proporção estilo TikTok
  marginBottom: 2,
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
},

viewCount: {
  color: '#fff',
  fontSize: 10,
  marginLeft: 4,
},

backButton1: {
  position: 'absolute',
  top: 40,
  left: 20,
  zIndex: 10,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 20,
  padding: 10,
},

fullScreenVideoPlayer: {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},

fullScreenVideoControls: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'space-between',
  padding: 16,
  zIndex: 10,
},

fullScreenBackButton: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 50 : 30,
  left: 15,
  zIndex: 20,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 20,
  padding: 10,
},

fullScreenUserInfo: {
  position: 'absolute',
  bottom: 100,
  left: 15,
  right: 15,
  zIndex: 10,
},

fullScreenInteractionButtons: {
  position: 'absolute',
  right: 15,
  bottom: 100,
  alignItems: 'center',
  zIndex: 10,
},

fullScreenInteractionButton: {
  marginBottom: 20,
  alignItems: 'center',
},

fullScreenInteractionIcon: {
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 12,
  borderRadius: 25,
  marginBottom: 5,
},

fullScreenInteractionText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
  textShadowColor: 'rgba(0,0,0,0.8)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},

fullScreenLoading: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 5,
},

successModalContainer: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 32,
  width: '85%',
  maxWidth: 350,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
successIconContainer: {
  marginBottom: 20,
},
successModalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 12,
},
successModalText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  lineHeight: 22,
  marginBottom: 24,
},
successModalButton: {
  backgroundColor: '#4CAF50',
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 12,
  minWidth: 120,
  alignItems: 'center',
  shadowColor: '#4CAF50',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
},
successModalButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},

// Estilos para o modal de denúncia (caso não existam)
reportModalContainer: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 24,
  width: '90%',
  maxWidth: 400,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
reportModalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 16,
},
reportModalText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  marginBottom: 24,
},
reportOptions: {
  marginBottom: 24,
},
reportOption: {
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderWidth: 1,
  borderColor: '#e1e5e9',
  borderRadius: 12,
  marginBottom: 8,
  backgroundColor: '#fff',
},
selectedReportOption: {
  borderColor: '#E7701D',
  backgroundColor: '#FFF3E0',
},
reportOptionText: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
},
reportButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 12,
},
reportButton: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E7701D',
},
cancelButton: {
  backgroundColor: '#f8f9fa',
  borderWidth: 1,
  borderColor: '#e1e5e9',
},
cancelButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#666',
},
reportButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},
disabledButton: {
  backgroundColor: '#e1e5e9',
},
reportButton1: {
  padding: 8,
  marginLeft: 'auto',
},
successModalContainer: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 32,
  width: '85%',
  maxWidth: 350,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
successIconContainer: {
  marginBottom: 20,
},
successModalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 12,
},
successModalText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  lineHeight: 22,
  marginBottom: 24,
},
successModalButton: {
  backgroundColor: '#4CAF50',
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 12,
  minWidth: 120,
  alignItems: 'center',
  shadowColor: '#4CAF50',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
},
successModalButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},
// Adicione isso na seção de estilos
commentOptionsButton: {
  padding: 5,
  marginLeft: 10,
},
commentOptionsIcon: {
  color: '#666',
},
commentActionsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

commentModalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.7)',
},
commentModalContainer: {
  width: '85%',
  maxWidth: 400,
  backgroundColor: '#FFF',
  borderRadius: 12,
  padding: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,
},
commentModalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
commentModalTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#E74C3C', // Vermelho diferente dos outros modais
  fontFamily: 'Inter-SemiBold', // Use sua fonte customizada
},
commentModalText: {
  fontSize: 16,
  lineHeight: 24,
  color: '#555',
  marginBottom: 24,
},
commentModalButtons: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 12,
},
commentModalButton: {
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 20,
  minWidth: 100,
  alignItems: 'center',
},
commentModalCancelButton: {
  backgroundColor: '#F1F3F5',
  borderWidth: 1,
  borderColor: '#DEE2E6',
},
commentModalDeleteButton: {
  backgroundColor: '#E74C3C',
},
commentModalButtonText: {
  fontSize: 16,
  fontWeight: '600',
},
commentModalCancelText: {
  color: '#495057',
},
commentModalDeleteText: {
  color: '#FFF',
},
});

