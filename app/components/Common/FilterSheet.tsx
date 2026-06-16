import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GENDERS, STATUS } from '../../constants/config';
import { colors } from '../../constants/colors';

interface FilterSheetProps {
  visible: boolean;
  statusFilter: string;
  genderFilter: string;
  onStatus: (status: string) => void;
  onGender: (gender: string) => void;
  onClose: () => void;
}

export function FilterSheet({
  visible,
  statusFilter,
  genderFilter,
  onStatus,
  onGender,
  onClose,
}: FilterSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.sheetBackdrop}>
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#243124" />
            </TouchableOpacity>
          </View>

          <Text style={styles.filterLabel}>Status</Text>
          <View style={styles.wrapRow}>
            {STATUS.map((item) => (
              <SheetChip
                key={item}
                label={item}
                active={statusFilter === item}
                onPress={() => onStatus(item)}
              />
            ))}
          </View>

          <Text style={styles.filterLabel}>Gender</Text>
          <View style={styles.wrapRow}>
            {GENDERS.map((item) => (
              <SheetChip
                key={item}
                label={item}
                active={genderFilter === item}
                onPress={() => onGender(item)}
              />
            ))}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Filters</Text>
            <Ionicons name="options-outline" size={22} color="#092116" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

interface SheetChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function SheetChip({ label, active, onPress }: SheetChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.sheetChip, active && styles.sheetChipActive]}>
      <Text style={[styles.sheetChipText, active && styles.sheetChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLabel: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 12,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sheetChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.soft,
    borderWidth: 1,
    borderColor: colors.line,
  },
  sheetChipActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  sheetChipText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  sheetChipTextActive: {
    color: '#092116',
  },
  applyButton: {
    marginTop: 32,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  applyText: {
    color: '#092116',
    fontSize: 18,
    fontWeight: '800',
  },
});
