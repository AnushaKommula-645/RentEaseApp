import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return email.trim() !== "" && isValidEmail(email) && password.trim() !== "";
  };

  const handleLogin = () => {
    setSubmitted(true);
    if (isFormValid()) {
      if (email === "admin123@gmail.com" && password === "1234") {
        navigation.navigate("AdminScreen");
      } else {
        navigation.navigate("HomeScreen");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Logo */}
      <View style={styles.shadowContainer}>
        <Image source={require("../assets/rentEaseLogo.png")} style={styles.logo} />
      </View>

      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      {submitted && email.trim() === "" && (
        <Text style={styles.errorText}>Email is required</Text>
      )}
      {submitted && email.trim() !== "" && !isValidEmail(email) && (
        <Text style={styles.errorText}>Email is invalid</Text>
      )}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.togglePasswordText}>
          {showPassword ? "Hide" : "Show"} Password
        </Text>
      </TouchableOpacity>
      {submitted && password.trim() === "" && (
        <Text style={styles.errorText}>Password is required</Text>
      )}

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          !isFormValid() && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Signup Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.loginText}>
          Don’t have an account? <Text style={styles.loginLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  shadowContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#541890",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  togglePasswordText: {
    color: "#541890",
    alignSelf: "flex-end",
    marginRight: "5%",
    marginBottom: 10,
    fontWeight: "600",
  },
  button: {
    width: "90%",
    backgroundColor: "#e47e98",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  loginLink: {
    color: "#541890",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    fontWeight: "600",
  },
});
