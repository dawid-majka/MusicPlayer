import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import library from '@/assets/data/library.json'
import { create } from 'zustand'
import { useMemo } from 'react'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const favorites = useMemo(() => tracks.filter((track) => track.rating === 1), [tracks])
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return { favorites, toggleTrackFavorite }
}
