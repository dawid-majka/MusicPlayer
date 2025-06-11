import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.setVolume(0.5)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitalized = useRef(false)

	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitalized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitalized.current = false
				console.log(error)
			})
	}, [onLoad])
}
