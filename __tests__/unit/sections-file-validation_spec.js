/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')
const positiveSectionScenario = ['testData/sections-input-file.csv', 'testData/sections-output-file.csv']
let sectionInfo, inputRecords, outputRecords

describe('To assert the datas present in the sections file', () => {
  beforeAll(async () => {
    sectionInfo = await fileValidator.dataInfo(positiveSectionScenario)
    outputRecords = sectionInfo.outputData.records
    inputRecords = sectionInfo.inputData.records
  })

  it('Verify whether the integration_id, course_section_name, course_section_id, term_id, course_integration_id, start_dt, end_dt, course_section_delivery, maximum_enrollment_count, credit_hours, and registration_call_number column values are being correctly shown as per input file without anonymization.', () => {
    let sectionFieldStatus = true
    const dataFields = fileValidator.getSectionInfo().records
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(outputRecords[index][currentField]).toBe(currentRecord[currentField])
        } catch (err) {
          sectionFieldStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(sectionFieldStatus).toBe(true)
  })

  /** Generic Validations **/
  it('Verify whether the number of records are correctly matched between the input file and output file.', () => {
    expect(outputRecords.length).toEqual(inputRecords.length)
  })

  it('Verify whether the Headers are correctly displayed in the output file.', () => {
    expect(sectionInfo.inputData.header[0]).toEqual(sectionInfo.outputData.header[0])
  })

  it('Verify that the output file column with empty value is correctly shown based on the empty value in the input file.', () => {
    let emptyColumnStatus = true
    const dataFields = fileValidator.getSectionInfo().records
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          if (currentRecord[currentField] === '') {
            expect(outputRecords[index][currentField]).toBe('')
          }
        } catch (err) {
          emptyColumnStatus = false
          console.error(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + outputRecords[index][currentField] + ']')
        }
      })
    })
    expect(emptyColumnStatus).toBe(true)
  })

  it('Verify that the file column with date value is correctly shown based on the date value present in the input file.', () => {
    let dateValueStatus = true
    const dataFields = ['start_dt', 'end_dt']
    inputRecords.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          currentRecord[currentField] === '' ? expect(outputRecords[index][currentField]).toBe('') : expect(fileValidator.verifyDateFormat(outputRecords[index][currentField])).toBeTruthy()
        } catch (err) {
          dateValueStatus = false
          console.error(currentField + ' - [' + outputRecords[index][currentField] + '] output value does not displayed in the format yyyy-mm-dd [' + currentRecord[currentField] + ']')
        }
      })
    })
    expect(dateValueStatus).toBe(true)
  })
})
