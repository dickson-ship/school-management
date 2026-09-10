import { Drawer } from 'expo-router/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
  return (
    <Drawer screenOptions={{}}>
      <Drawer.Screen name="(tabs)" options={{
        drawerLabel: 'Dashboard',
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="monitor-dashboard" size={24} color={color} />
        ),
        drawerActiveBackgroundColor: 'red',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
        drawerInactiveBackgroundColor: 'transparent',
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerTitle: 'Dashboard',
      }} />
    </Drawer>
  );
}
