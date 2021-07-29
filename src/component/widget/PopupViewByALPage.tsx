import React from "react";
import { RefObject } from "react";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Color from "../../constant/Color";
import { sp } from "../../helper/utils/ScreenUtil";

type Props = {
	style?: ViewStyle
	onSelect?: (index: number) => void
}

export interface Location {
	top: number,
	right: number
}

export default class PopupViewByALPage extends React.PureComponent<Props> {

	state = {
		isShow: false,
	}

	top: number = 0;
	right: number = 20;

	componentDidMount() {
	}

	pointViewRef(ref: RefObject<TouchableOpacity>) {
		ref.current?.measureInWindow((x, y, w, h) => {
			console.log(x, y, w, h);
			this.top = y + h;
		})
	}

	show = () => {
		this.setState({
			isShow: true
		})
	}

	close = () => {
		this.setState({
			isShow: false
		})
		this.forceUpdate();
	}

	onSelect = (index: number) => {
		this.close();
		this.props.onSelect && this.props.onSelect(index);
	}

	render() {
		const { isShow } = this.state;
		return (
			<Modal transparent visible={isShow}>
				<TouchableWithoutFeedback onPress={this.close}>
					<View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }}></View>
				</TouchableWithoutFeedback>
				<View style={[{ position: 'absolute', top: this.top, right: this.right }, { ...this.props.style }]}>
					<Icon style={{ alignSelf: 'flex-end', marginRight: 10 }} name='caret-up-outline' size={30} color={Color._000000} />

					<View style={{ backgroundColor: Color._000000, marginTop: -11, borderRadius: 5, paddingVertical: 10 }}>

						<TouchableOpacity onPress={() => { this.onSelect(0) }}>
							<View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 13, paddingRight: 13 }}>
								<Icon name='chatbox' size={21} color={Color._e6ece9} />
								<Text style={{ color: Color._e6ece9, fontSize: sp(28), marginLeft: 10 }}>发起群聊</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => { this.onSelect(1) }}>
							<View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 13, paddingRight: 13 }}>
								<Icon name='person-add' size={21} color={Color._e6ece9} />
								<Text style={{ color: Color._e6ece9, fontSize: sp(28), marginLeft: 10 }}>添加朋友</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => { this.onSelect(2) }}>
							<View style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 13, paddingRight: 13 }}>
								<Icon name='search' size={21} color={Color._e6ece9} />
								<Text style={{ color: Color._e6ece9, fontSize: sp(28), marginLeft: 10 }}>搜索</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}