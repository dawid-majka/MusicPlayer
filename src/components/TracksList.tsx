import { FlatList, FlatListProps, View } from 'react-native'
import library from '@/assets/data/library.json'
import { TrackListItem } from './TrackListItem'
import { utilsStyles } from '@/styles'
import type { Track } from '@/components/TrackListItem' // Adjust the import path as needed

export type TrackListProps = Partial<FlatListProps<Track>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

// export const TrackList = () => {
export const TrackList = ({ ...flatlistProps }: TrackListProps) => {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item }) => <TrackListItem track={item} />}
			{...flatlistProps}
		/>
	)
}
