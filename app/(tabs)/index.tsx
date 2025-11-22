import { Text, View,StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={style.container}
    >
      <Text style={style.text}>Hello This is TODO App</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    fontSize: 80,
  },
  text:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  }
});
