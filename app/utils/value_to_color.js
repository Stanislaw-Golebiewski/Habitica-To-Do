const value_to_color = val => {
	// map task value to color
	// https://habitica.fandom.com/wiki/Task_Value
	if (val >= 12) return "#38cad6";
	else if (val >= 6) return "#37cbd9";
	else if (val >= 1) return "#26ca91";
	else if (val > -1) return "#febe5d";
	else if (val >= -9) return "#ff9450";
	else if (val >= -16) return "#fd6264";
	else return "#dd403e";
};

export default value_to_color;
