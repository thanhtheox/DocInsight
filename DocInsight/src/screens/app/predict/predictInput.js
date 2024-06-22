import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import {RadioButton} from 'react-native-paper'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import DropDownPicker from 'react-native-dropdown-picker'

import FONT_FAMILY from '../../../constants/fonts'
import scale from '../../../constants/responsive'
import color from '../../../constants/color'
import UploadImage from '../../../components/uploadImage'
import { saveInput } from '../../../redux/actions/resultActions'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useAuth from '../../../hooks/useAuth'
import SubmitButton from '../../../components/submitButton'

const createPatientSchema = yup.object({
    name: yup
      .string()
      .required('Họ và tên không được để trống')
      .max(50, 'Họ và tên không được dài quá 50 kí tự'),
  
      birthday: yup
      .number()
      .test(
        'isValidYear',
        'Định dạng năm chưa đúng',
        function(value) {
          return /^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]?)$/.test(value);
        }
      ),
    address: yup.string(),
    disease: yup.string().required('Vui lòng chọn bệnh liên quan'),
  });
const PredictInputScreen = (props) => {
    const dispatch = useDispatch();
    const input = useSelector(state => state.input.input?.result);
    const [patientID, setPatientID] = useState('');
    const [patientData, setPatientData] = useState([]);
    const [patientList, setPatientList] = useState([]);
    const [showPatientDropDown, setShowPatientDropDown] = useState(false);

    const [addPatient, setAddPatient] = useState(false);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [address, setAddress] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [disease, setDisease] = useState('');
    const [gender, setGender] = useState('male');
    const {auth} = useAuth();
    const diseaseList = [
        {
        label: 'Phổi',
        value: 'lung',
        },
    ];
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await axiosPrivate.get(`/patients/${auth.userId}`);
                var updatedPatientList = [{
                    label: '+ Thêm bệnh nhân mới',
                    value: 'add patient',
                }];
                setPatientData(response.data);
                response.data.forEach((pa) => {
                    updatedPatientList.push({
                        label: pa.gender === 'male' ? `Anh ${pa.name}` : `Chị ${pa.name}`,
                        value: pa._id,
                    });
                });
                setPatientList(updatedPatientList);
              } catch (err) {
                console.log(err.response.data);
              }
        }; 
        getPatients();
      }, []);

    const {
        control: controlCreate,
        handleSubmit: handleCreate,
        formState: {errors: errorsCreate},
    } = useForm({
        mode: 'onChange',
        defaultValues: {
        name: '',
        birthday: '',
        address: '',
        disease: '',
        },
        resolver: yupResolver(createPatientSchema),
    });
    const createFunction = async () => {
        try {
          setLoading(true);
          const createResponse = await axiosPrivate.post(
            '/patient',
            JSON.stringify({
                doctorId: auth.userId,
                name: name,
                birthday: birthday,
                address: address,
                gender: gender,
                disease: disease
            }),
          );
          console.log('success', JSON.stringify(createResponse.data));
            const newPatient = {
                label: createResponse.data.patient.gender === 'male' ? `Anh ${createResponse.data.patient.name}` : `Chị ${createResponse.data.patient.name}`,
                value: createResponse.data.patient._id,
            };
            const updatedPatientList = [...patientList, newPatient];
            const updatedPatientData = [...patientData, createResponse.data.patient];
            setPatientList(updatedPatientList);
            setPatientID(createResponse.data.patient._id);
            setPatientData(updatedPatientData);
        
          setLoading(false);
        } catch (err) {
          setLoading(false);
          // setVisible(true);
          setErrorMessage(err?.toString()||"Network Error");
          // setTitle('Error');
          console.log(err);
        } finally {
            setAddPatient(false);
        }
    };
    const handleGenderChange = value => {
        setGender(value);
    };
    const predictFunction = async () => {
        try {
          setLoading(true);
          const selectedPatient = patientData.find((pa) => pa._id === patientID);
          const formData = new FormData();
            formData.append(`inputImage`, {
            name: new Date() + `_image`,
            uri: input,
            type: 'image/jpg',
            });
            formData.append(`patientId`, patientID);
          const response = await axiosPrivate.post('/result',formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
          console.log('success', JSON.stringify(response.data));
          setLoading(false);
          props.navigation.navigate('Predict', {
            screen: 'PredictResultScreen',
            params: {
                patient: selectedPatient,
                result: response.data.createdResult
            },
          })
        } catch (err) {
          setLoading(false);
          // setVisible(true);
          setErrorMessage(err?.toString()||"Network Error");
          // setTitle('Error');
          console.log(err);
        }
    };
    const takePhoto = async () => {
        const result = await launchCamera({
          savePhotos: true,
          mediaType: 'photo',
        });
        if (!result.canceled) {
          dispatch(saveInput(result.assets[0].uri));
        }
      };
      const pickPhoto = async () => {
        const result = await launchImageLibrary({
          savePhotos: true,
          mediaType: 'photo',
        });
        if (!result.canceled) {
            dispatch(saveInput(result.assets[0].uri));
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
            {input === undefined ? (
                <View style={{marginTop: scale(20), alignSelf:'center',alignItems:'center'}}>
                    <Text style={{color:color.TitleActive, fontSize: scale(18), fontFamily: FONT_FAMILY.SemiBold}}>
                        {'Vui lòng chọn ảnh để dự đoán!'}
                    </Text>
                </View>
            ):(
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: input}} resizeMode='cover'/>
                </View>
            )}
            <View style={{alignItems: 'center', marginTop: scale(15)}}>
                <UploadImage onPressTake={takePhoto} onPressPick={pickPhoto}/>
            </View>
            <Text style={styles.titlePart}>Thông tin bệnh nhân</Text>
            {addPatient === false ? (
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    style={{width: '100%', alignSelf:'center',height: scale(60), marginTop:scale(20), marginBottom:scale(150)}}
                    containerStyle={{width: '90%', alignSelf:'center', height: scale(60), marginBottom:scale(150)}}
                    textStyle={styles.inputText}
                    showTickIcon={false}
                    selectedItemContainerStyle={{backgroundColor: color.Button}}
                    selectedItemLabelStyle={{color: color.White, fontSize: scale(14), marginLeft: scale(5),}}
                    open={showPatientDropDown}
                    value={patientID}
                    items={patientList}
                    setOpen={setShowPatientDropDown}
                    setValue={setPatientID}
                    placeholder="Chọn bệnh nhân"
                    placeholderTextColor={color.Description}
                    onChangeValue={(value) => {
                        value === 'add patient' ? setAddPatient(true) : setPatientID(value)
                    }}
                />
            ):(
                <View style={styles.form}>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        style={{width: '100%', alignSelf:'center',height: scale(60), marginTop:scale(20), marginBottom:scale(20)}}
                        containerStyle={{width: '90%', alignSelf:'center', height: scale(60), marginBottom:scale(20)}}
                        textStyle={styles.inputText}
                        showTickIcon={false}
                        selectedItemContainerStyle={{backgroundColor: color.Button}}
                        selectedItemLabelStyle={{color: color.White, fontSize: scale(14), marginLeft: scale(5),}}
                        open={showPatientDropDown}
                        value={patientID}
                        items={patientList}
                        setOpen={setShowPatientDropDown}
                        setValue={setPatientID}
                        placeholder="Chọn bệnh nhân"
                        placeholderTextColor={color.Description}
                        onChangeValue={(value) => {
                            value !== 'add patient' && (setAddPatient(false), setPatientID(value))
                        }}
                    />
                    {/* nameInput */}
                    <Controller
                    name="name"
                    control={controlCreate}
                    render={({field: {onChange, value}}) => (
                        <View style={styles.inputBox}>
                        <View style={styles.viewInput}>
                            <TextInput
                            onChangeText={name => {
                                onChange(name);
                                setName(name);
                            }}
                            placeholder="*Họ và tên"
                            placeholderTextColor={color.Description}
                            value={value}
                            style={styles.inputText}
                            />
                        </View>
                        {errorsCreate?.name && (
                            <Text style={styles.textFailed}>
                            {errorsCreate.name.message}
                            </Text>
                        )}
                        </View>
                    )}
                    />

                    {/* birthdayInput */}
                    <Controller
                    name="birthday"
                    control={controlCreate}
                    render={({field: {onChange, value}}) => (
                        <View style={styles.inputBox}>
                        <View style={styles.viewInput}>
                            <TextInput
                            onChangeText={birthday => {
                                onChange(birthday);
                                setBirthday(birthday);
                            }}
                            value={value}
                            placeholder="*Năm sinh"
                            placeholderTextColor={color.Description}
                            keyboardType='numeric'
                            style={styles.inputText}
                            />
                        </View>
                        {errorsCreate?.birthday && (
                            <Text style={styles.textFailed}>
                            {errorsCreate.birthday.message}
                            </Text>
                        )}
                        </View>
                    )}
                    />

                    {/* addressInput */}
                    <Controller
                    name="address"
                    control={controlCreate}
                    render={({field: {onChange, value}}) => (
                        <View style={styles.inputBox}>
                        <View style={styles.viewInput}>
                            <TextInput
                            onChangeText={address => {
                                onChange(address);
                                setAddress(address);
                            }}
                            placeholder="*Địa chỉ"
                            placeholderTextColor={color.Description}
                            value={value}
                            style={styles.inputText}
                            />
                        </View>
                        {errorsCreate?.address && (
                            <Text style={styles.textFailed}>
                            {errorsCreate.address.message}
                            </Text>
                        )}
                        </View>
                    )}
                    />
                    <View style={styles.inputBox}>
                    <Controller
                        name="disease"
                        defaultValue={5}
                        control={controlCreate}
                        render={({field: {onChange, value}}) => (
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            textStyle={styles.inputText}
                            open={showDropDown}
                            value={disease}
                            showTickIcon={false}
                            selectedItemContainerStyle={{backgroundColor: color.Button}}
                            selectedItemLabelStyle={{color: color.White, fontSize: scale(14), marginLeft: scale(5),}}
                            items={diseaseList}
                            setOpen={setShowDropDown}
                            setValue={setDisease}
                            placeholder="Bệnh liên quan"
                            placeholderTextColor={color.Description}
                            onChangeValue={onChange}
                        />
                        )}
                    />
                    </View>
                    {/* gender */}
                    <View style={styles.genderContainer}>
                    <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
                        <View
                        style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={styles.radioOption}>
                            <RadioButton value="male" color={color.Button} />
                            <Text style={{color: color.TitleActive}}>Nam</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton value="female" color={color.Button} />
                            <Text style={{color: color.TitleActive}}>Nữ</Text>
                        </View>
                        </View>
                    </RadioButton.Group>
                    </View>
                </View>
            )}
            <View style={{marginTop:scale(10), alignSelf:'center', marginBottom: scale(100)}}>
                {addPatient === false ? (
                    <SubmitButton
                        text={'Dự đoán'}
                        backgroundColor={color.Button}
                        color={color.White}
                        loading={loading}
                        onPress={predictFunction}
                    />
                ):(
                    <SubmitButton
                        text={'Thêm bệnh nhân'}
                        backgroundColor={color.Button}
                        color={color.White}
                        loading={loading}
                        onPress={handleCreate(createFunction)}
                    />
                )}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PredictInputScreen

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
    },
    form: {
        alignItems: 'center',
        paddingTop: scale(10),
      },
    inputBox: {
        paddingTop: scale(20),
        width: scale(339),
        height: scale(100),
        justifyContent: 'center',
    },
    viewInput: {
        height: scale(55),
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: color.TitleActive,
        borderRadius: scale(12),
    },
    inputText: {
        color: color.TitleActive,
        fontSize: scale(14),
        marginLeft: scale(5),
    },
    genderContainer: {
        width: scale(339),
        marginTop: scale(20),
        padding: scale(10),
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(10),
    },
    textFailed: {
        paddingLeft: scale(10),
        marginTop: scale(7),
        justifyContent: 'center',
        fontSize: scale(12),
        color: 'red',
    },
    dropdown: {
        backgroundColor: color.Blue,
    },
})