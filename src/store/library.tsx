import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import library from '@/assets/data/library.json'
import { create } from 'zustand'
import { useMemo } from 'react'
import { unknownArtistImageUri } from '@/constants/images'
import { P } from 'ts-pattern'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}
				return currentTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), playlistName],
					}
				}
				return currentTrack
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const favorites = useMemo(() => tracks.filter((track) => track.rating === 1), [tracks])
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return { favorites, toggleTrackFavorite }
}

export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	return useMemo(() => {
		return tracks.reduce((acc, track) => {
			const artistName = track.artist ?? 'Unknown'
			const existingArtist = acc.find((artist) => artist.name === artistName)
			if (existingArtist) {
				return acc.map((artist) =>
					artist.name === artistName ? { ...artist, tracks: [...artist.tracks, track] } : artist,
				)
			} else {
				return [...acc, { name: artistName, tracks: [track] }]
			}
		}, [] as Artist[])
	}, [tracks])
}

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const playlists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownArtistImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[])
	}, [tracks])

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlists, addToPlaylist }
}
