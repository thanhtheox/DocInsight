import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {Controller, useForm} from 'react-hook-form';
import {RadioButton} from 'react-native-paper';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import DropDownPicker from 'react-native-dropdown-picker';
import color from '../../../constants/color'
import scale from '../../../constants/responsive'
import FONT_FAMILY from '../../../constants/fonts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import SubmitButton from '../../../components/submitButton';

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
const AddPatientProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [address, setAddress] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [disease, setDisease] = useState('');
    const [gender, setGender] = useState('male');
    const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
    const diseaseList = [
        {
        label: 'Phổi',
        value: 'lung',
        },
    ];
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
          const response = await axiosPrivate.post(
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
          console.log('success', JSON.stringify(response.data));
          setLoading(false);
          props.navigation.navigate('PatientProfileListScreen');
        } catch (err) {
          setLoading(false);
          // setVisible(true);
          setErrorMessage(err?.toString()||"Network Error");
          // setTitle('Error');
          console.log(err);
        }
      };
    const handleGenderChange = value => {
        setGender(value);
    };
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <Text style={styles.titlePart}>Thêm bệnh nhân</Text>
        <View style={styles.form}>
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
                        setName(name); // Update the name state
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
                        setBirthday(birthday); // Update the age state
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
                        setAddress(address); // Update the name state
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
        <View style={styles.buttonRow}>
            <SubmitButton
                text={'Hủy'}
                backgroundColor={color.White}
                borderColor={color.Button}
                width={'45%'}
                borderWidth={2}
                color={color.Button}
                onPress={() => props.navigation.goBack()}
            />
            <SubmitButton
                text={'Lưu'}
                backgroundColor={color.Button}
                color={color.White}
                width={'45%'}
                loading={loading}
                onPress={handleCreate(createFunction)}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddPatientProfileScreen

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
    form: {
        alignItems: 'center',
        paddingTop: 10,
      },
    inputBox: {
        paddingTop: 20,
        width: 339,
        height: 100,
        justifyContent: 'center',
    },
    viewInput: {
        height: 55,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: color.TitleActive,
        borderRadius: 12,
    },
    inputText: {
        color: color.TitleActive,
        fontSize: 14,
        marginLeft: 5,
    },
    genderContainer: {
        width: 339,
        marginTop: 20,
        padding: 10,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    textFailed: {
        paddingLeft: 10,
        marginTop: 7,
        justifyContent: 'center',
        fontSize: 12,
        color: 'red',
    },
    dropdown: {
        backgroundColor: color.Blue,
    },
    buttonRow: {
        marginTop: scale(40),
        marginBottom: scale(100),
        alignSelf: 'center',
        width:'90%',
        justifyContent:'space-around',
        flexDirection:'row'
    },
})