import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const FavoritesScreenLayout = () => {
	return (
		// View acts as our background
		<View style={defaultStyles.container}>
			{/* We use Stack to use functionalities that it provides, like animations or search functionality */}
			<Stack>
				<Stack.Screen name="index" options={{ headerTitle: 'Favorites' }} />
			</Stack>
		</View>
	)
}

export default FavoritesScreenLayout
