/* eslint-disable no-undef */
const fileValidator = require('../../controllers/file-validation')

describe('To assert the datas present in the sections file', () => {
  beforeAll(async () => {
    sectionInfo = await fileValidator.dataInfo('testData/sections-input-file.csv', 'testData/sections-output-file.csv')
  })

  it('Verify whether the integration_id, course_section_name, course_section_id, term_id, course_integration_id, start_dt, end_dt, course_section_delivery, maximum_enrollment_count, credit_hours, and registration_call_number column values are being correctly shown as per input file without anonymization.', () => {
    let sectionFieldStatus = true; const catchSectionError = []
    const dataFields = fileValidator.getSectionInfo().records
    sectionInfo.inputData.records.forEach((currentRecord, index) => {
      dataFields.forEach(currentField => {
        try {
          sectionInfo.outputData.records[index][currentField] === '' ? expect(sectionInfo.outputData.records[index][currentField]).toBe('') : expect(sectionInfo.outputData.records[index][currentField]).toBe(currentRecord[currentField])
        } catch (err) {
          sectionFieldStatus = false
          catchSectionError.push(currentField + ' - [' + currentRecord[currentField] + '] input value does not match with the output value [' + sectionInfo.outputData.records[index][currentField] + ']')
        }
      })
    })
    catchSectionError.forEach((ele) => {
      console.error(ele)
    })
    expect(sectionFieldStatus).toBe(true)
  })
})
