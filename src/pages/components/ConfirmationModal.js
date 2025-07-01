import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const ConfirmationModal = ({ visible, onClose, type, contactInfo }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Ícone de Sucesso */}
          <View style={styles.iconContainer}>
            <Icon 
              name={type === 'adoption' ? "heart" : "phone"} 
              size={40} 
              color="#153A90" 
            />
          </View>

          {/* Título e Mensagem */}
          <Text style={styles.title}>
            {type === 'adoption' 
              ? 'Solicitação Enviada!' 
              : 'Informações de Contato'}
          </Text>
          
          {type === 'adoption' ? (
            <Text style={styles.message}>
              Sua solicitação de adoção foi enviada com sucesso para a ONG.
              Em breve eles entrarão em contato com você!
            </Text>
          ) : (
            <View style={styles.contactContainer}>
              <View style={styles.contactRow}>
                <Icon name="user" size={16} color="#153A90" />
                <Text style={styles.contactText}>{contactInfo.ownerName}</Text>
              </View>
              
              <View style={styles.contactRow}>
                <Icon name="phone" size={16} color="#153A90" />
                <Text style={styles.contactText}>{contactInfo.contact}</Text>
              </View>

             
            </View>
          )}

          {/* Botão de Fechar */}
          <Pressable 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#153A90',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  message: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  contactContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#2d3748',
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#153A90',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationModal; 