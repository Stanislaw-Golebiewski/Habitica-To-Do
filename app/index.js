import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer,
} from "react-navigation";
import { AuthLoading, Login, ToDoList } from "./screens";
import EStyleSheet from "react-native-extended-stylesheet";

const AppStack = createStackNavigator({ ToDoList: ToDoList });
const AuthStack = createStackNavigator({ Login: Login });

EStyleSheet.build({
	$mainColor: "#432874",
});

export default () =>
	createAppContainer(
		createSwitchNavigator(
			{
				AuthLoading: AuthLoading,
				App: ToDoList,
				Auth: Login,
			},
			{
				initialRouteName: "AuthLoading",
			}
		)
	);
