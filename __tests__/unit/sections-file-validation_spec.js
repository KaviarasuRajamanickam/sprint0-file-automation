const fileValidator = require("../../controllers/file-validation");

describe('To assert the datas present in the sections file', () => {

    beforeAll(async () => {
        sectionInfo = await fileValidator.dataInfo('testData/sections-input-file.csv','testData/sections-output-file.csv');
    });

    it('Verify whether the integration_id, course_section_name, course_section_id, term_id, course_integration_id, start_dt, end_dt, course_section_delivery, maximum_enrollment_count, credit_hours, and registration_call_number column values are being correctly shown as per input file without anonymization.', () => {
        let section_field_status = true, catch_section_error = [];
        let dataFields = fileValidator.getSectionInfo().records;
        sectionInfo.inputData.records.forEach((current_record, index) => {
            dataFields.forEach(current_field => {
                try{
                    sectionInfo.outputData.records[index][current_field] === '' ? expect(sectionInfo.outputData.records[index][current_field]).toBe('') : expect(sectionInfo.outputData.records[index][current_field]).toBe(current_record[current_field]);
                } catch(err){
                    section_field_status = false;
                    catch_section_error.push(current_field+ ' - ['+current_record[current_field]+'] input value does not match with the output value ['+sectionInfo.outputData.records[index][current_field]+']');
                }
            })
        });
        catch_section_error.forEach((ele) => {
            console.error(ele)
        })
        expect(section_field_status).toBe(true);
    })
})

