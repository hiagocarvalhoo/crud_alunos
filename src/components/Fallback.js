import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
	return (
		<View style={{ alignItems: "center" }}>
			<Image
				source={require("../../assets/aluno.png")}
				style={{ height: 300, width: 300 }}
			/>
			<View
				style={{
					backgroundColor: "#000",
					paddingVertical: 12,
					paddingHorizontal: 12,
					borderRadius: 6,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.8,
					shadowRadius: 3,
					marginTop: 20,
				}}
			>
				<Text style={{ color: "#fff" }}>Comece adicionar!</Text>
			</View>
		</View>
	);
};

export default Fallback;

const styles = StyleSheet.create({});
