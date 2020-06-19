/**
 * @format
 */
import React from 'react';
import {
 StyleSheet, 
 Text, 
 TouchableOpacity 
} from 'react-native';

import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts } from '../../utils';

const CheckBox = props => {
  const {
    containerStyle,
		iconStyle,
		onPress,
    selected = false,
    text,
		textStyle,
    ...other
	} = props;

  return (
    <TouchableOpacity
      style={containerStyle || styles.checkBox}
      onPress={onPress}
      {...other}>
			<Icon
				style={iconStyle || styles.icon}
				name={selected ? 'check-box' : 'check-box-outline-blank'}
      />

			<Text style={textStyle || styles.text}>{text}</Text>
    </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  checkBox: {
		...Fonts.base,
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
  icon: {
		height: 12,
		justifyContent: 'flex-end',
		width: 12,
  },
	text: {
		...Fonts.body,
		justifyContent: 'flex-start',
	},
});

export default CheckBox;
