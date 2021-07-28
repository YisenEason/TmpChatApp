import React, { Children } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import Color from '../../constant/Color';

type Props = {
	style?: ViewStyle
	children?: React.ReactNode,
	loading?: Boolean
}

const LoadingPlaceholderView = ({children, loading=false, style}: Props) => {
	
	useEffect(()=>{
	})

	return (
		<View style={[{...style}, {justifyContent: 'center', alignItems:'center'}]}>
			{
				loading && 
				<ActivityIndicator size={'small'} color={Color._000000} />
			}
			{
				!loading && 
				children
			}
		</View>
	);
}

export default LoadingPlaceholderView;