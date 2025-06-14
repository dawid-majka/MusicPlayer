import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View, Text, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Playlist } from '@/helpers/types'
import { playlistNameFilter } from '@/helpers/filter'
import { usePlaylists } from '@/store/library'
import { PlaylistsList } from '@/components/PlaylistList'

const PlaylistsScreen = () => {
	const router = useRouter()

	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
			headerIconColor: colors.icon,
			tintColor: colors.text,
			textColor: colors.text,
			hintTextColor: colors.minimumTrackTintColor,
		},
	})

	const { playlists } = usePlaylists()

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push({
			pathname: '/(tabs)/playlists/[name]',
			params: { name: playlist.name },
		})
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
