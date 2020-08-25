/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let userInfo, enrollmentInfo, inputRecords, outputRecords

describe('To assert the datas present in the enrollment file', () => {
  beforeAll(async () => {
    userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv')
    enrollmentInfo = await fileValidator.dataInfo('testData/enrollment-input-file.csv', 'testData/enrollment-output-file.csv')
    inputRecords = enrollmentInfo.inputData.records
    outputRecords = enrollmentInfo.outputData.records
  })

  it('Verify whether the user_integration_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
    let userIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      userInfo.userIntegrationData.forEach(function (currentField) {
        if (currentRecord.user_integration_id === currentField.original_integration_id) {
          try {
            expect(outputRecords[index].user_integration_id).toBe(currentField.masked_integration_id)
          } catch (err) {
            userIntegrationIdStatus = false
            console.error(currentRecord.user_integration_id, ' should be anonymized as - ', currentField.masked_integration_id)
          }
        }
      })
    })
    expect(userIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Enrollment.txt file', () => {
    let parentIntegrationId = true
    inputRecords.forEach(function (currentRecord, index) {
      var checkRecord = userInfo.userIntegrationData.filter(record => (record.original_integration_id === currentRecord.user_integration_id))
      if (!checkRecord.length) {
        try {
          expect(inputRecords[index].user_integration_id).toBe(currentRecord.user_integration_id)
        } catch (err) {
          parentIntegrationId = false
          console.error(currentRecord.user_integration_id + ' parent integration id should not be anonymized.')
        }
      }
    })
    expect(parentIntegrationId).toBe(true)
  })

  it('Verify whether the course_section_integration_id, user_role, available_ind, credit_hours, last_access_date, and authoritative_status column values are being correctly shown as per input file without anonymization', () => {
    const dataFeilds = fileValidator.getEnrollmentInfo().non_anonymize_fields
    let enrollmentFieldStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch {
          enrollmentFieldStatus = false
          console.error('"' + currentRecord[currentField] + '" for the field [' + currentField + '] should not be "' + outputRecords[index][currentField] + '"')
        }
      })
    })
    expect(enrollmentFieldStatus).toBe(true)
  })

  it('Verify whether the Course_Section_Integration_Id  value is not anonymized in the output file, when the user_integration_id column has some random value on the input Enrollment.txt file', () => {
    let parentIntegrationId = true
    inputRecords.forEach(function (currentRecord, index) {
      var checkRecord = userInfo.userIntegrationData.filter(record => (record.original_integration_id === currentRecord.user_integration_id))
      if (!checkRecord.length) {
        try {
          expect(outputRecords[index].course_section_integration_id).toBe(currentRecord.course_section_integration_id)
        } catch (err) {
          parentIntegrationId = false
          console.error(currentRecord.course_section_integration_id + ' user integration id should not be anonymized.')
        }
      }
    })
    expect(parentIntegrationId).toBe(true)
  })
})
