import { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView } from '@react-native-menu/menu'
import { useFavorites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { match } from 'ts-pattern'
import { useRouter } from 'expo-router'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()

	const isFavorite = track.rating === 1

	const { toggleTrackFavorite } = useFavorites()
	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add_to_favorites', async () => {
				toggleTrackFavorite(track)

				// This could be hidden inside toggleTrackFavorite
				if (activeQueueId?.startsWith('favorites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove_from_favorites', async () => {
				toggleTrackFavorite(track)

				if (activeQueueId?.startsWith('favorites')) {
					const queue = await TrackPlayer.getQueue()

					const trackId = queue.findIndex((t) => t.url === track.url)

					await TrackPlayer.remove(trackId)
				}
			})
			.with('add_to_playlist', async () => {
				router.push({ pathname: '/(modals)/addToPlaylistModal', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn(`Unknown menu action ${id}`))
	}

	// TODO: Icons not working.
	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavorite ? 'remove_from_favorites' : 'add_to_favorites',
					title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
					image: isFavorite ? 'minus' : 'plus',
				},
				{ id: 'add_to_playlist', title: 'Add to playlist', image: 'plus' },
			]}
		>
			{children}
		</MenuView>
	)
}
