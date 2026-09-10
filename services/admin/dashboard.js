import {auth,db} from "../firebase"
import {doc,getDoc, query, collection, where, getDocs, collectionGroup} from "firebase/firestore"

export async function getAdminData(){
    
  const user = auth.currentUser;
  if(!user){
    return null;
  }
  const dashboardRef = doc(db, "users", user.uid);
  const dashboardDoc = await getDoc(dashboardRef);
  if (!dashboardDoc.exists) {
    return null;
  }
  return dashboardDoc.data();
}
// Get users where role is teacher
export async function getTeacherData(){
    const q = query(
  collection(db, "users"),
  where("role", "==", "teacher")
);

const snapshot = await getDocs(q);

const teachers = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data()
}));
return teachers;
}

// Get users where role is parent
export async function getParentData(){
    const q = query(
  collection(db, "users"),
  where("role", "==", "parent")
);

const snapshot = await getDocs(q);

const parents = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data()
}));
return parents;
}
// Get today's present attendance
export const fetchTodayPresentAttendance = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendanceQuery = query(
      collectionGroup(db, "records"),
      where("status", "==", "present"),
      where("date", "==", today)
    );

    const snapshot = await getDocs(attendanceQuery);

    return snapshot.docs.map((attendanceDoc) => ({
      id: attendanceDoc.id,
      ...attendanceDoc.data(),
    }));
  } catch (error) {
    console.error("Error fetching today's present attendance:", error);
    throw error;
  }
};

export const fetchTodayLateAttendance = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendanceQuery = query(
      collectionGroup(db, "records"),
      where("status", "==", "late"),
      where("date", "==", today)
    );

    const snapshot = await getDocs(attendanceQuery);

    return snapshot.docs.map((attendanceDoc) => ({
      id: attendanceDoc.id,
      ...attendanceDoc.data(),
    }));
  } catch (error) {
    console.error("Error fetching today's late attendance:", error);
    throw error;
  }
};

export const fetchTodayAbsentAttendance = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendanceQuery = query(
      collectionGroup(db, "records"),
      where("status", "==", "absent"),
      where("date", "==", today)
    );

    const snapshot = await getDocs(attendanceQuery);

    return snapshot.docs.map((attendanceDoc) => ({
      id: attendanceDoc.id,
      ...attendanceDoc.data(),
    }));
  } catch (error) {
    console.error("Error fetching today's absent attendance:", error);
    throw error;
  }
};


