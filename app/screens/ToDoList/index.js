import React, { Component } from "react";
import {
	Text,
	TextInput,
	View,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { CheckBox, Button, Icon, Input } from "react-native-elements";
import value_to_color from "../../utils/value_to_color";

import styles from "./styles";

let api_key = "";
let user_id = "";

class ToDoList extends Component {
	constructor(props) {
		super(props);

		user_id = props.navigation.state.params["user-id"];
		api_key = props.navigation.state.params["api-token"];

		this.state = { tasks: [], loading: false };
	}

	handleButtonPress = () => {
		this.setState({ loading: true });
		fetch("https://habitica.com/api/v3/tasks/user?type=todos", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-api-user": user_id,
				"x-api-key": api_key,
			},
		})
			.then(resp => resp.json())
			.then(resp =>
				this.setState({ tasks: resp.data || [], loading: false })
			)
			.catch(error => console.error(error));
	};

	render = () => (
		<View style={styles.container}>
			<View style={styles.button}>
				<Button
					onPress={this.handleButtonPress}
					title="Get Tasks!"
					color="#841584"
				/>
			</View>
			<AddTaskBar />
			{this.state.loading && (
				<ActivityIndicator size="large" color="#841584" />
			)}
			<ScrollView>
				{this.state.tasks.map(task => (
					<Task
						text={task.text}
						key={task.id}
						priority={task.priority}
						value={task.value}
					/>
				))}
			</ScrollView>
		</View>
	);
}

class AddTaskBar extends Component {
	constructor(props) {
		super(props);
		this.state = { input_text: "" };
	}

	handleAddTaskButton = () => {
		fetch("https://habitica.com/api/v3/tasks/user", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-api-user": user_id,
				"x-api-key": api_key,
			},
			body: JSON.stringify({ text: this.state.input_text, type: "todo" }),
		})
			.then(resp => resp.json())
			.then(resp => {
				this.setState({ input_text: "" });
			})
			.catch(error => console.error(error));
	};

	render = () => (
		<View style={styles.add_task_container}>
			<Button
				icon={<Icon name="add-circle" />}
				onPress={this.handleAddTaskButton}
			/>
			<Input
				value={this.state.input_text}
				placeholder="Add new task..."
				onChangeText={text => this.setState({ input_text: text })}
			/>
		</View>
	);
}

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = { checked: false };
	}
	handleCheckboxPress = () => {
		this.setState({
			checked: !this.state.checked,
		});
	};
	render = () => (
		<View
			style={{
				...styles.task_container,
				backgroundColor: value_to_color(this.props.value),
			}}
		>
			<CheckBox
				checked={this.state.checked}
				onPress={this.handleCheckboxPress}
			/>
			<Text
				adjustsFontSizeToFit
				numberOfLines={2}
				style={this.state.checked && styles.checked_task}
			>
				{this.props.text}
			</Text>
		</View>
	);
}

export default ToDoList;
