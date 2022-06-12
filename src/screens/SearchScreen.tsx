
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, ImageBackground, Dimensions, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from "lodash";
import { Colors, Fonts } from '../assets/literals/Literals';
import { request } from '../servises/servises';
const { height, width } = Dimensions.get('window');
const HomeSearchScreen = (props: any) => {
    const [query, setqury] = React.useState("");
    const [queryForApiCall, setApiCallText] = React.useState("");
    const delayedQuery = _.debounce((q: string) => sendQuery(q), 2000);
    const onChange = (value: string) => {
        setqury(value);
        delayedQuery(value);
    };

    const sendQuery = (query1: string) => {
        setApiCallText(query1);
    };


    const ApiCallGiphy = async() =>{
        const response: any = await request('get', '/common-doctors/myDetails');
    }
    React.useEffect( () => {

        if ((queryForApiCall === query) && (queryForApiCall !== "" && query !== "")) {
            Alert.alert("Same");
            ApiCallGiphy()
          
        }
    }, [queryForApiCall])
    return (
        <SafeAreaView>
            <Text style={styles.headingTxt}>Search Giphy</Text>
            <TextInput
                style={styles.serachTextInput}
                placeholder={"Search giphy"}
                value={query}
                onChangeText={onChange}
            />

            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
                numColumns={3}
                data={["as", "ds", "asd", "sad", "dsa", "asd", "asd", "asdasd", "as", "ds", "asd", "sad", "dsa", "asd", "asd", "asdasd", "as", "ds", "asd", "sad", "dsa", "asd", "asd", "asdasd", "as", "ds", "asd", "sad", "dsa", "asd", "asd", "asdasd"]}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.giphyElement} onPress={() => props.navigation.navigate('Details')}>
                        <Image source={{uri :'https://media.tenor.com/images/1c39f2d94b02d8c9366de265d0fba8a0/tenor.gif'}} style={styles.imageDimension}  resizeMode={'cover'}/>
                        <View style={styles.giphyTxt}>
                                <Text style={{ fontFamily : Fonts.latoRegular, color: Colors.white, marginLeft: 10 }}>{item}</Text>
                            </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <View style={styles.loadingView}>
                        <ActivityIndicator size={'large'} color={Colors.black}></ActivityIndicator>
                    </View>
                )}
            ></FlatList>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    headingTxt: {
        textAlign: 'center',
        paddingVertical: 5,
        fontFamily: Fonts.latoBlack
    },
    serachTextInput: {
        height: 45,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: Fonts.latoRegular,
        paddingLeft: 10
    },
    flatListStyle: {
        height: height - 90,
        width: width - 20,
        marginLeft: 10,
        marginTop: 10 ,
    },
    giphyElement: {
        height: 100,
        width: "33.33%",
        borderWidth: 0.5,
        borderColor : Colors.white,
        borderRadius: 5
    },
    giphyTxt: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 25,
        backgroundColor: Colors.tranparentBlack,
        justifyContent: 'center',
        width: "100%"
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    imageDimension: {
        height: '100%',
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    loadingView: {
        paddingVertical: 10,
        paddingBottom: 200
    }
})

export default HomeSearchScreen;