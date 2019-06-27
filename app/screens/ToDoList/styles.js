import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	button: { marginTop: 10, color: "$mainColor" },
	add_task_container: {
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		marginRight: 4,
		marginLeft: 4,
	},
	task_container: {
		flexDirection: "row",
		alignItems: "center",
		margin: 2,
	},
	checked_task: {
		textDecorationLine: "line-through",
		color: "grey",
	},
});
