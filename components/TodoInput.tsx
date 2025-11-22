import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { createHomeStyles } from "@/assets/styles/home.style";
import { useTheme } from "@/hooks/useTheme";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TodoInput = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.createTodos);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding a Todo", error);
        Alert.alert("Error", "Failed to add todo. Please try again.");
      }
    }
  };
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="Add a new task"
          placeholderTextColor={colors.textMuted}
          value={newTodo}
          onChangeText={setNewTodo}
          multiline
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={homeStyles.addButton} onPress={handleAddTodo}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={homeStyles.addButton}
          >
            <Ionicons name="add" size={24} style={{ color: "#fff" }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
