import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import color from '../../../constants/color'
import scale from '../../../constants/responsive';
import FONT_FAMILY from '../../../constants/fonts';
import { IC_Close, IC_Search, IC_Add } from '../../../assets/icons';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const PatientProfileListScreen = (props) => {

    const [patients, setPatients] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const lastPage = Math.ceil(searchResults.length / itemsPerPage);
    const firstIndex = (page - 1) * itemsPerPage;
    const lastIndex = page * itemsPerPage;
    const displayedPatients = searchResults.slice(firstIndex, lastIndex);    
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axiosPrivate.get(`/patients/${auth.userId}`);
                setPatients(response.data);
              } catch (err) {
                console.log(err.response.data);
              }
        }; 
        getPatients();
      }, []);

    const searchFilterFunction = text => {
        if (text) {
            const searchText = text.toLowerCase();
            const filteredPatients = patients.filter(function (item) {
            return (
                item.name.toLowerCase().includes(searchText) ||
                item.createdAt.includes(searchText)
            );
          });
          setSearchResults(filteredPatients);
        } else {
            setSearchResults(patients);
        }
      };
  return (
    <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
            <TextInput
            ref={input => {
                this.textInput = input;
            }}
            onChangeText={text => searchFilterFunction(text)}
            selectionColor={color.Button}
            placeholder="Tìm thông tin bệnh nhân"
            placeholderTextColor={color.Description}
            style={styles.textInput}
            />
            <TouchableOpacity
            onPress={() => searchFilterFunction('') & this.textInput.clear()}>
                <IC_Close marginRight={scale(10)} color={color.Button}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IC_Search marginRight={scale(20)} marginTop={scale(5)} color={color.Button}/>
            </TouchableOpacity>
        </View>
        {/* Patients List */}
        <View style={{marginLeft: scale(20), marginTop: scale(20), flexDirection:'row',justifyContent:'space-between', alignSelf:'center',alignItems:'center',width:'90%'}}>
            <Text style={styles.titlePart}>Thông tin bệnh nhân</Text>
            <TouchableOpacity style={{marginRight: scale(5), backgroundColor:color.Button, width:scale(40), 
                height:scale(40), justifyContent:'center',alignItems:'center', borderRadius:scale(10)}}>
                <IC_Add color={color.White}/>
            </TouchableOpacity>
        </View>
        <View style={{maxHeight: scale(800), width: '95%', flexDirection: 'column', alignSelf:'center'}}>
        {displayedPatients.map((item) => (
            <TouchableOpacity key={item._id} style={{flexDirection: 'row',height: scale(80), marginTop: scale(10),
            alignSelf: 'center', alignItems:'center', justifyContent: 'space-evenly', width: '95%',borderWidth:2, borderColor:color.Button, borderRadius:scale(15)}}>
                <View style={{justifyContent: 'space-evenly', marginLeft: scale(5), height: scale(80)}}>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {item.gender === 'male' ? `Anh ${item.name} - ${currentYear - item.birthday} tuổi`
                    :` Chị ${item.name} - ${currentYear - item.birthday} tuổi`}
                    </Text>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {item.address}
                    </Text>
                </View>
                <View style={{justifyContent: 'space-evenly', height: scale(80)}}>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {`Ngày khám: `}
                    </Text>
                    <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(15), color: color.TitleActive}}>
                    {item.createdAt.split('T')[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical:scale(10)}}>
            <TouchableOpacity
                onPress={() => setPage(page > 1 ? page - 1 : page)}
                disabled={page === 1}
                style={{ width: scale(30), height: scale(30), backgroundColor: page > 1 ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ color: color.White, fontSize: scale(20) }}>
                    {'<'}
                </Text>
            </TouchableOpacity>
            <Text style={{ color: color.Button, fontSize: scale(25), fontFamily: FONT_FAMILY.SemiBold }}>{page}</Text>
            <TouchableOpacity
                onPress={() => setPage(page < lastPage ? page + 1 : page)}
                disabled={page === lastPage}
                style={{ width: scale(30), height: scale(30), backgroundColor: page < lastPage ? color.Button : color.White, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ color: color.White, fontSize: scale(20) }}>
                    {'>'}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default PatientProfileListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    searchBar: {
        marginTop: scale(15),
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderColor: color.Button,
        borderWidth: 2,
        borderRadius: scale(10)
    },
    textInput: {
        height: scale(42),
        color: color.Button,
        fontSize:scale(15),
        width: scale(280),
        fontFamily: FONT_FAMILY.Regular,
    },
    titlePart: {
        color:color.TitleActive, 
        fontSize: scale(22), 
        fontFamily: FONT_FAMILY.SemiBold
    },
})