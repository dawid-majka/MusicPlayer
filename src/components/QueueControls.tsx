import { Touchable, TouchableOpacity, View, ViewProps, Text } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { StyleSheet } from 'react-native'
import { colors } from '@/constants/tokens'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/styles'

type QueueControlsProps = {
	tracks: Track[]
} & ViewProps

export const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
	const handlePlay = async () => {
		// FIXME: This fucks up queue ordering and when clicking this and selecting from list it selects off by x song from list
		await TrackPlayer.setQueue(tracks)
		await TrackPlayer.play()
	}

	const handleShufflePlay = async () => {
		const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)

		await TrackPlayer.setQueue(shuffledTracks)
		await TrackPlayer.play()
	}

	return (
		<View style={[{ flexDirection: 'row', columnGap: 16 }, style]} {...viewProps}>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handlePlay} activeOpacity={0.8} style={styles.button}>
					<Ionicons name="play" size={22} color={colors.primary} />
					<Text style={styles.buttonText}>Play</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleShufflePlay} activeOpacity={0.8} style={styles.button}>
					<Ionicons name="shuffle-sharp" size={22} color={colors.primary} />
					<Text style={styles.buttonText}>Shuffle</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		padding: 12,
		backgroundColor: 'rgba(47, 47, 47, 0.5)',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 8,
	},
	buttonText: {
		...defaultStyles.text,
		color: colors.primary,
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
})
