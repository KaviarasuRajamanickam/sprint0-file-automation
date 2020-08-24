const fileValidator = require("../../controllers/file-validation");

describe('To assert the datas present in the sections file', () => {

    beforeAll(async () => {
        sectionInfo = await fileValidator.dataInfo('testData/sections-input-file.csv','testData/sections-output-file.csv');
    });

    it('Verify whether the integration_id, course_section_name, course_section_id, term_id, course_integration_id, start_dt, end_dt, course_section_delivery, maximum_enrollment_count, credit_hours, and registration_call_number column values are being correctly shown as per input file without anonymization.', () => {
        let section_field_status = true, catch_section_error = [];
        for (let i = 0; i < sectionInfo.inputData.records.length; i++) {
            let dataFeilds = fileValidator.getSectionInfo().records;
            for(let j = 0; j < dataFeilds.length; j++) {
                try{
                    sectionInfo.outputData.records[i][dataFeilds[j]] === '' ? expect(sectionInfo.outputData.records[i][dataFeilds[j]]).toBe('') : expect(sectionInfo.outputData.records[i][dataFeilds[j]]).toBe(sectionInfo.inputData.records[i][dataFeilds[j]]);
                } catch(err){
                    section_field_status = false;
                    catch_section_error.push(dataFeilds[j]+ ' - ['+sectionInfo.inputData.records[i][dataFeilds[j]]+'] input value does not match with the output value ['+sectionInfo.outputData.records[i][dataFeilds[j]]+']');
                }                
            }
        }
        catch_section_error.map((ele) => {
            console.error(ele)
        })
        expect(section_field_status).toBe(true);
    })
})

