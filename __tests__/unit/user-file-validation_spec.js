/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let userInfo, inputRecords, outputRecords

describe('To assert the datas present in the users file', () => {
  beforeAll(async () => {
    userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv')
    outputRecords = userInfo.userData.outputData.records
    inputRecords = userInfo.userData.inputData.records
  })

  it('Verify whether the integration_id is displayed in sequential order for all the rows in the output file', () => {
    let integrationIdStatus = true
    outputRecords.forEach(function (currentRecord, index) {
      try {
        expect(currentRecord.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id)
      } catch (err) {
        integrationIdStatus = false
        console.error(currentRecord.integration_id, ' - Integration ID is not in a correct sequence. Expected Integration ID should be ', userInfo.userIntegrationData[index].masked_integration_id)
      }
    })
    expect(integrationIdStatus).toBe(true)
  })

  it('Verify whether the family_name is displayed with "lname_1234" for all the rows.', () => {
    let familyNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.family_name === '' ? expect(currentRecord.family_name).toBe('') : expect(currentRecord.family_name).toBe(fileValidator.getUserAnonymizeInfo().family_name)
      } catch (err) {
        familyNameStatus = false
        console.error(currentRecord.family_name, ' - Family name is not shown correctly, Expected Family name should be ', fileValidator.getUserAnonymizeInfo().family_name)
      }
    })
    expect(familyNameStatus).toBe(true)
  })

  it('Verify whether the middle_name is displayed with "mname_1234" for all the rows.', () => {
    let middleNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.middle_name === '' ? expect(currentRecord.middle_name).toBe('') : expect(currentRecord.middle_name).toBe(fileValidator.getUserAnonymizeInfo().middle_name)
      } catch (err) {
        middleNameStatus = false
        console.error(currentRecord.middle_name, ' - Middle name is not shown correctly, Expected Middle name should be ', fileValidator.getUserAnonymizeInfo().middle_name)
      }
    })
    expect(middleNameStatus).toBe(true)
  })

  it('Verify whether the given_name is displayed with "fname_1234" for all the rows.', () => {
    let givenNameStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.given_name === '' ? expect(currentRecord.given_name).toBe('') : expect(currentRecord.given_name).toBe(fileValidator.getUserAnonymizeInfo().given_name)
      } catch (err) {
        givenNameStatus = false
        console.error(currentRecord.middle_name, ' - Given name is not shown correctly, Expected Given name should be ', fileValidator.getUserAnonymizeInfo().given_name)
      }
    })
    expect(givenNameStatus).toBe(true)
  })

  it('Verify whether the email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
    let emailStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.email === '' ? expect(currentRecord.email).toBe('') : expect(currentRecord.email).toBe(fileValidator.getUserAnonymizeInfo().email)
      } catch (err) {
        emailStatus = false
        console.error(currentRecord.email, ' - Email is not shown correctly, Expected Email should be ', fileValidator.getUserAnonymizeInfo().email)
      }
    })
    expect(emailStatus).toBe(true)
  })

  it('Verify whether the secondary_email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
    let secondaryEmailStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.secondary_email === '' ? expect(currentRecord.secondary_email).toBe('') : expect(currentRecord.secondary_email).toBe(fileValidator.getUserAnonymizeInfo().secondary_email)
      } catch (err) {
        secondaryEmailStatus = false
        console.error(currentRecord.secondary_email, ' - Secondary_email is not shown correctly, Expected Secondary_email should be ', fileValidator.getUserAnonymizeInfo().secondary_email)
      }
    })
    expect(secondaryEmailStatus).toBe(true)
  })

  it('Verify whether the student_id is displayed with "sid_1234" for all the rows.', () => {
    let studentIdStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.student_id === '' ? expect(currentRecord.student_id).toBe('') : expect(currentRecord.student_id).toBe(fileValidator.getUserAnonymizeInfo().student_id)
      } catch (err) {
        studentIdStatus = false
        console.error(currentRecord.student_id, ' - Student Id is not shown correctly, Expected Student Id should be ', fileValidator.getUserAnonymizeInfo().student_id)
      }
    })
    expect(studentIdStatus).toBe(true)
  })

  it('Verify whether the user_id is displayed with "u_1234" for all the rows.', () => {
    let userIdStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.user_id === '' ? expect(currentRecord.user_id).toBe('') : expect(currentRecord.user_id).toBe(fileValidator.getUserAnonymizeInfo().user_id)
      } catch (err) {
        userIdStatus = false
        console.error(currentRecord.user_id, ' - User Id is not shown correctly, Expected User Id should be ', fileValidator.getUserAnonymizeInfo().user_id)
      }
    })
    expect(userIdStatus).toBe(true)
  })

  it('Verify whether the birth_dt value is populated based on the random date range', () => {
    let birthDtStatus = true
    const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date
    const maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date
    outputRecords.forEach(function (currentRecord, index) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, currentRecord.birth_dt, inputRecords[index].birth_dt)).toBeTruthy()
      } catch (err) {
        birthDtStatus = false
        console.error(currentRecord.birth_dt, ' Birth date is not in the available range for the integration ID - ', currentRecord.integration_id)
      }
    })
    expect(birthDtStatus).toBe(true)
  })

  it('Verify whether the birth_dt value is displayed in the format yyyy-mm-dd', () => {
    let birthDtFmtStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateFormat(currentRecord.birth_dt)).toBeTruthy()
      } catch (err) {
        birthDtFmtStatus = false
        console.error(currentRecord.birth_dt, ' Birth date value is not displayed in the format yyyy-mm-dd for the integration ID - ', currentRecord.integration_id)
      }
    })
    expect(birthDtFmtStatus).toBe(true)
  })

  it('Verify whether the b_phone is displayed with "+17031234321" for all the rows.', () => {
    let bphoneStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.b_phone === '' ? expect(currentRecord.b_phone).toBe('') : expect(currentRecord.b_phone).toBe(fileValidator.getUserAnonymizeInfo().b_phone)
      } catch (err) {
        bphoneStatus = false
        console.error(currentRecord.b_phone, ' - b_phone is not shown correctly, Expected b_phone should be ', fileValidator.getUserAnonymizeInfo().b_phone)
      }
    })
    expect(bphoneStatus).toBe(true)
  })

  it('Verify whether the m_phone is displayed with "+17031234321" for all the rows that are pertained to "Students".', () => {
    let mphoneStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.m_phone === '' ? expect(currentRecord.m_phone).toBe('') : expect(currentRecord.m_phone).toBe(fileValidator.getUserAnonymizeInfo().m_phone)
      } catch (err) {
        mphoneStatus = false
        console.error(currentRecord.m_phone, ' - m_phone is not shown correctly, Expected m_phone should be ', fileValidator.getUserAnonymizeInfo().m_phone)
      }
    })
    expect(mphoneStatus).toBe(true)
  })

  it('Verify whether the gender,available_ind,assign_student_role,allow_login, and user_timezone column values are being correctly shown as per input User.txt file without anonymization', () => {
    let userFieldStatus = true
    const catchFieldError = []
    const dataFields = fileValidator.getUserAnonymizeInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, outputIndex) {
      dataFields.forEach(function (currentField, index) {
        try {
          currentRecord[currentField] === '' ? expect(currentRecord[currentField]).toBe('') : expect(currentRecord[currentField]).toBe(inputRecords[outputIndex][currentField])
        } catch (err) {
          userFieldStatus = false
          catchFieldError.push(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input value does not match with the output value [' + currentRecord[currentField] + ']')
        }
      })
    })
    catchFieldError.forEach((ele) => {
      console.error(ele)
    })
    expect(userFieldStatus).toBe(true)
  })

  it('Verify whether the home_city is displayed with "home_city_1234" for all the rows.', () => {
    let homeCityStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_city === '' ? expect(currentRecord.home_city).toBe('') : expect(currentRecord.home_city).toBe(fileValidator.getUserAnonymizeInfo().home_city)
      } catch (err) {
        homeCityStatus = false
        console.error(currentRecord.home_city, ' - homeCityStatus is not shown correctly, Expected Home City is ', fileValidator.getUserAnonymizeInfo().home_city)
      }
    })
    expect(homeCityStatus).toBe(true)
  })

  it('Verify whether the home_state is displayed with "home_state_1234" for all the rows.', () => {
    let homeStateStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_state === '' ? expect(currentRecord.home_state).toBe('') : expect(currentRecord.home_state).toBe(fileValidator.getUserAnonymizeInfo().home_state)
      } catch (err) {
        homeStateStatus = false
        console.error(currentRecord.home_state, ' - home_state is not shown correctly, Expected Home State is ', fileValidator.getUserAnonymizeInfo().home_state)
      }
    })
    expect(homeStateStatus).toBe(true)
  })

  it('Verify whether the home_zip is displayed with "home_zip_1234" for all the rows.', () => {
    let homeZipStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_zip === '' ? expect(currentRecord.home_zip).toBe('') : expect(currentRecord.home_zip).toBe(fileValidator.getUserAnonymizeInfo().home_zip)
      } catch (err) {
        homeZipStatus = false
        console.error(currentRecord.home_zip, ' - home_zip is not shown correctly, Expected Home Zip is ', fileValidator.getUserAnonymizeInfo().home_zip)
      }
    })
    expect(homeZipStatus).toBe(true)
  })

  it('Verify whether the home_county is displayed with "home_county_1234" for all the rows.', () => {
    let homeCountyStatus = true
    outputRecords.forEach(function (currentRecord) {
      try {
        currentRecord.home_county === '' ? expect(currentRecord.home_county).toBe('') : expect(currentRecord.home_county).toBe(fileValidator.getUserAnonymizeInfo().home_county)
      } catch (err) {
        homeCountyStatus = false
        console.error(currentRecord.home_county, ' - home_county is not shown correctly, Expected Home County is ', fileValidator.getUserAnonymizeInfo().home_county)
      }
    })
    expect(homeCountyStatus).toBe(true)
  })

  it('Verify whether the max character value is correctly shown when the columns middle_name, home_city, home_state, and home_county are entered with max characters', () => {
    let maxCharStatus = true; const catchFieldError = []
    const dataFields = fileValidator.getUserAnonymizeInfo().max_characters_fields
    outputRecords.forEach(function (currentRecord, index) {
      dataFields.forEach(function (currentField, outputIndex) {
        try {
          currentRecord[currentField] === '' ? expect(currentRecord[currentField]).toBe('') : expect(currentRecord[currentField]).toBe(fileValidator.getUserAnonymizeInfo()[currentField])
        } catch (err) {
          maxCharStatus = false
          catchFieldError.push(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input value does not match with the output value [' + currentRecord[currentField] + ']')
        }
      })
    })
    catchFieldError.forEach((ele) => {
      console.error(ele)
    })
    expect(maxCharStatus).toBe(true)
  })

  it('Verify whether the actual records from input file are correctly spooled in the output File', () => {
    let actualRecordStatus = true; const catchFieldError = []
    const dataFields = fileValidator.getUserAnonymizeInfo().anonymize_fields
    expect(userInfo.userData.outputData.header[0]).toEqual(userInfo.userData.inputData.header[0])
    outputRecords.forEach(function (currentRecord, index) {
      dataFields.forEach(function (currentField, outputIndex) {
        try {
          currentRecord[currentField] === ''
            ? expect(currentRecord[currentField]).toBe('')
            : currentField === 'integration_id'
              ? expect(currentRecord.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id)
              : currentField === 'birth_dt'
                ? expect(fileValidator.verifyDateInRange(fileValidator.getUserAnonymizeInfo()[currentField].min_date, fileValidator.getUserAnonymizeInfo()[currentField].max_date, currentRecord[currentField], inputRecords[index][currentField])).toBeTruthy()
                : expect(currentRecord[currentField]).toBe(fileValidator.getUserAnonymizeInfo()[currentField])
        } catch (err) {
          actualRecordStatus = false
          catchFieldError.push(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input value does not match with the output value [' + currentRecord[currentField] + ']')
        }
      })
    })
    catchFieldError.forEach((ele) => {
      console.error(ele)
    })
    expect(actualRecordStatus).toBe(true)
  })

  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    let recordCountStatus = true
    try {
      expect(outputRecords.length).toEqual(inputRecords.length)
    } catch (Err) {
      recordCountStatus = false
      console.error(inputRecords.length, 'Input file record count not matched with output file record count', outputRecords.length)
    }
    expect(recordCountStatus).toBe(true)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    let headerStatus = true
    try {
      expect(userInfo.userData.outputData.header[0]).toEqual(userInfo.userData.inputData.header[0])
    } catch (Err) {
      headerStatus = false
      console.error(userInfo.userData.outputData.header[0], ' Output file header not shown as per Input file header ', userInfo.userData.inputData.header[0])
    }
    expect(headerStatus).toBe(true)
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const userFields = fileValidator.getUserAnonymizeInfo().anonymize_fields.concat(fileValidator.getUserAnonymizeInfo().non_anonymize_fields)
    userFields.forEach(function (currentRecord) {
      try {
        if (inputRecords.currentRecord === '') {
          expect(inputRecords.currentRecord).toBe('')
        }
      } catch (err) {
        emptyColumnStatus = false
        console.error(currentRecord, ' Output file column with empty value not shown correctly based on the empty value in the input file')
      }
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
    let numericValStatus = true; const catchFieldError = []
    const dataFields = fileValidator.getUserAnonymizeInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, index) {
      dataFields.forEach(function (currentField, outputIndex) {
        try {
          currentRecord[currentField] === ''
            ? expect(currentRecord[currentField]).toBe('')
            : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch (err) {
          numericValStatus = false
          catchFieldError.push(dataFields[index] + ' - [' + inputRecords[outputIndex][currentField] + '] input numeric value does not match with the output numeric value [' + currentRecord[currentField] + ']')
        }
      })
    })
    catchFieldError.forEach((ele) => {
      console.error(ele)
    })
    expect(numericValStatus).toBe(true)
  })

  it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
    let dateValueStatus = true
    const minDate = fileValidator.getUserAnonymizeInfo().birth_dt.min_date
    const maxDate = fileValidator.getUserAnonymizeInfo().birth_dt.max_date
    outputRecords.forEach(function (currentRecord, index) {
      try {
        currentRecord.birth_dt === '' ? expect(currentRecord.birth_dt).toBe('') : expect(fileValidator.verifyDateInRange(minDate, maxDate, currentRecord.birth_dt, inputRecords[index].birth_dt)).toBeTruthy()
      } catch (err) {
        dateValueStatus = false
        console.error(currentRecord.birth_dt, ' Date value not correctly shown based on the date value present in the input file')
      }
    })
    expect(dateValueStatus).toBe(true)
  })
})
