import { FlatList, FlatListProps, View, Text } from 'react-native'
import library from '@/assets/data/library.json'
import { TrackListItem } from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { useRef } from 'react'
import { QueueControls } from './QueueControls'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const EmptyList = () => (
	<View>
		<Text style={utilsStyles.emptyContentText}>No songs found</Text>
		<FastImage
			source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
			style={utilsStyles.emptyContentImage}
		/>
	</View>
)

export const TrackList = ({
	id,
	tracks,
	hideQueueControls = false,
	...flatlistProps
}: TrackListProps) => {
	const queueOffset = useRef(0)

	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()

			// TODO: This is weird. Check if there is other way to do that

			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			// WFT ? And this guy didnt event said why this is, only that this is the only way he found that it works
			const nextTrackIndex =
				// selectedTrack is before currently played track index ?
				trackIndex - queueOffset.current < 0
					? // curr idx + list len - prev idx (wrap around to find how many to skip)
						tracks.length + trackIndex - queueOffset.current
					: // curr idx - prev idx = how many is between so how many we should skip
						trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}

	return (
		<FlatList
			data={tracks}
			contentInsetAdjustmentBehavior="automatic"
			// contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
				) : undefined
			}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={EmptyList}
			renderItem={({ item }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />}
			{...flatlistProps}
		/>
	)
}
