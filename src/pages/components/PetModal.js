import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";

const { width, height } = Dimensions.get("window");

const PetModal = ({
  visible,
  onClose,
  selectedPet,
  showAdoption,
  setSelectedPet,
}) => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [temInteresse, setTemInteresse] = useState(false);
  const [interesseId, setInteresseId] = useState(null);
  const [loadingInteresse, setLoadingInteresse] = useState(false);
  const [verificandoInteresse, setVerificandoInteresse] = useState(false);

  // Verificar interesse quando o modal abrir
  useEffect(() => {
    if (visible && selectedPet && showAdoption) {
      verificarInteresseExistente();
    }
  }, [visible, selectedPet, showAdoption]);

  // Função para verificar se o usuário já tem interesse no animal
  const verificarInteresseExistente = async () => {
    try {
      setVerificandoInteresse(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) return;

      const response = await axios.get(
        `http://localhost:8000/api/interesse/verificar?idAnimal=${selectedPet.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTemInteresse(response.data.temInteresse);
        if (response.data.interesse) {
          setInteresseId(response.data.interesse.idInteresse);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar interesse:", error);
    } finally {
      setVerificandoInteresse(false);
    }
  };

  // Função para registrar interesse
  const registrarInteresse = async () => {
    try {
      setLoadingInteresse(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert(
          "Erro",
          "Você precisa estar logado para demonstrar interesse."
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/interesse/registrar",
        {
          idAnimal: selectedPet.id,
          observacoes: "Interesse demonstrado através do aplicativo",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTemInteresse(true);
        setInteresseId(response.data.interesse.idInteresse);

        Alert.alert(
          "Sucesso!",
          "Seu interesse foi registrado! A ONG será notificada e entrará em contato com você.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Erro ao registrar interesse:", error);

      let mensagem = "Erro ao registrar interesse. Tente novamente.";
      if (error.response?.data?.message) {
        mensagem = error.response.data.message;
      }

      Alert.alert("Erro", mensagem);
    } finally {
      setLoadingInteresse(false);
    }
  };

  // Função para cancelar interesse
  const cancelarInteresse = async () => {
    console.log("Função cancelarInteresse foi chamada!");

    try {
      setLoadingInteresse(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:8000/api/interesse/cancelar",
        { idAnimal: selectedPet.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do backend:", response.data);

      if (response.data.success) {
        setTemInteresse(false);
        setInteresseId(null);
        Alert.alert("Sucesso", "Interesse cancelado com sucesso.");
      } else {
        Alert.alert(
          "Erro",
          response.data.message || "Erro ao cancelar interesse."
        );
      }
    } catch (error) {
      console.error("Erro ao cancelar interesse:", error);
      Alert.alert("Erro", "Erro ao cancelar interesse. Tente novamente.");
    } finally {
      setLoadingInteresse(false);
    }
  };

  if (!selectedPet) return null;

  const formatPhoneNumber = (phone) => {
    if (!phone) return "Não informado";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const handleActionButton = () => {
    if (showAdoption) {
      if (temInteresse) {
        cancelarInteresse();
      } else {
        registrarInteresse();
      }
    } else {
      setConfirmationVisible(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
  };

  const renderActionButton = () => {
    if (!showAdoption) {
      return (
        <Pressable
          style={[styles.actionButton, styles.lostActionButton]}
          onPress={handleActionButton}
        >
          <Icon name="phone" size={16} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.actionButtonText}>Entrar em Contato</Text>
        </Pressable>
      );
    }

    // Para animais em adoção
    if (verificandoInteresse) {
      return (
        <View style={[styles.actionButton, styles.loadingButton]}>
          <ActivityIndicator size="small" color="white" />
          <Text style={[styles.actionButtonText, { marginLeft: 8 }]}>
            Verificando...
          </Text>
        </View>
      );
    }

    if (loadingInteresse) {
      return (
        <View style={[styles.actionButton, styles.loadingButton]}>
          <ActivityIndicator size="small" color="white" />
          <Text style={[styles.actionButtonText, { marginLeft: 8 }]}>
            {temInteresse ? "Cancelando..." : "Registrando..."}
          </Text>
        </View>
      );
    }

    if (temInteresse) {
      return (
        <Pressable
          style={[styles.actionButton, styles.cancelInterestButton]}
          onPress={handleActionButton}
        >
          <Icon name="times" size={16} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.actionButtonText}>Cancelar Interesse</Text>
        </Pressable>
      );
    }

    return (
      <Pressable style={styles.actionButton} onPress={handleActionButton}>
        <Icon name="heart" size={16} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.actionButtonText}>Tenho Interesse</Text>
      </Pressable>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.headerModal}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="times" size={20} color="#fff" />
            </Pressable>
            <Text style={styles.title}>
              {showAdoption ? "DETALHES PARA ADOÇÃO" : "ANIMAL PERDIDO"}
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Container da Imagem Principal */}
            <View style={styles.imageContainer}>
              <Image
                source={selectedPet.image}
                style={styles.modalPetImage}
                resizeMode="cover"
                defaultSource={require("./../../../assets/cao.png")}
              />

              {/* Badge de Idade */}
              <View style={styles.ageBadge}>
                <Text style={styles.ageBadgeText}>{selectedPet.age}</Text>
              </View>

              {/* Badge de Status para animais perdidos */}
              {!showAdoption && (
                <View style={styles.statusBadge}>
                  <Icon name="exclamation-circle" size={12} color="#fff" />
                  <Text style={styles.statusBadgeText}>PERDIDO</Text>
                </View>
              )}

              {/* Badge de Interesse para adoção */}
              {showAdoption && temInteresse && (
                <View style={styles.interestBadge}>
                  <Icon name="heart" size={12} color="#fff" />
                  <Text style={styles.interestBadgeText}>
                    INTERESSE REGISTRADO
                  </Text>
                </View>
              )}
            </View>

            {/* Nome do Pet */}
            <View style={styles.petNameContainer}>
              <Text style={styles.petName}>{selectedPet.name}</Text>
              <Text style={styles.petSpecies}>
                {selectedPet.especie} • {selectedPet.raca}
              </Text>
            </View>

            {/* Imagens Adicionais */}
            {selectedPet?.additionalImages?.length > 0 && (
              <View style={styles.additionalImagesContainer}>
                <Text style={styles.sectionTitle}>
                  <Icon name="images" size={14} color="#153A90" /> Mais Fotos
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.additionalImagesScroll}
                >
                  {selectedPet.additionalImages.map((img, index) => {
                    const isSelected =
                      (selectedPet.image.uri &&
                        img.uri &&
                        selectedPet.image.uri === img.uri) ||
                      selectedPet.image === img;

                    return (
                      <Pressable
                        key={index}
                        onPress={() =>
                          setSelectedPet({ ...selectedPet, image: img })
                        }
                        style={styles.thumbnailContainer}
                      >
                        <Image
                          source={img}
                          style={[
                            styles.thumbnailImage,
                            isSelected && styles.selectedThumbnail,
                          ]}
                          defaultSource={require("./../../../assets/cao.png")}
                        />
                        {isSelected && (
                          <View style={styles.selectedOverlay}>
                            <Icon name="check" size={16} color="#fff" />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View style={styles.content}>
              {/* Informações Básicas */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Icon name="info-circle" size={16} color="#153A90" />
                  <Text style={styles.cardTitle}>Informações Básicas</Text>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Porte</Text>
                    <Text style={styles.infoValue}>{selectedPet.porte}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Pelagem</Text>
                    <Text style={styles.infoValue}>{selectedPet.pelagem}</Text>
                  </View>
                </View>
              </View>

              {/* Seção específica para animais perdidos */}
              {!showAdoption && (
                <View style={[styles.infoCard, styles.lostPetCard]}>
                  <View style={styles.cardHeader}>
                    <Icon name="search" size={16} color="#FF3B30" />
                    <Text style={[styles.cardTitle, { color: "#FF3B30" }]}>
                      Informações do Desaparecimento
                    </Text>
                  </View>

                  <View style={styles.lostDateContainer}>
                    <Icon name="calendar-alt" size={14} color="#FF3B30" />
                    <Text style={styles.lostDateTime}>
                      {selectedPet.lostDateTime}
                    </Text>
                  </View>

                  {selectedPet.details && (
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailsLabel}>
                        Detalhes do desaparecimento:
                      </Text>
                      <Text style={styles.detailsText}>
                        {selectedPet.details}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Biografia */}
              {selectedPet?.bio &&
                selectedPet.bio !== "Descrição não disponível" && (
                  <View style={[styles.infoCard, styles.bioCard]}>
                    <View style={styles.cardHeader}>
                      <Icon name="heart" size={16} color="#E7701D" />
                      <Text style={[styles.cardTitle, { color: "#E7701D" }]}>
                        Sobre {selectedPet.name}
                      </Text>
                    </View>
                    <Text style={styles.bioText}>{selectedPet.bio}</Text>
                  </View>
                )}

              {/* Informações da ONG (apenas para adoção) */}
              {selectedPet?.ongName && showAdoption && (
                <View style={[styles.infoCard, styles.ongCard]}>
                  <View style={styles.cardHeader}>
                    <Icon name="home" size={16} color="#28a745" />
                    <Text style={[styles.cardTitle, { color: "#28a745" }]}>
                      Informações da ONG
                    </Text>
                  </View>

                  <View style={styles.ongInfo}>
                    <View style={styles.contactRow}>
                      <Icon name="building" size={14} color="#153A90" />
                      <Text style={styles.contactText}>
                        {selectedPet.ongName}
                      </Text>
                    </View>

                    <View style={styles.contactRow}>
                      <Icon name="phone" size={14} color="#153A90" />
                      <Text style={styles.contactText}>
                        {formatPhoneNumber(selectedPet.ongContact)}
                      </Text>
                    </View>

                    <View style={styles.contactRow}>
                      <Icon name="map-marker-alt" size={14} color="#153A90" />
                      <Text style={styles.contactText}>
                        {selectedPet.location}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Informação adicional para interesse */}
              {showAdoption && temInteresse && (
                <View style={[styles.infoCard, styles.interestCard]}>
                  <View style={styles.cardHeader}>
                    <Icon name="check-circle" size={16} color="#10b981" />
                    <Text style={[styles.cardTitle, { color: "#10b981" }]}>
                      Interesse Registrado
                    </Text>
                  </View>
                  <Text style={styles.interestText}>
                    Você demonstrou interesse neste animal! A ONG foi notificada
                    e entrará em contato com você em breve.
                  </Text>
                </View>
              )}
            </View>

            {/* Footer com botão de ação */}
            <View style={styles.footer}>{renderActionButton()}</View>
          </ScrollView>
        </View>
      </View>

      {/* Modal de Confirmação para animais perdidos */}
      <ConfirmationModal
        visible={confirmationVisible}
        onClose={handleCloseConfirmation}
        type="contact"
        contactInfo={{
          ownerName: selectedPet.ownerName,
          contact: formatPhoneNumber(selectedPet.contact),
          location: selectedPet.location,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal Base
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: width * 0.92,
    maxHeight: height * 0.88,
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },

  // Header
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#153A90",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5,
    fontFamily: "monospace",
  },

  // Scroll
  modalScroll: {
    flex: 1,
  },

  // Imagem Principal
  imageContainer: {
    position: "relative",
    backgroundColor: "#f8f9fa",
  },

  modalPetImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },

  ageBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(21, 58, 144, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  ageBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "monospace",
  },

  statusBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(255, 59, 48, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  statusBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 5,
    letterSpacing: 0.5,
  },

  interestBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(16, 185, 129, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  interestBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 5,
    letterSpacing: 0.5,
  },

  // Nome do Pet
  petNameContainer: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  petName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#153A90",
    textAlign: "center",
    fontFamily: "monospace",
    marginBottom: 5,
  },

  petSpecies: {
    fontSize: 16,
    color: "#6c757d",
    fontWeight: "500",
  },

  // Imagens Adicionais
  additionalImagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  additionalImagesScroll: {
    paddingVertical: 10,
  },

  thumbnailContainer: {
    marginRight: 12,
    position: "relative",
  },

  thumbnailImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#dee2e6",
  },

  selectedThumbnail: {
    borderColor: "#E7701D",
    borderWidth: 3,
  },

  selectedOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#E7701D",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // Conteúdo
  content: {
    padding: 20,
  },

  // Cards de Informação
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  lostPetCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
    backgroundColor: "#fff8f8",
  },

  bioCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#E7701D",
    backgroundColor: "#fffaf8",
  },

  ongCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
    backgroundColor: "#f8fff8",
  },

  interestCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
    backgroundColor: "#f0fdf4",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#153A90",
    marginLeft: 8,
    fontFamily: "monospace",
  },

  // Seção de Informações
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#153A90",
    marginBottom: 10,
    fontFamily: "monospace",
  },

  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoItem: {
    flex: 1,
    marginHorizontal: 5,
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 15,
    color: "#212529",
    fontWeight: "500",
    fontFamily: "monospace",
  },

  // Animais Perdidos
  lostDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#FF3B30",
  },

  lostDateTime: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },

  detailsContainer: {
    marginBottom: 15,
  },

  detailsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },

  detailsText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
    fontStyle: "italic",
  },

  // Contato
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  contactText: {
    fontSize: 14,
    color: "#212529",
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
  },

  // ONG
  ongInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
  },

  // Biografia
  bioText: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    textAlign: "justify",
    fontFamily: "monospace",
  },

  // Interesse
  interestText: {
    fontSize: 14,
    color: "#059669",
    lineHeight: 20,
    textAlign: "center",
    fontStyle: "italic",
  },

  // Footer
  footer: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },

  actionButton: {
    backgroundColor: "#E7701D",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#E7701D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  lostActionButton: {
    backgroundColor: "#FF3B30",
    shadowColor: "#FF3B30",
  },

  cancelInterestButton: {
    backgroundColor: "#ef4444",
    shadowColor: "#ef4444",
  },

  loadingButton: {
    backgroundColor: "#6b7280",
    shadowColor: "#6b7280",
  },

  buttonIcon: {
    marginRight: 8,
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default PetModal;
