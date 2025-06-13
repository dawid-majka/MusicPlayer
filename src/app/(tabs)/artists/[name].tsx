import { ArtistTracksList } from '@/components/ArtistTracksList'
import { screenPadding } from '@/constants/tokens'
import { useArtists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'

const ArtistDetailScreen = () => {
	const { name } = useLocalSearchParams<{ name: string }>()

	let artist = useArtists().find((artist) => artist.name === name)

	if (!artist) {
		console.warn(`Artist ${artist} not found!`)

		return <Redirect href={'/(tabs)/artists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<ArtistTracksList artist={artist} />
			</ScrollView>
		</View>
	)
}

export default ArtistDetailScreen
