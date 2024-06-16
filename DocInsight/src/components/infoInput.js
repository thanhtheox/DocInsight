import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Provider,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {RadioButton} from 'react-native-paper';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import color from '../constants/color';
import DropDownPicker from 'react-native-dropdown-picker';

const createPayLoadSchema = yup.object({
  name: yup
    .string()
    .required('Họ và tên không được để trống')
    .max(50, 'Họ và tên không được dài quá 50 kí tự'),

  age: yup
    .string()
    .matches(
      /^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]?)$/,
      'Định dạng năm chưa đúng',
    ),
  address: yup.string(),
  desease: yup.string().required('Vui lòng chọn bệnh liên quan'),
});

const InfoInput = props => {
  const [name, setName] = useState(''); // Move useState inside the component function
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [desease, setDesease] = useState('');
  const [gender, setGender] = useState('Female'); // Initialize with a default value
  const deseaseList = [
    {
      label: 'Phổi',
      value: 'phổi',
    },
  ];
  const {
    control: controlCreate,
    formState: {errors: errorsCreate},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      address: '',
      desease: '',
    },
    resolver: yupResolver(createPayLoadSchema),
  });

  const handleGenderChange = value => {
    setGender(value);
  };

  return (
    <SafeAreaView>
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

        {/* ageInput */}
        <Controller
          name="age"
          control={controlCreate}
          render={({field: {onChange, value}}) => (
            <View style={styles.inputBox}>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={age => {
                    onChange(age);
                    setAge(age); // Update the age state
                  }}
                  value={value}
                  placeholder="Năm sinh"
                  placeholderTextColor={color.Description}
                  style={styles.inputText}
                />
              </View>
              {errorsCreate?.age && (
                <Text style={styles.textFailed}>
                  {errorsCreate.age.message}
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
                    setName(address); // Update the name state
                  }}
                  placeholder="Địa chỉ"
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
        <View style={styles.inputBox}>
          <Controller
            name="desease"
            defaultValue={5}
            control={controlCreate}
            render={({field: {onChange, value}}) => (
              <DropDownPicker
                listMode="SCROLLVIEW"
                textStyle={styles.inputText}
                open={showDropDown}
                value={desease}
                items={deseaseList}
                setOpen={setShowDropDown}
                setValue={setDesease}
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
                <RadioButton value="Female" color={color.Button} />
                <Text style={{color: color.TitleActive}}>Nam</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="Male" color={color.Button} />
                <Text style={{color: color.TitleActive}}>Nữ</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoInput;

const styles = StyleSheet.create({
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
});
