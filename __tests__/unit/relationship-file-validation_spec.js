/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
let userInfo, relationshipInfo, inputRecords, outputRecords

describe('To assert the datas present in the relationship file', () => {
  beforeAll(async () => {
    userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv')
    relationshipInfo = await fileValidator.dataInfo('testData/relationship-input-file.csv', 'testData/relationship-output-file.csv')
    inputRecords = relationshipInfo.inputData.records
    outputRecords = relationshipInfo.outputData.records
  })

  it('Verify whether the parent_integration_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
    let parentIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      userInfo.userIntegrationData.forEach(function (currentField) {
        if (currentRecord.parent_integration_id === currentField.original_integration_id) {
          try {
            expect(outputRecords[index].parent_integration_id).toBe(currentField.masked_integration_id)
          } catch (err) {
            parentIntegrationIdStatus = false
            console.error(currentRecord.parent_integration_id, ' should be anonymized as - ', currentField.masked_integration_id)
          }
        }
      })
    })
    expect(parentIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the User_Integration_Id value is not anonymized in the output file, when the user_integration_id column has some random value on the input Relationship.txt file', () => {
    let parentIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      var checkRecord = userInfo.userIntegrationData.filter(record => (record.original_integration_id === currentRecord.parent_integration_id))
      if (!checkRecord.length) {
        try {
          expect(outputRecords[index].parent_integration_id).toBe(currentRecord.parent_integration_id)
        } catch (err) {
          parentIntegrationIdStatus = false
          console.error(currentRecord.parent_integration_id + ' parent integration id should not be anonymized.')
        }
      }
    })
    expect(parentIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the child_id is displayed based on the value present in Integration_Id column of Users.txt file.', () => {
    let parentIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      userInfo.userIntegrationData.forEach(function (currentField) {
        if (currentRecord.child_id === currentField.original_integration_id) {
          try {
            expect(outputRecords[index].child_id).toBe(currentField.masked_integration_id)
          } catch (err) {
            parentIntegrationIdStatus = false
            console.error(currentRecord.child_id, ' should be anonymized as - ', currentField.masked_integration_id)
          }
        }
      })
    })
    expect(parentIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the Child_Id value is not anonymized in the output file when the user_integration_id column has some random value on the input Relationship.txt file', () => {
    let parentIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      var checkRecord = userInfo.userIntegrationData.filter(record => (record.original_integration_id === currentRecord.child_id))
      if (!checkRecord.length) {
        try {
          expect(inputRecords[index].child_id).toBe(currentRecord.child_id)
        } catch (err) {
          parentIntegrationIdStatus = false
          console.error(currentRecord.child_id + ' child id should not be anonymized.')
        }
      }
    })
    expect(parentIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the Child_Id value is not anonymized in the output file when the user_integration_id column has some random value on the input Relationship.txt file', () => {
    let parentIntegrationIdStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      var checkRecord = userInfo.userIntegrationData.filter(record => (record.original_integration_id === currentRecord.child_id))
      if (!checkRecord.length) {
        try {
          expect(inputRecords[index].child_id).toBe(currentRecord.child_id)
        } catch (err) {
          parentIntegrationIdStatus = false
          console.error(currentRecord.child_id + ' child id should not be anonymized.')
        }
      }
    })
    expect(parentIntegrationIdStatus).toBe(true)
  })

  it('Verify whether the parent_role,child_role, and term_id column values are being correctly shown as per input file without anonymization.', () => {
    const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields
    let relationshipFieldStatus = true
    inputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
        } catch {
          relationshipFieldStatus = false
          console.error('"' + currentRecord[currentField] + '" for the field [' + currentField + '] should not be "' + outputRecords[index][currentField] + '"')
        }
      })
    })
    expect(relationshipFieldStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the actual records from input file are correctly spooled in the output File', () => {
    const dataFeilds = fileValidator.getRelationshipInfo().anonymize_fields.concat(fileValidator.getRelationshipInfo().non_anonymize_fields)
    expect(relationshipInfo.outputData.header[0]).toEqual(relationshipInfo.inputData.header[0])
    outputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        if (currentRecord[currentField] === '') {
          expect(currentRecord[currentField]).toBe('')
        } else if (currentField === 'parent_integration_id') {
          inputRecords.forEach(function (currentRecord, index) {
            userInfo.userIntegrationData.forEach(function (currentField) {
              if (currentRecord.parent_integration_id === currentField.original_integration_id) {
                expect(outputRecords[index].parent_integration_id).toBe(currentField.masked_integration_id)
              }
            })
          })
        } else if (currentField === 'child_id') {
          inputRecords.forEach(function (currentRecord, index) {
            userInfo.userIntegrationData.forEach(function (currentField) {
              if (currentRecord.child_id === currentField.original_integration_id) {
                expect(outputRecords[index].child_id).toBe(currentField.masked_integration_id)
              }
            })
          })
        } else {
          expect(currentRecord[currentField]).toBe(inputRecords[index][currentField])
        }
      })
    })
  })

  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(relationshipInfo.outputData.header[0].length).toEqual(relationshipInfo.inputData.header[0].length)
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(relationshipInfo.outputData.header[0]).toEqual(relationshipInfo.inputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    const userFields = fileValidator.getRelationshipInfo().non_anonymize_fields
    userFields.forEach(function (currentRecord) {
      if (inputRecords.currentRecord === '') {
        expect(inputRecords.currentRecord).toBe('')
      }
    })
  })

  it('Verify that the file column with numeric value is correctly shown based on the numeric value present in the input file.', () => {
    const dataFeilds = fileValidator.getRelationshipInfo().non_anonymize_fields
    outputRecords.forEach(function (currentRecord, index) {
      dataFeilds.forEach(function (currentField) {
        currentRecord[currentField] === ''
          ? expect(currentRecord[currentField]).toBe('')
          : expect(currentRecord[currentField]).toBe(outputRecords[index][currentField])
      })
    })
  })
})
