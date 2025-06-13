import { unknownArtistImageUri } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { View, Text, FlatList, ScrollView, TouchableHighlight, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

const ItemsSeparatingComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistListEmptyComponent = () => {
	return (
		<View>
			<Text> No artist found</Text>
			<FastImage
				source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
				style={utilsStyles.emptyContentImage}
			/>
		</View>
	)
}

const renderArtistListItem = (artist: Artist) => {
	return (
		// <Link href={`/artists/${artist.name}`} asChild>
		<Link href={{ pathname: '/(tabs)/artists/[name]', params: { name: artist.name } }} asChild>
			<TouchableHighlight activeOpacity={0.8}>
				<View style={styles.artistItemContainer}>
					<View>
						<FastImage
							source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
							style={styles.artistImage}
						/>
					</View>
					<View style={{ width: '100%' }}>
						<Text numberOfLines={1} style={styles.artistNameText}>
							{artist.name}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		</Link>
	)
}

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
			headerIconColor: colors.icon,
			tintColor: colors.text,
			textColor: colors.text,
			hintTextColor: colors.minimumTrackTintColor,
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) {
			return artists
		}

		return artists.filter(artistNameFilter(search))
	}, [search, artists])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemsSeparatingComponent}
					ListFooterComponent={ItemsSeparatingComponent}
					ListEmptyComponent={ArtistListEmptyComponent}
					data={filteredArtists}
					renderItem={({ item }) => renderArtistListItem(item)}
				/>
			</ScrollView>
		</View>
	)
}

export default ArtistsScreen

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
