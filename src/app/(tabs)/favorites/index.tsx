import { TrackList } from '@/components/TracksList'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import library from '@/assets/data/library.json'
import { trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favs = useMemo(() => {
		return library.filter((track) => track.rating === 1)
	}, [])

	return (
		<View style={defaultStyles.container}>
			{/* TODO: Cant see scrollbar */}
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
				showsVerticalScrollIndicator={true}
				// indicatorStyle="white"
				// persistentScrollbar={true}
				scrollIndicatorInsets={{ right: 1 }} // small nudge sometimes helps
			>
				<TrackList scrollEnabled={false} tracks={favs} />
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
