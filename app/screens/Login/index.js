import React, { Component } from "react";
import { Text, TextInput, View, ActivityIndicator, Button } from "react-native";
import * as Keychain from "react-native-keychain";

import styles from "./styles";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			loading: false,
			cached_user: false,
		};
	}

	handleButton = () => {
		this.setState({ loading: true });
		fetch("https://habitica.com/api/v3/user/auth/local/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then(resp => resp.json())
			.then(resp => {
				this.setState({ loading: false });
				if (resp.success) {
					// set keystore

					Keychain.setGenericPassword(
						resp.data.id,
						resp.data.apiToken
					).then(
						Keychain.getGenericPassword().then(creds => {
							console.log("CREDS", creds);
						})
					);

					this.props.navigation.navigate("ToDoList", {
						"user-id": resp.data.id,
						"api-token": resp.data.apiToken,
					});
				}
			})
			.catch(error => console.error(error));
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					// alignItems: "center",
					// justifyContent: "center",
				}}
			>
				<TextInput
					style={styles.login_input}
					placeholder="username"
					onChangeText={text => {
						this.setState({ username: text });
					}}
				/>
				<TextInput
					style={styles.login_input}
					placeholder="password"
					secureTextEntry
					onChangeText={text => {
						this.setState({ password: text });
					}}
				/>
				<Button title="Login" onPress={this.handleButton} />
				{this.state.loading && (
					<ActivityIndicator size="large" color="#841584" />
				)}
			</View>
		);
	}
}

export default Login;
