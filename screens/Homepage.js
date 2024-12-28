import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_KEY = "9539f36c7ab34f248d22417b01c8dc17";
const NEWS_API_URL = "https://newsapi.org/v2";
const NEWS_COUNTRY = "us";

const Tab = createBottomTabNavigator();

// News Screen
const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    if (isConnected) {
      fetchNews();
    }

    return () => unsubscribe();
  }, [isConnected]);

  const fetchNews = async (search = null) => {
    if (!isConnected) {
      setError("No internet connection.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let url = `${NEWS_API_URL}/top-headlines?country=${NEWS_COUNTRY}&apiKey=${API_KEY}`;
    if (search) {
      url = `${NEWS_API_URL}/everything?q=${search}&apiKey=${API_KEY}`;
    }

    try {
      const response = await axios.get(url);
      if (response.data?.status === "ok" && response.data?.articles) {
        setNews(response.data.articles);
      } else {
        setError(response.data?.message || "Failed to fetch news from API.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
      )}
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSource}>
          {item.source?.name || "Unknown Source"}
        </Text>
        <Text style={styles.newsDate}>{item.publishedAt?.slice(0, 10)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for news"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => fetchNews(searchQuery)}
          />
          <TouchableOpacity
            onPress={() => fetchNews(searchQuery)}
            style={styles.searchIconContainer}
          >
            <Ionicons name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={26} color="#FBBC05" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => item.url || index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No news found.</Text>
        }
      />
    </SafeAreaView>
  );
};



// Saved Screen
const SavedScreen = () => {
  const [savedNews, setSavedNews] = useState([
    {
      id: "1",
      title: "Example Saved News 1",
      source: "Source 1",
      date: "2024-01-01",
    },
    {
      id: "2",
      title: "Example Saved News 2",
      source: "Source 2",
      date: "2024-01-02",
    },
  ]);

  // Function to remove saved item
  const removeItem = (id) => {
    setSavedNews((prevSavedNews) =>
      prevSavedNews.filter((item) => item.id !== id)
    );
  };

  // Render saved item
  const renderSavedItem = ({ item }) => (
    <View style={styles.savedItem}>
      <View style={styles.savedContent}>
        <Text style={styles.savedTitle}>{item.title}</Text>
        <Text style={styles.savedSource}>{item.source}</Text>
        <Text style={styles.savedDate}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {savedNews.length > 0 ? (
        <FlatList
          data={savedNews}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved news.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};



// Profile Screen
const ProfileScreen = () => {
  const handlePress = (section) => {
    Alert.alert(`You pressed ${section}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }} // Replace with actual profile image URL
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.username}>InfinityTeam</Text>
            <Text style={styles.userEmail}>infinityteam@example.com</Text>
          </View>
        </View>
      </View>

      {/* Options */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress("Kelola Akun")}
      >
        <Ionicons name="settings-outline" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Kelola Akun</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress("Saran dan Masukan")}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Saran dan Masukan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress("Tentang Ponsel")}
      >
        <Ionicons name="phone-portrait-outline" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Tentang Ponsel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress("Hubungi Kami")}
      >
        <Ionicons name="call-outline" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Hubungi Kami</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, { borderBottomWidth: 0 }]}
        onPress={() => handlePress("Keluar")}
      >
        <Ionicons name="log-out-outline" size={24} color="red" />
        <Text style={[styles.optionText, { color: "red" }]}>Keluar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Main HomePage Component with Tab Navigator
const HomePage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fefefe",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#002e8c",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#002e8c",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginTop: -15,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  notificationIcon: {
    padding: 5,
    alignItems: "center",
    marginTop: -20,
  },
  newsItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#002e8c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  // Saved Item
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  savedContent: {
    flex: 1,
    marginRight: 10,
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  savedSource: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  savedDate: {
    fontSize: 12,
    color: "#bbb",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },

  // Profile Header
  
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  profileDetails: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#aaa",
  },
  
  // Option Items
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
//
  newsImage: { width: 100, height: 100, borderRadius: 5 },
  newsContent: { flex: 1, marginLeft: 10 },
  newsTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  newsSource: { fontSize: 12, color: "#888", marginBottom: 5 },
  newsDate: { fontSize: 12, color: "#bbb" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", textAlign: "center", margin: 10 },
  emptyList: { textAlign: "center", marginTop: 20, color: "#888" },
  text: { fontSize: 18, fontWeight: "bold" },
  savedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#002e8c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  savedContent: { flex: 1 },
  savedTitle: { fontSize: 16, fontWeight: "bold" },
  savedSource: { fontSize: 14, color: "#888" },
  savedDate: { fontSize: 12, color: "#bbb" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#888" },
});

export default HomePage;
