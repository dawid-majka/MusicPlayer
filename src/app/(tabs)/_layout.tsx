import { Tabs } from 'expo-router'
import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

const TabsNavigation = () => {
	return (
		<Tabs>
			<Tabs.Screen name="favourities" />
			<Tabs.Screen name="playlists" />
			<Tabs.Screen name="(songs)" />
			<Tabs.Screen name="artists" />
		</Tabs>
	)
}

export default TabsNavigation
