import * as React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../assets/literals/Literals';

const { height, width } = Dimensions.get('window');
const DetailsGiphy = (props: any) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.bannerView}>
                    <>
                        <Image source={{ uri: props.route.params.item.user.avatar_url }} style={styles.image1} />

                        <View style={{ position: 'absolute', left: 0, bottom: -10, height: 25, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', width: "50%" }}>
                            <Text style={{ color: "#fff", marginLeft: 10, textAlign: 'center' }}>{"Avtar"}</Text>
                        </View>
                    </>
                    <>
                        <Image source={{ uri: props.route.params.item.user.banner_image }} style={styles.image1} />

                        <View style={{ position: 'absolute', right: 0, bottom: -10, height: 25, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', width: "50%" }}>
                            <Text style={{ color: "#fff", marginLeft: 10, textAlign: 'center' }}>{"Banner image"}</Text>
                        </View>
                    </>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Image source={{ uri: props.route.params.item.user.banner_url }} style={{ height: width / 2, width: width, marginTop: 20 }} />

                    <View style={{ position: 'absolute', right: 0, bottom: -10, height: 25, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', width: "100%" }}>
                        <Text style={{ color: "#fff", marginLeft: 10, textAlign: 'center' }}>{"Banner url image"}</Text>
                    </View>
                </View>

                <RowWiseChildTxt content={props.route.params.item.user.display_name} contentName={"Name :"} />
                <RowWiseChildTxt content={props.route.params.item.user.instagram_url} contentName={"Instagram :"} />
                <RowWiseChildTxt content={props.route.params.item.user.description} contentName={"Description :"} />
                <RowWiseChildTxt content={props.route.params.item.user.username} contentName={"Username :"} />
                <RowWiseChildTxt content={props.route.params.item.user.website_url} contentName={"Website :"} />

                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', width: width - 40, alignContent: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 100, borderWidth: 1, alignSelf: 'center', borderRadius: 10, marginTop: 30 }}>
                    <Image source={require('../assets/icons/home.png')} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    <Text style={{ fontFamily: Fonts.latoBold, color: Colors.black, marginLeft: 10 }}>Back to Search</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}


const RowWiseChildTxt = ({ content = "", contentName = "" }) => {
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 40, paddingTop: 10 }}>
            <Text style={{ width: 100, color: Colors.black, fontFamily: Fonts.latoRegular }}>{contentName} </Text>
            <Text style={{ width: width - 150, fontFamily: Fonts.latoRegular }}>{content} </Text>
        </View>
    )
}

export default DetailsGiphy;

const styles = StyleSheet.create({
    headingTxt: {
        textAlign: 'center',
        paddingVertical: 5,
        fontFamily: Fonts.latoBlack
    },
    bannerView: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.white }

    ,
    image1: { height: width / 2, width: width / 2 - 1 },

})