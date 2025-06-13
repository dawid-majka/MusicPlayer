import { Track } from 'react-native-track-player'

export type Playlist = {
	name: string
	tracks: Track[]
	artworkPreview: string
}

export type Artist = {
	name: string
	tracks: Track[]
}

// Track with added list of playlists that this track is a part of
export type TrackWithPlaylist = Track & { playlist?: string[] }
