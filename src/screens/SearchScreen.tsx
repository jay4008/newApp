
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, ImageBackground, Dimensions, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from "lodash";
import { Colors, Fonts } from '../assets/literals/Literals';
import { request } from '../servises/servises';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { gifApiCall, resetData } from '../store/giphy';
const { height, width } = Dimensions.get('window');
const HomeSearchScreen = (props: any) => {
    const [query, setqury] = React.useState("");
    const dispatch = useDispatch()
    const GifData = useSelector(
        (state: RootState) => state.giphy.GifData,
    );
    const totalPage = useSelector(
        (state: RootState) => state.giphy.totalPage,
    );
    const [loader, setLoader] = React.useState(false);
    console.log("GifData", GifData);
    const [ListData, setListData] = React.useState([]);
    const [queryForApiCall, setApiCallText] = React.useState("");
    const [flatListOnEndReach, setFlatListOnEndReach] = React.useState(false)
    const delayedQuery = _.debounce((q: string) => sendQuery(q), 2000);
    const onChange = (value: string) => {
        dispatch(resetData());
        setqury(value);
        delayedQuery(value);
    };

    const sendQuery = (query1: string) => {
        setApiCallText(query1);
    };

    React.useEffect(() => {
        if (GifData === undefined || query === "") {
            dispatch(resetData());
        }
        if ((queryForApiCall === query) && (queryForApiCall !== "" && query !== "")) {
            setLoader(true);
            dispatch(gifApiCall({
                limit: 10,
                offset: GifData.length,
                query: query
            })).then(() => {
                setLoader(false)

            }).catch(() => {
                setLoader(false)
            })

        }
    }, [queryForApiCall, query, flatListOnEndReach])
    return (
        <SafeAreaView>
            <Text style={styles.headingTxt}>Search Giphy</Text>
            <TextInput
                style={styles.serachTextInput}
                placeholder={"Search giphy"}
                value={query}
                onChangeText={onChange}
            />

            {
                query.length === 0 && <Text style={styles.pleaseEnterTxt}>Please enter some text that related to our Gifs</Text>
            }

            {

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.flatListStyle}
                    numColumns={3}
                    keyExtractor={(item, index) => "gifFlatlist" + index}
                    data={GifData.length > 0 ? GifData : []}
                    onEndReached={() => {
                        console.log("totalPage", totalPage, "GifData.length", GifData.length,);

                        if (((totalPage > GifData.length) && (totalPage !== 0 && GifData.length !== 0))) {
                            setFlatListOnEndReach(prev => !prev)
                        }

                    }}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.giphyElement} onPress={() => props.navigation.navigate('Details', { item: item })}>
                            <Image source={{ uri: item?.user?.avatar_url }} style={styles.imageDimension} resizeMode={'cover'} />
                            <View style={styles.giphyTxt}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.latoRegular, color: Colors.white, marginLeft: 10 }}>{item?.user?.display_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={() => (
                        <View style={styles.loadingView}>
                            {
                                loader && <ActivityIndicator size={'large'} color={Colors.black}></ActivityIndicator>
                            }

                        </View>
                    )}
                ></FlatList>
            }

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    headingTxt: {
        textAlign: 'center',
        paddingVertical: 5,
        fontFamily: Fonts.latoBlack
    },
    pleaseEnterTxt: {
        fontFamily: Fonts.latoRegular,
        marginLeft: 15,
        marginTop: 20,
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
        marginTop: 10,
    },
    giphyElement: {
        height: 100,
        width: "33.33%",
        borderWidth: 0.5,
        borderColor: Colors.white,
        borderRadius: 5
    },
    giphyTxt: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 22,
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