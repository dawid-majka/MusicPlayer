import { TrackList } from '@/components/TracksList'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import library from '@/assets/data/library.json'
import { trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
			headerIconColor: colors.icon,
			tintColor: colors.text,
			textColor: colors.text,
			hintTextColor: colors.minimumTrackTintColor,
		},
	})

	const filteredSongs = useMemo(() => {
		if (!search) {
			return library
		}

		return library.filter(trackTitleFilter(search))
	}, [search])

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
				<TrackList scrollEnabled={false} tracks={filteredSongs} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
