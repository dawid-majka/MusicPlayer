import { FlatList, FlatListProps, View } from 'react-native'
import library from '@/assets/data/library.json'
import { TrackListItem } from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'

export type TrackListProps = Partial<FlatListProps<Track>> & { tracks: Track[] }

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

// export const TrackList = () => {
export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
		console.log(track)
	}

	return (
		<FlatList
			data={tracks}
			contentInsetAdjustmentBehavior="automatic"
			// contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />}
			{...flatlistProps}
		/>
	)
}
