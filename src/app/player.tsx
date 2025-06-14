import { MovingText } from '@/components/MovingText'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { utilsStyles } from '@/styles'
import React from 'react'
import { PlayerControls } from '@/components/PlayerControls'
import PlayerProgressBar from '@/components/PlayerProgressBar'
import { PlayerRepeatToggle } from '@/components/PlayerRepeatToggle'
import { PlayerVolumeBar } from '@/components/PlayerVolumeBar'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useTrackPlayerFavorites } from '@/hooks/useTrackPlayerFavorites'

const PlayerScreen = () => {
	const activeTrack = useActiveTrack()
	const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)

	const { top, bottom } = useSafeAreaInsets()

	const { isFavorite, toggleFavorite } = useTrackPlayerFavorites()

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				imageColors
					? [imageColors.vibrant, imageColors.average]
					: [colors.background, colors.background]
			}
		>
			<View style={styles.overlayContainer}>
				<DismissPlayerSymbol />
				<BackButton />
				<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: activeTrack.artwork ?? unknownTrackImageUri,
								priority: FastImage.priority.high,
							}}
							resizeMode="cover"
							style={styles.artworkImage}
						/>
					</View>

					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 'auto' }}>
							<View style={{ height: 60 }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{/* Track title */}
									<View style={styles.trackTitleContainer}>
										{/* TODO: Animation is broken */}
										<MovingText
											text={activeTrack.title ?? ''}
											animationTreshold={30}
											style={styles.trackTitleText}
										/>
									</View>
									{/* Favs */}
									<FontAwesome
										name={isFavorite ? 'heart' : 'heart-o'}
										size={20}
										color={isFavorite ? colors.primary : colors.icon}
										style={{ marginHorizontal: 14 }}
										onPress={toggleFavorite}
									/>
								</View>

								{/* Artist */}
								{activeTrack.artist && (
									<Text
										numberOfLines={1}
										style={[
											styles.trackTitleText,
											{
												marginTop: 6,
											},
										]}
									>
										{activeTrack.artist}
									</Text>
								)}
							</View>
							<PlayerProgressBar style={{ marginTop: 32 }} />
							<PlayerControls style={{ marginTop: 40 }} />
						</View>
						<PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
						<View style={utilsStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

// TODO: This is not working, add functionlity to hide or minimalize player to floating player
const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				accessible={false}
				style={{
					width: 50,
					height: 8,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			></View>
		</View>
	)
}

const BackButton = () => {
	return (
		<Pressable onPress={() => router.back()} style={styles.backButton}>
			<Entypo name="chevron-down" size={24} color="white" />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	backButton: {
		position: 'absolute',
		top: 64, // 4rem ≈ 64dp
		left: 16, // 1rem ≈ 16dp
		borderRadius: 9999,
		padding: 8, // 0.5rem ≈ 8dp
	},
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export default PlayerScreen
