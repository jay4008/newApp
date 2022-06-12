import * as React from 'react';
import { View, Text,Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const DetailsGiphy = (props : any) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Image source={require('../assets/images/user.png')} style={{ height: width, width: width }}>
                </Image>
                <View style={{ position: 'absolute', right: 0, bottom: -10, height: 25, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', width: "100%" }}>
                    <Text style={{ color: "#fff", marginLeft: 10 }}>{"item"}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailsGiphy;