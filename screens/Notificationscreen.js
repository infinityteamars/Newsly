import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

const NotificationScreen = () => {
  const notifications = [
    { id: '1', message: 'Berita terbaru telah ditambahkan!' },
    { id: '2', message: 'Ada update penting untuk aplikasi Anda.' },
    { id: '3', message: 'Jangan lewatkan berita hari ini!' },
    // ... data notifikasi lainnya
  ];

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text>{item.message}</Text>
        </View>
    )

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
    notificationItem:{
        padding: 10,
        borderBottomWidth:1,
        borderBottomColor:"#eee"
    }
});

export default NotificationScreen;