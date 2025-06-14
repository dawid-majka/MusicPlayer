import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { Track, useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorites = () => {
	const activeTrack = useActiveTrack()

	const { favorites, toggleTrackFavorite } = useFavorites()

	// We want to use data from zustand as source of truth not the interanl state of player
	// Thats why we do not check acitveTrack.rating === 1
	const isFavorite = favorites.find((t: Track) => t.url === activeTrack?.url)?.rating === 1

	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		// Update track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		// update app inernal state
		if (activeTrack) {
			toggleTrackFavorite(activeTrack)
		}
	}, [isFavorite, toggleTrackFavorite, activeTrack])

	return { isFavorite, toggleFavorite }
}
