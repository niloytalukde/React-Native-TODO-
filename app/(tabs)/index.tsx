import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);
const deleteTodo = useMutation(api.todos.deleteTodos);
  const isLoading = todos === undefined;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handelToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Toggle error:", error);
      Alert.alert("Failed to toggle todo. Please try again.");
    }
  };

  const renderTodo = ({ item }: { item: any }) => (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handelToggleTodo(item._id)}
        >
          <LinearGradient
            colors={
              item.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              homeStyles.checkboxInner,
              {
                borderColor: item.isCompleted ? colors.success : colors.border,
              },
            ]}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
        <View style={homeStyles.todoTextContainer}>
          <Text style={homeStyles.todoText}>{item.text}</Text>
          <View style={homeStyles.todoActions}>
            {/* Edit Button */}
            <TouchableOpacity onPress={()=>{}}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={homeStyles.actionButton}
              >
                <Ionicons name="pencil" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            {/* Delete Button */}
            <TouchableOpacity onPress={()=>{handelDeleteTodo(item._id)}}>
              <LinearGradient
                colors={colors.gradients.danger}
                style={homeStyles.actionButton}
              >
                <Ionicons name="trash" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const handelDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTodo({ id });
            } catch (error) {
              console.log("Delete error:", error);
              Alert.alert("Failed to delete todo. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        {/* Header Component will go here */}
        <Header />
        {/* Input Component will go here */}
        <TodoInput />
        {/* Render todo list here */}

        <FlatList
          data={todos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderTodo}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
