import { View, Text } from "react-native";
import React from "react";
import { createHomeStyles } from "@/assets/styles/home.style";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos); // <-- FIXED

  const completedTodos = todos?.filter((todo) => todo?.isCompleted).length ?? 0;
  const totalTodos = todos?.length ?? 0;

  const progress = totalTodos === 0 ? 0 : completedTodos / totalTodos;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        {/* Header Icon */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={32} style={{ color: "#fff" }} />
        </LinearGradient>

        {/* Title and SubTitle */}
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {completedTodos} of {totalTodos} completed
          </Text>
        </View>
      </View>
      {/* progress Bar  */}
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyles.progressFill,
                { width: `${progress * 100}%` },
              ]}
            />
          </View>
          <Text style={homeStyles.progressText}>  
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
