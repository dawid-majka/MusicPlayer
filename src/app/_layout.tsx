import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SplashScreen } from 'expo-router'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPayerState'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colors } from '@/constants/tokens'
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/constants/playbackService'

// Shows splash screen until all interanls are loaded.
// When player loaded internals it calls onLoad that hides splash screen
SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
	useLogTrackPlayerState()

	// we dont want to trigger useEffect inside useTrackPlayer over and over again
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded })

	return (
		<SafeAreaProvider>
			{/* This is not working */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				{/* Main status bar of our phone. Auto is for applying correct styles for it to be visible as we use dark mode */}
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="player"
				// Gestures do not work as it only for iOS
				// https://reactnavigation.org/docs/native-stack-navigator/
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="(modals)/addToPlaylistModal"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}

export default App
