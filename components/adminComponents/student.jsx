import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from "@expo/vector-icons";

export function StudentCard({ student, onPress }) {
  const initials =
    `${student.firstName.charAt(0)}${student.lastName.charAt(
      0
    )}`.toUpperCase();

  return (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* AVATAR */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* INFORMATION */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName} numberOfLines={1}>
          {student.firstName} {student.lastName}
        </Text>

        <Text style={styles.admissionNumber}>
          {student.admissionNumber}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.classBadge}>
            <Text style={styles.classBadgeText}>
              {student.className}
            </Text>
          </View>

          <Text style={styles.gender}>
            {student.gender}
          </Text>
        </View>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.cardRight}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            {student.status}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={Colors.textMuted}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

export function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons
          name="people-outline"
          size={34}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.emptyTitle}>
        No students found
      </Text>

      <Text style={styles.emptyText}>
        Try changing your search or class filter.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  /* STUDENT CARD */

  studentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.primary,
  },

  studentInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  studentName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  admissionNumber: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.textMuted,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  classBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  classBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.primary,
  },

  gender: {
    marginLeft: 8,
    fontSize: 10,
    color: Colors.textSecondary,
  },

  /* CARD RIGHT */

  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginRight: 5,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.success,
  },

  chevron: {
    marginTop: 8,
  },

  /* EMPTY */

  emptyListContent: {
    flexGrow: 1,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  emptyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
});