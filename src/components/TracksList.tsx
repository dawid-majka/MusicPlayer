import { FlatList, FlatListProps, View } from 'react-native'
import library from '@/assets/data/library.json'
import { TrackListItem } from './TrackListItem'
import { utilsStyles } from '@/styles'
import type { Track } from '@/components/TrackListItem' // Adjust the import path as needed

export type TrackListProps = Partial<FlatListProps<Track>> & { tracks: any[] }

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

// export const TrackList = () => {
export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	return (
		// TODO: First item on a list is not visible
		// Hidden beneath Songs header
		<FlatList
			data={tracks}
			contentInsetAdjustmentBehavior="automatic"
			// contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item }) => <TrackListItem track={item} />}
			{...flatlistProps}
		/>
	)
}
