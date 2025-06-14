import { unknownTrackImageUri } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { utilsStyles } from '@/styles'
import { useMemo } from 'react'
import { FlatList, FlatListProps, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { PlaylistListItem } from './PlaylistListItem'

type PlaylistsListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const PlaylistsList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistsListProps) => {
	// TODO: Each call to this sets navigation options
	// I do not think its correct
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlist',
			headerIconColor: colors.icon,
			tintColor: colors.text,
			textColor: colors.text,
			hintTextColor: colors.minimumTrackTintColor,
		},
	})

	const filteredPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			data={filteredPlaylist}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			{...flatListProps}
		/>
	)
}
