import React from "react";
import {
	Text,
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import * as Keychain from "react-native-keychain";

import styles from "./styles";

class AuthLoading extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Keychain.getGenericPassword().then(credentials => {
			if (credentials) {
				this.props.navigation.navigate("App", {
					"user-id": credentials.username,
					"api-token": credentials.password,
				});
			} else {
				this.props.navigation.navigate("Auth");
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text> LOADING... </Text>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

export default AuthLoading;
