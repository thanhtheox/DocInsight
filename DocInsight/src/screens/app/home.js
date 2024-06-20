import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { IMG_Onboard1, IMG_Onboard2, IMG_Onboard3 } from '../../assets/images';
import color from '../../constants/color';
import scale from '../../constants/responsive';
import FONT_FAMILY from '../../constants/fonts';
import UploadImage from '../../components/uploadImage';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';



const {width: screenWidth, height: screenHeight } = Dimensions.get('window'); 
const HomeScreen = (props) => {
    
    const banners = [
        {source: IMG_Onboard1, text: "Dự đoán bệnh lý liên quan đến phổi", id:0 },
        {source: IMG_Onboard2, text: "Khoanh vùng những điểm bất thường", id:1 },
        {source: IMG_Onboard3, text: "Hỗ trợ lưu lịch sử dự đoán", id:2 },
    ];
    const [photo, setPhoto] = useState(null);
    const takePhoto = async () => {
        const result = await launchCamera({
          savePhotos: true,
          mediaType: 'photo',
        });
        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      };
      const pickPhoto = async () => {
        const result = await launchImageLibrary({
          savePhotos: true,
          mediaType: 'photo',
        });
        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      };

    const [predictResults, setPredictResults] = useState([]);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const currentYear = new Date().getFullYear();

    const openUrl = async url => {
        try {
          await Linking.openURL(url);
        } catch {
          Alert.alert(`Do not know how to open this url: ${url}`);
        }
    };
    const [news, setNews] = useState([]);
    const [pageNews, setPageNews] = useState(1);
    useEffect(() => {
        const getMedicalNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=352de5f4d69d436f9b25738cfae73096',
                );
                var data = response.data.articles.filter((item) => item.title != "[Removed]");
                setNews(data);
            } catch (err) {
                console.log('err', err);
            }
        };
        const getPredictResults = async () => {
            try {
                const response = await axiosPrivate.get(`/results-by-doctor/${auth.userId}`);
                response.data.map((item) => {
                    switch (item.resultLabel){
                        case 'Normal': item.resultLabel = 'Bình thường'; break;
                        case 'Corona Virus Disease': item.resultLabel = 'Covid-19'; break;
                        case 'Pneumonia': item.resultLabel = 'Viêm phổi'; break;
                        case 'Tuberculosis': item.resultLabel = 'Bệnh Lao'; break;
                    }
                })
                if(response.data.length > 5)
                    setPredictResults(response.data.slice(0,5));
                else
                    setPredictResults(response.data);
              } catch (err) {
                console.log(err);
              }
        }; 
        getPredictResults();
        getMedicalNews();
      }, []);
    const itemsPerPageNews = 2;
    const lastPageNews = Math.ceil(news.length / itemsPerPageNews);
    const firstIndex = (pageNews - 1) * itemsPerPageNews;
    const lastIndex = pageNews * itemsPerPageNews;
    const displayedNews = news.slice(firstIndex, lastIndex);      
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            {/* Banner */}
            <View style={styles.swiperBanner}>
                <SwiperFlatList
                    showPagination
                    paginationStyle={styles.wrapDotBanner}
                    paginationStyleItemActive={styles.dotActiveBanner}
                    paginationStyleItemInactive={styles.dotBanner}
                    data={banners}

                    renderItem={({ item }) => (
                        <View key={item.id} style={{width: screenWidth}}>
                            <Image source={item.source} style={styles.imageBanner} resizeMode='stretch'/>
                            <Text style={styles.textBanner}>{item.text}</Text>
                        </View>
                    )}
                />      
            </View>
            {/* UploadImage */}
            <Text style={styles.titlePart}>Dự đoán</Text>
            <View style={{alignItems: 'center', marginTop: scale(20)}}>
                <UploadImage onPressTake={takePhoto} onPressPick={pickPhoto}/>
            </View>
            {/* Predict Results */}
            <Text style={styles.titlePart}>Gần đây</Text>
            <View style={{
                justifyContent: 'center', alignItems: 'center'
            }}>
                <SwiperFlatList
                    showPagination
                    style={{marginTop: scale(10)}}
                    paginationStyle={{
                        flexDirection: 'row', alignSelf: 'center'
                    }}
                    paginationStyleItemActive={{
                        backgroundColor: color.Blue,  width: scale(15), height: scale(7),marginTop:scale(35)
                    }}
                    paginationStyleItemInactive={{
                        opacity: 0.27, size: scale(3), width: scale(7), height: scale(7),marginTop:scale(35)
                    }}
                    data={predictResults}

                    renderItem={({ item }) => (
                        <TouchableOpacity key={item._id} 
                        onPress={() => props.navigation.navigate('Predict', {
                            screen: 'PredictResultScreen',
                            params: {
                                patient: item.patientId,
                                result: item
                            },
                          })}
                        style={{width: screenWidth,flexDirection:'row', justifyContent: 'center', alignSelf:'center'}}>
                            <View style={{backgroundColor:'#F1F1F1', borderRadius: scale(15),height:'100%', width:'85%',flexDirection:'row-reverse',justifyContent:'space-between'}}>
                                <Image source={{uri: item.inputImage}} style={{
                                    justifyContent:'flex-end',
                                    height: scale(100),
                                    width: '50%',
                                    borderTopRightRadius: scale(15),
                                    borderBottomRightRadius:scale(15)
                                }} resizeMode='stretch'/>
                                <View style={{marginLeft: scale(10),alignSelf: 'center'}}>
                                    <Text style={{
                                        fontSize: scale(15),
                                        color: color.Description,
                                        fontFamily: FONT_FAMILY.Regular,
                                    }}>
                                        {item.patientId.gender === 'male' ? `Anh ${item.patientId.name} - ${currentYear - item.patientId.birthday} tuổi`
                                        :` Chị ${item.patientId.name} - ${currentYear - item.patientId.birthday} tuổi`}
                                    </Text>
                                    <Text style={{
                                        fontSize: scale(15),
                                        color: color.Description,
                                        fontFamily: FONT_FAMILY.Regular,
                                    }}>{`Dự đoán: `}</Text>
                                    <Text style={{
                                        fontSize: scale(15),
                                        color: color.Description,
                                        fontFamily: FONT_FAMILY.Regular,
                                    }}>{item.resultLabel}</Text>
                                </View> 
                            </View>
                        </TouchableOpacity>
                    )}
                />      
            </View>
            {/* Medical News */}
            <Text style={styles.titlePart}>Tin tức y khoa</Text>
            <View style={{maxHeight: scale(200), width: '95%', flexDirection: 'column', alignSelf:'center', marginTop: scale(10)}}>
            {displayedNews.map((item) => (
                <TouchableOpacity key={item.title} onPress={() => openUrl(item.url)} style={{flexDirection: 'row',height: scale(100), alignSelf: 'center', width: '90%'}}>
                    <Image source={{uri: item.urlToImage || "https://icons.iconarchive.com/icons/iconarchive/wild-camping/512/Newspaper-icon.png"}} 
                        resizeMode='cover' style={{width: scale(80), height: scale(80)}}/>
                    <View style={{justifyContent: 'space-evenly', marginLeft: scale(15), width: '70%', height: scale(80)}}>
                        <Text style={{fontFamily: FONT_FAMILY.Regular, fontSize: scale(13), color: color.TitleActive}}>
                        {item.publishedAt.split('T')[0]}
                        </Text>
                        <Text style={{fontFamily: FONT_FAMILY.Medium, fontSize: scale(13), color: color.TitleActive}}>
                        {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom:scale(100)}}>
                <TouchableOpacity
                    onPress={() => setPageNews(pageNews > 1 ? pageNews - 1 : pageNews)}
                    disabled={pageNews === 1}
                    style={{ width: scale(30), height: scale(30), backgroundColor: pageNews > 1 ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: color.White, fontSize: scale(20) }}>
                        {'<'}
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: color.Button, fontSize: scale(25), fontFamily: FONT_FAMILY.SemiBold }}>{pageNews}</Text>
                <TouchableOpacity
                    onPress={() => setPageNews(pageNews < lastPageNews ? pageNews + 1 : pageNews)}
                    disabled={pageNews === lastPageNews}
                    style={{ width: scale(30), height: scale(30), backgroundColor: pageNews < lastPageNews ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: color.White, fontSize: scale(20) }}>
                        {'>'}
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    swiperBanner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imageBanner: {
        marginTop: scale(10),
        justifyContent: 'center',
        alignSelf: 'center',
        height: scale(200),
        width: '96%',
        borderRadius: scale(15),
        zIndex: 1,
    },
    textBanner: {
        position: 'absolute',
        marginTop: scale(150),
        marginHorizontal: scale(5),
        fontSize: scale(16),
        display: 'flex',
        alignSelf: 'center',
        zIndex: 2,
        color: color.Button,
        fontFamily: FONT_FAMILY.Regular,
    },
    wrapDotBanner: {
        flexDirection: 'row',
        alignSelf: 'center',  
        width: '100%',
    },
    dotActiveBanner: {
        backgroundColor: color.Blue,
        margin: scale(1),
        width: scale(15),
        height: scale(7),
    },
    dotBanner: {
        margin: scale(1),
        opacity: 0.27,
        size: scale(3),
        width: scale(7),
        height: scale(7),
    },
    titlePart: {
        color:color.TitleActive, 
        fontSize: scale(22), 
        fontFamily: FONT_FAMILY.SemiBold, 
        marginLeft: scale(20), 
        marginTop: scale(30)
    },
})