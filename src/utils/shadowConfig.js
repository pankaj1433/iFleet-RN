import { Dimensions  } from 'react-native';
const { width } = Dimensions.get('window');

export const shadowOne = {
	width:width,
	height:100,
	color:"#000",
	opacity:0.2,
	x:0,
	y:3,
	style:{
        flex:1,
        width: width,
    }
}