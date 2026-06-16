import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Character } from '../../types';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../constants/styles';

interface CharacterCardProps {
  item: Character;
  onPress: () => void;
}

export function CharacterCard({ item, onPress }: CharacterCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.card}>
      <View>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View
          style={[
            styles.statusDot,
            item.status === 'Dead' && styles.statusDead,
            item.status === 'unknown' && styles.statusUnknown,
          ]}
        />
      </View>
      <View style={styles.cardCopy}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardMeta}>{item.location?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 118,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: colors.glass,
    borderColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    ...globalStyles.shadow,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#dce7df',
  },
  statusDot: {
    position: 'absolute',
    right: -1,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2cc96f',
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusDead: {
    backgroundColor: '#ef5656',
  },
  statusUnknown: {
    backgroundColor: '#a9b0aa',
  },
  cardCopy: {
    flex: 1,
    marginLeft: 18,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },
  cardMeta: {
    color: '#81947f',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 4,
  },
});
