import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../../constants/color'
import scale from '../../../constants/responsive'
import FONT_FAMILY from '../../../constants/fonts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { IC_Edit } from '../../../assets/icons'

const {width: screenWidth, height: screenHeight } = Dimensions.get('window'); 
const PatientProfileDetailsScreen = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const {patient} = props.route.params;
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;
    const lastPage = Math.ceil(results.length / itemsPerPage);
    const firstIndex = (page - 1) * itemsPerPage;
    const lastIndex = page * itemsPerPage;
    const displayedResults = results.slice(firstIndex, lastIndex);
    
    useEffect(() => {
        const getResultsByPatientId = async (id) => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get(`/results-by-patient/${id}`);
                response.data.map((item) => {
                    switch (item.resultLabel){
                        case 'Normal': item.resultLabel = 'Bình thường'; break;
                        case 'Corona Virus Disease': item.resultLabel = 'Covid-19'; break;
                        case 'Pneumonia': item.resultLabel = 'Viêm phổi'; break;
                        case 'Tuberculosis': item.resultLabel = 'Bệnh Lao'; break;
                    }
                });
                setResults(response.data);
                setLoading(false);
              } catch (err) {
                setLoading(false);
                console.log(err.response.data);
              }
        }; 
        getResultsByPatientId(patient._id);
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        {/* Patient Info */}
        <Text style={styles.titlePart}>Thông tin bệnh nhân</Text>
        <TouchableOpacity 
        onPress={() => props.navigation.navigate('EditPatientProfileScreen', {
            patient: patient,
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
            <IC_Edit marginTop={scale(20)}/>
        </TouchableOpacity>
        {/* Predict results */}
        {results.length > 0 ? (<Text style={styles.titlePart}>Các kết quả</Text>):(null)}
        <View style={{marginTop: scale(10), height: scale(450), width: '95%', flexDirection: 'column', alignSelf:'center'}}>
        {loading === true ? (
            <ActivityIndicator
            size={scale(100)}
            color={color.Button}
            style={{alignSelf: 'center', justifyContent:'center', marginTop: scale(200)}}
          />
        ) : (
            results.length > 0 ? (
                displayedResults.map((item) => (
                    <TouchableOpacity key={item._id} style={{width: screenWidth, height: scale(130), flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: scale(10)}}>
                        <View style={{backgroundColor: '#F1F1F1', borderRadius: scale(15), height: '100%', borderWidth: 1, borderColor: '#F1F1F1', width: '85%', flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                            <Image source={{uri: item.resultImage}} style={{
                                justifyContent: 'flex-end',
                                height: '100%',
                                width: '60%',
                                borderTopRightRadius: scale(15),
                                borderBottomRightRadius: scale(15)
                            }} resizeMode='stretch'/>
                            <View style={{marginLeft: scale(20), alignSelf: 'center'}}>
                                <Text style={{
                                    fontSize: scale(15),
                                    color: color.Description,
                                    fontFamily: FONT_FAMILY.Regular,
                                }}>{`Dự đoán:`}</Text>
                                <Text style={{
                                    fontSize: scale(15),
                                    color: color.Description,
                                    fontFamily: FONT_FAMILY.Regular,
                                }}>{item.resultLabel}</Text>
                                <Text style={{
                                    fontSize: scale(15),
                                    color: color.Description,
                                    fontFamily: FONT_FAMILY.Regular,
                                }}>
                                    {item.createdAt?.split('T')[0]}
                                </Text>
                            </View> 
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={{alignSelf: 'center', marginTop: scale(200)}}>
                    <Text style={{
                        fontSize: scale(30),
                        color: color.TitleActive,
                        fontFamily: FONT_FAMILY.SemiBold,
                    }}>{`Chưa có kết quả dự đoán nào!`}
                    </Text>
                </View> 
            )
        )}
        </View>
        {results.length > 0 ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop:scale(10), marginBottom: scale(100)}}>
            <TouchableOpacity
                onPress={() => setPage(page > 1 ? page - 1 : page)}
                disabled={page === 1}
                style={{ width: scale(30), height: scale(30), backgroundColor: page > 1 ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ color: color.White, fontSize: scale(20) }}>
                    {'<'}
                </Text>
            </TouchableOpacity>
            {results.length > 3 && <Text style={{ color: color.Button, fontSize: scale(25), fontFamily: FONT_FAMILY.SemiBold }}>{page}</Text>}
            <TouchableOpacity
                onPress={() => setPage(page < lastPage ? page + 1 : page)}
                disabled={page === lastPage}
                style={{ width: scale(30), height: scale(30), backgroundColor: page < lastPage ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ color: color.White, fontSize: scale(20) }}>
                    {'>'}
                </Text>
            </TouchableOpacity>
        </View>):(null)}
        </ScrollView>
    </SafeAreaView>
  )
}

export default PatientProfileDetailsScreen

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
})