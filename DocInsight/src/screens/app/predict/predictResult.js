import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { useDispatch } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob';

import color from '../../../constants/color'
import scale from '../../../constants/responsive'
import FONT_FAMILY from '../../../constants/fonts'
import UploadImage from '../../../components/uploadImage'
import { saveInput } from '../../../redux/actions/resultActions'


const PredictResultScreen = (props) => {
    const {patient, result} = props.route.params;
    const dispatch = useDispatch();
    const totalPredictPoint = result.coronaPercent + result.normalPercent + result.pneumoniaPercent + result.tuberculosisPercent; 
    const predictResult = [
        {
            label: 'pneumonia',
            title: 'Viêm Phổi',
            percent: ((result.pneumoniaPercent / totalPredictPoint) * 100).toFixed(2),
        },
        {
            label: 'normal',
            title: 'Bình thường',
            percent: ((result.normalPercent / totalPredictPoint) * 100).toFixed(2),
        },
        {
            label: 'corona',
            title: 'Covid-19',
            percent: ((result.coronaPercent / totalPredictPoint) * 100).toFixed(2),
        },
        {
            label: 'tuberculosis',
            title: 'Bệnh Lao',
            percent: ((result.tuberculosisPercent / totalPredictPoint) * 100).toFixed(2),
        },
    ];
    predictResult.sort((a, b) => b.percent - a.percent);
    const takePhoto = async () => {
        const result = await launchCamera({
          savePhotos: true,
          mediaType: 'photo',
        });
        if (!result.canceled) {
          dispatch(saveInput(result.assets[0].uri));
          props.navigation.navigate('PredictInputScreen');
        }
      };
    const pickPhoto = async () => {
    const result = await launchImageLibrary({
        savePhotos: true,
        mediaType: 'photo',
    });
    if (!result.canceled) {
        dispatch(saveInput(result.assets[0].uri));
        props.navigation.navigate('PredictInputScreen');
    }
    };
    const downloadImage = () => {
        try {
          let date = new Date();
          var Base64Code = result.resultImage.split("data:image/png;base64,"); //base64Image is my image base64 string
          const dirs = RNFetchBlob.fs.dirs;
          var path = dirs.DCIMDir + `/image_${Math.floor(date.getTime() + date.getSeconds() / 2)}.png`;
    
          RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
          .then((res) => {
            console.log("File : ", res);
            // setTitle("Successfully");
            // setVisible(true);
            // setMessage('Save successfully!');
          });
        } catch (error) {
          console.error('An error occurred during image download:', error);
        //   setTitle("Error");
        //   setVisible(true);
        //   setMessage('Failed to download the image.');
        }
      };
    const checkPermission = async () => {
        if (Platform.OS === 'ios') {
          downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadImage();
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            {/* input */}
            <View style={{width: '90%', marginTop: scale(15), flexDirection:'row', alignSelf:'center', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{color:color.TitleActive, fontSize: scale(22), fontFamily: FONT_FAMILY.SemiBold}}>
                    {'Dự đoán'}
                </Text>
                <View style={{flexDirection:'row', marginTop: scale(5)}}>
                    <Text style={{color:color.TitleActive, fontSize: scale(13), fontFamily: FONT_FAMILY.Regular}}>
                        {'Chỉ chọn ảnh X-ray'}
                    </Text>
                    <Text style={{color:color.Warning, fontSize: scale(13), fontFamily: FONT_FAMILY.Regular}}>
                        {'*'}
                    </Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: result.inputImage}} resizeMode='contain'/>
            </View>
            {/* result */}
            <Text style={styles.titlePart}>Kết quả dự đoán:</Text>
            <View style={{width: '90%', marginLeft: scale(20), marginTop: scale(10)}}>
                {predictResult.map((item, index) => (
                    <Text key={item.label} style={{color: index === 0 ? color.Button : color.TitleActive, fontSize: scale(16), fontFamily: FONT_FAMILY.Medium}}>
                        {`${item.title} - ${item.percent}%`}
                    </Text>
                ))}
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: result.resultImage}} resizeMode='cover'/>
            </View>
            {/* patient profile */}
            <Text style={styles.titlePart}>Thông tin bệnh nhân</Text>
            <TouchableOpacity 
            onPress={() => props.navigation.navigate('Patients', {
              screen: 'PatientProfileDetailsScreen',
              params: {patient: patient},
            })}
            style={{flexDirection: 'row',height: scale(80), marginTop: scale(10),
            alignSelf: 'center', alignItems:'center', justifyContent: 'space-evenly', width: '95%',borderWidth:2, borderColor:color.Button, borderRadius:scale(15)}}>
                <View style={{justifyContent: 'space-evenly', marginLeft: scale(5), height: scale(80)}}>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {patient.gender === 'male' ? `Anh ${patient.name} - ${patient.age} tuổi`
                    :` Chị ${patient.name} - ${patient.age} tuổi`}
                    </Text>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {patient.address}
                    </Text>
                </View>
                <View style={{justifyContent: 'space-evenly', height: scale(80)}}>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {`Ngày khám: `}
                    </Text>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {patient.createdAt?.split('T')[0]}
                    </Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.titlePart}>Dự đoán khác</Text>
            <View style={{alignItems: 'center', marginTop: scale(15), marginBottom: scale(100)}}>
                <UploadImage onPressTake={takePhoto} onPressPick={pickPhoto}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PredictResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    titlePart: {
        color:color.TitleActive, 
        fontSize: scale(22), 
        fontFamily: FONT_FAMILY.SemiBold, 
        marginLeft: scale(20), 
        marginTop: scale(15)
    },
    imageContainer: {
        width: scale(300), 
        height:scale(250), 
        alignSelf:'center', 
        borderRadius:scale(25), 
        borderWidth: 2, 
        borderColor: color.Button, 
        marginTop:scale(10)
    },
    image: {
        width: scale(296), 
        height:scale(246), 
        alignSelf:'center',
        borderRadius:scale(23)
    }
})