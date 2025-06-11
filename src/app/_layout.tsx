import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SplashScreen } from 'expo-router'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPayerState'

// Shows splash screen until all interanls are loaded.
// When player loaded internals it calls onLoad that hides splash screen
SplashScreen.preventAutoHideAsync()

const App = () => {
	useLogTrackPlayerState()

	// we dont want to trigger useEffect inside useTrackPlayer over and over again
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded })

	return (
		<SafeAreaProvider>
			<RootNavigation />
			{/* Main status bar of our phone. Auto is for applying correct styles for it to be visible as we use dark mode */}
			<StatusBar style="auto" />
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default App
