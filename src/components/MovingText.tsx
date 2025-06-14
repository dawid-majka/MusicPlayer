import { useEffect } from 'react'
import { TextStyle, StyleProp } from 'react-native'
import Animated, {
	Easing,
	StyleProps,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animationTreshold: number
	style?: StyleProp<TextStyle>
}

export const MovingText = ({ text, animationTreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationTreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimate) return

		translateX.value = withDelay(
			1000,
			withRepeat(withTiming(-textWidth, { duration: 5000, easing: Easing.linear }), -1, true),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, text, animationTreshold, shouldAnimate, textWidth])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				shouldAnimate && {
					width: 9999, // preventing the ellipsis from appearing
					paddingLeft: 16, // avoid the initial character being barely visible
				},
			]}
		>
			{text}
		</Animated.Text>
	)
}
