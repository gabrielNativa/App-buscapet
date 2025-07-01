import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PostItem({ post }) {
  const [expanded, setExpanded] = useState(false);
  const maxLines = 2;

  return (
    <View style={styles.postItem}>
      {/* Cabeçalho da ONG */}
      {post.ong && (
        <View style={styles.ongHeader}>
          {post.ong.fotoOng ? (
            <Image source={{ uri: post.ong.fotoOng }} style={styles.ongLogo} />
          ) : (
            <View style={[styles.ongLogo, styles.ongPlaceholder]}>
              <Icon name="user" size={18} color="#666" />
            </View>
          )}
          <Text style={styles.ongName}>{post.ong.nomeOng}</Text>
        </View>
      )}

      {/* Título do post */}
      <Text style={styles.title}>{post.title}</Text>

      {/* Imagem do post */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Descrição */}
      <Text
        style={styles.description}
        numberOfLines={expanded ? undefined : maxLines}
      >
        {post.description}
      </Text>

      {/* Botão expandir/recolher */}
      {post.description && post.description.length > 120 && (
        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text style={{ color: '#3498db', fontSize: 12, marginLeft: 15 }}>
            {expanded ? 'Mostrar menos' : 'Ver descrição completa'}
          </Text>
        </Pressable>
      )}

      {/* Rodapé com data e interações */}
      <View style={styles.postFooter}>
        <View style={styles.interactionContainer}>
          <View style={styles.interactionIcon}>
            <Icon name="thumbs-up" size={14} color="#666" />
            <Text style={styles.interactionCount}>{post.likes || 0}</Text>
          </View>
          <View style={styles.interactionIcon}>
            <Icon name="comment" size={14} color="#666" />
            <Text style={styles.interactionCount}>{post.saves || 0}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>
          {new Date(post.created_at).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 12,
    marginBottom: 20,
  },
  ongHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
  },
  ongLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ongPlaceholder: {
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ongName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 15,
    paddingVertical: 10,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  interactionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  interactionCount: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    color: '#666',
    fontSize: 12,
  },
});
