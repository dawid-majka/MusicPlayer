import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	// // Only supported on iOS
	// headerLargeTitle: true,
	// headerLargeStyle: {
	// 	backgroundColor: colors.background,
	// },

	// headerSearchBarOptions not working as it is only used on ios
	headerStyle: {
		backgroundColor: colors.background,
		// backgroundColor: '#fff',
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	// This works. Sets "Songs" header title to white
	headerTintColor: colors.text,
	// headerTransparent: true - makes 2 elements to be below header, that makes them invisible
	// but when i make it false then some spacing is messed up
	headerTransparent: false,
	// headerBlurEffect: 'prominent',
	headerShadowVisible: true,
	// Options to render a native search bar on iOS. Search bars are rarely static so normally it is controlled by
	// passing an object to headerSearchBarOptions navigation option in the component's body.
	headerSearchBarOptions: {
		// barTintColor: '#000',
		tintColor: '#fff',
		textColor: '#fff',
		hintTextColor: '#fff',
		headerIconColor: '#fff',
	},
}
