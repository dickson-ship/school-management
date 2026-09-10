import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {PaymentItem,AttendanceItem,QuickAction,StatCard} from "@/components/adminComponents/homeCards";
import { Colors } from "@/constants/colors";
import { getAdminData, getTeacherData, getParentData, fetchTodayPresentAttendance, fetchTodayAbsentAttendance, fetchTodayLateAttendance } from "@/services/admin/dashboard";
import { useState,useEffect } from "react";


  
  var attendancePercentage = 0;
  var present=1145;
  var absent=75;
  var late=25;
  attendancePercentage=(present/(present+absent+late))*100;
  attendancePercentage=attendancePercentage.toFixed(1);

export default function AdminHome() {
  //get teacher data
  const [teacherData, setTeacherData] = useState([]);
  useEffect(() => {
    getTeacherData().then((data) => {
      setTeacherData(data);
    });
  }, []);
  //get admin data
  const [admindata, setAdminData] = useState(null);
  useEffect(() => {
    getAdminData().then((data) => {
      setAdminData(data);
    });
  }, []);
  //get parent data
  const [parentData, setParentData] = useState([]);
  useEffect(() => {
    getParentData().then((data) => {
      setParentData(data);
    });
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, {admindata?.fullname || "Admin"} 👋</Text>
            <Text style={styles.subtitle}>
              Here's what's happening at your school.
            </Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.primary}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* OVERVIEW TITLE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>School Overview</Text>

          <TouchableOpacity>
            <Text style={styles.viewText}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* STAT CARDS */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="people-outline"
            title="Students"
            value="1,245"
            description="+12 this month"
          />

          <StatCard
            icon="school-outline"
            title="Teachers"
            value={teacherData?.length}
            description="+2 this month"
          />

          <StatCard
            icon="people-circle-outline"
            title="Parents"
            value={parentData?.length}
            description="+18 this month"
          />

          <StatCard
            icon="wallet-outline"
            title="Fees Collected"
            value="85%"
            description="This term"
          />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.quickActions}>
          <QuickAction
            icon="person-add-outline"
            title="Add Student"
          />

          <QuickAction
            icon="school-outline"
            title="Add Teacher"
          />

          <QuickAction
            icon="people-outline"
            title="Add Parent"
          />

          <QuickAction
            icon="megaphone-outline"
            title="Announcement"
          />
        </View>

        {/* ATTENDANCE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Attendance</Text>

          <TouchableOpacity>
            <Text style={styles.viewText}>Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.attendanceCard}>
          <View style={styles.attendanceHeader}>
            <View>
              <Text style={styles.attendanceTitle}>
                Overall Attendance
              </Text>

              <Text style={styles.attendanceDate}>
                Today, 31 August 2026
              </Text>
            </View>

            <Text style={styles.attendancePercentage}>
              {attendancePercentage}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.attendanceStats}>
            <AttendanceItem
              label="Present"
              value={present}
            />

            <AttendanceItem
              label="Absent"
              value={absent}
            />

            <AttendanceItem
              label="Late"
              value={late}
            />
          </View>
        </View>

        {/* RECENT PAYMENTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent Payments
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentsCard}>
          <PaymentItem
            name="John Doe"
            student="Primary 5"
            amount="GH₵ 500"
            time="10 min ago"
          />

          <PaymentItem
            name="Mary Doe"
            student="Primary 3"
            amount="GH₵ 350"
            time="35 min ago"
          />

          <PaymentItem
            name="Daniel Mensah"
            student="Primary 6"
            amount="GH₵ 700"
            time="1 hr ago"
          />
        </View>

        {/* ANNOUNCEMENT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Latest Announcement
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.announcementCard}>
          <View style={styles.announcementIcon}>
            <Ionicons
              name="megaphone-outline"
              size={24}
              color={Colors.primary}
            />
          </View>

          <View style={styles.announcementContent}>
            <Text style={styles.announcementTitle}>
              New Academic Term
            </Text>

            <Text
              style={styles.announcementText}
              numberOfLines={2}
            >
              Welcome back to a new academic term. Please
              ensure all students are properly registered.
            </Text>

            <Text style={styles.announcementDate}>
              Posted today
            </Text>
          </View>
        </View>

        {/* BOTTOM SPACE */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  greeting: {
    fontSize: 23,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  viewText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },

  /* STATS */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  /* QUICK ACTIONS */

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  /* ATTENDANCE */

  attendanceCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 25,
  },

  attendanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  attendanceTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  attendanceDate: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  attendancePercentage: {
    fontSize: 27,
    fontWeight: "800",
    color: Colors.success,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 18,
    overflow: "hidden",
  },

  progressFill: {
    width: `${attendancePercentage}%`,
    height: "100%",
    backgroundColor: Colors.success,
    borderRadius: 10,
  },

  attendanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  /* PAYMENTS */

  paymentsCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 25,
  },

  /* ANNOUNCEMENT */

  announcementCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  announcementIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: Colors.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  announcementContent: {
    flex: 1,
  },

  announcementTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 5,
  },

  announcementText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.secondaryText,
  },

  announcementDate: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginTop: 7,
  },
});