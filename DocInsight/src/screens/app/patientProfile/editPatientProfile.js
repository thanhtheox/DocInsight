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
import Message from '../../../components/message';

const editPatientSchema = yup.object({
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
const EditPatientProfileScreen = (props) => {
    const {patient} = props.route.params;
    const [name, setName] = useState(patient.name);
    const [birthday, setBirthday] = useState(patient.birthday);
    const [address, setAddress] = useState(patient.address);
    const [showDropDown, setShowDropDown] = useState(false);
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [disease, setDisease] = useState(patient.disease);
    const [gender, setGender] = useState(patient.gender);
    const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
    const diseaseList = [
        {
        label: 'Phổi',
        value: 'lung',
        },
    ];
    const {
        control: controlEdit,
        handleSubmit: handleEdit,
        formState: {errors: errorsEdit},
    } = useForm({
        mode: 'onChange',
        defaultValues: {
        name: patient.name,
        birthday: patient.birthday.toString(),
        address: patient.address,
        disease: patient.disease,
        },
        resolver: yupResolver(editPatientSchema),
    });
    const editFunction = async () => {
        try {
          setLoadingEdit(true);
          const response = await axiosPrivate.put(
            `/patient/${patient._id}`,
            JSON.stringify({
                name: name,
                birthday: birthday,
                address: address,
                gender: gender,
                disease: disease
            }),
          );
          console.log('success', JSON.stringify(response.data));
          setLoadingEdit(false);
            patient.name = name;
            patient.birthday = birthday;
            patient.address = address;
            patient.gender = gender;
            patient.disease = disease;
            patient.gender = gender;
          props.navigation.navigate('PatientProfileDetailsScreen', {
            patient: patient
          });
        } catch (err) {
            setLoadingEdit(false);
          setVisible(true);
          setErrorMessage(err?.toString()||"Network Error");
          setTitle('Error');
          console.log(err);
        }
      };
      const deleteFunction = async () => {
        try {
          setLoadingDelete(true);
          const response = await axiosPrivate.delete(
            `/patient/${patient._id}`
          );
          console.log('success', JSON.stringify(response.data));
          setLoadingDelete(false);
          props.navigation.navigate('PatientProfileListScreen');
        } catch (err) {
            setLoadingDelete(false);
          setVisible(true);
          setErrorMessage("What's wrong here?");
          setTitle('Error');
          console.log(err);
        }
      };
    const handleGenderChange = value => {
        setGender(value);
    };
  return (
    <SafeAreaView style={styles.container}>
        <Message
            visible={visible}
            clickCancel={() => { setVisible(false) }}
            title={title}
            message={errorMessage}
        />
        <ScrollView>
        <Text style={styles.titlePart}>Chỉnh sửa bệnh nhân</Text>
        <View style={styles.form}>
            {/* nameInput */}
            <Controller
            name="name"
            control={controlEdit}
            render={({field: {onChange, value}}) => (
                <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                    <TextInput
                    onChangeText={name => {
                        onChange(name);
                        setName(name); // Update the name state
                    }}
                    placeholder={patient.name}
                    placeholderTextColor={color.Description}
                    value={value}
                    style={styles.inputText}
                    />
                </View>
                {errorsEdit?.name && (
                    <Text style={styles.textFailed}>
                    {errorsEdit.name.message}
                    </Text>
                )}
                </View>
            )}
            />

            {/* birthdayInput */}
            <Controller
            name="birthday"
            control={controlEdit}
            render={({field: {onChange, value}}) => (
                <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                    <TextInput
                    onChangeText={birthday => {
                        onChange(birthday);
                        setBirthday(birthday); // Update the age state
                    }}
                    value={value}
                    defaultValue={patient.birthday.toString()}
                    placeholderTextColor={color.Description}
                    keyboardType='numeric'
                    style={styles.inputText}
                    />
                </View>
                {errorsEdit?.birthday && (
                    <Text style={styles.textFailed}>
                    {errorsEdit.birthday.message}
                    </Text>
                )}
                </View>
            )}
            />

            {/* addressInput */}
            <Controller
            name="address"
            control={controlEdit}
            render={({field: {onChange, value}}) => (
                <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                    <TextInput
                    onChangeText={address => {
                        onChange(address);
                        setAddress(address); // Update the name state
                    }}
                    placeholder={patient.address}
                    placeholderTextColor={color.Description}
                    value={value}
                    style={styles.inputText}
                    />
                </View>
                {errorsEdit?.address && (
                    <Text style={styles.textFailed}>
                    {errorsEdit.address.message}
                    </Text>
                )}
                </View>
            )}
            />
            <View style={styles.inputBox}>
            <Controller
                name="disease"
                defaultValue={patient.disease}
                control={controlEdit}
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
                loading={loadingEdit}
                onPress={handleEdit(editFunction)}
            />
        </View>
        <View style={{marginTop:scale(10), alignSelf:'center', marginBottom: scale(100)}}>
            <SubmitButton
                text={'Xóa bệnh nhân'}
                backgroundColor={color.Warning}
                color={color.White}
                loading={loadingDelete}
                onPress={deleteFunction}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default EditPatientProfileScreen

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
        marginTop: scale(10),
        alignSelf: 'center',
        width:'90%',
        justifyContent:'space-around',
        flexDirection:'row'
    },
})