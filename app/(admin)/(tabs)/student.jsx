import React, { useMemo, useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { StudentCard, EmptyState } from "../../../components/adminComponents/student";
import { router } from "expo-router";
import { CLASSES } from "../../../components/adminComponents/studentDummyData";
import { fetchStudents } from "../../../services/admin/student";


export default function StudentsScreen() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [students, setStudents] = useState([]);
  //const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data);
      
    });
  }, []);
 
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesClass =
        selectedClass === "All" ||
        student.className === selectedClass;

      const fullName =
        `${student.firstName} ${student.lastName}`.toLowerCase();

      const matchesSearch =
        !query ||
        fullName.includes(query) ||
        student.admissionNumber
          .toLowerCase()
          .includes(query);

      return matchesClass && matchesSearch;
    });
  }, [search, selectedClass, students]);

  const handleAddStudent = () => {
    // Navigate to Add Student screen later
    console.log("Add student");
    router.push("/add-student");
  };

  const handleStudentPress = (student) => {
    // Navigate to student profile later
    console.log("Selected student:", student.id);
    router.push({
      pathname: '/student/[studentprofile]',
      params: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        className: student.className,
        gender: student.gender,
        status: student.status,
        admissionNumber: student.admissionNumber,
        admissionDate: student.admissionDate,
        dateOfBirth: student.dateOfBirth,
        otherName: student.otherName,
        parent: JSON.stringify(student.parent),
        stats: JSON.stringify(student.stats),
      },
    });
  };

  const renderStudent = ({ item }) => (
    <StudentCard
      student={item}
      onPress={() => handleStudentPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Students</Text>
          <Text style={styles.subtitle}>
            Manage students in your school
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddStudent}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.textMuted}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search name or admission number"
          placeholderTextColor={Colors.textMuted}
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />

        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch("")}
            hitSlop={10}
          >
            <Ionicons
              name="close-circle"
              size={19}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* CLASS FILTER */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          data={CLASSES}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const active = selectedClass === item;

            return (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  active && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedClass(item)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* RESULT COUNT */}
      <View style={styles.resultHeader}>
        <Text style={styles.resultText}>
          {filteredStudents.length}{" "}
          {filteredStudents.length === 1
            ? "student"
            : "students"}
        </Text>

        {selectedClass !== "All" && (
          <TouchableOpacity
            onPress={() => setSelectedClass("All")}
          >
            <Text style={styles.clearFilter}>
              Clear filter
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* STUDENT LIST */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.listContent,
          filteredStudents.length === 0 &&
            styles.emptyListContent,
        ]}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}

/* =========================================================
   STUDENT CARD
========================================================= */


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* HEADER */

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: Colors.textDark,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  /* SEARCH */

  searchContainer: {
    marginHorizontal: 20,
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.text,
    paddingVertical: 0,
  },

  /* FILTER */

  filterSection: {
    marginTop: 16,
  },

  filterList: {
    paddingHorizontal: 20,
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  filterTextActive: {
    color: Colors.white,
  },

  /* RESULT HEADER */

  resultHeader: {
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  clearFilter: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },

  /* LIST */

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

});