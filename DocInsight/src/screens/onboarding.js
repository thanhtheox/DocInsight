import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import scale from '../constants/responsive';
import FONT_FAMILY from '../constants/fonts';
import { IMG_Onboard1, IMG_Onboard2, IMG_Onboard3 } from '../assets/images';
import color from '../constants/color';

const {width: screenWidth, height: screenHeight } = Dimensions.get('window');  

const OnboardingScreen = (props) => {
    const views = [
        {source: IMG_Onboard1, text: "Dự đoán bệnh lý \nliên quan đến phổi", id:0 },
        {source: IMG_Onboard2, text: "Khoanh vùng những \nđiểm bất thường", id:1 },
        {source: IMG_Onboard3, text: "Hỗ trợ lưu \nlịch sử dự đoán", id:2 },
    ];
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            
            <View style={styles.swiper}>
                <SwiperFlatList
                    showPagination
                    paginationStyle={styles.wrapDot}
                    paginationStyleItemActive={styles.dotActive}
                    paginationStyleItemInactive={styles.dot}
                    data={views}

                    renderItem={({ item }) => (
                        <View key={item.id} style={{width: screenWidth, height: '50%'}}>
                            <Image source={item.source} style={styles.image}/>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    )}
                />      
            </View>
            <TouchableOpacity style={styles.skip} onPress={() => props.navigation.navigate('SignInScreen')}>
                <Text style={styles.skipText}>Bỏ qua</Text>
                {/* <IC_Skip/> */}
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    swiper: {
        top: scale(-50),
        height: scale(700),
    },
    image: {
        marginTop: scale(100),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: scale(20),
        zIndex: 1,
        width: screenWidth * 0.88,
    height: screenHeight * 0.54,
//borderWidth: 1

    },
    text: {
        marginTop: scale(33),
        fontSize: scale(28),
        paddingLeft: scale(40),
        justifyContent: 'center',
        zIndex: 2,
        color: color.TitleActive,
        fontFamily: FONT_FAMILY.SemiBold,
    },
    wrapDot: {
        flexDirection: 'row',
        alignSelf: 'center',  
    },
    dotActive: {
        backgroundColor: color.Blue,
        margin: 1,
        width: 15,
        height: 7,
    },
    dot: {
        margin: 1,
        opacity: 0.27,
        size: 3,
        width: 7,
        height: 7,
    },
    skip: {
        width: scale(300),
        height: scale(60),
        // borderRadius: scale(30),
        // backgroundColor: color.Button,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    skipText: {
        fontSize: scale(17),
        color: color.TitleActive,
  fontFamily: FONT_FAMILY.SemiBold,
        marginLeft: scale(200),
    },
})